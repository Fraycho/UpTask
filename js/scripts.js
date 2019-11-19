
eventListeners();

// Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
}

function nuevoProyecto(e){
    e.preventDefault();
    console.log('Nuevo proyecto');

    // Crear input para nombre del nuevo proyecto
    const nombreProyecto = document.createElement('li');
    nombreProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nombreProyecto);

    // Seleccionar el ID del nuevo proyecto
    const inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // Crear proyecto al presionar enter
    inputNuevoProyecto.addEventListener('keypress', function(e){
        var tecla = e.which || e.keycode;
        if(tecla === 13){
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nombreProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto){

    // Enviar datos con FormData
    const datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // Llamar ajax
    const xhr = new XMLHttpRequest();

    // Abir Conexion
    xhr.open('POST', 'includes/models/modelo-proyectos.php', true);

    // Estado conexion
    xhr.onload = function(){
        if(this.status === 200){
            // Obtener datos de la respuesta
            const respuesta = JSON.parse(xhr.responseText);

            const proyecto = respuesta.proyecto,
                  id_proyecto = respuesta.id_insertado,
                  tipo = respuesta.tipo,
                  resultado = respuesta.respuesta;
            
            // Comprobar la insercion
            if(resultado === 'correcto'){
                if(tipo === 'crear'){
                    // Se creo nuevo proyecto
                    // Inyectar el HTML
                    const nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;
                    listaProyectos.appendChild(nuevoProyecto);

                    // Alerta
                    swal({
                        type: 'success',
                        title: 'Proyecto Creado!',
                        text: 'El Proyecto: ' + proyecto + ' se creó correctamente'                            
                    })
                    .then(resultado => {
                        if(resultado.value){
                            // Redireccionar
                            window.location.href = "index.php?id_proyecto=" + id_proyecto;
                        }
                    });
                }
            }else{
                // Error ===================================================================================================================
                swal({
                    type: 'error',
                    title: 'Error!',
                    text: 'Hubo un error!'
                });
            }
        }
    }

    // Enviar datos
    xhr.send(datos);

}