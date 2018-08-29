<?php
/*
 * delete cliente
 * borra el cliente seleccionado
*/
require_once('../functions.php');
if ( isAjax() ) {

	$connection = connectDB();
	$tabla      = 'clientes';
	$clienteID   = isset( $_POST['clienteID'] ) ? $_POST['clienteID'] : '';
	//borramos el post
	$query      = "DELETE FROM ".$tabla." WHERE cliente_id= '".$clienteID."' ";
	$result     = mysqli_query($connection, $query);
	
   if ($result) {
		echo 'deleted';
   } else {
   		echo 'error-deleted-slider';
   }
	//cierre base de datos
	mysqli_close($connection);


} //if not ajax
else {
	exit;
}