<?php

    define('DB_HOST', 'localhost');
    define('DB_USUARIO', 'root');
    define('DB_CONTRASEÑA', '');
    define('DB_NOMBRE', 'uptask');

    $conexion = new mysqli(DB_HOST, DB_USUARIO, DB_CONTRASEÑA, DB_NOMBRE);

    if($conexion->connect_error){
        echo $conexion->connect_error;
    }
    
    
