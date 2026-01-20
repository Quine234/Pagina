//Santiago Quinelli (307870) y Nicholas Davies (282236)

window.addEventListener("load", inicio);
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});

let general = new General();

function inicio (){
    document.getElementById("idDescripcion").style.display='block';
    document.getElementById("idGestion").style.display='none';
    document.getElementById("idJugar").style.display='none';
    document.getElementById("idAJugar").style.display="none";
    document.getElementById("idLinkG").addEventListener("click", hide);
    document.getElementById("idLinkD").addEventListener("click", hide);
    document.getElementById("idLinkJ").addEventListener("click", hide);
    document.getElementById("idBot").addEventListener("click", agregarTema);
    document.getElementById('idBotResp').addEventListener('click', agregarPregunta);
    document.getElementById('idBotJugar').addEventListener('click', trivia);
    document.getElementById('idRadio1').addEventListener('click', ordenarTabla);
    document.getElementById('idRadio2').addEventListener('click', ordenarTabla);  
}

function hide (event){
    if(event.target.id === 'idLinkD'){
        document.getElementById("idDescripcion").style.display='block';
        document.getElementById("idGestion").style.display='none';
        document.getElementById("idJugar").style.display='none';
        document.getElementById("idAJugar").style.display="none";
        document.getElementById('idBotJugar').disabled = false;
        document.getElementById('idBotJugar').hidden = false;
        document.getElementById('idElegir').disabled = false;
        document.getElementById('idNumNiv').disabled = false;
    } else if(event.target.id === 'idLinkG'){
        document.getElementById("idDescripcion").style.display='none';
        document.getElementById("idGestion").style.display='block';
        document.getElementById("idJugar").style.display='none';
        document.getElementById("idAJugar").style.display="none";
        document.getElementById('idFormGest').reset();
        document.getElementById('idFormPreg').reset();
        document.getElementById('idBotJugar').disabled = false;
        document.getElementById('idBotJugar').hidden = false;
        document.getElementById('idElegir').disabled = false;
        document.getElementById('idNumNiv').disabled = false;
    } else if(event.target.id === 'idLinkJ'){
        document.getElementById("idDescripcion").style.display='none';
        document.getElementById("idGestion").style.display='none';
        document.getElementById("idJugar").style.display='block';
        document.getElementById("idAJugar").style.display="none";
        document.getElementById('idFormJug').reset();
        document.getElementById('idBotJugar').disabled = false;
        document.getElementById('idBotJugar').hidden = false;
        document.getElementById('idElegir').disabled = false;
        document.getElementById('idNumNiv').disabled = false;
        
    }
}



function agregarTema(){
    if(document.getElementById('idFormGest').reportValidity()){
        let nom = document.getElementById('idTextoNom').value;
        let desc = document.getElementById('idTextoDesc').value;
        let col = colorAlAzar();
        if(general.temaRepetido(nom)){
            alert('No se puede ingresar el tema, ya esta ingresado');
            document.getElementById('idFormGest').reset();
        }else{
            let tem = new tema(nom, desc, col);
            general.agregarTema(tem);
            document.getElementById("idFormGest").reset();
            cargarListaTemas();
            cargarComboTemas();
            cargarComboTemas2();
            cargarSin();
            numeros();
        }
        let linea = document.getElementById('idLinea');
        linea.innerHTML= 'Lista de temas (total de temas:' + general.listaTemas.length + ")";
    }
}

function cargarDatos() {
    let userResponse = confirm("¿Desea cargar datos?");
    if (userResponse) {
        for (let i = 0; i < preguntas.length; i++) {
            let t = preguntas[i].tema;
            if (!general.temaRepetido(t.nombre)) {
                let col = colorAlAzar();
                let tem = new tema(t.nombre, t.descripcion, col);
                general.agregarTema(tem);
            }
            let temaEncontrado = general.buscarTema(t.nombre);
            let preg = new pregunta(preguntas[i].texto, preguntas[i].respuestaCorrecta, preguntas[i].respuestasIncorrectas, preguntas[i].nivel, temaEncontrado);
            general.agregarPregunta(preg);
            
        }
    } else {
       
    }
    let texto = document.getElementById('idTotPreg')
    texto.innerHTML = 'Total de preguntas registradas: '+ general.listaPreguntas.length + ' pregunta/s'
    let linea = document.getElementById('idLinea');
    linea.innerHTML= 'Lista de temas (total de temas:' + general.listaTemas.length + ")";
    numeros();
    cargarListaTemas();
    cargarComboTemas();
    cargarComboTemas2();
    cargarSin();
    cargarTabla();
    ordenarTabla();
}

function colorAlAzar(){
    let r = Math.floor(Math.random() * (255 - 139 + 1)) + 139; 
    let g = Math.floor(Math.random() * (255 - 69 + 1)) + 69;   
    let b = Math.floor(Math.random() * 20);                     
    return `rgb(${r},${g},${b})`;
}

    function cargarListaTemas(){
        let lista = document.getElementById("idListaT");
        lista.innerHTML = "";
        for (let tema of general.ordenarTemas()){
            let nodo = document.createElement("li");
            nodo.innerHTML = tema.nombre +': ' + tema.descripcion;
            lista.appendChild(nodo);
        }
    }
    function cargarComboTemas(){
        let combo = document.getElementById("idSelTem");
        combo.innerHTML = '';
        for (let tema of general.ordenarTemas()){
            let nodo = document.createElement("option");
            nodo.innerHTML = tema.nombre;
            combo.appendChild(nodo);
        }
    }

    function cargarComboTemas2(){
        let combo = document.getElementById("idElegir");
        combo.innerHTML = '';
        for (let tema of general.ordenarTemas()){
            let nodo = document.createElement("option");
            nodo.innerHTML = tema.nombre;
            combo.appendChild(nodo)
        }
    }
    function cargarSin(){
        let lista = document.getElementById('idListaSin');
        lista.innerHTML = "";
        let vacia = false;
        for(let tema of general.listaTemas){
            if(!general.tienePregunta(tema.nombre)){
                let nodo = document.createElement('li');
                nodo.innerHTML = tema.nombre
                lista.appendChild(nodo);
                vacia = true;
                } 
            }
            if(!vacia){
                let nodo =  document.createElement('li');
                nodo.innerHTML = 'Sin Datos';
                lista.appendChild(nodo);
            }
            
           
        }
    
        function agregarPregunta(){
        if(document.getElementById('idFormPreg').reportValidity()){
            let nom = document.getElementById('idTextPreg').value;
            let resp = document.getElementById('idRespC').value;
            let inco = document.getElementById('idRespI').value;
            let inc = inco.split(',');
            let niv = parseInt(document.getElementById('idNivel').value);
            let indiceTem = document.getElementById('idSelTem').selectedIndex
            let nombreTema =  document.getElementById('idSelTem')[indiceTem].value;
            let tem = general.buscarTema(nombreTema);
            if(Number.isNaN(niv) || niv > 5 || niv < 1){
                alert("El valor del nivel no es valido")
                document.getElementById('idFormPreg').reset();
            }
                else{
                    if(general.preguntaRepetida(nom)){
                        alert('No se pudo registrar la pregunta, ya existe')
                       
                    }else{
                        let preg = new pregunta(nom, resp, inc, niv, tem);
                        general.agregarPregunta(preg);
                        document.getElementById('idFormPreg').reset();
                        ordenarTabla();
                        cargarTabla();
                        numeros();
                        
                    }
            }
            let texto = document.getElementById('idTotPreg')
            texto.innerHTML = 'Total de preguntas registradas: '+ general.listaPreguntas.length + ' pregunta/s'
            cargarSin();
        }
    }

    
function numeros(){
    let calc = (general.listaPreguntas.length / general.listaTemas.length);
    let prom = document.getElementById('idProm');
    if(general.listaPreguntas.length === 0){
        prom.innerHTML = 'Promedio de preguntas por tema (cantidad total de preguntas / cantidad total de temas): Sin Datos';
    }else{
        prom.innerHTML = 'Promedio de preguntas por tema (cantidad total de preguntas / cantidad total de temas): ' + calc.toFixed(2);
    }
 }
 
 function ordenarTabla(){
    if(document.getElementById('idRadio1').checked){
        general.listaPreguntas.sort((a, b) => {
            if (a.tema.nombre.toUpperCase() < b.tema.nombre.toUpperCase()) 
                return -1;
            if (a.tema.nombre.toUpperCase() > b.tema.nombre.toUpperCase()) 
                return 1;
            return a.nivel - b.nivel;
        });
    } else if (document.getElementById('idRadio2').checked){
        general.listaPreguntas.sort((a, b) => {
            if (a.tema.nombre.toUpperCase() > b.tema.nombre.toUpperCase()) 
                return -1;
            if (a.tema.nombre.toUpperCase() < b.tema.nombre.toUpperCase()) 
                return 1;
            return b.nivel - a.nivel;
        });
    }
    cargarTabla();
}
   

function cargarTabla(){
    let tabla = document.getElementById('idBody');
    tabla.innerHTML = '';
    for(let pregunta of general.listaPreguntas){
        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        let celda4 = fila.insertCell();
        let celda5 = fila.insertCell();
        celda1.innerHTML= pregunta.tema.nombre;
        celda2.innerHTML= pregunta.nivel;
        celda3.innerHTML= pregunta.texto;
        celda4.innerHTML= pregunta.respuesta;
        celda5.innerHTML = pregunta.incorrectas;
        fila.style.background = pregunta.tema.color;
        fila.style.textAlign = 'center';
        celda1.style.border = '0.5px solid #000000';
        celda2.style.border = '0.5px solid #000000';
        celda3.style.border = '0.5px solid #000000';
        celda4.style.border = '0.5px solid #000000';
        celda5.style.border = '0.5px solid #000000';
    }

}


const gameState = {
    preguntasNiv: [],
    currentQuestionIndex: 0,
    punt: 0,
    max: 0,
    tema: '',
    nivel: 0,
};

function trivia() {
    if (document.getElementById('idFormJug').reportValidity()) {
        let niv = parseInt(document.getElementById('idNumNiv').value);
        if (Number.isNaN(niv) || niv > 5 || niv < 1) {
            alert("El valor del nivel no es valido");
            document.getElementById('idFormJug').reset();
        } else {
            let selectedTopicIndex = document.getElementById('idElegir').selectedIndex;
            let selectedTopicName = document.getElementById('idElegir')[selectedTopicIndex].value;
            gameState.preguntasNiv = general.listaPreguntas.filter(pregunta => 
                pregunta.nivel === niv && pregunta.tema.nombre === selectedTopicName
            );
            gameState.preguntasNiv.sort(() => Math.random() - 0.5);
            gameState.nivel = niv;
            gameState.tema = selectedTopicName;
            if (gameState.preguntasNiv.length === 0) {
                alert("No hay preguntas de ese nivel para el tema seleccionado");
            } else {
                gameState.currentQuestionIndex = 0;
                document.getElementById('idAJugar').style.display = 'block';
                loadQuestion();
                document.getElementById('idBotJugar').disabled = true;
                document.getElementById('idBotJugar').hidden = true;
                document.getElementById('idElegir').disabled = true;
                document.getElementById('idNumNiv').disabled = true;
                document.getElementById('idLinkG').disabled = true;
            }
        }
    }
}

function loadQuestion() {
    let tabla = document.getElementById('idTablaJugar');
    tabla.innerHTML = '';
    let siguienteBtn = document.getElementById('idSig');

    if (gameState.currentQuestionIndex >= gameState.preguntasNiv.length) {
        siguienteBtn.disabled = true;
        return;
    } else {
        siguienteBtn.disabled = false;
    }

    let pregunta = gameState.preguntasNiv[gameState.currentQuestionIndex];
    let answers = [pregunta.respuesta].concat(pregunta.incorrectas);
    answers.sort(() => Math.random() - 0.5);
    let preguntaRow = tabla.insertRow();
    let preguntaCell = preguntaRow.insertCell();
    preguntaCell.innerHTML = pregunta.texto;

    let botonesDiv = document.getElementById('idBotones');
    botonesDiv.innerHTML = '';
    answers.forEach((answer, index) => {
        let button = document.createElement('input');
        button.type = 'button';
        button.value = answer;
        button.id = `idResp${index + 1}`;
        button.onclick = () => handleAnswerClick(button, answer, pregunta.respuesta);
        botonesDiv.appendChild(button);
        applyButtonStyles(button, index + 1, pregunta.tema.color);
    });

    tabla.style.background = pregunta.tema.color;

    document.getElementById('idTerm').onclick = () => {
        document.getElementById('idAJugar').style.display = 'none';
        alert('Juego terminado, puntaje final ' + gameState.punt);
        gameState.punt = 0;
        gameState.currentQuestionIndex = 0;
        document.getElementById('idPunt').innerHTML = 'Puntaje acumulado esta partida: ' + gameState.punt;
        document.getElementById('idFormJug').reset();
        document.getElementById('idBotJugar').disabled = false;
        document.getElementById('idBotJugar').hidden = false;
        document.getElementById('idElegir').disabled = false;
        document.getElementById('idNumNiv').disabled = false;
        
    };

    document.getElementById('idAyuda').onclick = () => {
        let respuesta = pregunta.respuesta; 
        let primerCaracter = respuesta.charAt(0); 
        alert('La respuesta empieza por: ' + primerCaracter);
    };

    siguienteBtn.onclick = () => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    };

    if (gameState.currentQuestionIndex === gameState.preguntasNiv.length - 1) {
        siguienteBtn.disabled = true;
    }
}

function applyButtonStyles(button, index, color) {
    button.style.backgroundColor = color;
    button.style.color = 'white';
    button.style.border = 'solid white';
    button.style.height = '40px';
    button.style.width = '120px';
    button.style.margin = '0 10px';
    button.onmouseover = () => button.style.backgroundColor = lightenColor(color, 30);
    button.onmouseout = () => button.style.backgroundColor = color;
    button.onmousedown = () => {
        button.style.backgroundColor = color;
        button.style.color = 'white';
    };
}

function lightenColor(color, percent) {
    let [r, g, b] = color.match(/\d+/g).map(Number);
    r = Math.min(255, r + (255 - r) * percent / 100);
    g = Math.min(255, g + (255 - g) * percent / 100);
    b = Math.min(255, b + (255 - b) * percent / 100);
    return `rgb(${r},${g},${b})`;
}
function handleAnswerClick(button, selectedAnswer, correctAnswer) {
    let botonesDiv = document.getElementById('idBotones');
    let buttons = botonesDiv.getElementsByTagName('input');
    let puntT = document.getElementById('idPunt');
    let maxT = document.getElementById('idMax');

    if (selectedAnswer === correctAnswer) {
        let audio = new Audio('sonido/correcto.mp3');
        audio.play();
        gameState.punt += 10;
        button.style.backgroundColor = 'green';
        for (let btn of buttons) {
            btn.disabled = true;
        }
    } else {
        let audio = new Audio('sonido/error.mp3');
        audio.play();
        gameState.punt -= 1;
        button.disabled = true;
        button.style.backgroundColor = 'red';
    }
    button.onmouseover = button.onmouseout = button.onmousedown = button.onmouseup = null;
    puntT.innerHTML = 'Puntaje acumulado esta partida: ' + gameState.punt;

    if (gameState.punt > gameState.max) {
        gameState.max = gameState.punt;
        maxT.innerHTML = 'Maximo puntaje obtenido por un jugador: ' + gameState.max;
    }

}