
eventListeners();

// Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    // Botones para las acciones de las Tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
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
                        <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
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

// Agregar tarea al proyecto actual

function agregarTarea(e){
    e.preventDefault();

    const nombreTarea = document.querySelector('.nombre-tarea').value;
    if(nombreTarea === ''){
        swal({
            type: 'error',
            title: 'Error!',
            text: 'Una tarea no puede ir vacía!'
        })
    } else {
        // Insertar en PHP
        const datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        // AJAX

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'includes/models/modelo-tareas.php', true);
        xhr.onload = function(){
            if(this.status === 200){
                // Todo correcto
                const respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);

                const resultado = respuesta.respuesta,
                      tarea = respuesta.tarea,
                      id_insertado = respuesta.id_insertado,
                      tipo = respuesta.tipo;

                if(resultado ===  "correcto"){
                    if(tipo === "crear"){
                        // Alerta
                        swal({
                            type: 'success',
                            title: 'Tarea Creada',
                            text: 'La tarea: ' + tarea + ' se creó correctamente!'
                        })

                        // Seleccionar parrafo de proyecto vacio
                        const proyectoVacio = document.querySelectorAll('.lista-vacia');
                        if(proyectoVacio.length > 0){
                            document.querySelector('.lista-vacia').remove();
                        }

                        // Construir template
                        const nuevaTarea = document.createElement('li');
                        // Agregar id
                        nuevaTarea.id = 'tarea: ' + id_insertado;
                        // Clase
                        nuevaTarea.classList.add('tarea');
                        // Construir el HTML
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class ="far fa-check-circle"></i>
                                <i class ="fas fa-trash"></i>
                            </div>
                        `;
                        // Insertar en el DOM
                        const listado = document.querySelector('.listado-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        // Limpiar formulario
                        document.querySelector('.agregar-tarea').reset();
                    }
                    
                } else {
                    swal({
                        type: 'error',
                        title: 'Error!',
                        text: 'Hubo un error!'
                    })
                }
            }
        }

        xhr.send(datos);
    }

}

// Cambiar estado de las tareas o eliminarlas

function accionesTareas(e){
    e.preventDefault();

    
    // Complero o incompleto
    if(e.target.classList.contains('fa-check-circle')){

        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }
    

    // Borrar Tarea
    if(e.target.classList.contains('fa-trash')){

        swal({
            title: "Está Seguro(a)?",
            text: "Esta acción no se puede deshacer",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.value) {
                const tareaEliminar = e.target.parentElement.parentElement;

                // Borrar de la DB
                eliminarTarea(tareaEliminar);

                // Borrar del DOM
                tareaEliminar.remove();

                swal(
                    "Eliminado!",
                    "La tarea fue eliminada",
                    "success"
                );
            }
        });
    }
}



// Tarea completa o incompleta

function cambiarEstadoTarea(tarea, estado){
    const idTarea = tarea.parentElement.parentElement.id.split(':');

    // Datos
    const datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    // Lammado a AJAX
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/models/modelo-tareas.php', true);

    xhr.onload = function(){
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
        }
    }

    xhr.send(datos);
}


// Elminar tareas de la DB

function eliminarTarea(tarea){
    const idTarea = tarea.id.split(':');
    console.log(tarea);

    // Datos
    const datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    // Lammado a AJAX
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/models/modelo-tareas.php', true);

    xhr.onload = function(){
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);

            // Comprobar tareas restantes
            const listaTareas = document.querySelectorAll('li.tarea');
            console.log(listaTareas);
            if(listaTareas.length === 0){
                document.querySelector('.listado-pendientes ul').innerHTML = "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
            }
        }
    }

    xhr.send(datos);
}
