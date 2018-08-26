<?php
//load_module( 'otros-opciones' );
global $infoAdicional;

?>
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Info Adicional
	</h1>
	<div class="container">

		<div class="row">
	<?php 
		//primero columnas
		for ($i=0; $i < count($infoAdicional); $i++) { ?>
			<div class="col-30">
				<h2>
					<?php echo $infoAdicional[$i]['name'] ?>
				</h2>
				<ul class="otras-opciones" data-id="<?php echo $infoAdicional[$i]['id'] ?>">
			<?php
			//luego lista de cada una
				$items = $infoAdicional[$i]['data'];
				foreach ($items as $item) { 
					if ($item['type'] == 'text' ) : ?>
					<li class="type-text">
						<label>
							<?php echo $item['name']; ?>
							<br>
							<input name="<?php echo  $infoAdicional[$i]['id'].'-'. $item['id']; ?>" type="text" value="<?php echo $item['data']; ?>">
						</label>
					</li>
					<?php else : ?>
					<li class="type-file">
						<strong class="Titulo"><?php echo $item['name']; ?>: </strong>
						<?php if ( $item['data'] != '' ) : ?>
							<input type="hidden" name="<?php echo  $infoAdicional[$i]['id'].'-'. $item['id']; ?>" value="<?php echo $item['data']; ?>">
							<a href="<?php echo UPLOADSURLFILES .'/'. $item['data']; ?>" target="_blank">
								<?php echo $item['data']; ?>
							</a>
							<button class="btn-change-file-opciones">Cambiar archivo</button>
							<button class="btn-del-file-opciones">Borrar</button>
						<?php else : ?>
							<button class="btn-change-file-opciones">Agregar Archivo</button>
						<?php endif; ?>
					</li>
					<?php endif; ?>
				<?php }//foreach ?>

				</ul>
			</div>
			
	<?php }//for columnas ?>
			
		</div><!-- //row -->
		<button class="btn btn-primary btn-save">Guardar Cambios</button>
	</div><!-- // container -->
</div><!-- // wrapper interno modulo -->
<div id="dialog"></div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>