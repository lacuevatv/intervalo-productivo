<?php
/*
 * borra el file on options table
 * Since 5.0
*/

require_once('../functions.php');
if ( isAjax() ) {

$connection     = connectDB();
$tabla  = 'options';
$optionsName        = isset( $_POST['optionsName'] ) ? $_POST['optionsName'] : '';

//borramos el post
$query      = "DELETE FROM ".$tabla." WHERE options_name= '".$optionsName."'";
$result     = mysqli_query($connection, $query);
   
   if ($result) {
		echo 'deleted';
   } else {
   		echo 'error-deleted';
   }


//cierre base de datos
mysqli_close($connection);


} //if not ajax
else {
	exit;
}