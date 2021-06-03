function calculateCode(value){
    var appId = 90;
    var formatType = 523;
    //clave emisora
    var prov = 46;
    var mun = 131;
    var controlDigit = 3;
    //numero justificante
    var modelCode = 047;
    var dataId = 4;
    let v = "" + value;
    
    if(value.length != 8){
        let str = "0";	
        for (let i = 0; i < 7-v.length; i++) {
            str += "0";
        }
        value = str + value;				
    }
    console.log("value" + value);
    var secuentialNum = value; //"00058461";

    //concats
    var emisor = "461313";
    var justNum = "0474" + secuentialNum;
    var controlInt = (parseInt(emisor, 10) + parseInt(justNum, 10)) % 7;

    if(controlInt === 0){
        return "" + appId + formatType + emisor + justNum + "7";
    }else{
        return "" + appId + formatType + emisor + justNum + controlInt;
    }
}

function generateBarcode(){
    var from = document.getElementById("fromValue").value;
    var to = document.getElementById("toValue").value;	

    if(from >= to){
        alert("El nombre inicial es més gran que el nombre de fi");
    }

    for (let i = from; i < to; i++) {				
        //905234613130474000584616
        $('#theDiv').prepend('<svg id="barcode'+i+'"></svg>')
        
         JsBarcode("#barcode"+i, calculateCode(i), {
            format: "code128c",
            displayValue: true,
            lineColor: "#24292e",
            width:1.5,
            height:40,	
            fontSize: 10					
        });	 
    }
    $("#btnSubmit").attr("disabled", true);
}

$('input').change(function(){
    $("#btnSubmit").attr("disabled", false);
})