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

	$connection = connectDB();
	$tabla = 'medios';
	$imagen = $_POST['imagen'];
	$postType = $_POST['post_type'];
	
	//ver que posttype tiene la imagen guardada
	
	
	$query  = "SELECT * FROM " .$tabla. " WHERE medio_nombre= '".$imagen."' LIMIT 1";

	$result =  mysqli_query($connection, $query);
	$data = mysqli_fetch_array($result);
	if ( $data['medio_post_type'] != 'promo' ) {
		//copiar la imagen en la base de datos con el postype nuevo
		$duplicateQuery = "INSERT INTO " .$tabla. " (medio_nombre,medio_tipo,medio_post_type) VALUES ('".$data['medio_nombre']."','".$data['medio_tipo']."','".$postType."')";

		$updateBD = mysqli_query($connection, $duplicateQuery);
	
		if ( $updateBD ) {
			echo 'ok';
		}

	} else {
		echo 'ok';
	}

	/*$queryUpdate = "UPDATE ".$tabla." SET medio_post_type= '".$postType."' WHERE medio_nombre= '".$imagen."'";	

	$updateBD = mysqli_query($connection, $queryUpdate);
	
	if ( $updateBD ) {
		echo 'ok';
	}*/

//sino es peticion ajax se cancela
} else{
    throw new Exception("Error Processing Request", 1);   
}