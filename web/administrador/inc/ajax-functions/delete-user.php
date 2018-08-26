<?php
require '../functions.php';

if ( isAjax() ) {
	

//como es un pedido por ajax se crea el usuario
	$connection = connectDB();
	$userid = $_POST['userId'];
	//busca si hay un usuario con ese nombre
	$deleteQuery  = "DELETE FROM usuarios WHERE user_id= '".$userid."'";

	$result = mysqli_query($connection, $deleteQuery);

	if ($result) {
    		echo 'deleted';
       } else {
       		echo 'error de borrado';
       }

isset($connection) ? mysqli_close($connection) : exit;

} else {
	exit;
}//else - fin script