
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idJue2').style.display = 'none';
    document.getElementById('idJue4').style.display = 'none';
    
    
    let razon2 = document.getElementById("idRa2");
    let razon4 = document.getElementById("idRa4");
        razon2.disabled = true;
        razon4.disabled = true;
    let hab = false;
        inicio();
        Flap();
        Minesweeper();
        Memoria();
        
});

function inicio() {
  document.getElementById('idBotJue2').addEventListener('click', function(){
    document.getElementById('idJue2').style.display = 'block';
    hab = true;
  }); 
  document.getElementById('idBotJue4').addEventListener('click', function(){
    document.getElementById('idJue4').style.display = 'block';
  }); 
  
}
function trivia(){

}


//DONE FOR NOW NEEDS VOLVER
function Flap() {
    let razon2 = document.getElementById("idRa2");
    razon2.disabled = true;
    let paso2 = false;
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

let btnC = document.getElementById("idCompletar");
btnC.addEventListener('click', function(){
    if(terJuego || terJuegoG) return;

    terJuegoG = true;
    terJuego = false;

    ganar.currentTime = 0;
    ganar.play();

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText("BIENNN", 1, 90);

    paso2 = true;
    razon2.disabled = false;
    btn.disabled = true;

});

    function moveS(e) {
        if(!hab) return;

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


function Memoria(){
    let razon3 = document.getElementById("idRa3");
    razon3.disabled = true;

    let errores = 0;

    let listaC = [
        "darkness",
        "double",
        "fairy",
        "fighting",
        "fire",
        "grass",
        "lightning",
        "metal",
        "psychic",
        "water"
    ]

    let setC;
    let tablaC = [];
    let filasC = 4;
    let columnasC = 5;

        barajar();
        empJue3();
    

    function barajar (){
        setC = listaC.concat(listaC);
        
        for(let i = 0; i < setC.length; i++){
            let j = Math.floor(Math.random() * setC.length);

            let temp = setC[i]
            setC[i] = setC [j];
            setC[j] = temp;
        
        }
    }

    function empJue3() {
        for(let f = 0; f < filasC; f++){
            let filaC = [];
            for(let c = 0; c < columnasC; c++){
                let cartaImg = setC.pop();
                filaC.push(cartaImg);

                let carta = document.createElement('img');
                carta.id = f.toString() + '-' + c.toString();
                carta.src = './img/cards/' + cartaImg + '.jpg'
                carta.classList.add('carta');
                carta.addEventListener('click', selecC);
                document.getElementById('idTabla').append(carta);
            }
            tablaC.push(filaC);
        }
        setTimeout(escCart, 3000);
    }

    function escCart(){
        for(let f = 0; f < filasC; f++){
            for(let c = 0; c < columnasC; c++){
                let carta = document.getElementById(f.toString() + '-' + c.toString());
                carta.src = './img/cards/back.jpg'
            }
        }
    }

function selecC(){
    if(this.src.includes('./img/cards/back.jpg')){}
}





}



//DONE FOR NOW NEEDS VOLVER
function Minesweeper (){
let razon4 = document.getElementById("idRa4");
razon4.disabled = true;
let paso4 = false; 
if(paso4){
    razon4.disabled = false;
}


let audFail = new Audio("./sonido/Bonk.mp3");
let audWin = new Audio("./sonido/win.mp3");
let tabla = [];
let filas = 8; 
let columnas = 8;

let contMin = 5;
let locMin = [];

let tileClick = 0;
let bandPer = false;

let finJue4 = false;

const btn = document.getElementById('idBotJue4');
btn.addEventListener('click', empJue4);
    


function ponerMin() {
 let minasRes = contMin;
 while(minasRes > 0){
    let i = Math.floor(Math.random() * filas);
    let j = Math.floor(Math.random() * columnas);
    let id = i.toString() + '-' + j.toString();

    if(!locMin.includes(id)){
        locMin.push(id);
        minasRes -= 1;
    }
 }
}

function empJue4(){
    document.getElementById("idCuentaMinas").innerText = contMin;
    document.getElementById('idBotonBandera').addEventListener('click', ponBandera);
    document.getElementById('idBotComp4').addEventListener('click', compJuego4);
    document.getElementById('idInt4').addEventListener('click', reInt);
    ponerMin();


    for(let i=0; i<filas; i++){
        let fila = [];
        for(let j=0; j<columnas; j++){
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            tile.addEventListener('click', apretarT)
            document.getElementById('idDivTabMin').append(tile);
            fila.push(tile);
        }
        tabla.push(fila);
    }
}


function ponBandera() {
    if(bandPer){
        bandPer = false;
        document.getElementById('idBotonBandera').style.backgroundColor = 'lightgray'
    }
    else {
        bandPer = true;
        document.getElementById('idBotonBandera').style.backgroundColor = 'darkgray'
    }
}

function apretarT(){
    if(finJue4 || this.classList.contains('tileElegida')){
        return;
    }

    let tile = this;
    if(bandPer){
        if(tile.innerText == ""){
            tile.innerText =  "🚩";
        }
        else if(tile.innerText == "🚩"){
            tile.innerText = "";
        }
        return;
    }
    if(locMin.includes(tile.id)){
        let btn = document.getElementById('idBotComp4');
        btn.disabled = true;
        audFail.play();
        alert("Vamos Puchi, Vos podes. Te amo.");
        finJue4 = true;
        mostrarMin();
        return;
    }
    let coords = tile.id.split('-');
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);
    checkMina(i, j);



}


function mostrarMin(){
    for(let i=0; i<filas; i++){
        for(let j=0; j<columnas; j++){
            let tile = tabla[i][j];
            if(locMin.includes(tile.id)){
                tile.innerText = '💣';
                tile.style.backgroundColor = "red";
            }
        }
    }
}



function checkMina(i, j) {
    if (i<0 || i>= filas || j< 0 || j>= columnas){
        return;
    }
    if(tabla[i][j].classList.contains('tileElegida')){
        return;
    }
    tabla[i][j].classList.add('tileElegida');
    tileClick += 1;


    let encont = 0;

    //arriba
    encont += fijartT(i-1, j-1);
    encont += fijartT(i-1, j);
    encont += fijartT(i-1, j+1);
    
    //misma fila
    encont += fijartT(i, j-1);
    encont += fijartT(i, j+1);

    //abajo
    encont += fijartT(i+1, j-1);
    encont += fijartT(i+1, j);
    encont += fijartT(i+1, j+1);

    if (encont > 0){
        tabla[i][j].innerText = encont;
        tabla[i][j].classList.add('x' + encont.toString());
    }
    else{
        //todos arriba
        checkMina(i-1, j-1);
        checkMina(i-1, j);
        checkMina(i-1, j+1);

        //medio
        checkMina(i, j-1);
        checkMina(i, j+1);

        //abajo
        checkMina(i+1, j-1);
        checkMina(i+1, j);
        checkMina(i+1, j+1);
       
    }

    if(tileClick == filas * columnas - contMin) {
        audWin.play();
        document.getElementById('idCuentaMinas').innerText = 'Listo. Bien puchiii!';
        let btnR = document.getElementById('idInt4') ;
        btnR.disabled = true;
        let btn = document.getElementById('idBotComp4');
        btn.disabled = true;
        finJue4 = true;
        paso4 = true;
        razon4.disabled = false;
        
    }
   

}


function fijartT(i, j){
    if (i<0 || i>= filas || j< 0 || j>= columnas){
        return 0;
    }
    if(locMin.includes(i.toString() + '-' + j.toString())){
        return 1;
    }

return 0;
}

function compJuego4(){
    audWin.play();
    finJue4 = true;
    paso4 = true;
    razon4.disabled = false;
    mostrarMin();
    document.getElementById('idCuentaMinas').innerText = 'Listo. Bien puchiii!';
    let btn = document.getElementById('idBotComp4');
    btn.disabled = true;
    
}

function reInt(){
finJue4 = true;

tileClick = 0;
bandPer = false;
document.getElementById('idBotonBandera').style.backgroundColor = 'lightgray';

locMin = [];
tabla = [];

const cont = document.getElementById('idDivTabMin');
cont.innerHTML = "";

document.getElementById("idCuentaMinas").innerText = contMin;

ponerMin();

for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            tile.addEventListener('click', apretarT);
            cont.append(tile);
            fila.push(tile);
        }
        tabla.push(fila);
    }

    finJue4 = false;
    let btn = document.getElementById('idBotComp4');
    btn.disabled = false;
}
}