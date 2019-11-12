
eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        contraseña = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

    if(usuario === '' || contraseña === ''){
        swal({
            type: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios!'
        });
    } else {

        // Datos formulario
        const datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('contraseña', contraseña);
        datos.append('accion', tipo);

        console.log(...datos);

        // Llamado a AJAX
        const xhr = new XMLHttpRequest();

        // Abrir conexion
        xhr.open('POST', 'includes/models/modelo-admin.php', true);

        // Retorno de datos
        xhr.onload = function(){
            if(this.status == 200){
                console.log(JSON.parse(xhr.responseText));
            }
        }

        // Enviar peticion
        xhr.send(datos);
    }                                                                                                            
}