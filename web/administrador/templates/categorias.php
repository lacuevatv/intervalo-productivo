<?php
/*
 * Lista los post
 * Since 3.0
 * 
*/
load_module( 'posts' );
$posts = getPosts( 'categorias', '', '', 'orden', 'all' );
?>
<!---------- post ---------------->
<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Ver Categorias
	</h1>
	<div class="container">
		
		<div class="row">
			<div class="col">
			<ul class="loop-noticias-backend">
			<input type="hidden" name="post_type" id="post_type" value="categorias">
            <?php if ($posts != null) :

				for ($i=0; $i < count($posts); $i++) { 
					getTemplate( 'loop-posts', $posts[$i] );    
					
				}

            endif;
            ?>
        		
        	</ul>
        	</div><!-- // col -->
        </div><!-- // row -->
    	
		
	</div><!-- // container gral modulo -->
</div><!-- // container -->
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
    <a type="button" href="index.php?admin=editar-categorias" class="btn">Agregar nueva</a>
</footer>