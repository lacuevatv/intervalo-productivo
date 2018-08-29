/*
* EDITAR CLIENTES
*/

$(document).ready(function (){
		
	//Sube nueva imagen para crear nuevo slider
	$('#imagen_destacada_wrapper').on('click','#new-item',function(){

		$( "#dialog" ).dialog({
			title: 'Biblioteca de imágenes',
			autoOpen: false,
			appendTo: '.contenido-modulo',
			height: 600,
			width:768,
			modal: true,
			buttons: [
		    {
		    	text: "Cerrar",
		      	class: 'btn btn-default',
		      	click: function() {
		        $( this ).dialog( "close" );
		      }
		    },
		    {
		    	text: 'Insertar imagen',
		    	class: 'btn btn-primary',
		    	click: function () {
		    		newImage = $('.previewAtachment').val();
					if ( newImage != '') {
						//si hay alguna imagen llama a la función de crear el item en bd
		    			crearItemCliente( newImage );
		    		}
		    		//cierra dialogo de carga
		    		$( this ).dialog( "close" );
		    	}
		    },
		  ],
		});

		$( "#dialog" ).dialog( 'open' )
		.load( templatesDir + '/media-browser.php' );

	});//Sube nueva imagen para crear nuevo slider


	//esta funcion crea nuevo slider en base de datos si la imagen se cargó con exito, necesita el nombre de la imagen y la ubicación para guardar el slider
	function crearItemCliente( clienteImagen ) {
		var contenedor = $('.sliders-wrapper');
			
		var urlimg = uploadsDir + '/' + clienteImagen;
		$.ajax( {
            type: 'POST',
            url: ajaxFunctionDir + '/save-cliente-item.php',
            data: {
                imagen: clienteImagen,
                new: 'true',
            },
            success: function ( response ) {
            	$( '.load-ajax' ).fadeOut();
				contenedor.prepend(response);
            },
            error: function ( ) {
                console.log('error');
            },
        });//cierre ajax
				
			
	}//crearSliderIMG()

	//clic en guardar cambios item
	$(document).on('click', '.btn-guardar', function(){
		var clienteId = $(this).attr('data-id');
		var item = '#'+clienteId
		var ID = $(item);
		var texto = ID.find('textarea').val();
		var imagen = ID.find('input[type=hidden]').val();
		var input = $(ID.find('input'));
		var orden = $(input[1]).val();
		var titulo = $(input[2]).val();
        var url = $(input[3]).val();
        var serviciosActivos = $(input[4]).val();
		
		var msj = ID.find('.msj-guardar');
		
		if (orden == '') {
			orden = 0;
		}
		
		$.ajax( {
	            type: 'POST',
	            url: ajaxFunctionDir + '/save-cliente-item.php',
	            data: {
	                clienteId: clienteId,
	                texto: texto,
	                imagen: imagen,
	                titulo: titulo,
	                url: url,
                    orden: orden,
                    servicios: serviciosActivos,
	                new: 'false',
	            },
	            beforeSend: function() {
	            	msj.html('guardando, espere');
            	},
	            success: function ( response ) {
                    console.log(response)
	            	if (response == 'saved') {
	            	//borra el slider del front
	                	msj.html('guardado');
	                	ID.find('.msj-guardar-imagen').empty();
	                } else {
	                	msj.html('error');
	                }
	            },
	            error: function ( ) {
	                console.log('error');
	            },
	        });//cierre ajax

	});//click btn-guardar
	
		
	//clic en borrar cambios
	$('body', this).on('click', '.btn-borrar', function(){
		var clienteID = $(this).attr('data-id');
		var contenedor = '#'+clienteID;
		
		if ( confirm( '¿Está seguro de querer BORRAR este item del slider?' ) ) {
			$.ajax( {
	            type: 'POST',
	            url: ajaxFunctionDir + '/delete-cliente-item.php',
	            data: {
	                clienteID: clienteID,
	            },
	            success: function ( response ) {
	            	if (response == 'deleted') {
	            	//borra el slider del front
	                	$(contenedor).remove()
	                }
	            },
	            error: function ( ) {
	                console.log('error');
	            },
	        });//cierre ajax
		}//if

	});//click btn-borrar

	//modificar la foto
	$(document).on('click', '.btn-recargar', function(){
		var clienteId = $(this).attr('data-clienteID');
		var item = '#'+clienteId
		var ID = $(item);
		var InputImagen = ID.find('input[type=hidden]');
		var ImagenMostrar = ID.find('img');
		var msjExito = 'No te olvides de guardar item'
		var msj = ID.find('.msj-guardar-imagen');

		$( "#dialog" ).dialog({
			title: 'Biblioteca de imágenes',
			autoOpen: false,
			appendTo: '.contenido-modulo',
			height: 600,
			width:768,
			modal: true,
			buttons: [
		    {
		    	text: "Cerrar",
		      	class: 'btn btn-default',
		      	click: function() {
		        $( this ).dialog( "close" );
		      }
		    },
		    {
		    	text: 'Insertar imagen',
		    	class: 'btn btn-primary',
		    	click: function () {
		    		newImage = $('.previewAtachment').val();
					msj.html(msjExito);
		    		InputImagen.val(newImage);
		    		ImagenMostrar.attr('src', uploadsDir + '/' + newImage);
		    		$( this ).dialog( "close" );
		    	}
		    },
		  ],
		});

		$( "#dialog" ).dialog( 'open' )
		.load( templatesDir + '/media-browser.php' );

	});//modificar la foto

});//ready