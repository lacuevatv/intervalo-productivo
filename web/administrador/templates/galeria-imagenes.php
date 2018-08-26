<?php
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
load_module( 'medios' );

global $categoriasGalerias;

?>
<!-- wrapper interno modulo -->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Galería de imágenes
	</h1>
	<div class="container">
		<div class="row">
	
	<!-- BIBLIOTECA -->
			<div class="col-70">
                <input class="post-type-categoria" type="hidden" name="post_type" value="<?php echo $categoriasGalerias[0]['slug']; ?>">
				<div id="tabs">
					<ul>
                    <?php 
                    for ($i=0; $i < count($categoriasGalerias); $i++) { ?>
                        <li><a class="click_posttype" href="#<?php echo $categoriasGalerias[$i]['slug']; ?>"><?php echo $categoriasGalerias[$i]['nombre']; ?></a></li>
                    <?php }//for ?>
					</ul>
				
					<!-- wrapper galeria -->
                    <?php 
                    for ($i=0; $i < count($categoriasGalerias); $i++) { 
                        $postType = $categoriasGalerias[$i]['slug'];
                        ?>
                        <div id="<?php echo $categoriasGalerias[$i]['slug']; ?>" class="wrapper-galeria">
                            <div class="container">
                                <h2><?php echo $categoriasGalerias[$i]['nombre']; ?></h2>
                                <?php printImagesGalery( 'imagen', $controls = true,  $postType ); ?>
                            </div>
                        </div>
                    <?php }//for ?>
					
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
