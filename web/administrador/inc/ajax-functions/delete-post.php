<?php
/*
 * delete post
 * Since 3.0
 * borra el post seleccionado de acuerdo a su url
*/
require_once('../functions.php');
if ( isAjax() ) {

$connection     = connectDB();
$tablaNoticias  = 'posts';
$postUrl        = isset( $_POST['post_url'] ) ? $_POST['post_url'] : 'none';

//buscamos id y etiquetas antes de borrar:
$query          = "SELECT * FROM ".$tablaNoticias." WHERE post_url= '".$postUrl."'";
$result         = mysqli_query($connection, $query);

$row            = $result->fetch_array(MYSQLI_ASSOC);
$postID         = $row['post_ID'];


//borramos el post
$query      = "DELETE FROM ".$tablaNoticias." WHERE post_url= '".$postUrl."'";
$result     = mysqli_query($connection, $query);
   
   if ($result) {
		echo 'deleted';
   } else {
   		echo 'error-deleted-post';
   }


//cierre base de datos
mysqli_close($connection);


} //if not ajax
else {
	exit;
}