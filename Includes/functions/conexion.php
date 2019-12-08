<?php

    if (!defineD('DB_HOST')) define('DB_HOST', 'localhost');
    if (!defined('DB_USUARIO')) define('DB_USUARIO', 'root');
    if (!defined('DB_CONTRASEÑA')) define('DB_CONTRASEÑA', '');;
    if (!defined('DB_NOMBRE')) define('DB_NOMBRE', 'uptask');;

    $conexion = new mysqli(DB_HOST, DB_USUARIO, DB_CONTRASEÑA, DB_NOMBRE);

    if($conexion->connect_error){
        echo $conexion->connect_error;
    }
    
    
