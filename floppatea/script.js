msg=document.querySelector(".msg")
sc=document.querySelector(".score")
btn=document.querySelector(".btn")

const audio1 = new Audio("files/sfart.mp3")
const audio2 = new Audio("files/hag.mp3")
const audio3 = new Audio("files/br.mp3")

let s=0;
let can;
let context;
let go = true;
//can
let canwidth = 400;
let canheight = 700;

//bird
let bwidth=40;
let bheight=40;
let bimage;
let bx=canwidth/8;
let by=canheight/2;

let bird ={
    x : bx,
    y : by,
    width : bwidth,
    height: bheight, 
}

//pipe
let pipes = []
let pwidth = 64;
let pheight = 512;
let pipex=canwidth;


//physics
let velx= -2;
let vely= 0;
let grav = 0.4;

let tpipeimg;
let bpipeimg;

window.onload = function(){

    

    can = document.querySelector('.can')
    can.height = canheight;
    can.width = canwidth;
    context = can.getContext("2d");

    context.fillStyle = "transparent";
    context.fillRect(bird.x, bird.y, bird.width, bird.height)
    bimage=new  Image();
    bimage.src = "files/bird.jpg"

    function img(){
        bimage.onload = function(){
            context.drawImage(bimage, bird.x ,bird.y ,bird.width, bird.height)
        }
        list = ["files/green.jpg","files/red.jpg"]
        tpipeimg = new Image();
        tpipeimg.src = list[Math.floor(Math.random()*list.length)]
        bpipeimg = new Image();
        bpipeimg.src = list[Math.floor(Math.random()*list.length)]
    }
 
    setInterval(img, 1900);
    setInterval(place, 1900);
    requestAnimationFrame(update);
}

function update(){
    if (go){
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, can.width, can.height);
    //bird
    vely +=grav;
    bird.y += vely;
    context.drawImage(bimage, bird.x ,bird.y ,bird.width, bird.height);

    //pipes
    for(i=0;i<pipes.length;i++){
        let pipe = pipes[i];
        pipe.x = pipe.x + velx;
        context.drawImage(pipe.img, pipe.x ,pipe.y ,pipe.width, pipe.height);

        if(col(bird , pipe)){
            msg.style.display = 'block';
            audio2.play()
            go = true
        }
        if(bird.y >= canheight){
            msg.style.display = 'block';
            audio2.play()
            go = true
        }
        if(pipe.x == bird.x){
            s ++
            sc.textContent = s/2
        }
        if (pipes[0].x < -400){
            pipes.shift();
        }
    
    }
    document.addEventListener('keydown',(u)=>{
        if(u.key==" "){
            if(bird.y >= 30){
                vely=-6
                audio1.play()
            }
        }
    });
    document.addEventListener('click',()=>{
        if(bird.y >= 30){
            vely=-6
            audio1.play()
        }
});

}
function place(){

    let pipey= -Math.floor(Math.random() * 480);
    
    tpipe={
        img : tpipeimg,
        width : pwidth,
        height : pheight,
        x: pipex,
        y: pipey,
        passed :false
    }
    
    bpipe={
        img : bpipeimg,
        width : pwidth,
        height : pheight,
        x: pipex,
        y: canheight-10+pipey,
        passed :false
    }

    pipes.push(tpipe)
    pipes.push(bpipe)
}

function col(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
            
}
function start(){
    btn.style.display='none'
    go=false
    update()
    br()
}
msg.addEventListener('click',()=>{
    window.location.reload();
});

function br(){
    audio3.play()
    audio3.loop = true
    audio3.volume= 0.1;
}

