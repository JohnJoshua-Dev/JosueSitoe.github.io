let img=[]
let i=0;

img[0]='./img/unitec1.jpg'
img[1]='./img/unitec2.jpg'
img[2]='./img/TME.jpg'
img[3]='./img/Apec.jpg'
img[4]='img/IIM.jpg'
img[5]='./img/music.jpg'
function slide(){
    document.certificados.src=img[i];
        if(i<img.length-1){
            i++
        }
        else{
            i=0;
        }
    setTimeout(slide, 6000)
}
window.onload=slide