<?php
session_start();

require_once( 'functions.php' );

if ( isAjax() ) {

$username = $_POST['userid'];
$username  = filter_var($username,FILTER_SANITIZE_EMAIL);
$password = $_POST['password'];
$connection = connectDB();
$tabla = 'usuarios';
$query  = "SELECT * FROM " .$tabla. " WHERE user_usuario='".$username."' ";

$result = mysqli_query($connection, $query);

if ( $result->num_rows == 0 ) {
	echo '<div class="alert alert-success" role="alert">Datos incorrectos</div>';
} else {
	$row = $result->fetch_array(MYSQLI_ASSOC);
	
	if ( password_verify($password, $row['user_password']) ) {
		$_SESSION['loggedin'] = true;
	    $_SESSION['username'] = $username;
	    $_SESSION['nombre'] = $row['user_nombre'];
	    $_SESSION['user_id'] = $row['user_id'];
	    $_SESSION['user_status'] = $row['user_status'];
	    $_SESSION['start'] = time();
	    $_SESSION['expire'] = $_SESSION['start'] + (60 * 60); //60 minutos 

	    echo 1;
	 } else { 
	   	echo 0;
	 }
	
}//else result

isset($connection) ? mysqli_close($connection) : exit;


} else {
	exit;
}