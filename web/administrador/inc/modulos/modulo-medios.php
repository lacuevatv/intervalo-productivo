<?php
/*
IMPRIME LA GALERÍA DE MEDIOS POR FILE TYPE: ARCHIVOS O IMAGENES
EL SEGUNDO PARAMETRO HABILITA LOS CONTROLES, EN LA BIBLIOTECA LOS MUESTRA, PARA ORDENAR O BORRAR, PERO CUANDO SE ABRE COMO DIÁLOGO NO MUESTRA ESAS OPCIONES
*/
function printImagesGalery( $file_type, $controls = false, $post_type = 'all') {
	$connection = connectDB();
	$tabla      = 'medios';
	$query      = "SELECT * FROM " .$tabla. " WHERE medio_tipo= '" .$file_type. "'";
	
	if ( $post_type != 'all' ) {
		$query      .= " AND medio_post_type= '" .$post_type. "' ";
	}

	$query      .= "ORDER by medio_orden asc ";
	$result     = mysqli_query($connection, $query);
	
	$directorio = UPLOADSURLIMAGES;
	if ( $file_type != 'imagen' ) {
		$directorio = UPLOADSURLFILES;
	}

	if ( $result->num_rows == 0 ) {
	  
	  echo '<div class="error-tag">No hay medios cargados.</div>';
	} else {
		while ($row = $result->fetch_array()) {
			$rows[] = $row;
		}
		
		//html de galería a imprimir contenedores
		?>
		  	<div class="galeria-medios">
				<ul id="libreria" class="lista-medios connectedSortable">
				<?php 
			  	for ($i = 0; $i < count($rows); $i++ ) {
			  		//lista html de galería a imprimir
				  	?>
					<li class="medio">
						<article class="thumbnail">
							<?php if ( $controls ) { ?>
							<a href="<?php echo $directorio . '/' . $rows[$i]['medio_nombre']; ?>" target="_blank">

							<div class="data-medio">
								
								<h1><?php echo $rows[$i]['medio_nombre']; ?></h1>
								<p class="texto-orden">Orden:<?php echo $rows[$i]['medio_orden']; ?> </p>
								<p class="texto-orden"><?php echo $rows[$i]['medio_post_type']; ?> </p>
								
							</div>

							<input type="hidden" name="image_id" value="<?php echo $rows[$i]['medio_id']; ?>">
							<input type="hidden" name="orden" value="<?php echo $rows[$i]['medio_orden']; ?>">
							<?php } ?>
							<figure>
								<?php if ( $file_type != 'imagen' ) { ?> 
								<img src="<?php echo '/administrador/assets/images/icon-file.png'; ?>" class="img-responsive" data-src="<?php echo $rows[$i]['medio_nombre']; ?>">
								<?php } else { ?> 
								<img src="<?php echo $directorio . '/' . $rows[$i]['medio_nombre']; ?>" class="img-responsive" data-src="<?php echo $rows[$i]['medio_nombre']; ?>">
								<?php } ?>
							</figure>

							<?php if ( $file_type != 'imagen' ) { ?> 
								<h1><?php echo $rows[$i]['medio_nombre']; ?></h1>
							<?php } ?>
							<?php if ( $controls ) { ?>
							</a>
							<?php } ?>
							
						</article>
					<?php if ( $controls ) { ?>
						<button class="del-medio">Borrar</button>
					<?php } ?>
					</li>
				<?php
	  	}
	  	//html a imprimir, fin contenedores
		?>
		  	</ul>
		</div>
	<?php if ( $controls ) { ?>
		<div class="row">
			<div class="col save-button-right">
				<button class="btn btn-danger submit-save">Guardar cambios</button>
				<p><small>Guarda orden y borra imagenes de la papelera de reciclaje.</small></p>
			</div>
		</div>
	<?php } 
	}
	
	/* liberar la serie de resultados */
	mysqli_free_result($result);
	closeDataBase($connection);
}//printImagesGalery()