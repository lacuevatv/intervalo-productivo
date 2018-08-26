<?php
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
load_module( 'promociones' );
?>

<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Activar o Cargar Promociones
	</h1>
	<div class="container">
		<div class="row">
			<div class="col-30">
				<h2>
					Activar o desactivar
				</h2>				
				<p>
					<small>Se muestra la imagen cargada actualmente.</small>
				</p>
				<p>
					<strong>
						<small>
						Marcar el cuadro para activar la promoción y que aparezca en la página.
						</small>
					</strong>
				</p>

				<div class="form-group">
					<label for="popupurl">URL:</label>
					<input type="url" name="popupurl" id="popupurl" value="<?php showUrlPromoAdmin(); ?>">
				</div>

				<div class="form-group">
					<label for="popUpActive" class="popup-url-label">Activar promoción:</label>
					<input type="checkbox" id="popUpActive" name="popUpActive" <?php ispopupActive(); ?> class="popup-url-input">
				</div>
				<div>
					<button class="btn btn-primary up-new-promo">Cambiar Imagen</button>
				</div>
				<div class="error-tag"></div>
			</div><!-- // col -->

			<div class="col-70 img-wrapper">
				<?php showPopupImg (); ?>
			</div><!-- // col -->
			
			
		</div><!-- // row gral modulo -->
	</div><!-- // container gral modulo -->
</div><!-- // wrapper interno modulo -->
<div id="dialog"></div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>