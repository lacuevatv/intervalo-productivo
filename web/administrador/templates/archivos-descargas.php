<?php
load_module( 'medios' );
load_module( 'otros-opciones' );
global $categoriasArchivos;
?>
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Archivos para descargar
	</h1>
	<div class="container">

		<div class="row">
	<?php 
		//primero columnas
		for ($i=0; $i < count($categoriasArchivos); $i++) {
            $items = $categoriasArchivos[$i]['lista'];
            ?>
			<div class="col-30">
				<h2>
					<?php echo $categoriasArchivos[$i]['nombre'] ?>
				</h2>
				<ul class="otras-opciones" data-id="<?php echo $categoriasArchivos[$i]['slug']; ?>">
                
                <?php
                
                foreach ($items as $item) { 
                    $index = 0;
                    ?>
                    <li>
                        <strong class="Titulo"><?php echo $item; ?>: </strong>
                        
                        <?php 
                        $optionsName = $categoriasArchivos[$i]['slug'] . '-' .$item;
                        $archivo = getFile( $optionsName );
                        if ( $archivo != null ) { ?>
                            
                        <input type="hidden" name="file" value="<?php echo $archivo['options_value']; ?>">
                        <a href="<?php echo UPLOADSURLFILES .'/'. $archivo['options_value']; ?>" target="_blank">
                            <?php echo $archivo['options_value']; ?>
                        </a>
                        <button class="btn-change-file-opciones" data-file="<?php echo $item; ?>">Cambiar archivo</button>
                        <button class="btn-del-file-opciones" data-file="<?php echo $item; ?>">Borrar</button>
                        
                        <?php } else { ?>
                            <button class="btn-new-file-opciones" data-file="<?php echo $item; ?>">Agregar Archivo</button>
                        <?php } ?>
                    </li>
                <?php }//foreach
                ?>
				</ul>
			</div>
            
	<?php }//for columnas ?>
			
		</div><!-- //row -->
	</div><!-- // container -->
</div><!-- // wrapper interno modulo -->
<div id="dialog"></div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>