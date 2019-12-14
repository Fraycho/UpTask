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
    $id_tarea = (int) $_POST['id'];
    $estado = $_POST['estado'];

    // Conexion
    include "../functions/conexion.php";

    try {

        $stmt = $conexion->prepare("UPDATE tareas set estado = ? WHERE id = ?");
        $stmt->bind_param('ii', $estado, $id_tarea);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
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


if($accion === 'eliminar'){
    $id_tarea = (int) $_POST['id'];

    // Conexion
    include "../functions/conexion.php";

    try {

        $stmt = $conexion->prepare("DELETE from tareas WHERE id = ?");
        $stmt->bind_param('i', $id_tarea);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'ID de tarea borrada' => $id_tarea
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