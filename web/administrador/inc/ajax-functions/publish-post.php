<?php
/*
 * publish post sin editarlo, desde la lista de noticias
 * Since 3.0
 *
*/
require_once('../functions.php');
if ( isAjax() ) {

$connection = connectDB();
$tabla      = 'posts';
$postUrl    = isset( $_POST['post_url'] ) ? $_POST['post_url'] : 'none';

$query      = "UPDATE ".$tabla." SET post_status='publicado' WHERE post_url='".$postUrl."' LIMIT 1";;
$result     = mysqli_query($connection, $query);
   
   if ($result) {
		echo 'ok';
   } else {
   		echo 'error';
   }


//cierre base de datos
mysqli_close($connection);


} //if not ajax
else {
	exit;
}