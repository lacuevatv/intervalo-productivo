/*
* Funciones: del modulo de suscriptores: 
* 
* 
*/

$(document).ready(function(){

	$( '#export_excel' ).click(function( event ) {
		$("#datos_a_enviar").val( $("<div>").append( $('.tabla-suscriptores').eq(0).clone()).html());
		$("#FormularioExportacion").submit();
	});//click boton
	//imprime tabla
	$( '#print_tabla' ).click(function( event ) {
		var tablaAImprimir = $('.tabla-contactos');
		var ventimp = window.open(' ', 'popimpr');
		  ventimp.document.write( tablaAImprimir[0].innerHTML );
		  ventimp.document.close();
		  ventimp.print( );
		  ventimp.close();
	});

	//cargar nuevo suscriptor
	$(document).on('click','#new-suscriptor',function(){
		
		$( "#formulario-suscriptor" ).dialog({
			title: 'Nuevo Suscriptor',
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
		    	text: 'Guardar Suscriptor',
		    	class: 'btn btn-primary',
		    	click: function () {
		    		var formulario = $('#formulario-registro-suscriptor');
		    		var nombre = $(formulario).find('#fname').val();
		      		var	apellido = $(formulario).find('#lname').val();
		            var dni = $(formulario).find('#dni').val();
		            var email = $(formulario).find('#email').val();
		            var tel = $(formulario).find('#telephone').val();


		    		$.ajax( {
				        type: 'POST',
				        url: ajaxFunctionDir + '/new-suscriptor-manual.php',
				        data: {
				            nombre: nombre,
				            apellido: apellido,
				            dni: dni,
				            email: email,
				            tel: tel,
				        },
				        beforeSend: function() {
				            console.log('guardando');
				        },
				        success: function ( response ) {
			                console.log(response);
				            if (response == 'ok') {
								location.reload(true);
				            }
				            else {
				            	$('.form-response').append(response)
				            }
				        },
				        error: function ( ) {
				            console.log('error');
				        },
				    });//cierre ajax

		    	}
		    },
		  ],
		});
		
		$( "#formulario-suscriptor" ).dialog( 'open' ).load( templatesDir + '/formulario-suscriptor.php' );

	});

	//borrar usuario
	$(document).on('click','.del-user',function(){
		var id = $(this).attr('data-id');
		console.log(id);

		$.ajax( {
	        type: 'POST',
	        url: ajaxFunctionDir + '/delete-suscriptor.php',
	        data: {
	            id: id,
	        },
	        beforeSend: function() {
	            console.log('borrando');
	        },
	        success: function ( response ) {
                console.log(response);
	            if (response == 'deleted') {
					location.reload(true);
	            }
	            else {
	            	$('.contacts-container').append(response)
	            }
	        },
	        error: function ( ) {
	            console.log('error');
	        },
	    });//cierre ajax
	});
	

});
