<?php
/*
 * funcion mostrar promociones
*/
function showPopupImg () {
	
	$connection = connectDB();
	$tabla = 'medios';
	$post_type = 'promo';

	$query  = 'SELECT * FROM ' .$tabla. ' WHERE medio_post_type = "'.$post_type.'" order by medio_id desc LIMIT 1';
	$result =  mysqli_query($connection, $query);
	$data = mysqli_fetch_array($result);
	$imgPoup =  $data[1];
	$idImagen = $data[0];
	
	closeDataBase($connection);
	if ( $imgPoup == NULL ) {
		echo '<img id="popupImg" class="img-responsive" src="'.MAINURL.'/administrador/assets/images/popupdefault.png">';
	} else {
		echo '<img id="popupImg" class="img-responsive" src="'.UPLOADSURLIMAGES .'/'.$imgPoup.'">';
	}

}

/*
 * ver si la promo está activa, si el popup está activo o no
*/
function ispopupActive () {
	
	$connection = connectDB();
	$tabla = 'options';
	$option_name = 'popupValue';
	$active = '';

	$query  = "SELECT * FROM " .$tabla. " WHERE options_name = '{$option_name}' LIMIT 1";
	$result =  mysqli_query($connection, $query);
	
	
	if ($result->num_rows == 0) {
		mysqli_close($connection);
		return;
	}
	
	$data = mysqli_fetch_array($result);
	
	if ($data[2] == '1') {
		$active = 'checked';
	}

	closeDataBase($connection);
	echo $active;
	
}

function showUrlPromoAdmin() {
	
	$connection = connectDB();
	$tabla = 'options';
	$option_name = 'urlPopup';

	$query  = "SELECT * FROM " .$tabla. " WHERE options_name = '{$option_name}' LIMIT 1";
	$result =  mysqli_query($connection, $query);
	
	
	if ($result->num_rows == 0) {
		closeDataBase($connection);
		return;
	}
	
	$data = mysqli_fetch_array($result);
	
	if ($data[2] == '') {
		echo '#';
	} else {
		echo $data[2];
	}

	closeDataBase($connection);
	
}