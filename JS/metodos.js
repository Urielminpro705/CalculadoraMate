function biseccion(expr, errorDeseado, rangos) {  
    let funcion = math.compile(expr), iteraciones = 100;
    var a, b, j = 0, error, c, i, variableA, variableB, variableC;;
    var raices = [];
    do{
        i = 0;
        a = rangos[j].inicio;
        b = rangos[j].fin;
        variableA = {x: a};
        variableB = {x: b};
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
        var raiz = new Raiz(c, error, i);
        raices.push(raiz);
        a = rangos[j].a;
        b = rangos[j].b;
        j++;
    }while(j < rangos.length);
    imprimir(raices);
}

function newton(expr, errorDeseado, rangos){
    let iteraciones = 100;
    let funcion = math.compile(expr);
    var variableA, derivada, a, j = 0, b, error, i;
    derivada = math.derivative(expr,'x').toString();
    let derivada1 = math.compile(derivada);
    var raices = [];
    do{
        i = 0
        a = (rangos[j].inicio + rangos[j].fin) / 2;
        do{
            variableA = {x: a};
            b = a - (funcion.evaluate(variableA)/derivada1.evaluate(variableA));
            a = b;
            error = Math.abs(funcion.evaluate(variableA) - 0);
            i++;
        }while(i < iteraciones && error > errorDeseado);
        var raiz = new Raiz (b, error, i);
        raices.push(raiz);
        j++;
    }while(j < rangos.length);
    imprimir(raices)
}

function puntoFijo(expr, errorDeseado, a) {
    let b, error;
    var i = 0;
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

function secante(expr, errorDeseado, rangos) {
    let funcion = math.compile(expr);
    var a, c = 0, b, error, variableA, variableB, j = 0, i;
    let iteraciones = 100;
    var raices = [], funcion1, funcion2;
    do{ 
        i = 0;
        b = (rangos[j].inicio + rangos[j].fin) / 2;
        a = b - 0.00001;
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
        raices.push(raiz);
        j++
    }while(j < rangos.length);
    imprimir(raices)
}

/*Funciones de prueba:
    2x^2-x-5
    3x^3+2x^2+x-8
    e^-x
*/