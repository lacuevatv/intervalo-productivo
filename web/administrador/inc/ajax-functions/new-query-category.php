<?php 
/*
 * Sitio web: ATSA
 * @LaCueva.tv
 * Since 3.0
 * carga otras noticias de acuerdo a la categoria que le piden
*/
require_once('../functions.php');
$noticiasPorPagina = 10;
$connection = connectDB();
$tabla = 'posts';
$categoria = isset( $_POST['categoria'] ) ? $_POST['categoria'] : 'none';
	$query  = "SELECT *  FROM " .$tabla. " WHERE post_categoria='".$categoria."' ORDER by post_fecha desc LIMIT ".$noticiasPorPagina." ";	

if ( $categoria == 'none' ) {
	$query  = "SELECT *  FROM " .$tabla. " ORDER by post_fecha desc LIMIT ".$noticiasPorPagina." ";
}

$result = mysqli_query($connection, $query);

if ( $result->num_rows == 0 ) {
	echo 'No hay más noticias para cargar';
} else {

	while ( $row = $result->fetch_array() ) {
		$rows[] = $row;
	}

	foreach ($rows as $row ) { 
		$titulo       = $row['post_titulo'];
		$url          = $row['post_url'];
		$imgDestacada = $row['post_imagen'];
		$resumen      = $row['post_resumen'];
		$contenido    = $row['post_contenido'];
		$video        = $row['post_video'];
		$categoria    = $row['post_categoria'];
		$galeria      = $row['post_galeria'];
		$imgGaleria   = $row['post_imagenesGal'];
		$linkExterno  = $row['post_link_externo'];
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
				    	<img src="assets/images/noticia-img-default.png" alt="Noticias-ATSA" class="img-responsive">
				    	<?php } ?>
				    </div>
				    <div class="col-70">
				    	
				    	<h1 class="titulo-noticia-small">
				    		<?php echo $titulo; ?> 
				    		| 
				    		<span><?php echo $status; ?></span>
				    		- 
				    		<small><?php echo $date; ?></small>
				    	</h1>
				    	<p class="links-edicion-noticias">
				    		<a href="#editar-noticia" title="Editar">Editar Noticia</a> | 
				    		<a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] .'/noticias/'. $url ?>" target="_blank" title="Ver">Ver noticia</a>
				    		<?php 
				    			if ( $status != 'publicado' ) {
				    		?>
				    		 | <a href="#publicar-noticia" title="Publicar">Publicar</a>
				    		<?php } ?>
				    	</p>
						
				    </div>
				</article>
			</li>
	<?php

	}//FOREACH

	//para ver cuantas son:
	$totales = mysqli_query($connection, $query  = "SELECT *  FROM " .$tabla. " WHERE post_categoria='".$categoria."' ");
	$cantTotal = $totales->num_rows;
	$cargadasenQuery = count($rows);
	
	$restantes = $cantTotal-$noticiasPorPagina;
	$texto1 = 'Categoria: '.$categoria. '. ' .$cantTotal.' noticias en total. '.$cargadasenQuery. ' cargadas ahora. '.$restantes.' restantes.';
	$texto2 = 'Categoria: '.$categoria. '. ' .$cantTotal.' noticias en total. '.$cargadasenQuery. ' cargadas ahora. 0 restantes.';
	//2 opciones: si queda más muestra cuantas quedan sino indica que no hay más
	if ( intval($restantes) > 0 ) {
		echo '<p class="info-resumen">'.$texto1.'</p>';
	} else {
		echo '<p class="info-resumen">'.$texto2.'</p>';
	}
	//echo $restantes .' - '.$cantTotal.' - '.$cargadasenQuery;
}//ELSE

closeDataBase( $connection );
