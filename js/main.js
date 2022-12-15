


//cerrar menú al hacer click en cualquier parte de la pantalla
const bodyimg = document.getElementById('menu-lateral');
let checkbox = document.getElementById('btn-menu');
bodyimg.addEventListener('click', function(e) {
    if(checkbox.checked == true) {
        checkbox.checked = false;
    }
});
     
