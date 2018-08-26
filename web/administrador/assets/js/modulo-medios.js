/*
* Funciones: de la biblioteca de medios: 
* Ordenar, imprime html instrucciones, muestra la info de las imagenes
* boton de guardar
*/

$(document).ready(function(){
	/*
	* TEXTOS DE INSTRUCCIONES
	*/

	//texto de instrucciones
	var htmlConMedios = '<h3>Instrucciones</h3><ul><li>Para ordenar las imágenes solo muevalas al lugar que considere</li><li>Tener en cuenta que actualmente estan organizadas primero de izquierda a derecha y luego hacia abajo</li><li>Para ver el orden actual, coloque el mouse sobre la imagen</li></ul>';
		htmlConMedios += '<div class="container recicle-bin-wrapper"><h3>Borrar imágenes:</h3><p class="text-aclaracion">Mueva las imágenes aquí, cuando haga click en guardar los cambios se borraran de lo contrario volveran a la galería.</p><div id="recicle-bin" class="connectedSortable"></div></div>';

	var htmlSinMedios = '<h3>Instrucciones</h3><ul><li>Para subir las imágenes utilizar el cuadrito aquí arriba.</li><li>Pueden subir más de un archivo a la vez pero en total no debe superar los 5mb</li><li>Guardar los cambios aplica solo a el orden de las imágenes.</li></ul>';

	//sortable jqueryUI para poder ordenar con el mouse la galería de imagenes
	$( '.lista-medios' ).sortable({
		connectWith: '.connectedSortable',
		stop: function( event, ui ) {
			//funcion que se ejecuta para rechequear el orden y escribir en html el nuevo orden para luego poder guardar en base de datos
			var imagenes = $('.medio');
			var lista = [];

			for ( i = 0; i < imagenes.length; i++) {
				var image_id = $(imagenes[i]).find('input[name=image_id]').val();
				var inputOrden = $(imagenes[i]).find('input[name=orden]');
				var textoOrden = $(imagenes[i]).find('.texto-orden');
				var nuevoOrden = i + 1;
				inputOrden.val(nuevoOrden);
				texto = 'Orden:' + nuevoOrden;
				textoOrden.text(texto);
			}//cierra for
		}//funcion stop sort
	});//sortable()

	$( '.lista-medios' ).disableSelection();

	var contenedor = $('.instrucciones-medios');
	var imagenes = $('.medio');
	var instrucciones;

	//si hay imagenes se imprime instrucciones con papelera de reciclaje
	if ( imagenes.length != 0 ) {
		contenedor.html('');
		instrucciones = $( htmlConMedios );
		
		//imprimo instrucciones
		contenedor.append(instrucciones);

		//función papelera de reciclaje
		//que la lista de imagenes sea draggable
		$( '.lista-medios' ).draggable({
			revert: "invalid",
			containment: "document",
		      helper: "clone",
		      cursor: "move"
		});
		//preparo la papelera
		$( '#recicle-bin' ).sortable({
				connectWith: '.connectedSortable'
			});
		
		$( '#recicle-bin' ).droppable({
			accept: '.lista-medios > li',
		      drop: function( event, ui ) {
		      	console.log('imagen a borrar');
		      }
		    });
		  
	//sino hay imagenes las instrucciones son otras y la papelera no es necesaria
	} else {
		contenedor.html('');
		instrucciones = $( htmlSinMedios );

		//imprimo instrucciones si no hay imagenes
		contenedor.append(instrucciones);
	}

	//oculta data de imagen
	$('.data-medio').fadeOut();
	//muestra data de imagen on mouse hover
	$('.medio').hover(
		function(){
			$(".data-medio", this).fadeIn();
		}, function() {
			$('.data-medio', this).fadeOut();
		}
	);//hover


	$('.del-medio').click(function(){
		var papelera = $( '#recicle-bin' );
		li = this.closest('li');
		papelera.append(li);
	});

	/*
	* Save button
	*/	

	$('.submit-save').click(function( event ){
		event.preventDefault();
		var btn = $(this);
		//texto botones
		var btnNormalText = btn.html();
		var btnSavingText = 'guardando';
		var btnSavedText = 'guardado';

		//objeto a pasar al servidor
		var data = {'galeria' : [], 'recicleBin' : []};

		//busca medios en papelera de reciclaje
		imgToDelete = $( '#recicle-bin' ).find('.medio');

		for (i = 0; i < imgToDelete.length; i++) {
			var image_id = $(imgToDelete[i]).find('input[name=image_id]').val();

			var obj = {
				'image_id': image_id
			}

			data.recicleBin.push(obj);
		}
		
		//orden galeria de imagenes		
		var imagenes = $('.medio');

		for ( i = 0; i < imagenes.length; i++) {
			var image_id = $(imagenes[i]).find('input[name=image_id]').val();
			var orden = $(imagenes[i]).find('input[name=orden]').val();
			
			var obj = {
				'image_id': image_id,
				'orden': orden
			}

			data.galeria.push(obj);
		}

		//envio la data al servidor para que se guarde
		$.ajax( {
				type: 'POST',
				url: ajaxFunctionDir + '/update-medios.php',
				data: {
					galeria: data.galeria,
					recicleBin: data.recicleBin
				},
	            //funcion antes de enviar
	            beforeSend: function() {
	            	//cambio texto del boton
	            	btn.html(btnSavingText);
	            	
	            },
				success: function ( response ) {
					btn.html(btnSavedText);
					//recarga el modulo
					location.reload();
				},
				error: function ( ) {
					console.log('error');
				},
		});//cierre ajax

	})//click save
});



/*
 * EN LA GALERIA CAMBIA EL POST TYPE
*/

$('.click_posttype').click(function  (){
	$('.post-type-categoria').val( $(this).attr('href').substr(1) );
	
});

/*
* UPLOAD IMAGE
* Esta función también se usa en el mini modulo-medio
*/

$(document).ready(function(){
	//subir la imagen por ajax
	$('#upload_file').submit(function( event ){
		event.preventDefault();
		var formulario = $( this );
		var imgAjax = $( '.load-ajax' );
		var formData = new FormData( formulario[0] );
		var postType = '';
		if ( $('.post-type-categoria').val() != '' ) {
			postType = $('.post-type-categoria').val();
		}
		var url = ajaxFunctionDir + '/upload-medios.php';
		formData.append('post_type', postType);

		//si se carga desde promociones el post type es promo
		/*if ( location.search.split("=")[1] == 'promociones' ) {
			postType = 'promo';
			formData.append('post_type', postType);
		}
		//si se carga desde sliders el post type es sliders
		if ( location.search.split("=")[1].split("&")[0] == 'editar-slider' ) {
			postType = 'slider';
			formData.append('post_type', postType);
		}*/
		
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
				console.log(response);
				$( '.load-ajax' ).fadeOut();

				//si nos devuelve el error lo pasamos al usuario
				if ( response == 'error-type') {
					alert('no es el archivo adecuado');
				} else {
					//se recodifica el json
					response = $.parseJSON(response);
					
					if (response.length == 2) {
						//url de imagen por defecto
						var previewHtml = uploadsDir+'/'+response[0];
						if ( is_file(response[0]) ) {
							//si es un archivo en vez de mostrar la imagen subida mostramos un icono:
							previewHtml = administradorUrl+'/assets/images/icon-file.png';
						}
						var html = '<input type="hidden" class="previewAtachment" name="previewAtachment" value="'+response[0]+'"><img class="preview-image img-responsive" src="'+previewHtml+'"><p><a href="" class="preview-file"></a></p>';
						var node = $(html);
						$('.preview-wrapper').append(node);
					} else {
						for (var i = 0; i < response.length; i+=2) {
							//url de imagen por defecto
							var previewHtml = uploadsDir+'/'+response[i];
							if ( is_file(response[i]) ) {
								//si es un archivo en vez de mostrar la imagen subida mostramos un icono:
								previewHtml = administradorUrl+'/assets/images/icon-file.png';
							}
							var html = '<input type="hidden" class="previewAtachment" name="previewAtachment" value="'+response[i]+'"><img class="preview-image img-responsive" src="'+previewHtml+'"><p><a href="" class="preview-file"></a></p>';
							var node = $(html);
							$('.preview-wrapper').append(node);
						}
					}
					//si estan en la biblioteca de medios, al terminar de subir se vuelve a cargar la pagina
					if ( ( location.search.split("=")[1] == 'biblioteca-medios' ) || (location.search.split("=")[1] == 'galeria-imagenes') ) {
						location.reload();
					}
				}	
			},
			error: function ( error ) {
				console.log('erroraquí');
			},
		});//cierre ajax
	});//submit
});//ready

function is_file(file) {
	var myArraySplit = file.split('.');
	var ext = myArraySplit[myArraySplit.length-1];
	
	if ( ext != 'jpg' && ext != 'gif' && ext != 'png' && ext != 'jpeg' ) {
		return true;
	} else {
		return false;	
	}
}

function checkPostType( nameFile, postType ) {
	
	$.ajax( {
			type: 'POST',
			url: ajaxFunctionDir + '/check-post-type.php',
			data: {
				imagen: nameFile,
				post_type: postType,
			},
			success: function ( response ) {
				console.log(response);
				if ( response == 'ok') {
					$('.error-tag').text('Imagen actualizada');
				} else {
					$('.error-tag').text('hubo un error, cambie la imagen nuevamente');
				}
			},
			error: function ( ) {
				console.log('error');
			},
	});//cierre ajax
	
}