<?php 
if ( $data['post_imagen'] != '' ) {
    $imagenDestacada = UPLOADSURL . '/' . $data['post_imagen'];
} else {
    $imagenDestacada = MAINSURL . '/images/default-rectangular.png';
}
?>
<section class="section" style="background-color: #f6f8fb; padding-top: 100px;">
    <div class="container-fluid px-0">
        
        <div class="row align-items-center">
            <div class="col-md-6">
                <div class="text-block creative-block">
                    <h5 data-parallax="true" data-parallax-from="{&quot;x&quot;:0,&quot;y&quot;:151,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:0}"
                        data-parallax-to="{&quot;x&quot;:0,&quot;y&quot;:0,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:1}"
                        data-parallax-options="{&quot;time&quot;:&quot;2&quot;,&quot;ease&quot;:&quot;Quint.easeOut&quot;,&quot;duration&quot;:&quot;0%&quot;,&quot;reverse&quot;:true,&quot;triggerHook&quot;:&quot;onEnter&quot;}">
                        <?php echo $data['post_pre_titulo']; ?>
                    </h5>
                    <h2 data-parallax="true" data-parallax-from="{&quot;x&quot;:0,&quot;y&quot;:151,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:0}"
                        data-parallax-to="{&quot;x&quot;:0,&quot;y&quot;:0,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:1}"
                        data-parallax-options="{&quot;time&quot;:&quot;2&quot;,&quot;ease&quot;:&quot;Quint.easeOut&quot;,&quot;duration&quot;:&quot;0%&quot;,&quot;reverse&quot;:true,&quot;triggerHook&quot;:&quot;onEnter&quot;}">
                        <?php echo $data['post_titulo']; ?>
                    </h2>
                    <p data-parallax="true" data-parallax-from="{&quot;x&quot;:0,&quot;y&quot;:151,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:0}"
                        data-parallax-to="{&quot;x&quot;:0,&quot;y&quot;:0,&quot;z&quot;:0,&quot;scaleX&quot;:1,&quot;scaleY&quot;:1,&quot;scaleZ&quot;:1,&quot;rotationX&quot;:0,&quot;rotationY&quot;:0,&quot;rotationZ&quot;:0,&quot;opacity&quot;:1}"
                        data-parallax-options="{&quot;time&quot;:&quot;2&quot;,&quot;ease&quot;:&quot;Quint.easeOut&quot;,&quot;duration&quot;:&quot;0%&quot;,&quot;reverse&quot;:true,&quot;triggerHook&quot;:&quot;onEnter&quot;}">
                        <?php echo $data['post_resumen']; ?>
                    </p>
                </div>
                <!-- /.text-block creative-block -->
                <div class="particles-contaienr">
                    <div class="particle right" data-parallax="true" data-smooth-transition="true" data-parallax-from='{"rotationZ": 170, "scale": 1.5, "y": -150}'
                        data-parallax-to='{"y": -400}' data-parallax-options='{"time":"2","duration":"2775"}'>
                        <img src="<?php echo MAINSURL; ?>/images/particles/semi-circle.svg" alt="Particle">
                    </div>
                    <div class="particle left" data-parallax="true" data-smooth-transition="true" data-parallax-from='{"rotationZ": 45, "y": 0}'
                        data-parallax-to='{"y": -400}' data-parallax-options='{"time":"2","duration":"2000"}'>
                        <img src="<?php echo MAINSURL; ?>/images/particles/rectangles.svg" alt="Particle">
                    </div>
                </div>
            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6 pl-0">
                <div class="content-box content-box-btn">
                    <figure>
                        <img data-panr="true" data-plugin-options="{ &quot;scaleDuration&quot;: 0.5, &quot;scaleTo&quot;: 1.08,&quot;moveTarget&quot;: &quot;.content-box&quot; }"
                            src="<?php echo $imagenDestacada; ?>" alt="Content Box">
                    </figure>
                    
                    <?php if ( $data['post_type'] == 'categorias' ) : ?>
                        <a href="#loop" class="btn btn-solid circle btn-lg text-uppercase btn-light">
                            <span>Nuestras Acciones</span>
                        </a>
                    <?php endif; ?>

                </div>
                <!-- /.content-box -->
            </div>
            <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>


<section id="pt-0-mobile" class="section  pt-30 pb-30 ">
    <div class="container">
        <div class="row">	
            <div class="col-lg-4 pr-lg-5 mb-sm-5 mb-lg-0">

                <!-- TABS -->
                <?php if ( $data['post_tabs'] != '' ) : 
                $tabs = unserialize($data['post_tabs']);
                ?>

                <div class="tabs tabs-border-center center-list tabs-border-center-alt tabs-border-center-alt2 reset-nav-tab-styles">

                    <div class="nav nav-tabs" role="tablist">
                    <?php for ($i=0; $i < count($tabs); $i++) { ?>
                            <li role="presentation" <?php if ( $i == 0 ) { echo 'class="active"'; } ?>>
                                <a href="#tabid-<?php echo $i; ?>" aria-expanded="true" aria-controls="tabid-<?php echo $i; ?>" role="tab" data-toggle="tab"><?php echo $tabs[$i]->titulo; ?></a>
                            </li>
                    <?php } ?>
                    </div><!-- /.nav nav-tabs -->
                </div>
                
                <?php endif; ?>

                <!-- MINITEXTO -->
                <?php if ( $data['post_mini_texto'] != '' ) : ?>
                    <h5 class="mb-45">
                        <strong>
                            <span>
                                <?php echo $data['post_mini_texto']; ?>
                            </span>
                        </strong>
                    </h5>
                <?php endif; ?>
                
            </div>
            <div class="col-lg-8">

                <?php if ( $data['post_contenido'] != '' ) : ?>

                <div class="wrapper-contenido">
                    <?php echo $data['post_contenido']; ?>
                </div>
                <?php endif; ?>
            
                <?php if ( $data['post_tabs'] != '' ) : ?>
                <div class="tabs tabs-border-center center-list tabs-border-center-alt tabs-border-center-alt2 reset-nav-tab-styles"> 

                    <div class="tab-content">
                        
                    <?php for ($i=0; $i < count($tabs); $i++) { ?>

                            <div id="tabid-<?php echo $i; ?>" class="tab-pane fade<?php if ( $i == 0 ) { echo ' active in'; } ?>" role="tabpanel">

                                <h4>
                                    <?php echo $tabs[$i]->titulo; ?>
                                </h4>

                                <div>
                                    <?php echo $tabs[$i]->contenido; ?>
                                </div>

                            </div><!-- /.tab-pane -->
                    <?php } ?>  

                    </div><!-- /.tab-content -->

                </div><!-- /.tabs -->
                <?php endif; ?>


                <!-- ACORDION -->
                <?php if ( $data['post_acordion'] != '' ) : 
                $acordion = unserialize($data['post_acordion']);
                ?>
                
                <div class="accordion accordion-underline accordion-right" role="tablist" aria-multiselectable="true">
                
                <?php for ($i=0; $i < count($acordion); $i++) { ?>
                    
                    <div class="panel accordion-item active">
                        <h4 class="accordion-toggle" role="tab" id="heading_accordion_tab_5a212ee1f01b9">
                            <a data-toggle="collapse" data-parent="#accordion_5a212ee1f0567" href="#accordion_tab_<?php echo $i; ?>" aria-expanded="true"
                                aria-controls="accordion_tab_5a212ee1f01b9" class="collapsed">
                                <?php echo $acordion[$i]->titulo; ?>
                            </a>
                        </h4>
                        <div id="accordion_tab_<?php echo $i; ?>" class="accordion-collapse collapse" role="tabpanel" aria-labelledby="heading_accordion_tab_<?php echo $i; ?>"
                            aria-expanded="true">
                            <div class="accordion-body">

                                <?php echo $acordion[$i]->contenido; ?>
                                
                            </div>
                        </div>
                    </div>
                    
                <?php } ?>
                    
                </div>  
                
                <?php endif; ?>
            </div>
        
        </div>
    </div>
</section>

<div class="particles-contaienr">
    <div class="particle left" data-parallax="true" data-smooth-transition="true" data-parallax-from='{"rotationZ": 45, "y": 0}'
        data-parallax-to='{"y": -400}' data-parallax-options='{"time":"2","duration":"2000"}'>
        <img src="<?php echo MAINSURL; ?>/images/particles/rectangles.svg" alt="Particle">
    </div>
    <div class="particle right" data-parallax="true" data-smooth-transition="true" data-parallax-from='{"rotationZ": 170, "scale": 1.5, "y": -150}'
        data-parallax-to='{"y": -400}' data-parallax-options='{"time":"2","duration":"2775"}'>
        <img src="<?php echo MAINSURL; ?>/images/particles/semi-circle.svg" alt="Particle">
    </div>
    
</div>

<?php 
//muestra las acciones de la categoria
if ( $data['post_type'] == 'categorias' ) : 

    $posts = getPosts('acciones', $data['post_ID']);
    if ($posts != null ) : ?>

        <section class="py-5">

            <div class="container">
                
                <header id="loop" class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }">
                            <h5 class="subtitle md text-uppercase">
                                <?php echo $data['post_titulo']; ?>
                            </h5>
                            <h2 class="title">Nuestras Acciones</h2>
                        </header>

                <div class="row mx-0">

                    <?php 
                    foreach ($posts as $post ) {
                        getTemplate('loop-posts', $post);
                    }
                    ?>


                    <div class="col-md-12 pb-3 pt-5">   
                    </div><!-- /.col-md-12 -->

                </div><!-- /.row -->

            </div><!-- /.container -->

        </section>
    <?php endif; ?>
<?php endif; ?>