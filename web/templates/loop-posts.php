<div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

    <article class="blog-post post-featured-alt" data-hover3d="true">

        <div class="blog-post-inner" data-stacking-factor="0.5">

            <figure class="post-image hmedia">
                <figure>
                    <img width="380" height="380" src="<?php echo UPLOADSURL . '/' . $data['post_imagen']; ?>" alt="<?php echo $data['post_titulo']; ?>">
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
        
        <a href="<?php echo $data['post_url']; ?>" class="overlay-link"></a>

    </article>

</div><!-- /.col-lg-4 -->