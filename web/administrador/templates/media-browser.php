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

<article>
	<div class="container">

		<div id="tabs">
  			<ul>
			   	<li><a href="#upload">Subir archivo</a></li>
			    <li><a href="#imagenes">Biblioteca imágenes</a></li>
			    <li><a href="#archivos">Biblioteca archivo</a></li>
		  	</ul>
			<div id="upload">
			  	<div class="container">
			    	<h3>Subir nuevo medio:</h3>	
					<p class="text-aclaracion">Se pueden subir más de uno simultaneamente, máximo 5mbs en total.</p>
			    	
		    		<div class="load-ajax"></div>
		    		<form id="upload_file" name="upload_file">
		    			
	    				<div class="row">
		    				<div class="col-50-sm">
					    		<div class="form-group">
				    				<label for="file"></label>
				    				<input type="file" name="file[]" id="file" required multiple>
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

<script src="assets/js/modulo-medios.js"></script>
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

var destacado = false;

//al hacer clic en los medios la url se inserta en el input
$(document).on('click','li.medio',function(){
	item_url = $(this).find('img').data("src");

	if ( $('.ui-dialog-buttonset button').hasClass('imagenes-galerias') ) {
		//puede haber muchos seleccionados pero al deseleccionarlos hay que borrarlos del input para que no se incluyan luego
		//si ya tiene la clase y estaba seleccionada hay que deseleccionarla y luego borrarla del input
		if ( $(this).hasClass('image-selected') ) {
			$(this).removeClass('image-selected');
			$('.previewAtachment').each(function(){
			if ($(this).val() == item_url) {
				$(this).remove()
			}
		});
		} else {
			//sino tiene la clase es más facil, solo hay que agregarla
			$(this).addClass('image-selected');
			var html = '<input type="hidden" class="previewAtachment" name="previewAtachment" value="'+item_url+'">';
		var node = $(html);
		$('#libreria').append(node);
		}

		//o puede haber una sola eleccion
	} else {
		//destacado indica que ya algo seleccionado entonces hay que encontrarlo y deseleccionarlo
	  if (destacado) {
	  	$.each( $('li.medio'), function(){
	  		$(this).removeClass('image-selected');
	  	});
	  	//se borra la que antes estaba seleccionada
	  	$('.previewAtachment').remove();
	  }
	  //una vez todos seleccionados se selecciona la adecuada
	  $(this).toggleClass('image-selected');
	  //y a continuación se indica que hay algo destacado
	  destacado = true;
	  //se agrega al input para que pueda asignarse luego
		var html = '<input type="hidden" class="previewAtachment" name="previewAtachment" value="'+item_url+'">';
		var node = $(html);
		$('#libreria').append(node);
	}
});

</script>