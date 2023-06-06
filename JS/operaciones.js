function igual(){
    let expr = document.getElementById('texto').value;
    let errorDeseado = 0;
    limpiar();
    var rangos = []
    BuscarRangos(expr, rangos);
    metodo(expr, errorDeseado, rangos)
}

function metodo(expr, errorDeseado, rangos) {
    let m = document.getElementById('seleccion').value;
    switch(m){
        case "Biseccion":
            biseccion(expr, errorDeseado, rangos);
        break;
        case "Punto fijo":
            puntoFijo(expr, errorDeseado);
        break;
        case "Newton-Raphson":
            newton(expr, errorDeseado, rangos);
        break;
        case "Secante":
            secante(expr, errorDeseado, rangos);
        break;
    }
}

function limpiar() {
    let r = document.getElementById('resultado');
    r.value = null;
    let r2 = document.getElementById('Nresultados');
    r2.value = null;
    console.clear();
}

function imprimir(raices) {
    var r = document.getElementById('resultado');
    var r2 = document.getElementById('Nresultados');
    r2.value = "Se econtraron " + raices.length + " raices";
    for(var i = 0; i < raices.length; i++){
        r.value = r.value + "La raíz es: " + raices[i].raiz + "\n";
        console.log("La raiz es: ",raices[i].raiz);
        console.log("El error es: ",raices[i].error);
        console.log("Numero de iteraciones: ",raices[i].iteraciones,"\n");
    }
}

function BuscarRangos(expr, rangos) {
    let funcion = math.compile(expr);
    var a = -100, b = -98, variableA, variableB;
    do{
        variableA = {x: a};
        variableB = {x: b};
        if(funcion.evaluate(variableA) * funcion.evaluate(variableB) < 0) {
            var rango = new Rango(a, b);
            rangos.push(rango);
            a = a+2;
            b = b+2;
        }
        else{
            a = a+2;
            b = b+2;
        }
    }while(b <= 100)
    return rangos;
}

class Raiz{
    constructor (raiz, error, iteraciones){
        this.raiz = raiz;
        this.error = error;
        this.iteraciones = iteraciones;
    }
}

class Rango {
    constructor(inicio, fin) {
        this.inicio = inicio;
        this.fin = fin;
    }
}
