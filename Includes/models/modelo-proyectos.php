<?php 

$proyecto = $_POST['proyecto'];
$accion = $_POST['accion'];

if($accion === 'crear'){

    // Conexion
    include "../functions/conexion.php";

    try {

        $stmt = $conexion->prepare("INSERT INTO proyectos (nombre) VALUES (?) ");
        $stmt->bind_param('s', $proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'proyecto' => $proyecto, 
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
            );
        } else {
            $respuesta = array(
                'respuesta' => $stmt->error
            );
        }
        $stmt->close();
        $conexion->close();

    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
  
}