
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idJue1').style.display = 'none';
    document.getElementById('idJue2').style.display = 'none';
    document.getElementById('idJue3').style.display = 'none';
    document.getElementById('idJue4').style.display = 'none';
    
    
    let razon2 = document.getElementById("idRa2");
    let razon3 = document.getElementById("idRa3");
    let razon4 = document.getElementById("idRa4");
    let razon1 = document.getElementById("idBotRa1");
        razon1.disabled = true;
        razon2.disabled = true;
        razon3.disabled = true;
        razon4.disabled = true;
    let hab = false;
    let hab3 = false;
    let startMemoria;
        inicio();
        Flap();
        Minesweeper();
        
        
        
});

function inicio() {





    document.getElementById('idBotJue1').addEventListener('click', function(){
    document.getElementById('idJue1').style.display = 'block';
    document.getElementById('idJue2').style.display = 'none';
    document.getElementById('idJue3').style.display = 'none';
    document.getElementById('idJue4').style.display = 'none';
    blackjack();

  });
  document.getElementById('idBotJue2').addEventListener('click', function(){
    document.getElementById('idJue2').style.display = 'block';
    document.getElementById('idJue1').style.display = 'none';
    document.getElementById('idJue3').style.display = 'none';
    document.getElementById('idJue4').style.display = 'none';
    hab = true;
  }); 
   document.getElementById('idBotJue3').addEventListener('click', function(){
    document.getElementById('idJue1').style.display = 'none';
    document.getElementById('idJue2').style.display = 'none';
    document.getElementById('idJue4').style.display = 'none';
    document.getElementById('idJue3').style.display = 'block';
    Memoria();
  }); 
  document.getElementById('idBotJue4').addEventListener('click', function(){
    document.getElementById('idJue1').style.display = 'none';
    document.getElementById('idJue2').style.display = 'none';
    document.getElementById('idJue3').style.display = 'none';
    document.getElementById('idJue4').style.display = 'block';
  }); 
  
}

function blackjack() {
  let dealerSum = 0;
  let yourSum = 0;
  let dealerAceCount = 0;
  let yourAceCount = 0;
  let hiddenCard = null;
  let deck = [];
  let gameOver = false;

  const dealerCardsEl = document.getElementById("dealer-cards");
  const yourCardsEl = document.getElementById("your-cards");
  const hitBtn = document.getElementById("hit");
  const stayBtn = document.getElementById("stay");
  const dealerSumEl = document.getElementById("dealer-sum");
  const yourSumEl = document.getElementById("your-sum");
  const resultsEl = document.getElementById("results");

  const btnReint = document.getElementById("idInt1");
  const btnVolver = document.getElementById("idVolver1");
  const btnComp = document.getElementById("idComp1");
  const btnOpen = document.getElementById("idBotJue1");
  const razon1 = document.getElementById("idBotRa1");

  const winAudio = new Audio("./sonido/win.mp3");
  const failAudio = new Audio("./sonido/Bonk.mp3");

  const pInstr =
    document.getElementById("idInstrBJ") ||
    Array.from(document.querySelectorAll("p")).find(p =>
      p.textContent && p.textContent.includes("Ganale al dealer")
    );

  function buildDeck() {
    const v = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    const t = ["C","D","H","S"];
    deck = [];
    for (let x of t) for (let y of v) deck.push(y + "-" + x);
  }

  function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function val(c) {
    const v = c.split("-")[0];
    if (v === "A") return 11;
    if (v === "J" || v === "Q" || v === "K") return 10;
    return parseInt(v);
  }

  function isAce(c) {
    return c[0] === "A";
  }

  function fix(sum, aces) {
    while (sum > 21 && aces > 0) {
      sum -= 10;
      aces--;
    }
    return sum;
  }

  function img(c) {
    const i = document.createElement("img");
    i.src = "./img/B-cards/" + c + ".png";
    return i;
  }

  function clear() {
    dealerCardsEl.innerHTML = "";
    yourCardsEl.innerHTML = "";
    dealerSumEl.innerText = "";
    yourSumEl.innerText = "";
    resultsEl.innerText = "";
  }

  function revealHidden() {
    const h = document.getElementById("hidden");
    if (h && hiddenCard) h.src = "./img/B-cards/" + hiddenCard + ".png";
  }

  function setLose() {
    gameOver = true;
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    btnReint.disabled = false;
    btnComp.disabled = true;
    failAudio.currentTime = 0;
    failAudio.play();
  }

  function setWin() {
    gameOver = true;
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    btnReint.disabled = true;
    btnComp.disabled = true;
    if (razon1) razon1.disabled = false;
    winAudio.currentTime = 0;
    winAudio.play();
  }

  function start() {
    clear();
    buildDeck();
    shuffle();

    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    hiddenCard = null;
    gameOver = false;

    const h = document.createElement("img");
    h.id = "hidden";
    h.src = "./img/B-cards/BACK.png";
    dealerCardsEl.append(h);

    hiddenCard = deck.pop();
    dealerSum += val(hiddenCard);
    if (isAce(hiddenCard)) dealerAceCount++;

    const d = deck.pop();
    dealerSum += val(d);
    if (isAce(d)) dealerAceCount++;
    dealerCardsEl.append(img(d));

    for (let i = 0; i < 2; i++) {
      const c = deck.pop();
      yourSum += val(c);
      if (isAce(c)) yourAceCount++;
      yourCardsEl.append(img(c));
    }

    yourSumEl.innerText = fix(yourSum, yourAceCount);

    hitBtn.disabled = false;
    stayBtn.disabled = false;
    btnReint.disabled = true;
    btnComp.disabled = false;

    if (pInstr) pInstr.innerText = "Ganale al dealer (no te pases de 21) y al final ganas un premio :D";
  }

  function dealerPlay() {
    while (fix(dealerSum, dealerAceCount) < 17) {
      const c = deck.pop();
      dealerSum += val(c);
      if (isAce(c)) dealerAceCount++;
      dealerCardsEl.append(img(c));
    }
  }

  function finalize() {
    revealHidden();

    dealerSum = fix(dealerSum, dealerAceCount);
    yourSum = fix(yourSum, yourAceCount);

    dealerSumEl.innerText = dealerSum;
    yourSumEl.innerText = yourSum;

    if (yourSum > 21) {
      resultsEl.innerText = "You Lose!";
      setLose();
      return;
    }

    if (dealerSum > 21) {
      resultsEl.innerText = "You Win!";
      setWin();
      return;
    }

    if (yourSum === dealerSum) {
      resultsEl.innerText = "Tie!";
      setLose();
      return;
    }

    if (yourSum > dealerSum) {
      resultsEl.innerText = "You Win!";
      setWin();
      return;
    }

    resultsEl.innerText = "You Lose!";
    setLose();
  }

  hitBtn.onclick = function () {
    if (gameOver) return;
    const c = deck.pop();
    yourSum += val(c);
    if (isAce(c)) yourAceCount++;
    yourCardsEl.append(img(c));
    yourSumEl.innerText = fix(yourSum, yourAceCount);
    if (fix(yourSum, yourAceCount) > 21) finalize();
  };

  stayBtn.onclick = function () {
    if (gameOver) return;
    dealerPlay();
    finalize();
  };

  btnReint.onclick = start;

  btnComp.onclick = function () {
    if (btnComp.disabled) return;
    gameOver = true;
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    btnReint.disabled = true;
    btnComp.disabled = true;
    if (razon1) razon1.disabled = false;
    if (pInstr) pInstr.innerText = "Bien gordiiiiii";
    resultsEl.innerText = "Completado.";
    winAudio.currentTime = 0;
    winAudio.play();
  };

  btnVolver.onclick = function () {
    gameOver = true;
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    btnReint.disabled = true;
    btnComp.disabled = true;

    document.getElementById("idJue1").style.display = "none";
    document.getElementById("idInfoGen").style.display = "block";

    if (btnOpen) btnOpen.disabled = true;
  };

  start();
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
    let tarj1Sel;
    let tarj2Sel;
    let paresHechos = 0;
    let totalPares = (filasC * columnasC) / 2;
    let maxErrores = 15;
    let bloqueado = false;
    let cartasAcertadas = new Set(); 
    let audFail = new Audio("./sonido/Bonk.mp3");
    let audWin = new Audio("./sonido/win.mp3");

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
    if(cartasAcertadas.has(this.id)) return;
    if(this.src.includes('back.jpg')){
        if(!tarj1Sel) {
            tarj1Sel = this;
            let coord = tarj1Sel.id.split('-');
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);
            tarj1Sel.src = './img/cards/' + tablaC[r][c] + ".jpg";

        }
        else if (!tarj2Sel && this != tarj1Sel){
            tarj2Sel = this;
            let coord = tarj2Sel.id.split('-');
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);
            tarj2Sel.src = './img/cards/' + tablaC[r][c] + ".jpg";

            setTimeout(act, 1000);
        } 
    }
}

function act() {
    if(tarj1Sel.src != tarj2Sel.src) {
        tarj1Sel.src = './img/cards/back.jpg';
        tarj2Sel.src = './img/cards/back.jpg';
        errores += 1;
        document.getElementById('idErrores').innerText = errores;

        if (errores >= 15) {
            finJuego(false);
        }
    } else {
        paresHechos += 1;
        if (paresHechos === (filasC * columnasC) / 2) {
            finJuego(true);
        }

    }


    tarj1Sel = null;
    tarj2Sel = null;

}

function finJuego(gano) {
    for (let f = 0; f < filasC; f++) {
        for (let c = 0; c < columnasC; c++) {
            let carta = document.getElementById(f + '-' + c);
            carta.style.pointerEvents = 'none';
        }
    }
    if (gano) {
        audWin.play();
        document.getElementById('idErrores').innerText = "BIEN PUCHIIII TODO ENCONTRADITOOO";
        razon3.disabled = false;
    } 
    else {
        audFail.play();
        alert("Vamos gordi que podes, yo confio!!!!!");
    }
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