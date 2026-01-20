window.addEventListener("load", inicio(document.addEventListener('DOMContentLoaded', function () {
    let esta1 = false;
    let razon2 = document.getElementById("idRa2");
        razon2.disabled = true;
            Flap();
})));
function inicio() {
}
function trivia(){

}
function Flap() {
    let razon2 = document.getElementById("idRa2");
    razon2.disabled = true;
    let paso2 = false;
    if (paso2){
       razon2.disabled = false;
    }
    let board = document.getElementById("idCanvas");
    let boardWidth = 360;
    let boardHeight = 640;
    let context;
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    let santiWidth = 44;
    let santiHeight = 44;
    let santiX = boardWidth / 8;
    let santiY = boardHeight / 2;
    let santiIMG;
    let santiM = new Image();
    santiM.src = "./img/dead.png"
    santiIMG = new Image();
    santiIMG.src = "./img/still.png";
    santiIMG.onload = function () {
        context.drawImage(santiIMG, santiX, santiY, santiWidth, santiHeight);
    };
    let santi = {
        x : santiX,
        y : santiY,
        width: santiWidth,
        height: santiHeight
    };
    //game
    let empJuego = false;
    let terJuego = false;
    let terJuegoG = false;
    let score = 0;
    //pipes
    let pipeArray = [];
    let pipeWidth = 64;
    let pipeHeight = 512;
    let pipeX = boardWidth;
    let pipeY = 0;
    let topPipeImg = new Image();
    topPipeImg.src = "./img/toppipe.png";
    let botPipeImg = new Image();
    botPipeImg.src = "./img/bottompipe.png";
    //fisica 
    let velocityX = -2;
    let velocityY = 0;
    let gravity = 0.2;
    //sonidos
    let flapAudio = new Audio("./sonido/Jumping.mp3");
    let dieAudio = new Audio("./sonido/ouch.mp3");
    let musicaFla = new Audio("./sonido/Carefree.mp3");
    let puntoAudio = new Audio("./sonido/punto.wav");
    let ganar = new Audio("./sonido/win.mp3")
    musicaFla.loop = true;
    let suena = false;
    document.getElementById("idMusFla").addEventListener("click", function(){
        if(suena){
            musicaFla.pause();
            musicaFla.currentTime = 0;
        } else {
            musicaFla.play();
        }
        suena = !suena;
    })
    function update() {
        if(empJuego){
            if(terJuego || terJuegoG){
                return;
            }
            requestAnimationFrame(update);
            context.clearRect(0, 0, board.width, board.height); 
            //Yo
            velocityY += gravity;
            santi.y = Math.max(santi.y + velocityY, 0);
            context.drawImage(santiIMG, santi.x, santi.y, santi.width, santi.height);
            if(santi.y > board.height){
                terJuego = true;
                dieAudio.play();
            }
            //pipes
            for (let i = 0; i < pipeArray.length; i++) {
                let pipe = pipeArray[i];
                pipe.x += velocityX;
                context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
                if(!pipe.passed && santi.x > pipe.x + pipe.width){
                    score += 0.5;
                    pipe.passed = true;
                    puntoAudio.currentTime = 0;
                    puntoAudio.play();
                }
                if(score == 10){
                    terJuegoG = true;
                    ganar.play();
                }else{
                    if(detectCol(santi, pipe)){
                        terJuego = true;
                        dieAudio.play();
                    }
                }
                  
            }
            while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
                pipeArray.shift();
            }
            context.fillStyle = "white";
            context.font = "45px sans-serif";
            context.fillText(score, 5, 45);
            if (terJuego) {
                context.drawImage(santiM, santi.x, santi.y, santi.width, santi.height);
                btn.disabled = false;   
                context.fillText("Vamos Amochi :)", 1, 90);
                return;
            }
            if(terJuegoG){
                btn.disabled = false;
                context.fillText("BIENNN", 1, 90);
                paso2 = true;
                razon2.disabled = false;
                return;
            }
        } 
    }
    function placePipes() {
        if(terJuego || terJuegoG){
            return;
        }
        let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
        let openingSpace = board.height/3.5;
        let topPipe = {
            img: topPipeImg,
            x: pipeX,
            y: randomPipeY,
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        };
        let bottomPipe = {
            img: botPipeImg,
            x: pipeX,
            y: randomPipeY + pipeHeight + openingSpace, 
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        };
        pipeArray.push(topPipe);
        pipeArray.push(bottomPipe);
    }
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveS);
    let btn = document.getElementById("idInt");
    btn.disabled = true; 
    btn.addEventListener("click", function(){
    if (terJuego || terJuegoG) {
        santi.y = santiY;
        santiIMG.src = "./img/still.png";
        pipeArray = [];
        score = 0;
        terJuego = false;
        terJuegoG = false;
        empJuego = false;
        context.clearRect(0, 0, board.width, board.height);
        context.drawImage(santiIMG, santi.x, santi.y, santi.width, santi.height);
        btn.disabled = true; 
    }
});  
    function moveS(e) {
        if (e.code == "KeyX") {
            if (!empJuego) {
                empJuego = true;
                terJuego = false;
                velocityY = -6;
                pipeArray = []; 
                let allIntervals = setInterval(() => {}, 1000); 
                while (allIntervals--) clearInterval(allIntervals);
                requestAnimationFrame(update);
                setInterval(placePipes, 1500); 
            } else {
                if(!terJuego){
                    flapAudio.currentTime = 0;
                    flapAudio.play();
                }
                velocityY = -6; 
            }
        }
    }
function detectCol(a, b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
}
function memoria(){

}
function minesweeper (){

}