
    <script src="js/sweetalert2.all.min.js"></script>

    <?php 
        $actual = paginaActual();
        if($actual === "crear-cuenta" || $actual === "login"){
            echo '<script src="js/formulario.js"></script>';
        }
    ?>

</body>
</html>