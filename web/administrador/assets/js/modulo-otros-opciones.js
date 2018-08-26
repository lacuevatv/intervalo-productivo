/*
* Funciones: otras opciones, por ejemplo links de redes sociales, teléfonos e incluso archivos para descargar
*/
$(document).ready(function() {

	$(document).on('click','.btn-del-file-opciones',function(){
		if (confirm('Seguro quiere borrar el archivo')) {
            var optionsName = $(this).closest('ul').attr('data-id') + '-' + $(this).attr('data-file');
            var contenedor = $(this).closest('li');
            
            $.ajax( {
	            type: 'POST',
	            url: ajaxFunctionDir + '/delete-archivo.php',
	            data: {
	                optionsName: optionsName,
	            },
	            success: function ( response ) {
	            	if (response == 'deleted') {
                        //borra lo que hay
                        $(contenedor).find('input').remove();
                        $(contenedor).find('a').remove();
                        $(contenedor).find('.btn-change-file-opciones').remove();
                        $(contenedor).find('.btn-del-file-opciones').remove();
	            	    //agrega el nuevo boton por si se quiere agregar otro archivo
                        html = '<button class="btn-new-file-opciones" data-file='+optionsName+'>Agregar archivo</button>';
                        contenedor.append($(html));
	                }
	            },
	            error: function ( ) {
	                console.log('error');
	            },
	        });//cierre ajax
	
		}
	});


    //nuevo archivo
	$(document).on('click','.btn-new-file-opciones',function(){
		var contenedor = $(this).closest('li');
        //var optionsName = $(this).attr('data-file');
        var optionsName = $(this).closest('ul').attr('data-id') + '-' + $(this).attr('data-file');
        var btn = $(this);
		$( "#dialog" ).dialog({
			title: 'Biblioteca de medios',
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
		    	text: 'Insertar archivo',
		    	class: 'btn btn-primary',
		    	click: function () {
		    		newImage = $('.previewAtachment').val();
					if ( newImage != '') {
						//inserta nombre de imagen en hidden
						$(contenedor).find('input').val(newImage);
						//borra el boton
						$(btn).remove();
						//crea el html para verlo y tener nuevos botones
						html = '<a href="'+uploadsDir+'/'+newImage+'" target="_blank">'+newImage+'</a><button class="btn-change-file-opciones" data-file='+optionsName+'>Cambiar archivo</button><button class="btn-del-file-opciones" data-file='+optionsName+'>Borrar</button>';
                        contenedor.append($(html));
                        //si hay alguna imagen llama a la función de crear el item en bd
		    			saveItemBD( newImage, optionsName, 'true');
		    		}
		    		//cierra dialogo de carga
		    		$( this ).dialog( "close" );
		    	}
		    },
		  ],
		});

		$( "#dialog" ).dialog( 'open' )
		.load( templatesDir + '/media-browser.php' );

	});

    //cambia archivos
	$(document).on('click','.btn-change-file-opciones',function(){
        var contenedor = $(this).closest('li');
        var optionsName = $(this).closest('ul').attr('data-id') + '-' + $(this).attr('data-file');
        //var optionsName = $(this).attr('data-file');
        var btn = $(this);
		$( "#dialog" ).dialog({
			title: 'Biblioteca de medios',
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
		    	text: 'Insertar archivo',
		    	class: 'btn btn-primary',
		    	click: function () {
		    		newImage = $('.previewAtachment').val();
					if ( newImage != '') {
						//crea el html para verlo y tener nuevos botones
						html = '<a href="'+uploadsDir+newImage+'" target="_blank">'+newImage+'</a><button class="btn-change-file-opciones">Cambiar archivo</button><button class="btn-del-file-opciones">Borrar</button>';
                        contenedor.append($(html));
                        //si hay alguna imagen llama a la función de crear el item en bd
                        saveItemBD( newImage, optionsName, 'false');
                        
                        //borra el boton
						$(btn).remove();
		    		}
		    		//cierra dialogo de carga
		    		$( this ).dialog( "close" );
		    	}
		    },
		  ],
		});

		$( "#dialog" ).dialog( 'open' )
		.load( templatesDir + '/media-browser.php' );

	});
    

    //una vez subido el archivo lo guarda en base de datos
    function saveItemBD( newImage, optionsName, newfalse ) {
		var contenedor = $('.sliders-wrapper');
			
		var urlimg = uploadsDir + '/' + newImage;
		$.ajax( {
            type: 'POST',
            url: ajaxFunctionDir + '/new-save-file.php',
            data: {
                file: newImage,
                new: newfalse,
                optionsName: optionsName,
            },
            success: function ( response ) {
                $( '.load-ajax' ).fadeOut();
            },
            error: function ( ) {
                console.log('error');
            },
        });//cierre ajax
				
			
	}//saveItemBD()

    
});