function igual(){
    let expr = document.getElementById('texto').value;
    let errorDeseado = 0
    biseccion(expr, errorDeseado)

}

class Raiz{
    constructor (raiz, error, iteraciones){
        this.raiz = raiz
        this.error = error
        this.iteraciones = iteraciones
    }
}

function imprimir(raices) {
    for(var i = 0; i < raices.length; i++){
        console.log("La raiz es: ",raices[i].raiz)
        console.log("El error es: ",raices[i].error)
        console.log("Numero de iteraciones: ",raices[i].iteraciones,"\n")
    }
}

function biseccion(expr, errorDeseado) {  
    let funcion = math.compile(expr) 
    var a=-50, b=-47, auxA, auxB
    var raices = []
    do{
        var i = 0, error, c = 0
        var variableA, variableB, variableC
        let iteraciones = 100
        variableA = {x: a}
        variableB = {x: b}
        auxA = a
        auxB = b
        if(funcion.evaluate(variableA) * funcion.evaluate(variableB) < 0) {
            do{                    
                c = (a+b)/2                           
                variableC = {x: c}      
                if(funcion.evaluate(variableA) * funcion.evaluate(variableC) < 0){
                    b = c;
                }
                else {
                    if(funcion.evaluate(variableA) * funcion.evaluate(variableC) > 0){
                        a = c
                    }
                    else {
                        if(funcion.evaluate(variableA) * funcion.evaluate(variableC) == 0){
                            error = 0
                        }
                    }
                }
                error = Math.abs(funcion.evaluate(variableC) - 0)
                i = i+1
            }while(i < iteraciones && error > errorDeseado)
            a = auxA
            b = auxB
            var raiz = new Raiz(c, error, i)
            raices.push(raiz)
            imprimir(raiz)
            a = a+3
            b = b+3
        }
        else {
            a = a+3
            b = b+3
        }
    }while(b < 60)
    imprimir(raices)
}

function newton(expr, errorDeseado){
    let a = 1 , iteraciones = 100, b, error, i = 0
    let funcion = math.compile(expr)
    var variableA, derivada
    derivada = math.derivative(expr,'x').toString()
    let derivada1 = math.compile(derivada) 
    do{
        variableA = {x: a}
        b = a - (funcion.evaluate(variableA)/derivada1.evaluate(variableA))
        a = b
        error = Math.abs(funcion.evaluate(variableA) - 0)
        i++
    }while(i < iteraciones && error > errorDeseado)
    console.log("La derivada es: ",derivada)
    console.log("La raiz es: ", b)
    console.log("El error es: ",error)
    console.log("Numero de iteraciones: ",i)
}

function puntoFijo(expr, errorDeseado) {
    let b, error
    var i = 0, a = 0
    let iteraciones = 100
    let funcion = math.compile(expr)
    let variableA
    do {
        variableA = {x: a}
        b = funcion.evaluate(variableA)
        error = Math.abs(b - a)
        a = b
        i++
    }while(i < iteraciones && error > errorDeseado)
    if(i <= iteraciones) {
        console.log("La raiz es: ", a)
        console.log("El error es: ", error)
        console.log("Numero de iteraciones: ", i)
    }
    else{
        console.log("El metodo no converge en ",i," iteraciones")
    } 
}

function secante(expr, errorDeseado) {
    let iteraciones = 100
    let funcion = math.compile(expr)
    var a = 1, c, error, i = 0
    var b = a - 0.00001
    let variableA, variableB
    do{
        variableA = {x: a}
        variableB = {x: b}
        c = a - (((a - b)*funcion.evaluate(variableA))/(funcion.evaluate(variableA) - funcion.evaluate(variableB)))
        b = a
        a = c
        error = Math.abs(funcion.evaluate(variableA) - 0)
        i++
    }while(i < iteraciones && error > errorDeseado)
    console.log("La raiz es: ", c)
    console.log("El error es: ", error)
    console.log("Numero de iteraciones: ", i)
}
/*Funciones de prueba:
    2x^2-x-5
    e^-x
*/