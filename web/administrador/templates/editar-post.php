<?php
/*
 * Editar noticia / Nueva noticia
 * Edita o modifica las noticias
 * Since 3.0
 * 
*/
require_once("inc/functions.php");
load_module( 'posts' );

//recupera id a buscar
$postId = isset($_GET['id']) ? $_GET['id'] : null;
$post = null;
$nuevo = true;

if ( $postId != null ) {
	$post = getPostById($postId);
	$nuevo = false;
}

?>
<!---------- editar  ---------------->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		<?php if ( $postId == null ) {
		echo 'Agregar nueva';
	} else {
		echo 'Editar';
	} ?>
	</h1>
	<div class="container">
		<form method="POST" id="editar-post-form" name="editar-post-form">		
		<input type="hidden" name="post_ID" value="<?php echo ($post) ? $post['post_ID'] : 'new'; ?>">
		<input type="hidden" name="post_type" value="post">
			<div class="error-msj-wrapper">
				<ul class="error-msj-list">
					
				</ul>
			</div>
			
			<div class="row">
				<div class="col-40">
	<!------ TITULO DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_title" class="larger-label">Título </label>
						<input id="post_title" name="post_title" class="larger-input" value="<?php echo ($post) ? $post['post_titulo'] : ''; ?>">
					</div>	
				</div><!-- // col -->

				<div class="col-30">
	<!------ PRE TITULO DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_pre_titulo">Pre Título </label>
						<input id="post_pre_titulo" name="post_pre_titulo" class="larger-input" value="<?php echo ($post) ? $post['post_pre_titulo'] : ''; ?>">
					</div>	
				</div><!-- // col -->
	<!------ CATEGORIAS DE LA NOTICIA ---------->
				<div class="col-30">
					<div class="form-group">
						<label for="post_categoria">Categoría </label>
						<select name="post_categoria" id="post_categoria">
							<?php 
								$categorias = getPosts( 'categoria-post' );
								if ( $categorias!=null ) :
									echo '<option value="">Selecciones una...</option>';
									for ($i=0; $i < count($categorias); $i++) { 
										echo '<option value="'.$categorias[$i]['post_ID'].'">'.$categorias[$i]['post_titulo'].'</option>';
									}
								else : 
									echo '<option value="">No hay ninguna cargada</option>';
								endif;
							?>
						</select>
					</div>
				</div><!-- // col -->
			</div><!-- // row -->

			
			<div class="row">
				<div class="col-30">
	<!------ PERSONALIZAR URL DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_url">Personalizar Url </label>
						<input id="post_url" name="post_url" value="<?php echo ($post) ? $post['post_url'] : ''; ?>">
					</div>
				</div><!-- // col -->
	<!------ ORDEN ---------->
			<div class="col-20">
					<div class="form-group">
						<label for="post_orden">Ordenar </label>
						<input type="number" id="post_orden" name="post_orden" value="<?php echo ($post) ? $post['post_orden'] : '0'; ?>">
					</div>
				</div><!-- // col -->
	<!------ PUBLICAR LA NOTICIA ---------->	
				<div class="col-20">
					<div class="form-group">
						<label for="change_status">Estado: </label>
						<select id="change_status" name="change_status">
							<option value="publicado"><?php if ($nuevo) { echo 'PUBLICAR'; } else { echo 'Publicado'; } ?></option>
							<option value="borrador">Borrador</option>
						</select>
						<input type="hidden" id="post_status" name="post_status" value="<?php echo ($post) ? $post['post_status'] : 'publicado'; ?>">
					</div>
				</div><!-- // col -->
				<div class="col-30">
	<!------ FECHA DE LA NOTICIA ---------->
					<div class="form-group">
						<label for="post_date">Fecha</label>
						<input id="post_date" name="post_date" type="date" value="<?php echo ($post) ? date ( 'Y-m-d', strtotime( $post['post_timestamp']) ) : ''; ?>">
					</div>
				</div><!-- // col -->
			</div><!-- // row -->

			<div class="row">	
				<div class="col-30">
	<!------ RESUMEN ---------->
					<div class="form-group">
						<label for="post_resumen" class="larger-label">Resumen:</label>
						<textarea id="post_resumen" name="post_resumen"><?php echo ($post) ? $post['post_resumen'] : ''; ?></textarea>
					</div>			
				</div><!-- // col -->
				
				<div class="col-30">
	<!------ MINI TEXTO ---------->
					<div class="form-group">
						<label for="post_mini_texto" class="larger-label">Mini Texto:</label>
						<textarea id="post_mini_texto" name="post_mini_texto"><?php echo ($post) ? $post['post_mini_texto'] : ''; ?></textarea>
					</div>			
				</div><!-- // col -->

				<div class="col-40">
	<!------ IMAGEN DESTACADA ---------->
					<div id="imagen_destacada_wrapper" class="form-group">
						<label for="post_imagen" class="larger-label">Imagen Destacada</label>
						<input type="hidden" id="post_imagen" name="post_imagen" value="<?php echo ($post) ? $post['post_imagen'] : ''; ?>">
						<?php 
							if ( $post['post_imagen'] == '' ) { ?>
								<div class="upload-post_imagen_btn_wrapper">
									<button type="button" id="upload-post_imagen_btn" class="btn btn-primary">Subir imagen</button>
									<p><small>La imagen debería ser por lo menos de 1440 px por 545px</small></p>
								</div>
						<?php } else { ?>
							<img src="<?php echo UPLOADSURLIMAGES .'/'. $post['post_imagen']; ?>" class="img-responsive post_imagen">
								<div class="del-post_imagen_wrapper"><button type="button" id="del-post_imagen" class="btn btn-danger">Borrar imagen</button></div>
						<?php } ?>
						
					</div>


				</div><!-- // col -->
				
			</div><!-- // row -->

			<div class="row">	
				<div class="col">
<!------ OTROS :  ACORDEON  ---------->
					<div id="accordion-post">

	<!------ TABS  ---------->
						<h3>Tabs</h3>
						<div>
							<button type="button" id="agregar_tab" class="btn btn-default">
								Agregar nueva
							</button>
							<p>
								Tabs generales, con título a la izquierda y contenido a la derecha. Para moverlas, arrástrelas a gusto.
							</p>
							<ul class="tabs-wrapper">

							<?php 
								if ( $post['post_tabs'] != '' ) {
									$tabs = unserialize($post['post_tabs']);
									foreach ($tabs as $tab) { ?>

										<li class="tab-item row">
											<div class="col-40">
												<div class="form-group">
													<label for="titulo-tab">Título:</label>
													<input type="text" name="titulo-tab" value="<?php echo $tab->titulo; ?>">
												</div>
											</div>
											<div class="col-60">
												<div class="form-group">
													<label for="contenido-tab">Contenido:</label>
													<textarea name="contenido-tab" class="mini-editor-enriquecido"><?php echo $tab->contenido; ?></textarea>
												</div>
												
											</div>
											<button class="del-tab-acordion">
												<img src="<?php echo URLADMINISTRADOR; ?>/assets/images/delbtn.png">
											</button>
										</li>

									<?php }
								} ?>

							</ul>
						</div>
	<!------ ACORDION  ---------->
						<h3>Mini acordion</h3>
						<div>
							<button type="button" id="agregar_acordion" class="btn btn-default">
								Agregar nuevo
							</button>
							<p>
								Acordión ubicado debajo de las tabs anteriores
							</p>
							<ul class="acordion-wrapper">

								<?php 
								if ( $post['post_acordion'] != '' ) {
									$acordions = unserialize($post['post_acordion']);
									foreach ($acordions as $acordion) { ?>

										<li class="tab-item row">
											<div class="col-40">
												<div class="form-group">
													<label for="titulo-tab">Título:</label>
													<input type="text" name="titulo-acordion" value="<?php echo $acordion->titulo; ?>">
												</div>
											</div>
											<div class="col-60">
												<div class="form-group">
													<label for="contenido-tab">Contenido:</label>
													<textarea name="contenido-acordion" class="mini-editor-enriquecido"><?php echo $acordion->contenido; ?></textarea>
												</div>
											</div>
											<button class="del-tab-acordion">
												<img src="<?php echo URLADMINISTRADOR; ?>/assets/images/delbtn.png">
											</button>
										</li>

									<?php }
								} ?>
							</ul>
						</div>
	<!------ CONTENIDO  ---------->
						<h3>Contenido</h3>
						<div class="form-group">
							<label for="post_contenido" class="larger-label">En el caso de no tener tabs, se puede incluir un parrafo simple</label>
							<textarea class="editor-enriquecido" name="post_contenido"><?php echo ($post) ? $post['post_contenido'] : ''; ?></textarea>
						</div>
	<!------ HEAD ---------->
						<h3>Head</h3>
						<div>
							<div class="form-group">
								<label for="post_contenido" class="larger-label">Etiqueta para incluir html en el head</label>
								<textarea name="post_head"><?php echo ($post) ? $post['post_head'] : ''; ?></textarea>
							</div>
						</div>
	<!------ VIDEO DESTACADO ---------->
						<h3>Video destacado</h3>
						<div>
							<div class="form-group">
								<label for="post_video">Url del video
								<small>Copiar url de Youtube</small> </label>
								<input id="post_video" name="post_video" value="<?php echo ($post) ? $post['post_video'] : ''; ?>">
							</div>
						</div>

	<!------ GALERIA DE IMAGENES ---------->
						<h3>Galeria de imagenes</h3>
						<div>
							<div class="row">
								<div class="col-50">
									<div class="form-group">
										<label class="larger-label">
											<input type="checkbox" name="post_galeria" value="true"<?php 
											if ( $post && $post['post_galeria'] == 1 ) {
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
							<?php 
							
							if ($post && $post['post_imagenesGal'] != '') :
								
								$imgGaleria = unserialize($post['post_imagenesGal']);

								if ( count($imgGaleria) != 0 ) { 
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
								<?php }//if 
							endif;
							?>
							</ul>
						</div>
						
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
    <a type="button" href="index.php?admin=posts" class="btn">Volver a lista</a>
	<a type="button" href="index.php?admin=editar-post" class="btn">Agregar nuevo</a>
</footer>