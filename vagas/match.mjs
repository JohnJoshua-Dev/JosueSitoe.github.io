/**
 * Candidate profile + job matching. Shared by:
 *   - tools/fetch-jobs.mjs  (Node, GitHub Action — filters and scores the job feed)
 *   - vagas/index.html      (job portal — matched / missing keywords per job)
 *   - vagas/cv-tailor.mjs   (CV page — reorders and highlights skills for one job)
 *
 * To change what counts as "my area", edit SKILLS / ROLE_TERMS / OFF_TARGET below.
 */

// Skills I have. `cv` = the exact text of the matching tag(s) in cv/index.html, so the CV can highlight them.
export const SKILLS = [
    { name: 'C#', terms: ['c#', 'csharp', 'c sharp'], weight: 3, cv: ['C# / .NET'] },
    { name: '.NET', terms: ['.net', 'dotnet', '.net core', '.net 8', 'entity framework', 'ef core', 'linq'], weight: 3, cv: ['C# / .NET'] },
    { name: 'ASP.NET', terms: ['asp.net', 'asp.net core', 'aspnet', 'web api', 'webapi', 'mvc'], weight: 3, cv: ['ASP.NET / Web APIs'] },
    { name: 'SQL Server', terms: ['sql server', 'mssql', 'ms sql', 'microsoft sql'], weight: 3, cv: ['SQL Server'] },
    { name: 'T-SQL', terms: ['t-sql', 'tsql', 'stored procedure', 'stored procedures', 'triggers'], weight: 2, cv: ['T-SQL / Stored Procedures / Triggers'] },
    { name: 'SQL', terms: ['sql', 'relational database', 'bases de dados', 'base de dados', 'database'], weight: 2, cv: ['SQL Server', 'T-SQL / Stored Procedures / Triggers', 'Modelação de Dados', 'Data Modelling'] },
    { name: 'PostgreSQL', terms: ['postgresql', 'postgres'], weight: 2, cv: ['PostgreSQL'] },
    { name: 'MySQL', terms: ['mysql', 'mariadb'], weight: 2, cv: ['MySQL'] },
    { name: 'DBA', terms: ['dba', 'database administrator', 'administrador de base', 'administração de base'], weight: 2, cv: ['SQL Server', 'Query Tuning', 'RBAC'] },
    { name: 'PHP', terms: ['php'], weight: 2, cv: ['PHP / Laravel'] },
    { name: 'Laravel', terms: ['laravel'], weight: 2, cv: ['PHP / Laravel'] },
    { name: 'Java', terms: ['java'], weight: 1, cv: ['Java'] },
    { name: 'Python', terms: ['python'], weight: 1, cv: ['Python'] },
    { name: 'REST APIs', terms: ['restful', 'rest api', 'apis', 'api rest', 'microservices', 'microsserviços'], weight: 2, cv: ['APIs RESTful'] },
    { name: 'JavaScript', terms: ['javascript', 'js', 'es6'], weight: 1, cv: ['JavaScript'] },
    { name: 'React', terms: ['react', 'reactjs', 'react.js'], weight: 1, cv: ['React'] },
    { name: 'Node.js', terms: ['node', 'node.js', 'nodejs', 'express'], weight: 1, cv: ['Node.js'] },
    { name: 'HTML/CSS', terms: ['html', 'css', 'html5', 'css3'], weight: 1, cv: ['HTML5 / CSS3', 'Responsive Design'] },
    { name: 'Bootstrap', terms: ['bootstrap'], weight: 1, cv: ['Bootstrap'] },
    { name: 'Git', terms: ['git', 'github', 'gitlab'], weight: 1, cv: ['Git / GitHub'] },
    { name: 'Docker', terms: ['docker', 'containers'], weight: 1, cv: ['Docker'] },
    { name: 'Testes', terms: ['tdd', 'unit test', 'unit testing', 'xunit', 'nunit', 'phpunit', 'pest', 'testes unitários'], weight: 1, cv: ['TDD / Unit Testing'] },
    { name: 'Power BI', terms: ['power bi', 'powerbi'], weight: 1, cv: ['Power BI'] },
    { name: 'Microsoft 365', terms: ['microsoft 365', 'office 365', 'm365', 'sharepoint', 'microsoft teams'], weight: 1, cv: ['Microsoft 365', 'SharePoint', 'Exchange'] },
    { name: 'Power Automate', terms: ['power automate', 'power platform', 'copilot studio'], weight: 1, cv: ['Power Automate', 'Copilot Studio'] },
    { name: 'Linux/Windows Server', terms: ['linux', 'windows server'], weight: 1, cv: ['Linux', 'Windows Server'] },
    { name: 'Redes', terms: ['tcp/ip', 'networking', 'redes', 'firewall', 'vpn'], weight: 1, cv: ['Redes TCP/IP', 'TCP/IP Networking', 'Firewall/VPN'] },
    { name: 'Suporte', terms: ['helpdesk', 'help desk', 'suporte técnico', 'technical support', 'incident management', 'gestão de incidentes'], weight: 1, cv: ['Helpdesk', 'Gestão de Incidentes', 'Incident Management'] },
    { name: 'Postman', terms: ['postman'], weight: 1, cv: ['Postman'] },
    { name: 'Next.js', terms: ['next.js', 'nextjs'], weight: 1, cv: ['Next.js'] },
    { name: 'Tailwind', terms: ['tailwind', 'tailwindcss', 'tailwind css'], weight: 1, cv: ['Tailwind CSS'] },
    { name: 'Flutter', terms: ['flutter', 'dart'], weight: 1, cv: ['Flutter'] },
    { name: 'JWT', terms: ['jwt', 'oauth', 'json web token'], weight: 1, cv: ['JWT'] },
    { name: 'OCR', terms: ['ocr'], weight: 1, cv: ['OCR'] },
];

// Technologies recruiters often ask for that are NOT on my CV — shown as "em falta" so I can decide.
export const GAPS = [
    'typescript', 'angular', 'vue', 'golang', 'rust', 'ruby', 'rails', 'kotlin', 'swift', 'scala', 'c++',
    'aws', 'azure', 'gcp', 'kubernetes', 'terraform', 'graphql', 'kafka', 'rabbitmq', 'redis', 'mongodb', 'elasticsearch',
    'blazor', 'django', 'flask', 'fastapi', 'spring', 'symfony', 'wordpress', 'ci/cd', 'azure devops', 'oracle', 'sap',
];

// Job titles that are clearly in my area get a bonus; clearly-other ones get a penalty.
export const ROLE_TERMS = [
    '.net', 'c#', 'asp.net', 'backend', 'back-end', 'back end', 'full stack', 'fullstack', 'full-stack',
    'software developer', 'software engineer', 'web developer', 'developer', 'programmer', 'programador',
    'desenvolvedor', 'desenvolvimento de software', 'php', 'laravel', 'sql', 'dba', 'database', 'base de dados',
    'sistemas de informação', 'tecnologias de informação', 'informática', 'it officer', 'oficial de ti', 'sistemas',
];
export const OFF_TARGET = [
    'sales', 'vendas', 'marketing', 'designer', 'recruiter', 'account executive', 'customer success', 'content',
    'ios', 'android', 'mobile engineer', 'machine learning', 'data scientist', 'nurse', 'enfermeiro', 'accountant',
    'contabilista', 'motorista', 'driver', 'legal', 'lawyer', 'copywriter', 'writer', 'hardware engineer', 'principal',
    'staff', 'director', 'vp ', 'head of', 'office assistant', 'virtual assistant',
];

// Locations a remote job may be restricted to that still include someone living in Maputo.
const OK_LOCATIONS = /worldwide|anywhere|global|africa|áfrica|mozambique|moçambique|maputo|emea|lusophone|cplp/i;

const norm = (s) => ` ${String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ')} `;

function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// Whole-term match that also works for terms like "c#", ".net", "node.js".
const termCache = new Map();
function hasTerm(text, term) {
    let re = termCache.get(term);
    if (!re) {
        re = new RegExp(`(?<![a-z0-9])${escapeRe(term)}(?![a-z0-9#+])`, 'i');
        termCache.set(term, re);
    }
    return re.test(text);
}

/**
 * Scores a job 0–100 for my profile.
 * @param {{title:string, description?:string, tags?:string[], location?:string}} job
 */
export function matchJob(job) {
    const title = norm(job.title);
    const body = norm(`${job.title} ${(job.tags || []).join(' ')} ${job.description || ''}`);

    const matched = [];
    let weight = 0;
    for (const s of SKILLS) {
        if (s.terms.some(t => hasTerm(body, t))) {
            matched.push(s.name);
            weight += s.weight;
        }
    }
    const missing = GAPS.filter(t => hasTerm(body, t));

    let score = Math.min(70, Math.round((weight / 14) * 70));          // skills: up to 70
    if (ROLE_TERMS.some(t => hasTerm(title, t))) score += 30;           // role in title: +30
    if (OFF_TARGET.some(t => hasTerm(title, t))) score -= 40;
    score -= Math.min(15, missing.length * 3);                          // each unknown core tech: -3
    score = Math.max(0, Math.min(100, score));

    return { score, matched, missing, eligible: isEligible(job.location, job.title) };
}

// Titles like "Developer (US only)" restrict the job even when the board says Worldwide.
const LOCKED_TITLE = /\b(u\.?s\.?|usa|us|uk|eu|canada|latam)[- ]?(based|only)\b|\bonly\s+(us|usa|uk|eu)\b|\bremote\s*[,-]?\s*(latin america|latam|us|usa|uk|canada)\b/i;

export function isEligible(location, title = '') {
    if (LOCKED_TITLE.test(title)) return false;
    const loc = String(location ?? '').trim();
    if (!loc) return true;
    // "South Africa" is a single country, not the continent.
    const rest = loc.replace(/south\s+africa/gi, '').replace(/[,;|\s]+/g, ' ').trim();
    return rest !== '' && OK_LOCATIONS.test(rest);
}

/** Rough language guess, to open the CV in PT or EN. */
export function guessLang(job) {
    const t = norm(`${job.title} ${job.description || ''}`.slice(0, 1500));
    const pt = (t.match(/ (de|para|com|vaga|experiência|requisitos|candidatos|em|da|do) /g) || []).length;
    const en = (t.match(/ (the|and|with|for|experience|requirements|you|we|is|of) /g) || []).length;
    return pt > en ? 'pt' : 'en';
}

/** Which CV version (cv/?perfil=) fits a job best: fullstack | backend | frontend | dba. */
export function pickProfile(job) {
    const t = norm(job.title);
    if (/ (dba|database|base de dados|bases de dados|sql developer|etl|data engineer)/.test(t)) return 'dba';
    if (/full[- ]?stack/.test(t)) return 'fullstack';
    if (/front[- ]?end|react|ui |ux |angular|vue/.test(t)) return 'frontend';
    if (/back[- ]?end|\.net|c#|asp\.net|php|laravel|api|java |python/.test(t)) return 'backend';
    const m = job.matched || [];
    const be = ['C#', '.NET', 'ASP.NET', 'PHP', 'Laravel', 'REST APIs', 'SQL Server'].filter(x => m.includes(x)).length;
    const fe = ['JavaScript', 'React', 'HTML/CSS', 'Bootstrap'].filter(x => m.includes(x)).length;
    return fe >= 2 && be >= 2 ? 'fullstack' : fe > be ? 'frontend' : 'backend';
}

/** CV tag texts to highlight for a set of matched skill names. */
export function cvTagsFor(matchedNames) {
    const set = new Set();
    for (const s of SKILLS) if (matchedNames.includes(s.name)) s.cv.forEach(c => set.add(c));
    return set;
}
