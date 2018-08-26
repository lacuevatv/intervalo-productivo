$(document).ready(function(){
	
	var activeCheck = $('.answered_email');
	var saveNote = $('.save_notes_email');


	//exportar a excel
	$( '#export_excel' ).click(function( event ) {
		$("#datos_a_enviar").val( $("<div>").append( $('.tabla-contactos').eq(0).clone()).html());
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
	
	//guarda si se clickea en contestado
	activeCheck.click(function ( event ) {
		var checked = '0';
		var idform = this.getAttribute('data-id');

		if (this.checked) {
		  checked = '1';
		}

		$.ajax( {
				type: 'POST',
				url: 'inc/answered_email.php',
				data: {checked: checked, id: idform},
	            //funcion antes de enviar
	            beforeSend: function() {
	            	console.log('guardando cambios');
	            	//cambio texto del boton
	            },
				success: function ( response ) {
					console.log('cambios guardados');
					console.log(response);
				},
				error: function ( ) {
					console.log('error');
				},
			});//cierre ajax

	});//cierra click contestado

	//guarda las notas al presionar save
	saveNote.click(function ( event ) {
		
		var idform = this.getAttribute('data-id');
		var textarea = $(this).parents()[1].children[0].value;
		
		$.ajax( {
				type: 'POST',
				url: 'inc/save_notes_email.php',
				data: {id: idform, textarea: textarea},
	            //funcion antes de enviar
	            beforeSend: function() {
	            	console.log('guardando cambios');
	            	//cambio texto del boton
	            },
				success: function ( response ) {
					console.log('cambios guardados');
					console.log(response);
				},
				error: function ( ) {
					console.log('error');
				},
			});//cierre ajax
		
	});

});//document ready