<?php
/*
 * Slider
 * Lista los sliders hechos
 * Since 3.0
 * 
*/
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}

load_module( 'sliders' );
?>

<div class="contenido-modulo">
	<h1>
		Administrador Sliders
	</h1>
	<div class="container">
		<div class="row">
			<!-- col -->
			<div class="col">
				<ul class="list-sliders">
					<?php listaSliders (); ?>
				</ul>
			</div><!-- //col -->
		</div><!-- //row -->
	</div><!-- // container -->
</div><!-- // wrapper interno modulo -->
<div id="dialog"></div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>