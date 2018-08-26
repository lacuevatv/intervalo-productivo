<?php
/*
 * delete imagenes
 * Since 2.0
*/

require_once('../functions.php');

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
 
 		$id_img = $_POST['id'];

	    $query = "DELETE FROM img_uploads WHERE image_id = '".$id_img."'";
		
	    $result = mysqli_query($connection, $query); 
	       if ($result) {
	    		echo 'elemento borrado';
	       } else {
	       		echo 'error de borrado';
	       }
	
	var_dump($_POST);
} else{
	//sino es peticion ajax
    throw new Exception("Error Processing Request", 1);   
}

//cierre base de datos
mysqli_close($connection);