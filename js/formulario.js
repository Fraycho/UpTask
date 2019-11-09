
eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        contraseña = document.querySelector('#password').value;

    console.log(usuario + " " + contraseña);                                                                                                                      
}