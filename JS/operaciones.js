function igual(){
    let expr = document.getElementById('texto').value;
    let errorDeseado = 0;
    limpiar()
    metodo(expr, errorDeseado)
}

function metodo(expr, errorDeseado) {
    let m = document.getElementById('seleccion').value;
    switch(m){
        case "Biseccion":
            biseccion(expr, errorDeseado);
        break;
        case "Punto fijo":
            puntoFijo(expr, errorDeseado);
        break;
        case "Newton-Raphson":
            newton(expr, errorDeseado);
        break;
        case "Secante":
            secante(expr, errorDeseado);
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

class Raiz{
    constructor (raiz, error, iteraciones){
        this.raiz = raiz;
        this.error = error;
        this.iteraciones = iteraciones;
    }
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

function biseccion(expr, errorDeseado) {  
    let funcion = math.compile(expr);
    var a=-50, b=-47, auxA, auxB;
    var raices = [];
    do{
        var i = 0, error, c = 0;
        var variableA, variableB, variableC;
        let iteraciones = 100;
        variableA = {x: a};
        variableB = {x: b};
        auxA = a;
        auxB = b;
        if(funcion.evaluate(variableA) * funcion.evaluate(variableB) < 0) {
            do{                    
                c = (a+b)/2;                         
                variableC = {x: c};      
                if(funcion.evaluate(variableA) * funcion.evaluate(variableC) < 0){
                    b = c;
                }
                else {
                    if(funcion.evaluate(variableA) * funcion.evaluate(variableC) > 0){
                        a = c;
                    }
                    else {
                        if(funcion.evaluate(variableA) * funcion.evaluate(variableC) == 0){
                            error = 0;
                        }
                    }
                }
                error = Math.abs(funcion.evaluate(variableC) - 0);
                i = i+1;
            }while(i < iteraciones && error > errorDeseado)
            a = auxA;
            b = auxB;
            var raiz = new Raiz(c, error, i);
            raices.push(raiz);
            a = a+3;
            b = b+3;
        }
        else {
            a = a+3;
            b = b+3;
        }
    }while(b < 60);
    imprimir(raices);
}

function newton(expr, errorDeseado){
    let iteraciones = 100, b, error, i;
    let funcion = math.compile(expr);
    var variableA, derivada, aux, a = -50, j = 0;
    derivada = math.derivative(expr,'x').toString();
    let derivada1 = math.compile(derivada);
    var raices = [];
    do{
        i = 0
        aux = a;
        do{
            variableA = {x: a};
            b = a - (funcion.evaluate(variableA)/derivada1.evaluate(variableA));
            a = b;
            error = Math.abs(funcion.evaluate(variableA) - 0);
            i++;
        }while(i < iteraciones && error > errorDeseado);
        var raiz = new Raiz (b, error, i);
        a = aux;
        a = a + 3;
        if(raices[j] == null){
            raices.push(raiz);
        }
        else{
            if(b != raices[j].raiz) {
                raices.push(raiz);
                j++;
            }           
        }
    }while(a < 60);
    imprimir(raices)
}

function puntoFijo(expr, errorDeseado) {
    let b, error;
    var i = 0, a = 0;
    let iteraciones = 100;
    let funcion = math.compile(expr);
    let variableA;
    do {
        variableA = {x: a};
        b = funcion.evaluate(variableA);
        error = Math.abs(b - a);
        a = b;
        i++;
    }while(i < iteraciones && error > errorDeseado);
    if(i <= iteraciones) {
        console.log("La raiz es: ", a);
        console.log("El error es: ", error);
        console.log("Numero de iteraciones: ", i);
    }
    else{
        console.log("El metodo no converge en ",i," iteraciones");
    } 
}

function secante(expr, errorDeseado) {
    let funcion = math.compile(expr);
    var a, c = 0, b = -50, error, variableA, variableB, aux, j = 0, i;
    let iteraciones = 100;
    var raices = [], funcion1, funcion2;
    do{ 
        i = 0;
        aux = b
        a = b - 0.00001
        do{
            variableA = {x: a};
            variableB = {x: b};
            funcion1 = funcion.evaluate(variableA)
            funcion2 = funcion.evaluate(variableB)
            c = b - (((b - a)*funcion2)/(funcion2 - funcion1))
            a = b;
            b = c;
            error = Math.abs(funcion2 - 0);
            i++;
        }while(i < iteraciones && error > errorDeseado);
        var raiz = new Raiz (c, error, i);
        b = aux + 1
        if(raices[j] == null && isNaN(c) == false){
            raices.push(raiz);
        }
        else{
            if(c != raices[j].raiz && isNaN(c) == false) {
                raices.push(raiz);
                j++;
            }           
        }
    }while(a < 60);
    imprimir(raices)
}
/*
function secante(expr, errorDeseado) {
    let funcion = math.compile(expr);
    let formula = math.compile("x - (((x - y)*g)/(g - k))");
    var b = -50, a, variableA, variableB, i = 0, c, funcion1, funcion2, variableX;
    let iteraciones = 100, error;
    a = b - 0.00001;
    do{
        variableA = {x:a};
        variableB = {x:b};
        funcion1 = funcion.evaluate(variableA);
        funcion2 = funcion.evaluate(variableB);
        variableX = {x:b, y:a, g:funcion2, k:funcion1};
        c = formula.evaluate(variableX);
        a = b;
        b = c;
        error = Math.abs(funcion.evaluate(variableB) - 0);
        i++;
    }while(i < iteraciones && error > errorDeseado);
    console.log("La raiz es: ", c);
    console.log("El error es: ",error);
    console.log("Numero de iteraciones: ",i);
}*/

/*Funciones de prueba:
    2x^2-x-5
    e^-x
*/