function igual(){
    let expr = document.getElementById('texto').value;
    let errorDeseado = 0
    biseccion(expr, errorDeseado)

}

function biseccion(expr, errorDeseado) {   
    let a=0, b=10, c
    let funcion = math.compile(expr)
    let variableA, variableB, variableC
    let i = 0, iteraciones = 100
    let error
    variableA = {x: a}
    variableB = {x: b}
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
            error=Math.abs(funcion.evaluate(variableC) - 0)
            i = i+1
        }while(i < iteraciones && error > errorDeseado)
        console.log("La raiz es: ",c)
        console.log("El error es: ",error)
        console.log("Numero de iteraciones: ",i)
    }
    else {
        console.log("No hay raiz en este intervalo")
    }
}

function newton(expr, errorDeseado){
    let a = 1, iteraciones = 20, b, error, i = 0
    let funcion = math.compile(expr)
    let variableA
    let derivada
    derivada = math.derivative('2x^2-x-5','x').toString()
    let derivada1 = math.compile(derivada) 
    do{
        variableA = {x: a}
        b = a - (funcion.evaluate(variableA)/derivada1.evaluate(variableA))
        a = b
        error = Math.abs(funcion.evaluate(variableA) - 0)
        i++
        console.log(variableA)
    }while(i < iteraciones && error > errorDeseado)
    console.log("La derivada es: ",derivada)
    console.log("La raiz es: ", b)
    console.log("El error es: ",error)
    console.log("Numero de iteraciones: ",i)
}

function puntoFijo(expr, errorDeseado) {
    let inicial = 1, b, error, i = 0
    let iteraciones
    let funcion = math.compile(expr)
    let variableA
    do {
        variableA = {x: inicial}
        b = funcion.evaluate(variableA)
        error = Math.abs(b - inicial)
        inicial = b
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
//Funcion = 2x^2-x-5