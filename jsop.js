function getHistorial(){
    return document.getElementById('historial-valor').innerText;
}
function printHistorial(num){
    document.getElementById("historial-valor").innerText=num;
}
function getOutput(){
    return document.getElementById("valor-salida").innerText;
}
function printOutput(num){
    if(num==""){
        document.getElementById("valor-salida").innerText=num;
    }else{
        document.getElementById("valor-salida").innerText=getFormattedNumber(num);
    } 
}
function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var valor = n.toLocaleString("en");
    return valor;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

var operador = document.getElementsByClassName("operador");
for(var i=0;i<operador.length;i++){
    operador[i].addEventListener('click',function(){
        if(this.id=="limpiar"){
            printHistorial("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var salida = reverseNumberFormat(getOutput()).toString();
            if(salida){
                salida = salida.substr(0,salida.length-1);
                printOutput(salida);
            }
        }
        else{
            var salida = getOutput();
            var historial = getHistorial();
            if(salida=="" && historial!=""){

                if(isNaN(historial[historial.length-1])){
                    historial = historial.substr(0,historial.length-1);
                }
            }
            if(salida!="" || historial!=""){
                salida = salida=="" ? salida : reverseNumberFormat(salida);
                historial = historial+salida;
                if(this.id=="="){
                    var result=eval(historial);
                    printOutput(result);
                    printHistorial("");
                }

                else if(this.id=="%"){
                    var n = reverseNumberFormat(getOutput());
                    var percent = n / 100;
                    printOutput(percent.toFixed(4));
                }
                else{
                    historial=historial+this.id;
                    printHistorial(historial);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var salida=reverseNumberFormat(getOutput());
        if(salida!=NaN){
            salida=salida+this.id;
            printOutput(salida);
            
        }
    });
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change',function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme','dark');
    }else{
        document.documentElement.setAttribute('data-theme','light');
    }
})