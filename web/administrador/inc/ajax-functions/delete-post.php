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
$postId        = isset( $_POST['post_id'] ) ? $_POST['post_id'] : '';

//borramos el post
$query      = "DELETE FROM ".$tablaNoticias." WHERE post_id= '".$postId."' LIMIT 1";
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