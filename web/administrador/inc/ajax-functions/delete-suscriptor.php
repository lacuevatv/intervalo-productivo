<?php
/*
 * delete post
 * Since 3.0
 * borra el post seleccionado de acuerdo a su url
*/
require_once('../functions.php');
if ( isAjax() ) {

$connection = connectDB();
$tabla      = 'contacto';
$id         = isset( $_POST['id'] ) ? $_POST['id'] : '';

$query      = "DELETE FROM ".$tabla." WHERE id= '".$id."'";
$result     = mysqli_query($connection, $query);
   
   if ($result) {
		echo 'deleted';
   } else {
   		echo '<br><br>No se pudo borrar';
   }


//cierre base de datos
mysqli_close($connection);


} //if not ajax
else {
	exit;
}