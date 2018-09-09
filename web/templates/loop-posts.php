<?php
$imagen = $imagen = '<img src="'.MAINSURL . '/images/default-cuadrado.png" alt="'. $data['post_titulo'] .'">';
MAINSURL . '/images/default-cuadrado.png';
if ($data['post_imagen'] != '') {
    $imagen = '<img style="max-width:initial;width:150%;" src="'.UPLOADSURL . '/' . $data['post_imagen'].'" alt="'. $data['post_titulo'] .'">';
}
if ( $data['post_type'] == 'categorias' ) {
    $url = MAINSURL.'/'. $data['post_url'];
} elseif ( $data['post_type'] == 'acciones' ) {
    $url = MAINSURL.'/'. getCategoryData($data['post_categoria'])['slug'] .'/'. $data['post_url'];
}


?>
<div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

    <article class="blog-post post-featured-alt" data-hover3d="true">

        <div class="blog-post-inner" data-stacking-factor="0.5">

            <figure class="post-image hmedia">
                <figure>
                    <?php echo $imagen; ?>
                </figure>
            </figure><!-- /.main-image -->
        
            <div class="post-contents">
                <header>
                    <h2 class="entry-title pb-25">
                        <a href="#" rel="bookmark"><?php echo $data['post_titulo']; ?></a>
                    </h2>
                </header>
            </div><!-- /.contents -->
        
        </div> <!-- /.blog-post-inner -->
        
        <a href="<?php echo $url; ?>" class="overlay-link"></a>

    </article>

</div><!-- /.col-lg-4 -->