
let listaEventos=[];

function obtenerEventos() {
fetch('../resources/calendars/basic.ics')
  .then(res => res.text())
  .then(content => {
    let eventos=0;
    let evento={nombre:"",description:"",fechaInicio:"",fechaFin:""};
    let lines = content.split(/\n/);
    lines.forEach(line => {
        if (line.includes("BEGIN:VEVENT")) {
            eventos++;
        }else if (line.includes("DTSTART")) {
            fecha=line.split(":")[1].substring(0,line.split(":")[1].length-1);
            let fechaComprobada="";
            if(fecha.includes("T")){
                fechaComprobada=fecha.substring(0,4)+"-"+fecha.substring(4,6)+"-"+fecha.substring(6,8)+"T"+fecha.substring(9,11)+":"+fecha.substring(11,13)+":"+fecha.substring(13,15)+"Z"
            }else{
                fechaComprobada=fecha.substring(0,4)+"-"+fecha.substring(4,6)+"-"+fecha.substring(6,8)+"T00:00:00Z"
            }
            evento.fechaInicio=fechaComprobada
        }else if (line.includes("DTEND")) {
            fecha=line.split(":")[1].substring(0,line.split(":")[1].length-1);
            let fechaComprobada="";
            if(fecha.includes("T")){
                fechaComprobada=fecha.substring(0,4)+"-"+fecha.substring(4,6)+"-"+fecha.substring(6,8)+"T"+fecha.substring(9,11)+":"+fecha.substring(11,13)+":"+fecha.substring(13,15)+"Z"
            }else{
                fechaComprobada=fecha.substring(0,4)+"-"+fecha.substring(4,6)+"-"+fecha.substring(6,8)+"T00:00:00Z"
            }
            evento.fechaFin=fechaComprobada
        }else if (line.includes("DESCRIPTION")) {
            evento.description=line.split(":")[1].substring(0,line.split(":")[1].length-1);
        }else if (line.includes("SUMMARY")) {
            evento.nombre=line.split(":")[1].substring(0,line.split(":")[1].length-1);
        }else if (line.includes("END:VEVENT")) {
            listaEventos.push(evento);
            evento={nombre:"",description:"",fechaInicio:"",fechaFin:""};
        }
    });
  });
  return listaEventos;
}
let act;
eventos=["pruebacompadres"]
async function funcionEventos(){
    let list= await obtenerEventos();
    
    act= setInterval(() => { 
        $("#eventosAgora").empty();
        for (let index = 0; index < list.length; index++) {
            let time=(new Date(list[index].fechaInicio)-new Date())/1000;
                let minutes = Math.floor(time / 60) % 60
                let hours = Math.floor(time / 3600)
                if (hours<12) {
                    if(eventos.includes(list[index].nombre.replace(/\s/g, ''))){
                    $("#eventosAgora").append( `<article class='innerEvent fondo-blanco'><a href="../html/${list[index].nombre.replace(/\s/g, '')}"><p class='fechaEvento'>Faltan ${hours} horas y ${minutes} minutos</p><h2>${list[index].nombre}</h2><p class='descripcionEvento'>${list[index].description}</p></a></article>` );
                    }else{
                    $("#eventosAgora").append( `<article class='innerEvent fondo-blanco'><div class="tiempofalta"><p class='fechaEvento'>Faltan ${hours} horas y ${minutes} minutos</p></div><h2>${list[index].nombre}</h2><p class='descripcionEvento'>${list[index].description}</p></article>` );
                    }
                }
                   
        }
     }, 100)
}

funcionEventos();

