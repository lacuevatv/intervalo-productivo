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
	
	//variables principales
	$directorioFiles  = UPLOADSFILES;
	$directorioImages = UPLOADSIMAGES;
	$directorio       = $directorioImages;
	$archivos         = $_FILES['file'];
	$medios_subidos   = array();
	$post_type        = isset($_POST['post_type']) ? $_POST['post_type'] : '';
	$id               = '';
	$connection       = connectDB();
	$tabla            = 'medios';
	

	//recorrer cada uno de los archivos a subir
	for ( $i = 0; $i < count( $archivos['name'] ); $i++ ) {
		
		//identificar tipo de archivo
		if ( strpos($archivos['type'][$i], "gif" ) || strpos($archivos['type'][$i], "jpeg") ||
	 	strpos($archivos['type'][$i], "jpg") || strpos($archivos['type'][$i], "png") ) {
			$file_type = 'imagen';
	 	} elseif ( strpos($archivos['type'][$i], "pdf") || strpos($archivos['type'][$i], "doc") || strpos($archivos['type'][$i], "docx") ) {
	 		$file_type = 'archivo';
	 	} else{
	 		echo 'error-type';
	 		return;
	 	}

 		//renombrar archivo
 		$newFile = renombrar_archivo( $archivos['name'][$i], $file_type );
 		//mover archivo
 		//si no es una imagen, cambio el directorio
 		if ( $file_type != 'imagen' ) {
 			$directorio = $directorioFiles;
 		} 
 		
 		if ($newFile && move_uploaded_file($archivos['tmp_name'][$i], $directorio . '/' . $newFile)) {
 			//si se movio al directorio ahora lo subimos a la base de datos
 			
 			$query = "INSERT INTO " .$tabla. " (medio_nombre,medio_tipo,medio_post_type) VALUES ('".$newFile."','".$file_type."','".$post_type."')";
		       
			//guardar archivo en base de datos
			mysqli_query($connection, $query); 
			//print_r($connection);
 			//finalmente se agrega al array de medios
 			$id = mysqli_insert_id($connection);
 			array_push($medios_subidos, $newFile, $id);
 		}

 	}//for

	//devuelvo un json con todas las imágenes subidas
	echo json_encode($medios_subidos);

//sino es peticion ajax se cancela
} else{
    throw new Exception("Error Processing Request", 1);   
}