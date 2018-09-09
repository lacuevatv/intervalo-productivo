<?php

include 'header.php';
    
getTemplate('turnos');
?>

<section class="section pt-120" id="works">
    <div class="container">
        <div class="row">

            <div class="col-lg-6 mx-auto">
                <header class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }">
                    <h5 class="subtitle md text-uppercase">Nuestras Acciones</h5>
                    <h2 class="title">Generamos Sinergia</h2>
                </header>
            

            </div> 

        </div> 
    </div> 


</section>

<section class="py-5">

    <div class="container">

        <div class="row mx-0">

            <?php 
            $posts = getPosts('acciones');
            
            if ( $posts != null ) {
                foreach ( $posts as $post ) {
                    getTemplate('loop-posts', $post); 
                }
            }
            ?>
            
            <div class="col-md-12 pb-3 pt-5">
                
            </div><!-- /.col-md-12 -->

        </div><!-- /.row -->

    </div><!-- /.container -->

</section>

<!-- Start Contact -->
<section class="section">
				
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            
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
                
                <header class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }">
                    <h5 class="subtitle md text-uppercase">Estemos en contacto</h5>
                    <h2 class="title">Trabajemos juntos!</h2>
                </header>
                

            
                <div class="contact-form contact-default contact-default-alt2">
                    <form class="rd-mailform" data-form-output="form-output-global" data-form-type="forms" method="post" action="bat/rd-mailform.php">
                        <div class="row">
                            <p class="col-lg-4">
                                <span class="form-group">
                                    <input type="text" class="form-control" placeholder="Nombre">
                                </span>
                            </p>
                            <p class="col-lg-4">
                                <span class="form-group">
                                    <input type="email" class="form-control" placeholder="Email">
                                </span>
                            </p>
                            <p class="col-lg-4">
                                <span class="form-group">
                                    <input type="text" class="form-control" placeholder="Teléfono">
                                </span>
                            </p>
                            <p class="col-sm-12">
                                <span class="form-group">
                                    <textarea cols="40" rows="6" class="form-control" placeholder="Mensaje"></textarea>
                                </span>
                            </p>
                            <p class="col-sm-12">
                                <button class="form-control">Enviar mensaje</button>
                            </p>
                        </div>
                    </form>
                </div>
                
                
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



<?php include 'footer.php'; ?>