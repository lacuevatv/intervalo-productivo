<?php
/*
 * delete file
 * Since 2.0
*/
require_once('../functions.php');

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
 
 		$id_file = $_POST['id'];

	    $query = "DELETE FROM file_uploads WHERE file_uploads_id= '".$id_file."'";
		
	    $result = mysqli_query($connection, $query); 
	       if ($result) {
	    		echo 'elemento borrado';
	       } else {
	       		echo 'error de borrado';
	       }
	
	
} else{
	//sino es peticion ajax
    throw new Exception("Error Processing Request", 1);   
}

//cierre base de datos
mysqli_close($connection);