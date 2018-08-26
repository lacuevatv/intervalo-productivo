<?php
/*
 * Noticias recientes
 * Lista las noticias publicadas y con links para verlas, editarlas o publicarlas
 * Since 3.0
 * 
*/
load_module( 'contactos' );
?>

<!---------- noticias ---------------->
<div class="contenido-modulo">
	<div class="container">
		
		<?php 
		$suscriptores = getContacts();
		?>
		<div class="contacts-container">
			<div class="btn-group" role="group" aria-label="botones-emails">

			  <button id="export_excel" type="button" class="btn btn-default">
			  	Exportar a Excel
			  </button>
			  <!--<button id="new-suscriptor" type="button" class="btn btn-primary">
			  	Nuevo Suscriptor
			  </button>-->
			  
			</div>
			<table class="tabla-suscriptores" width="100%">
				<thead>
					<tr>
						<td width="5%">
							Id:
						</td>
						<td width="20%">
							email:
						</td>
						<td width="10%">
							Nombre:
						</td>
						<td width="10%">
							Teléfono:
						</td>
						<td width="35%">
							Mensaje
						</td>
                        <td width="15%">
							Fecha de envío:
						</td>
						<td width="5%">
							
						</td>
					</tr>
				</thead>
				<tbody>
					<?php 
					if ( $suscriptores != null ) :
						for ($i=0; $i < count($suscriptores); $i++) { 
							?>
						<tr>
							<td>
								<?php echo $suscriptores[$i]['contacto_id']; ?>
							</td>
							<td>
								<?php echo $suscriptores[$i]['contacto_email']; ?>
							</td>
							<td>
								<?php echo utf8_decode($suscriptores[$i]['contacto_nombre']); ?>
							</td>
							<td>
	                            <?php echo $suscriptores[$i]['contacto_telefono']; ?>
							</td>
							<td class="font-reduce">
	                            <?php echo utf8_decode($suscriptores[$i]['contacto_mensaje']); ?>
							<td>
								<?php echo date('d.m.y' ,strtotime($suscriptores[$i]['contacto_fecha_formulario']) ); ?>
							</td>
							<td>
								<button title="Borrar suscriptor" class="del-user" data-id="<?php echo $suscriptores[$i]['id']; ?>">
									<img src="<?php echo URLADMINISTRADOR; ?>/assets/images/delbtn.png" alt="Borrar usuario">
								</button>
							</td>
						</tr>
							<?php 
						}
					endif;
					?>
				</tbody>
			</table>
		</div>

		<form action="inc/export_excel.php" method="post" target="_blank" id="FormularioExportacion">
			<input type="hidden" id="datos_a_enviar" name="datos_a_enviar" />
		</form>

	</div><!-- // container gral modulo -->
</div><!-- // container -->
<!-- botones del modulo -->
<div id="formulario-suscriptor">
	
</div>
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>

<!---------- fin noticias ---------------->