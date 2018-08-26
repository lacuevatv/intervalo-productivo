<?php
/*
 * Editar noticia / Nueva noticia
 * Edita o modifica las noticias
 * Since 3.0
 * 
*/
require_once("inc/functions.php");
load_module( 'noticias' );
//recupera slug a buscar
global $slug;
if ($slug != '') {
	//busca en la base de datos
	searchPost ( $slug );
	//recupera los datos
	global $dataPost;
}

$postID       = isset($dataPost['post_id']) ? $dataPost['post_id'] : '';
$titulo       = isset($dataPost['titulo']) ? $dataPost['titulo'] : '';
$url          = isset($dataPost['url']) ? $dataPost['url'] : '';
$imgDestacada = isset($dataPost['imgDestacada']) ? $dataPost['imgDestacada'] : '';
$resumen      = isset($dataPost['resumen']) ? $dataPost['resumen']:'';
$contenido    = isset($dataPost['contenido']) ? $dataPost['contenido'] : '';
$video        =  isset($dataPost['video']) ? $dataPost['video'] : '';
$categoria    = isset($dataPost['categoria']) ? $dataPost['categoria'] : '';
$galeria      = isset($dataPost['galeria']) ? $dataPost['galeria'] : '';
$imgGaleria   = isset($dataPost['imgGaleria']) ? $dataPost['imgGaleria'] : array();
$fecha        = isset($dataPost['fecha']) ? $dataPost['fecha'] : '';
$dia          = isset($dataPost['dia']) ? $dataPost['dia'] : '';
$mes          = isset($dataPost['mes']) ? $dataPost['mes'] : '';
$year         = isset($dataPost['year']) ? $dataPost['year'] : '';
$status       = isset($dataPost['status']) ? $dataPost['status'] : 'new';

?>
<!---------- editar noticias ---------------->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		<?php if ( $slug == '' ) {
		echo 'Agregar nueva noticia';
	} else {
		echo 'Editar Noticia';
	} ?>
	</h1>
	<div class="container">
		<form method="POST" id="editar-noticia-formulario" name="editar-noticia-formulario">		
		<input type="hidden" name="post_ID" value="<?php echo $postID; ?>">
			<div class="error-msj-wrapper">
				<ul class="error-msj-list">
					
				</ul>
			</div>
			
			<div class="row">
				<div class="col-70">
	<!------ TITULO DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_title" class="larger-label">Título de la noticia </label>
						<input id="post_title" name="post_title" class="larger-input" value="<?php echo $titulo; ?>">
						<?php if ( $titulo == '' ) { ?>
						<input type="hidden" name="new_post" value="true">
						<?php } else { ?>
						<input type="hidden" name="new_post" value="false">
						<?php } ?>
					</div>	
				</div><!-- // col -->
	<!------ CATEGORIAS DE LA NOTICIA ---------->
				<div class="col-30">
					<div class="form-group">
						<label for="post_categoria">Categoría </label>
						<select name="post_categoria" id="post_categoria">
							<?php 
								global $categorias;

								for ($i=0; $i < count($categorias); $i++) {
									echo '<option value="'.$categorias[$i]['slug'].'"';
									if ( $categorias[$i]['slug'] == $categoria ) {
										echo ' selected="selected"';
									}
									echo '>'.$categorias[$i]['nombre'].'</option>';
								}
							?>
						</select>
					</div>
				</div><!-- // col -->
			</div><!-- // row -->

			
			<div class="row">
				<div class="col-50">
	<!------ PERSONALIZAR URL DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_url">Personalizar Url </label>
						<input id="post_url" name="post_url" value="<?php echo $url; ?>">
					</div>
				</div><!-- // col -->
	<!------ PUBLICAR LA NOTICIA ---------->	
				<div class="col-20">
					<div class="form-group">
						
						<?php if ($status != 'publicado') { ?>
							<input type="hidden" id="post_status" name="post_status" value="<?php echo $status; ?>">
							<button type="submit" name="submit_publish" class="btn btn-danger btn-lg btn-submit">Publicar</button>
						<?php } else { ?>
							<input type="hidden" id="post_status" name="post_status" value="<?php echo $status; ?>">
							<!--<p class="plublished">Publicado</p>-->
							<select id="change_status" name="change_status">
								<option value="publicado">PUBLICADO</option>
								<option value="borrador">borrador</option>
							</select>
						<?php } ?>
					</div>
				</div><!-- // col -->
				<div class="col-30">
	<!------ FECHA DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_date">Fecha Post</label>
						<input id="post_date" name="post_date" type="date" value="<?php echo $fecha?>">
					</div>
				</div><!-- // col -->
			</div><!-- // row -->

			<div class="row">	
				<div class="col-70">
	<!------ RESUMEN DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_resumen" class="larger-label">Resumen de la noticia</label>
						<textarea id="post_resumen" name="post_resumen"><?php echo $resumen; ?></textarea>
					</div>			
				</div><!-- // col -->

				<div class="col-30">
	<!------ IMAGEN DESTACADA DE LA NOTICIA ---------->
					<div id="imagen_destacada_wrapper" class="form-group">
						<label for="post_imagen" class="larger-label">Imagen Destacada</label>
						<input type="hidden" id="post_imagen" name="post_imagen" value="<?php echo $imgDestacada; ?>">
						<?php 
							if ( $imgDestacada == '' ) { ?>
								<div class="upload-post_imagen_btn_wrapper">
									<button type="button" id="upload-post_imagen_btn" class="btn btn-primary">Subir imagen</button>
									<p><small>La imagen debería ser por lo menos de 1440 px por 545px</small></p>
								</div>
						<?php } else { ?>
							<img src="<?php echo UPLOADSURLIMAGES .'/'. $imgDestacada; ?>" class="img-responsive post_imagen">
								<div class="del-post_imagen_wrapper"><button type="button" id="del-post_imagen" class="btn btn-danger">Borrar imagen</button></div>
						<?php } ?>
						
					</div>


				</div><!-- // col -->
				
			</div><!-- // row -->

	<!------ CONTENIDO DE LA NOTICIA ---------->
				<div class="form-group">
					<label for="post_contenido" class="larger-label">Contenido de la noticia</label>
					<textarea id="post_contenido" name="post_contenido"><?php echo $contenido; ?></textarea>
				</div>

			<div class="row">	
				<div class="col">

					<div id="accordion">
						<h3>Video destacado</h3>
						<div>
	<!------ VIDEO DESTACADO DE LA NOTICIA ---------->
							<div class="form-group">
								<label for="post_video">Url del video
								<small>Copiar url de Youtube</small> </label>
								<input id="post_video" name="post_video" value="<?php echo $video; ?>">
							</div>
						</div>
						<h3>Galeria de imagenes</h3>
						<div>
	<!------ GALERIA DE IMAGENES DELA  NOTICIA ---------->
							<div class="row">
								<div class="col-50">
									<div class="form-group">
										<label class="larger-label">
											<input type="checkbox" name="post_galeria" value="true"<?php 
											if ( $galeria == 1 ) {
												echo 'checked';
											}
											?>>
											Activar Galería de imagenes
										</label>
									</div>
								</div>
								<div class="col-50">
									<button type="button" id="agregar_imagenes_galeria" class="btn btn-default">
										Agregar imágenes
									</button>
								</div>
								<div class="col">
									<p><small>Se pueden subir muchas imagenes a la vez, el tamaño  ideal es de 1440 x 545</small></p>
								</div>
							</div>
	<!------ IMAGENES DE LA GALERIA DE LA NOTICIA ---------->
							<ul class="galeria-imagenes-wrapper">
							<?php if ( count($imgGaleria) != 0 ) { 
								$item = 1;
								for ($i=0; $i < count($imgGaleria); $i++) { ?>

								<li>
									<input type="hidden" name="imgGaleriaItem" value="<?php echo $imgGaleria[$i]; ?>">
									<figure>
										<img src="<?php echo UPLOADSURLIMAGES . '/' . $imgGaleria[$i]; ?>" class="img-responsive">
										<span class="imgGaleriaItemOrden">
											<?php echo $item; ?>
										</span>
									</figure>
									<button class="btn btn-xs btn-danger imgGaleriaItemDelBTN">Borrar imagen</button>
								</li>

								<?php 
								$item++;
								}//for ?>
							<?php }//if ?>
							</ul>
						</div>
						<!------ LINK EXTERNO ---------->
						
				   	</div><!-- //#accordion -->
			   	</div><!-- // col -->
			   	
			</div><!-- // row -->
			<hr>
		   	<div class="row">	
				<div class="col">
				   	<div class="form-group save-button-right">
				   		<button type="submit" name="submit_save" class="btn btn-primary btn-submit">Guardar Cambios</button>
				   	</div>
				</div><!-- // col -->
			</div><!-- // row -->  
		</form>	
	</div><!-- // container gral modulo -->
</div>
<div id="dialog">
	
</div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
    <a type="button" href="index.php?admin=noticias" class="btn">Volver a noticias</a>
</footer>
	   
	