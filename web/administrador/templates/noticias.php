<?php
/*
 * Noticias recientes
 * Lista las noticias publicadas y con links para verlas, editarlas o publicarlas
 * Since 3.0
 * 
*/
load_module( 'noticias' );
?>
<!---------- noticias ---------------->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Ver noticias
	</h1>
	<div class="container">
		<div class="row">
			<div class="col">
				<div class="nav-noticias-interno">
					<label>Filtrar por categoría</label>
					<select name="post_categoria" id="post_categoria">
						<option value="todas">Todas</option>
					<?php 
						global $categorias;
						
						for ($i=0; $i < count($categorias); $i++) { 
							echo '<option value="'.$categorias[$i]['slug'].'">'.$categorias[$i]['nombre'].'</option>';
						}
					?>
					</select>
				</div>
			</div>
		</div><!-- // row -->
		<div class="row">
			<div class="col">
			<ul class="loop-noticias-backend">
        		<?php listaNoticias(10, 'all', true, 'none', true); ?>
        		
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
    <a type="button" href="index.php?admin=editar-noticias" class="btn">Agregar nueva</a>
</footer>

<!---------- fin noticias ---------------->