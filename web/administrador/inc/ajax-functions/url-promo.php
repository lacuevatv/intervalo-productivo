<?php
/*
 * Subir varias imagenes o una sola
 * Since 2.0
*/

require_once('../functions.php');
require_once('../modulos/modulo-medios.php');

/*
	funcion principal, si es ajax se ejecuta sino se cancela
*/

//chequea si es peticion de ajax y ejecuta la funcion
if( isAjax() ) {

	$popupURL = $_POST['url'];
	$tabla = 'options';
	$connection = connectDB();
	$popupURL   = filter_var($popupURL,FILTER_SANITIZE_URL);

	$query = "UPDATE ".$tabla." SET options_value = '".$popupURL."' WHERE options_name = 'urlPopup'";	
		
		$updateBD = mysqli_query($connection, $query);
		if ( $updateBD ) {
			echo 'ok';
		}
		//sino es peticion ajax se cancela
} else{
    throw new Exception("Error Processing Request", 1);   
}