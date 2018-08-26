<?php
require_once('../functions.php');

if ( isAjax() ) {
	

//como es un pedido por ajax se crea el usuario
	$connection = connectDB();
	$tabla = 'usuarios';
	$username = $_POST['userid'];
	//busca si hay un usuario con ese nombre
	$query  = "SELECT * FROM " .$tabla. " WHERE user_usuario='".$username."' ";

	$result = mysqli_query($connection, $query);

	if ( $result->num_rows == 0 ) {
		echo 'error-data';
	}
	//si existe verifica que el password sea el bueno
	else {

		$row = $result->fetch_array(MYSQLI_ASSOC);
		
		$password = $_POST['password'];
		$newPassword = $_POST['new_password'];
		if ( password_verify($password, $row['user_password']) ) {
			//entonces cambia el password
			$hash = password_hash($newPassword, PASSWORD_BCRYPT); 
			$query = "UPDATE ".$tabla." SET user_password='".$hash."' WHERE user_usuario='".$username."' LIMIT 1";
			$newPass = mysqli_query($connection, $query);
			echo 'exito';
		} else {
			//el password no es el mismo error
			echo 'error';
		}
	}

isset($connection) ? mysqli_close($connection) : exit;

} else {
	exit;
}//else - fin script