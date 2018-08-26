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
	$galeria = $_POST['galeria'];
	$tabla = 'medios';
	$result = 0;
	$deleted = 0;

	//print_r($_POST);
	if ( isset($_POST['recicleBin']) ) {
		$recicleBin = $_POST['recicleBin'];
	} else {
		$recicleBin = false;
	}


	//borrar las imagenes de la papelera
	if ( $recicleBin != false) {
		//si hay algo en la papelera, es decir si hay más de 0 se borran
		for ($i=0; $i < count($recicleBin); $i++) { 
			$image_id    = $recicleBin[$i]['image_id'];
			//primero necesitamos el nombre
			$queryName = "SELECT * FROM ".$tabla." WHERE medio_id= '".$image_id."'";
			$getName = mysqli_query($connection, $queryName);
			$data = mysqli_fetch_array($getName);
			$fileName =  $data[1];

			//ahora se borra de la base de datos
			$query = "DELETE FROM ".$tabla." WHERE medio_id= '".$image_id."'";	
			echo $fileName;
			$updateBD = mysqli_query($connection, $query);

			if ($updateBD) {
				$deleted ++;
				//si es archivo lo busca en un lado, si es imagen otro
				if ( strpos($fileName, "pdf") || strpos($fileName, "doc") || strpos($fileName, "docx") ) {
					unlink(realpath( UPLOADSFILES. '/' . $fileName  ));	
				} else {
					unlink(realpath( UPLOADSIMAGES. '/' . $fileName  ));
				}
			} 
		}
	}

	//cambiar el orden
	for ($i=0; $i < count($galeria); $i++) { 
		$image_id    = $galeria[$i]['image_id'];
		$orden       = $galeria[$i]['orden'];
		
		$query = "UPDATE ".$tabla." SET medio_orden= '".$orden."' WHERE medio_id= '".$image_id."'";	
		
		$updateBD = mysqli_query($connection, $query);

		if ($updateBD) {
			$result ++;
		} 
	}

	echo $result . 'registros actualizados y ' . $deleted. ' fueron borrados';

//sino es peticion ajax se cancela
} else{
    throw new Exception("Error Processing Request", 1);   
}