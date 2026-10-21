/**
 * Encrypts the private ATS tailor so only the password holder can run it.
 *
 *   private/ats-tailor.js  (plaintext, gitignored)  →  cv/ats-tailor.enc.json  (published)
 *
 * Usage (PowerShell):  $env:ATS_PASSWORD = '...'; node tools/build-ats.mjs
 *        (or run without the variable and type the password when asked)
 *
 * Format must match cv/ats-gate.js: PBKDF2-SHA256 → AES-256-GCM, all fields base64.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { webcrypto as crypto } from 'node:crypto';

const ROOT = new URL('..', import.meta.url);
const SOURCE = new URL('private/ats-tailor.js', ROOT);
const OUTPUT = new URL('cv/ats-tailor.enc.json', ROOT);
const ITERATIONS = 600000;

function askHidden(question) {
    return new Promise(resolve => {
        const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
        rl._writeToOutput = (s) => { if (s.includes(question)) process.stdout.write(s); };
        rl.question(question, answer => { rl.close(); process.stdout.write('\n'); resolve(answer); });
    });
}

const b64 = (buf) => Buffer.from(buf).toString('base64');

const password = process.env.ATS_PASSWORD || await askHidden('Password do ATS: ');
if (password.length < 12) {
    console.error('Use uma password com pelo menos 12 caracteres (o ficheiro cifrado é público).');
    process.exit(1);
}

const plaintext = await readFile(SOURCE);
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
    baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
);
const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);

await writeFile(OUTPUT, JSON.stringify({ v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(data) }));
console.log(`OK → cv/ats-tailor.enc.json (${plaintext.length} bytes cifrados)`);
