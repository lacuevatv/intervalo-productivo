<?php
/*
 * ver lista de noticias
 * parametros: limite a mostrar, estado (publicado, borrador, todos), estilo (el extendido mustra botones para editar la noticia, verla o publicarla), la categoria a mostrar y si muestra al final un pequeño resumen de lo que queda
*/
function listaNoticias( $limit = 20, $status = 'all', $extended = false, $categoria = 'none', $resumenQuery = false ) {
	$connection = connectDB();
	$tabla = 'posts';

	//queries según parámetros
	$query  = "SELECT * FROM " .$tabla. " ORDER by post_fecha desc LIMIT ".$limit." ";
	//si tiene categoria:
	if ( $categoria != 'none' ) {
		$query  = "SELECT * FROM " .$tabla. " WHERE post_categoria='".$categoria."' ORDER by post_fecha desc LIMIT ".$limit." ";
	}
	//si tiene definido status (publicado, borrador) y categoria
	if ( $status != 'all' ) {
		$query  = "SELECT * FROM " .$tabla. " WHERE post_status='".$status."' ORDER by post_fecha desc LIMIT ".$limit." ";
	}
	//si tiene definido status y categoria
	if ( $status != 'all' && $categoria != 'none' ) {
		$query  = "SELECT * FROM " .$tabla. " WHERE post_status='".$status."' AND post_categoria='".$categoria."' ORDER by post_fecha desc LIMIT ".$limit." ";
	}
	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		echo '<div class="error-tag">Ninguna noticia ha sido cargada todavía</div>';
	} else {

		while ( $row = $result->fetch_array() ) {
			$rows[] = $row;
		}

		foreach ($rows as $row ) {
		 	$postID       = $row['post_ID'];
			$titulo       = $row['post_titulo'];
			$url          = $row['post_url'];
			$imgDestacada = $row['post_imagen'];
			$resumen      = $row['post_resumen'];
			$contenido    = $row['post_contenido'];
			$video        = $row['post_video'];
			$categoria    = $row['post_categoria'];
			$galeria      = $row['post_galeria'];
			$imgGaleria   = $row['post_imagenesGal'];
			$status       = $row['post_status'];
			$date         = $row['post_fecha'];

			$meses        = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
			$dia          = date("d", strtotime($date));
			$mes          = $meses[date("n", strtotime($date))-1];
			$year         = date("Y", strtotime($date));
		
			?>
			<li class="loop-noticias-backend-item">
				<article class="row">
				    <div class="col-30">
				    	<?php 
				    	if ( $imgDestacada != '' ) { ?>
				    	<img src="<?php echo UPLOADSURLIMAGES.'/'.$imgDestacada; ?>" alt="Imagen Destacada de la noticia" class="img-responsive">
				    	<?php }
				    	else { ?>
				    	<img src="assets/images/noticia-img-default.png" alt="Noticias" class="img-responsive">
				    	<?php } ?>
				    </div>
				    <div class="col-70">
				    	<?php 
				    	if ( $extended ) {
				    		?>
	
				    	<h1 class="titulo-noticia-small">
				    		<?php echo $titulo; ?> 
				    		| 
				    		<span><?php echo $status; ?></span>
				    		- 
				    		<small><?php echo $date; ?></small>
				    	</h1>
				    	<p class="links-edicion-noticias">
				    		<a href="index.php?admin=editar-noticias&slug=<?php echo $url; ?>" title="Editar" class="btn-edit-news">
					    		Editar Noticia
					    	</a>
					    	<?php 
				    			if ( $status != 'publicado' ) {
				    		?>
				    		 | <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] .'/noticias/'. $url ?>" target="_blank" title="Ver">Vista Previa</a>
				    		 | <a href="<?php echo $url; ?>" class="btn-publish-post" title="Publicar">Publicar</a> 
				    		 | <a href="<?php echo $url; ?>" class="btn-delete-post">Borrar</a>
				    		<?php } else { ?>
				    		 | <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] .'/noticias/'. $url ?>" target="_blank" title="Ver">Ver noticia</a>
				    		 | <a href="<?php echo $url; ?>" class="btn-delete-post">Borrar</a>
				    		 <?php } ?>
				    	</p>
						<?php	    	
				    	} 
				    	//si es estilo clasico:
				    		else { ?>
				    	<a href="index.php?admin=editar-noticias&slug=<?php echo $url; ?>" title="Editar" class="titulo-noticia-small-link">
					    	<h1 class="titulo-noticia-small">
					    		<?php echo $titulo; ?> 
					    		| 
					    		<span><?php echo $status; ?></span>
					    		- 
					    		<small><?php echo $date; ?></small>
					    	</h1>
				    	</a>
				    	<?php } ?>
				    </div>
				</article>
			</li>
		<?php

		}//FOREACH
		//muestra el resumen de la búsqueda y lo imprime al final
		if ( $resumenQuery ) {
			$totales = mysqli_query($connection, "SELECT *  FROM " .$tabla. " ");
			$cantTotal = $totales->num_rows;
			$cargadasenQuery = count($rows);
			//echo $cargadasenQuery . ' noticias cargadas. '.$cantTotal.' noticias en total' ;
			$restantes = $cantTotal-$cargadasenQuery;
			$texto1 = $cantTotal.' noticias en total. '.$cargadasenQuery. ' cargadas ahora. '.$restantes.' restantes.';
			$texto2 = $cantTotal.' noticias en total. '.$cargadasenQuery. ' cargadas ahora. 0 restantes.';
			//2 opciones: si queda más muestra cuantas quedan sino indica que no hay más
			if ( intval($restantes) > 0 ) {
				echo '<p class="info-resumen">'.$texto1.'</p>';
			} else {
				echo '<p class="info-resumen">'.$texto2.'</p>';
			}
		}
	}//ELSE

	closeDataBase($connection);
}


/*
* BUSCA LA NOTICIA POR EL SLUG Y DEVUELVE TODOS SUS PARAMETROS
*/
function searchPost ( $slug ) {
	$connection = connectDB();
	$tabla = 'posts';
	//queries según parámetros
	$query  = "SELECT * FROM " .$tabla. " WHERE post_url='".$slug."' LIMIT 1";	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		echo 0;
	} else {
		$data = mysqli_fetch_array($result);

		$postID       = $data['post_ID'];
		$date         = $data['post_fecha'];
		$meses        = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
		$dia          = date("d", strtotime($date));
		$mes          = $meses[date("n", strtotime($date))-1];
		$year         = date("Y", strtotime($date));
		$resumen      = $data['post_resumen'];
		$galeria      = $data['post_galeria'];
 		$imgGaleria   = array();

		if ( $data['post_imagenesGal'] != '' ) {
			$imgGaleria = unserialize( $data['post_imagenesGal'] );
		}
		

		global $dataPost;
		$dataPost = array(
				'post_id'      => $data['post_ID'],
				'titulo'       => $data['post_titulo'],
				'url'          => $data['post_url'],
				'imgDestacada' => $data['post_imagen'],
				'resumen'      => $resumen,
				'contenido'    => $data['post_contenido'],
				'video'        => $data['post_video'],
				'categoria'    => $data['post_categoria'],
				'galeria'      => $data['post_galeria'],
				'imgGaleria'   => $imgGaleria,
				'fecha'        => $date,
				'dia'          => $dia,
				'mes'          => $mes,
				'year'         => $year,	
				'status'       => $data['post_status'],
			);

		closeDataBase($connection);

		return $dataPost;
	}
		
}//searchPost()