<?php
/*
 * Archivo de imagenes / inserta imagen nueva
 * versión reducida para el editor TinyMCE
 * Since 3.0
 * 
*/
require_once("../inc/functions.php");
load_module( 'medios' );


?>

<!-------------- HTML -------------->
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Archivo de imágenes</title>

<!-- jQquery UI css -->
  <link href="<?php echo URLADMINISTRADOR; ?>/assets/css/jquery-ui.min.css" rel="stylesheet">
<!-- Custom CSS -->
  <link href="<?php echo URLADMINISTRADOR; ?>/assets/css/style-admin.css" rel="stylesheet">

</head>
<body>
	<article>
		<div class="container">

			<div id="tabs-minibroser">
	  			<ul>
				   	<li><a href="#upload">Subir archivo</a></li>
				    <li><a href="#imagenes">Biblioteca imágenes</a></li>
				    <li><a href="#archivos">Biblioteca archivo</a></li>
			  	</ul>
				<div id="upload">
				  	<div class="container">
				    	<h3>Subir nuevo medio:</h3>	
						<p class="text-aclaracion">Se pueden subir un solo archivo aquí, máximo 5mbs en total.</p>
				    	
			    		<div class="load-ajax"></div>
			    		<form id="upload_file" name="upload_file">
			    			
		    				<div class="row">
			    				<div class="col-50-sm">
						    		<div class="form-group">
					    				<label for="file"></label>
					    				<input type="file" name="file[]" id="file" required>
					    			</div>
			    				</div>
			    				<div class="col-50-sm">
				    				<div class="preview-wrapper">
				    					
				    				</div>
			    				</div>
		    				</div>
			    			
			    			<div class="form-group">
			    				<input type="submit" value="subir archivo" class="btn">
			    			</div>
			    		</form>
				    	<ul class="new-image-loaded"></ul>
				    </div>
				</div>
		  		<div id="imagenes" class="wrapper-galeria">
					<div class="container">
						<h2>Galería de imágenes</h2>
							
						<?php printImagesGalery( 'imagen' ); ?>

					</div>
				</div>
				
				<div id="archivos" class="wrapper-galeria">
					<div class="container">
						<h2>Galería de archivos</h2>
							
						<?php printImagesGalery( 'archivo' ); ?>

					</div>
				</div>
			</div><!-- //.tabs-jquery-ui -->
		</div><!-- //.container-fluid -->
	</article>

<!------- // fin contenido ------>
<!------- scripts ------>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/jquery-3.1.1.min.js"></script>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/jquery-ui.min.js"></script>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/admin-script.js"></script>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/lib/tinymce/tinymce.min.js"></script>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-noticias.js"></script>
<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
<script type="text/javascript" language="javascript">

function fileValidation( file ){
    var filePath = file;
    var allowedExtensions = /(.pdf|.docx|.doc)$/i;
    if(!allowedExtensions.exec(filePath)){
        return false;
    }
    return true;
}

$( function() {
    $( "#tabs-minibroser" ).tabs({
      beforeLoad: function( event, ui ) {
        ui.jqXHR.fail(function() {
          ui.panel.html(
            "Couldn't load this tab. We'll try to fix this as soon as possible. " +
            "If this wouldn't be a demo." );
        });
      }
    });
  } );

//al hacer clic en las imágenes la url se inserta en el input
$(document).on('click','li.medio',function(){
	item_url = $(this).find('img').data("src");
	if ( fileValidation( item_url ) ) {
		item_url = uploadsDir + '/archivos/' + item_url;
	} else {
		item_url = uploadsDir + '/' + item_url;
	}
	var args = top.tinymce.activeEditor.windowManager.getParams();
	win = (args.window);
	input = (args.input);
	win.document.getElementById(input).value = item_url;
	top.tinymce.activeEditor.windowManager.close();
});

//subir la imagen por ajax

$('#upload_file').submit(function( event ){
		event.preventDefault();
		var formulario = $( this );
		var imgAjax = $( '.load-ajax' );
		var formData = new FormData( formulario[0] );
		var url = ajaxFunctionDir + '/upload-medios.php';
		var ubicacion = location.search.split("=")[1];
		
		$.ajax( {
			type: 'POST',
			url: url,
			data: formData,
			cache: false,
		    contentType: false,
		    processData: false,
		    //funcion antes de enviar
		    beforeSend: function() {
		    	$( '.load-ajax' ).fadeIn();
		    },
			success: function ( response ) {
				//console.log(response);
				$( '.load-ajax' ).fadeOut();

				//si nos devuelve el error lo pasamos al usuario
				if ( response == 'error-type') {
					alert('no es el archivo adecuado');
				} else {
					//se recodifica el json
					response = $.parseJSON(response);
					if ( fileValidation( response[0] ) ) {
						urlimg = uploadsDir + '/archivos/' + response[0];
					} else {
						urlimg = uploadsDir + '/' + response[0];
					}
					item_url = urlimg;
				  	var args = top.tinymce.activeEditor.windowManager.getParams();
					win = (args.window);
					input = (args.input);
					win.document.getElementById(input).value = item_url;
					top.tinymce.activeEditor.windowManager.close();	
				}	
			},
			error: function ( error ) {
				console.log('erroraquí');
			},
		});//cierre ajax
	});//submit



</script>
</body>
</html>