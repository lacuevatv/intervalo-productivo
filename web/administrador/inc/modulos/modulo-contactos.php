<?php
/*
MANEJA LOS SUSCRIPTORES
*/

//toma los contactos de la base de datos y devuelve el array con todos los contactos
function getContacts () {
	$connection = connectDB();
	$tabla      = 'contacto';
	$query      = "SELECT * FROM " .$tabla. " ORDER by fecha_formulario desc ";
	$result     = mysqli_query($connection, $query);
	closeDataBase($connection);

	if ( $result->num_rows == 0 ) {
		$contacts = null;

	} else {
		while ($row = $result->fetch_array()) {
				$contacts[] = $row;
			}
	}

	return $contacts;
}