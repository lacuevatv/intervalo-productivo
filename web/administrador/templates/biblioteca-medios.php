<?php
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
load_module( 'medios' );
?>
<!-- wrapper interno modulo -->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Biblioteca de Medios
	</h1>
	<div class="container">
		<div class="row">
	
	<!-- BIBLIOTECA -->
			<div class="col-70">
				<div id="tabs">
					<ul>
					    <li><a href="#imagenes">Biblioteca imágenes</a></li>
					    <li><a href="#archivos">Biblioteca archivo</a></li>
					  </ul>
				
					<!-- wrapper galeria -->
					<div id="imagenes" class="wrapper-galeria">
						<div class="container">
							<h2>Biblioteca de imágenes</h2>
								
							<?php printImagesGalery( 'imagen', $controls = true ); ?>

						</div>
					</div>
					
					<div id="archivos" class="wrapper-galeria">
						<div class="container">
							<h2>Biblioteca de archivos</h2>
								
							<?php printImagesGalery( 'archivo', $controls = true ); ?>

						</div>
					</div>
				</div>
			</div><!-- // col -->
			

	<!-- UPLOADS -->
			<div class="col-30">
				<!-- wrapper form -->
				<aside id="wrapper-form-upload-galery">
					<div class="load-ajax"></div>
					<div class="container">
						
						<h3>Subir nuevo medio:</h3>	
						<p class="text-aclaracion">Se pueden subir más de uno simultaneamente, máximo 5mbs en total.</p>	
		    	
			    		<div class="load-ajax"></div>
			    		<form id="upload_file" name="upload_file" enctype="multipart/form-data">
			    			
		    				<div class="row">
			    				<div class="col">
						    		<div class="form-group">
					    				<label for="file"></label>
					    				<input type="file" name="file[]" id="file" required multiple>
					    				<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
					    			</div>
			    				</div>
			    				<div class="col">
				    				<div class="preview-wrapper">
				    					
				    				</div>
			    				</div>
		    				</div>
			    			
			    			<div class="form-group">
			    				<input type="submit" value="subir archivo" class="btn">
			    			</div>
			    		</form>
				    	<ul class="new-image-loaded"></ul>
					</div><!-- // container fluid form-->
				</aside><!-- // wrapper form -->

				<div class="container instrucciones-medios">
			
				</div>

			</div>
		</div><!-- // row gral modulo -->
	</div><!-- // container gral modulo -->
</div><!-- // wrapper interno modulo -->
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
    <a type="button" href="index.php?admin=noticias" class="btn">Ver noticias</a>
</footer>

<script type="text/javascript" language="javascript">

	$( function() {
	    $( "#tabs" ).tabs({
	      beforeLoad: function( event, ui ) {
	        ui.jqXHR.fail(function() {
	          ui.panel.html(
	            "Couldn't load this tab. We'll try to fix this as soon as possible. " +
	            "If this wouldn't be a demo." );
	        });
	      }
	    });
    } );
  </script>
