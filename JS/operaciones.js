function igual(){
    biseccion()
}

function biseccion() {
    let expr = document.getElementById('texto').value;
    let errorDeseado = document.getElementById('errorDeseado').value;
    let a=1, b=2, c
    let funcion = math.compile(expr)
    let variableA, variableB, variableC
    let i = 0, iteraciones = 20
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

function newton() {
    let a, i
    let errorDeseado
    let iteraciones
    do{
        
    }while(i < iteraciones && error > errorDeseado)
}