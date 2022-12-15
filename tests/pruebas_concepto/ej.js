
//funcion para obtener enlaces a imagenes y poder mostrarlas en el html
$.ajax({
    url : "../../resources/images/",
    success: function (data) {

        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpg|png|gif)$/) ) { 
                console.log(val)
                $("#images").append( "<img width='200' heigth='200'  src='"+ "../.." + val +"'>" );
            } 
        });
    }
});







