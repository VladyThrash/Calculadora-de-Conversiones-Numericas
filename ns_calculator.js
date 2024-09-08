//Se espera recibir click en el boton "Convertir" para ejecutar la función.
document.getElementById("i_button").addEventListener("click",myFunction);
function myFunction(){ //Esta función obtiene los valores ingresados en el "input" y en "select".
    
    let v_input=document.getElementById("codigo").value;//Obtenemos valores del "input".
    let v_select=document.getElementById("opciones").value;//Obtenemos valores del "select".
    conversiones(v_select,v_input);
    //document.getElementById("i_button").addEventListener("click",myFunction);
}
//Se canaliza la conversión a realizar.
function conversiones(op,val){
    switch(op){
        case "D-B"://Decimal-binario.
            if(!validDec(val)){//Esta función returna 0 si el formato no coinside.
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            decimales(parseFloat(val),2);//El parametro "val" debe de pasarse como entero formalmente. 
            break;
        case "B-D"://Binario-decimal.
            if(!validBin(val)){//Esta función returna 0 si el formato no coinside.
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,2,10); 
            break;
        case "D-H"://Decimal-hexadecimal.
            if(!validDec(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            decimales(parseFloat(val),16);
            break;
        case "H-D"://Hexadecimal-decimal.
            a_base(val,16,10);
            break;
        case "D-O"://Decimal-octal.
            if(!validDec(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            decimales(parseFloat(val),8);
            break;
        case "O-D"://Octal-decimal.
            if(!validOct(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,8,10);
            break;
        case "B-H"://Binario-hexadecimal.
            if(!validBin(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,2,16);
            break;
        case "H-B"://Hexadecimal-binario.
            a_base(val,16,2);
            break;
        case "B-O"://Binario-octal.
            if(!validBin(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,2,8);
            break;
        case "O-B"://Octal-binario.
            if(!validOct(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,8,2);
            break;
        case "H-O"://Hexadecimal-octal.
            a_base(val,16,8);
            break;
        case "O-H"://Octal-hexadecimal.
            if(!validOct(val)){
                document.getElementById("result").innerText=" = "+"NAN";
                break; 
            }
            a_base(val,8,16);
            break;
    }
}
//Valida si un numero ingresado es binario. 
function validBin(val){
    return /^-?[01]+(\.[01]+)?$/.test(val);
}
//Valida si un numero ingresado es octal. 
function validOct(val){
    return /^[0-7]+(\.[0-7]+)?$/.test(val);
}
//Valida si un numero ingresado es decimal. 
function validDec(val){
    return /^-?\d+(\.\d+)?$/.test(val);
}
//Convierte valores decimales entre los distintos sistemas numericos.
function decimales(val,bass){//Primer parametro=cifra,segundo=cambio a base "n".
    let num=val.toString(bass);
    document.getElementById("result").innerText=" = "+num.toUpperCase().replace(/[^0-9A-Z.]/g, '');
}
//Convierte otros sistemas a decimal.
function a_base(val,sn,bass){//Primer parametro=cifra,segundo=sistema numerico de la cifra,tercero=cambio a base "n".
    let num=hexToFloat(val,sn).toString(bass).toUpperCase().replace(/[^0-9A-Z.]/g, '');
    document.getElementById("result").innerText=" = "+num;
}
//Analiza si un valor no decimal almacena valores flotantes y realiza la conversion. 
function hexToFloat(val,sn){
    if(!val.includes('.')){
        return parseInt(val,sn);
    }
    let arr=val.split('.');
    let valE = parseInt(arr[0], sn);
    let valD=arr[1].split('').reduce((acc,digit,index) => {
        return acc + parseInt(digit,sn)/Math.pow(sn,index + 1);
    },0);
    return valE+valD;
}