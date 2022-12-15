fetch("https://www.googleapis.com/drive/v2/files?q=%2210ynPr8BiS9H3Dwdjt_iL0g5yxge4SP_m%22+in+parents&key="+"AIzaSyBKoEkjq3O0GsjU_x271CpORKJgAYXhv-Q").then(function(response) {
    return response.json().then(function(json) {
        json.items.forEach(function(item) {
            $("#images").append( "<div class='imagen_miniatura'><a href='https://drive.google.com/uc?id=" + item.id +"&export=download'><img width='200' heigth='200'  src='"+ "https://drive.google.com/uc?id=" + item.id +"&export=download'></a></div>" );
        
        });
    });
}
); 
