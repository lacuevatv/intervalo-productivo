<?php
/*
MANEJA LOS CLIENTES
*/
function getClientes() {
    $connection = connectDB();
	$tabla = 'clientes';
	
	//queries según parámetros
	$query  = "SELECT * FROM " .$tabla. " ORDER by cliente_orden asc";	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		return null;
	} else {
		
		while ($row = $result->fetch_array()) {
				$rows[] = $row;
        }//while
        
        return $rows;

    }
    
}