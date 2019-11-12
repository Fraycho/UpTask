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

    $respuesta = array(
        'pass' => $hash_password
    );

    echo json_encode($respuesta);
}

if($accion === 'login'){
    // Login de administradores

}


//die(json_encode($_POST));