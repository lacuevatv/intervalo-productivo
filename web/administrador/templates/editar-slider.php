<?php
/*
 * editar slider
 * Edita el slider seleccionado o crea uno nuevo
 * Since 3.0
 * 
*/
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
require_once("inc/functions.php");
load_module( 'sliders' );
//recupera slug a buscar
global $slug;

if ($slug != '') {
	//busca en la base de datos los datos del slider
	showSliderToEdit ( $slug );
	//recupera los datos
	global $dataSlider;
}

$item = 1;

?>

<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Editor Sliders: <?php echo $slug; ?>
	</h1>
	<div class="container">

		<div id="imagen_destacada_wrapper">
			<button id="new-item" class="btn btn-primary">Agregar nuevo item</button>
		</div>

		<ul id="<?php echo $slug; ?>" class="sliders-wrapper">
			<?php for ($i=0; $i < count($dataSlider); $i++) {
			 	$row = $dataSlider[$i];
				$sliderID        = isset($row['slider_id'])? $row['slider_id']:'';
				$sliderImagen    = isset($row['slider_imagen'])? $row['slider_imagen']:'';
				$sliderTitulo    = isset($row['slider_titulo'])? $row['slider_titulo']:'';
				$sliderLink      = isset($row['slider_link'])? $row['slider_link']:'';
				$sliderTextoLink = isset($row['slider_textoLink'])? $row['slider_textoLink']:'';
				$sliderTexto     = isset($row['slider_texto'])? $row['slider_texto']:'';
				$sliderUbicacion = isset($row['slider_ubicacion'])? $row['slider_ubicacion']:'';
				$sliderOrden     = isset($row['slider_orden'])? $row['slider_orden']:'';
			?>
			<li class="item-slider" id="<?php echo $sliderID; ?>">
				<h3>Item <?php echo $item; ?></h3>
				<div class="row">	 
					<!-- col -->
					<div class="col-50">
					<form id="edit_slider_imagen" name="edit_slider_imagen" data-sliderID="<?php echo $sliderID; ?>" method="POST" >
						<div class="form-group">
							<input type="hidden" name="slider_imagen" value="<?php echo $sliderImagen; ?>">

							<img id="slider_imagen_Preview-<?php echo $sliderID; ?>" src="<?php echo UPLOADSURLIMAGES . '/' . $sliderImagen; ?>" class="img-responsive">
						</div>
						<div class="form-group recargar-btn-wrapper">
							
							<button data-sliderID="<?php echo $sliderID; ?>" type="button" class="btn btn-primary btn-recargar">Cargar nueva foto</button>
							<span class="msj-guardar-imagen"></span>
							
						</div>
						<div class="form-group input-sliders col-50">
							<label for="slider_orden-<?php echo $item; ?>">Orden de ubicación</label>
							<input type="number" name="slider_orden-<?php echo $item; ?>" id="slider_orden-<?php echo $item; ?>" value="<?php echo $sliderOrden; ?>">
						</div>
					</form>
					</div><!-- //col -->
					<!-- col -->
					<div class="col-50">
						<div class="form-group input-sliders">
							<label for="slider_titulo-<?php echo $item; ?>">Titulo a mostrar</label>
							<input type="text" name="slider_titulo-<?php echo $item; ?>" id="slider_titulo-<?php echo $item; ?>" value="<?php echo $sliderTitulo; ?>">
						</div>

						<div class="form-group input-sliders">
							<label for="sliderLink-<?php echo $item; ?>">URL</label>
							<input type="text" name="sliderLink-<?php echo $item; ?>" id="sliderLink-<?php echo $item; ?>" value="<?php echo $sliderLink; ?>">
						</div>

						<div class="form-group input-sliders">
							<label for="slider_textoLink-<?php echo $item; ?>">Texto boton</label>
							<input type="text" name="slider_textoLink-<?php echo $item; ?>" id="slider_textoLink-<?php echo $item; ?>" value="<?php echo $sliderTextoLink; ?>">
						</div>

						<div class="form-group input-sliders">
							<label for="slider_texto-<?php echo $item; ?>">Texto slider</label>
							<textarea id="slider_texto-<?php echo $item; ?>" name="slider_texto-<?php echo $item; ?>"><?php echo $sliderTexto; ?></textarea>
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
			$item++;
			}//for ?>
		
		</ul>
	</div><!-- // container -->
</div><!-- // wrapper interno modulo -->
<div id="dialog">
	
</div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>