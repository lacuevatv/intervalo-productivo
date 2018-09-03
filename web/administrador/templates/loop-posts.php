<li class="loop-noticias-backend-item">
    <article class="row">
        <div class="col-30">
            <?php 
            if ( $data['post_imagen'] != '' ) { ?>
            <img src="<?php echo UPLOADSURLIMAGES.'/'.$data['post_imagen']; ?>" alt="Imagen Destacada de la noticia" class="img-responsive">
            <?php }
            else { ?>
            <img src="assets/images/noticia-img-default.png" alt="Noticias" class="img-responsive">
            <?php } ?>
        </div>
        <div class="col-70">
            
            <h1 class="titulo-noticia-small">
                <?php echo $data['post_titulo']; ?><?php if ($data['post_status'] != 'publicado') {echo ' | ' . $data['post_status'];} ?> | <small><?php echo $data['post_timestamp']; ?></small>
            </h1>
            <p class="links-edicion-noticias">
                <?php 
                if ( $data['post_type'] == 'categorias' ) {
                    $url = 'index.php?admin=editar-categorias&id=' . $data['post_ID'];
                } elseif ( $data['post_type'] == 'promos' ) {
                    $url = 'index.php?admin=editar-promo-acciones&id=' . $data['post_ID'];
                } else {
                    $url = 'index.php?admin=editar-acciones&id=' . $data['post_ID'];
                }
                ?>
                <a href="<?php echo $url; ?>" title="Editar" class="btn-edit-news">
                    Editar
                </a>
                <!--|DEBERIA CAMBIAR EL URL CUANDO ESTE LISTO <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] .'/noticias/'. $data['post_url']; ?>" target="_blank" title="Ver">Ver</a>-->
                | <a href="<?php echo $data['post_ID']; ?>" class="btn-delete-post">Borrar</a>
            </p>
            
            
        </div>
    </article>
</li>