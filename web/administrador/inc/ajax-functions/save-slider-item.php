<?php
/*
 * delete slider
 * Since 3.0
 * borra el slider seleccionado
*/
require_once('../functions.php');
require_once('../modulos/modulo-sliders.php');
if ( isAjax() ) {

	$connection = connectDB();
	$tabla      = 'sliders';
	$sliderIMG  = isset( $_POST['sliderImagen'] ) ? $_POST['sliderImagen'] : '';
	$newSlider  = isset( $_POST['new'] ) ? $_POST['new'] : 'false';
	$ubicacion  = isset( $_POST['ubicacion'] ) ? $_POST['ubicacion'] : '';
	

	//actualizar slider
	if ($newSlider != 'true') {
		$sliderID   = isset( $_POST['sliderId'] ) ? $_POST['sliderId'] : '';
		$titulo     = isset( $_POST['titulo'] ) ? $_POST['titulo'] : '';
		$url        = isset( $_POST['url'] ) ? $_POST['url'] : '';
		$texto      = isset( $_POST['texto'] ) ? $_POST['texto'] : '';
		$textoBTN   = isset( $_POST['textoBtn'] ) ? $_POST['textoBtn'] : '';
		$orden      = isset( $_POST['orden'] ) ? intval($_POST['orden']) : 0;
		$titulo     = filter_var($titulo,FILTER_SANITIZE_STRING); 
		$texto      = filter_var($texto,FILTER_SANITIZE_STRING); 
		$textoBTN   = filter_var($textoBTN,FILTER_SANITIZE_STRING); 
		$orden      = filter_var($orden,FILTER_SANITIZE_NUMBER_INT); 
 		$url        = filter_var($url,FILTER_SANITIZE_URL); 
 		
		$query      = "UPDATE ".$tabla." SET slider_imagen='".$sliderIMG."', slider_titulo='".$titulo."', slider_link='".$url."', slider_textoLink='".$textoBTN."', slider_texto='".$texto."', slider_orden='".$orden."' WHERE slider_id='".$sliderID."' LIMIT 1";
		$result     = mysqli_query($connection, $query);
   
		if ($result) {
			echo 'saved';
	   	} else {
	   		echo 'error';
	   	}
	   
	} //crear nuevo slider

	else {
		$queryCreateSlider  = "INSERT INTO " .$tabla. " (slider_imagen,slider_ubicacion) VALUES ('".$sliderIMG."','".$ubicacion."')";
		$result = mysqli_query($connection, $queryCreateSlider);
		//var_dump($connection);
		//echo mysqli_insert_id($connection);
		$sliderID = mysqli_insert_id($connection);
		?>
		<li class="item-slider" id="<?php echo $sliderID; ?>">
				<h3>Nuevo Item</h3>
				<div class="row">	 
					<!-- col -->
					<div class="col-50">
					<form id="edit_slider_imagen" name="edit_slider_imagen" data-sliderID="<?php echo $sliderID; ?>" method="POST" >
						<div class="form-group">
							<input type="hidden" name="slider_imagen" value="<?php echo $sliderIMG; ?>">

							<img id="slider_imagen_Preview-<?php echo $sliderID; ?>" src="<?php echo UPLOADSURLIMAGES . '/' . $sliderIMG; ?>" class="img-responsive">
						</div>
						<div class="form-group recargar-btn-wrapper">
							
							<button data-sliderID="<?php echo $sliderID; ?>" type="button" class="btn btn-primary btn-recargar">Cargar nueva foto</button>
							<span class="msj-guardar-imagen"></span>
							
						</div>
						<div class="form-group input-sliders col-50">
							<label for="slider_orden">Orden de ubicación</label>
							<input type="number" name="slider_orden" id="slider_orden" value="0">
						</div>
					</form>
					</div><!-- //col -->
					<!-- col -->
					<div class="col-50">
						<div class="form-group input-sliders">
							<label for="slider_titulo">Titulo a mostrar</label>
							<input type="text" name="slider_titulo" id="slider_titulo">
						</div>

						<div class="form-group input-sliders">
							<label for="sliderLink">URL</label>
							<input type="text" name="sliderLink" id="sliderLink">
						</div>

						<div class="form-group input-sliders">
							<label for="slider_textoLink">Texto boton</label>
							<input type="text" name="slider_textoLink" id="slider_textoLink" value="Leer más">
						</div>

						<div class="form-group input-sliders">
							<label for="slider_texto">Texto slider</label>
							<textarea id="slider_texto" name="slider_texto"></textarea>
						</div>
						
					</div><!-- //col -->
				</div><!-- //row -->
				<div class="row">	 
					<!-- col -->
					<div class="col-50">
						
					</div><!-- //col -->

					<div class="col-50">
					<hr>
						<div class="row save-button-right">
							<div class="col">
								<div class="form-group input-sliders borrar-guardar-btns">
									<span class="msj-guardar"></span>
									<button data-id="<?php echo $sliderID ?>" type="button" class="btn btn-primary btn-guardar">Guardar item</button>
									<button data-id="<?php echo $sliderID ?>" type="button" class="btn btn-danger btn-xs btn-borrar">Borrar item</button>
									
								</div>
							</div><!-- //col -->
						</div><!-- //row -->
					</div><!-- //col -->

				</div><!-- //row -->
			</li>
	<?php
	}//else
	
   	//cierre base de datos
	mysqli_close($connection);


} //if not ajax
else {
	exit;
}