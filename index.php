<?php
    include "includes/functions/sesiones.php";
    include "includes/functions/funciones.php";
    include "includes/templates/header.php";
    include "includes/templates/barra.php";

    // Obtener el ID de la URL
    if(isset($_GET['id_proyecto'])){
        $id_proyecto = $_GET['id_proyecto'];
    }
?>

<div class="contenedor">

    <?php include "includes/templates/sidebar.php"; ?>

    <main class="contenido-principal">
        <h1>Proyecto Actual: 
            <?php $proyecto = obtenerNombreProyecto($id_proyecto);
            
            foreach($proyecto as $nombre): ?>

                <span><?php echo $nombre['nombre']; ?></span>

            <?php endforeach; ?>

        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="<?php echo $id_proyecto; ?>" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php include "includes/templates/footer.php"; ?>