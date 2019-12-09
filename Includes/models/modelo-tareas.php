<?php

$accion = $_POST['accion'];

if($accion === 'crear'){

    $id_proyecto = (int) $_POST['id_proyecto'];
    $tarea = $_POST['tarea'];

    // Conexion
    include "../functions/conexion.php";

    try {

        $stmt = $conexion->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES (?, ?) ");
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'tarea' => $tarea, 
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

if($accion === 'actualizar'){
    $estado = $_POST['estado'];
    
    echo json_encode($_POST);
}