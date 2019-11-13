<?php

$accion = $_POST['accion'];
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];

if($accion === 'crear'){
    // Crear administradores

    // Hashear passwords
    $opciones = array(
        'cost' => 12
    );
    $hash_password = password_hash($contraseña, PASSWORD_BCRYPT, $opciones);

    // Conexion
    include "../functions/conexion.php";

    try {

        $stmt = $conexion->prepare("INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?) ");
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => 'crear'
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conexion->close();

    } catch (Exception $e) {
        $respuesta = array(
            'pass' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
  
}

if($accion === 'login'){
    // Login de administradores
    include "../functions/conexion.php";

    try{
        // Seleccionar el administrador de la base de datos

        $stmt = $conexion->prepare("SELECT id, usuario, contraseña FROM usuarios WHERE usuario = ?");
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        // Loguear el usuario
        $stmt->bind_result($id_usuario, $nombre_usuario, $contraseña_usuario);
        $stmt->fetch();
        if($nombre_usuario){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id' => $id_usuario,
                'nombre' => $nombre_usuario,
                'contraseña' => $contraseña_usuario,
            );
        } else {
            $respuesta = array(
                'error' => 'El usuario no existe'
            );
        }
        $stmt->close();
        $conexion->close();
    } catch (Exception $e) {
        $respuesta = array(
            'pass' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}


//die(json_encode($_POST));