//Santiago Quinelli (307870) y Nicholas Davies (282236)
class tema {
    constructor(nom, desc, color){
        this.nombre = nom;
        this.descripcion = desc;
        this.color = color;
    }
}

class pregunta {
    constructor (tex, resp, inc, niv, tem){
        this.tema = tem;
        this.nivel = niv;
        this.texto = tex;
        this.respuesta = resp;
        this.incorrectas = inc;
    }


}


class General {
    constructor() {
        this.listaTemas = [];
        this.listaPreguntas = [];
    }
    agregarTema(tema){
        this.listaTemas.push(tema);
    }
    ordenarTemas(){
        return this.listaTemas.sort(function(a,b){
            return a.nombre.localeCompare(b.nombre);
        });
    }
   temaRepetido(nom){
    let rep = false;
    for(let i = 0 ; i < this.listaTemas.length && !rep ; i++){
        if(this.listaTemas[i].nombre.toUpperCase() == nom.toUpperCase()){
            rep = true;
        }
    }
    return rep;
   }
   
   agregarPregunta(pregunta){
    this.listaPreguntas.push(pregunta);
   }


   preguntaRepetida(tex){
    let rep = false;
    for(let i = 0 ; i < this.listaPreguntas.length && !rep ; i++){
        if(this.listaPreguntas[i].texto.toUpperCase() == tex.toUpperCase()){
            rep = true;
        }
    }
    return rep;


   }
   buscarTema(nom){
    for(let tema of general.listaTemas){
        if(tema.nombre == nom){
            return tema;
        }
    }


   }
    tienePregunta(nom){
        let tiene = false;
        for(let pregunta of general.listaPreguntas){
            if(pregunta.tema.nombre == nom)
                tiene = true;
        }
        return tiene;
    }
    desordenarPreguntas(){
        
    }
   
   }
