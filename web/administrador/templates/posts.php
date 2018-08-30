<?php
/*
 * Lista los post
 * Since 3.0
 * 
*/
load_module( 'posts' );
$posts = getPosts( 'post', POSTPERPAG, '', 'fecha', 'all' );
?>
<!---------- noticias ---------------->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Ver Accciones
	</h1>
	<div class="container">
		<div class="row">
			<div class="col">
				<div class="nav-noticias-interno">
					<label>Filtrar por categoría</label>
					<select name="post_categoria" id="post_categoria">
						<option value="todas">Todas</option>
						<?php 
							$categorias = getPosts( 'categoria-post' );
							if ( $categorias!=null ) :

								for ($i=0; $i < count($categorias); $i++) { 
									echo '<option value="'.$categorias[$i]['post_ID'].'">'.$categorias[$i]['post_titulo'].'</option>';
								}

							endif;
						?>
					</select>
				</div>
			</div>
		</div><!-- // row -->
		<div class="row">
			<div class="col">
			<ul class="loop-noticias-backend">
                
            <?php if ($posts != null) :

				for ($i=0; $i < count($posts); $i++) { 
					getTemplate( 'loop-posts', $posts[$i] );    
					
				}

            endif;
            ?>
        		
        	</ul>
        	</div><!-- // col -->
        </div><!-- // row -->
    	<div class="row">
    		<div class="col ver-mas-noticias">
        		<button id="load-more" class="btn btn-primary">Ver más</button>
        		<p class="loading-news-ajax"></p>
        	</div>
    	</div>
		
	</div><!-- // container gral modulo -->
</div><!-- // container -->
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
    <a type="button" href="index.php?admin=editar-acciones" class="btn">Agregar nueva</a>
</footer>

<!---------- fin noticias ---------------->