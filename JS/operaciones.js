function igual(){
    let expr = document.getElementById('texto').value;
    let errorDeseado = 0;
    limpiar();
    var rangos = []
    BuscarRangos(expr, rangos);
    metodo(expr, errorDeseado, rangos)
}

var tuneado = false;

function metodo(expr, errorDeseado, rangos) {
    if(tuneado == false){
        let m = document.getElementById('seleccion').value;
        let a = document.getElementById('rangoA').value;
        switch(m){
            case "Biseccion":
                biseccion(expr, errorDeseado, rangos);
            break;
            case "Punto fijo":
                puntoFijo(expr, errorDeseado, a);
            break;
            case "Newton-Raphson":
                newton(expr, errorDeseado, rangos);
            break;
            case "Secante":
                errorDeseado = 0.0001;
                secante(expr, errorDeseado, rangos);
            break;
        }
    }
    else {
        let m = document.getElementById('seleccion2').value;
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
                errorDeseado = 0.0001;
                secante(expr, errorDeseado, rangos);
            break;
        }
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
    if(tuneado == false){
        var a = -499.99, b = -497.99, variableA, variableB;
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
        }while(b <= 500)
    } else {
        let aS = document.getElementById('rangoA').value, bS = document.getElementById('rangoB').value
        var a = parseFloat(aS), b = parseFloat(bS), variableA, variableB;
            
            variableA = {x: a};
            variableB = {x: b};
            if(funcion.evaluate(variableA) * funcion.evaluate(variableB) < 0) {
                var rango = new Rango(a, b);
                rangos.push(rango);
                console.log(rangos[0])
            }
            else{
                var r2 = document.getElementById('Nresultados');
                console.log(rangos[0])
                r2.value = "No se encontraron raices"
            }
    }  
    return rangos;
}

function cambioSeleccion(){
    let selectElement = document.getElementById("seleccion");
    let seleccion2 = document.getElementById("seleccion2");
    var modoPro = document.getElementById("modopro");
    var rangoB = document.getElementById("rangoB")
    var rangoText = document.getElementById("rangoText");
    var inicial = document.getElementById("nInicial");
    let actual = selectElement.value;
    if(actual == "Personalizar"){
        seleccion2.selectedIndex = 0;
        seleccion2.disabled = false;
        rangoB.style.display = "block"
        rangoText.style.display = "block"
        inicial.style.display = "none"
        modoPro.style.display = "grid"
        tuneado = true;
    }
    else{
        if(actual == "Punto fijo"){
            modoPro.style.display = "grid"
            tuneado = false;
            seleccion2.selectedIndex = 1;
            seleccion2.disabled = true;
            rangoB.style.display = "none"
            rangoText.style.display = "none"
            inicial.style.display = "block"
        }else{
            modoPro.style.display = "none"
            tuneado = false;
        }
    }
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

function cambioSeleccion2(){
    let selectElement = document.getElementById("seleccion2");
    var inicial = document.getElementById("nInicial");
    var rangoText = document.getElementById("rangoText");
    var rangoB = document.getElementById("rangoB");
    let actual = selectElement.value;
    if(actual == "Biseccion" || actual == "Newton-Raphson" || actual == "Secante"){
        inicial.style.display = "none";
        rangoText.style.display = "block";
        rangoB.style.display = "block"
    }
    if(actual == "Punto fijo"){
        rangoText.style.display = "none";
        inicial.style.display = "block";
        rangoB.style.display = "none"
    }
}