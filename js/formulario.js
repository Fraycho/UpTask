
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
            if(this.status === 200){
                var respuesta = JSON.parse(xhr.responseText);

                if(respuesta.respuesta === 'correcto'){
                    // Nuevo usuario
                    if(respuesta.tipo === 'crear'){
                        swal({
                            type: 'success',
                            title: 'Usuario Creado!',
                            text: 'El usuario se creó correctamente'                            
                        });
                    } else if(respuesta.tipo === 'login') {
                        swal({
                            type: 'success',
                            title: 'Login Correcto',
                            text: 'Presiona OK para abrir el DashBoard'                            
                        })
                        .then(resultado => {
                            if(resultado.value){
                                window.location.href = "index.php";
                            }
                        })
                    }
                }else{
                    // Error
                    swal({
                        type: 'error',
                        title: 'Error!',
                        text: 'Hubo un error!'
                    });
                }
                console.log(JSON.parse(xhr.responseText));
            }
        }

        // Enviar peticion
        xhr.send(datos);
    }                                                                                                            
}