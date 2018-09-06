<?php
/*
 * PAGE TEMPLATE: PAGINA INICIO
 * es el html de la pagina de inicio
*/

include 'header.php';
?>
 
<!-- <section class="no-padding hidden"> -->
<section class="no-padding" data-toggle-onscroll="true">

<a href="http://www.intervaloproductivo.com.ar/turnos/"  target="_blank"  class="btn-float ">
    <span class="btn-txt">Turnos ONLINE</span>
    <span class="btn-icon"><i class="fa fa-play"></i></span>
</a>

<!--<a href="https://www.youtube.com/watch?v=eWeJnVFZfu4" data-type="video" target="_blank" rel="noopener" class="btn-float lightbox-link">
    <span class="btn-txt">Turnos ONLINE</span>
    <span class="btn-icon"><i class="fa fa-play"></i></span>
</a>-->

</section>

<!-- Start #wrap -->

<!-- Start Slider -->
<section class="section sm-no-padding" data-enable-fullheight="true" >

<div id="rev_slider_19_1_wrapper" class="rev_slider_wrapper fullscreen-container" data-alias="boo2018" data-source="gallery" style="background:transparent;padding:0px;">
<!-- START REVOLUTION SLIDER 5.4.5.1 fullscreen mode -->
<div id="rev_slider_19_1" class="rev_slider fullscreenbanner" style="display:none;" data-version="5.4.5.1">
<ul>

<?php 
 $slider = getSliders('home'); 

foreach ($slider as $slide ) {

    getTemplate( 'slider-home', $slide );

}
?>

</ul>
<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>	</div>
</div><!-- END REVOLUTION SLIDER -->

</section>
<!-- End Slider -->


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
    $posts = getPosts('categorias');
    
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

<section class="pt-200 pb-200">

<div class="video-bg full d-xs-none">
<div class="video-bg__inner">
    <iframe class="inner" title="YouTube video player" width="1920" height="1080" src="https://www.youtube.com/embed/Hsjh3x6ZmV4?list=PL21J0lGEtXAYOq5SJ2rOt7dBaRU2-TbMn&amp;iv_load_policy=3&amp;enablejsapi=1&amp;disablekb=1&amp;autoplay=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;wmode=transparent&amp;origin=http%3A%2F%2Fboo.themerella.com&amp;widgetid=1&amp;mute=1"></iframe>
</div>
</div>

<div class="rella-row-overlay" style="background:linear-gradient(133deg,rgba(157, 0, 255, 0.84) 0%,rgba(0, 255, 108, 0.8) 100%);"></div>

<div class="rella-row_top_divider" style="height:107px;">
<svg fill="#ffffff" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300">
    <path d="M 1000 299 l 2 -279 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -232 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
    <path d="M 1000 286 l 2 -252 c -157 -43 -302 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -145.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 10.61 v 22.39 z"></path>
    <path d="M 1000 300 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
</svg>
</div>

<div class="container">

<div class="row">

    <div class="col-lg-12 text-center pt-100 pb-100">
        <header class="section-title mb-0" style="font-family: 'Poppins', 'Open Sans', sans-serif; " data-plugin-textslide="true" data-plugin-textslide-options='{"element":"h2","autoplay":true,"delay":2000}'>
            <h2 class="text-white lg">Maximizá 
                <span class="typed-keywords">
                    <span class="keyword active">tus Ganas.</span>
                    <span class="keyword">tu Tiempo.</span>
                    <span class="keyword">tus Energías.</span>
                    <span class="keyword">tu Actitud.</span>
                </span>
                <!-- /.typed-keywords -->
            </h2>
        </header>
    </div><!-- /.col-lg-12 text-center -->

</div><!-- /.row -->

</div><!-- /.container -->

<div class="rella-row_bottom_divider" style="height:175px;">
<svg fill="#ffffff" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300">
    <path d="M 1000 299 l 2 -279 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -232 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
    <path d="M 1000 286 l 2 -252 c -157 -43 -302 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -145.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 10.61 v 22.39 z"></path>
    <path d="M 1000 300 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
</svg>
</div>

</section>

<!-- /Start Features -->
<section class="section pt-70 pb-90" id="features">

<div class="container">

<div class="row">

    <div class="col-lg-8 mx-auto">
        <header class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }">
            <h5 class="subtitle md text-uppercase">Potenciamos tu</h5>
            <h2 class="title" style="font-family: 'Poppins', 'Open Sans', sans-serif; ">Salud física & Bienestar laboral</h2>
        </header>
        
    </div> <!-- /.col-lg-8 mx-auto -->

</div> <!-- /.row -->

<div class="row">

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="icon-box icon-box-boxed-unfilled icon-box-boxed-unfilled-gradient">

            <img src="images/beneficios/productividad.png" alt="" style="max-width: 100%;" />

            <div class="contents">
                <h3 class="weight-medium">Productividad</h3>
                <p>Incrementa la productividad y el rendimiento laboral</p>

            </div>
        </div><!-- /.iconbox -->

    </div> <!-- /.col-lg-4 col-md-10 mx-auto -->

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="icon-box icon-box-boxed-unfilled icon-box-boxed-unfilled-gradient">

            <span class="iconbox-label">Beneficio</span>

            <img src="images/beneficios/autovaloracion.png" alt="" style="max-width: 100%;" />

            <div class="contents">
                <h3 class="weight-medium">Autoestima</h3>
                <p>Fortalece el sentimiento de autovaloración</p>

            </div>
        </div><!-- /.iconbox -->

    </div> <!-- /.col-lg-4 col-md-10 mx-auto -->

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="icon-box icon-box-boxed-unfilled icon-box-boxed-unfilled-gradient">

            <img src="images/beneficios/relaciones.png" alt="" style="max-width: 100%;" />

            <div class="contents">
                <h3 class="weight-medium">Relaciones</h3>
                <p>Mejora el clima laboral y las interrelaciones</p>
                

            </div>
        </div><!-- /.iconbox -->

    </div> <!-- /.col-lg-4 col-md-10 mx-auto -->

</div> <!-- /.row -->

</div> <!-- /.container -->

</section>
<!-- /End Features -->


<!-- /Start Features -->
<section class="section pt-40" id="features">

<div class="container">

<div class="row">

    <div class="col-lg-8 mx-auto">
        <header class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }">
            <h5 class="subtitle md text-uppercase">Nuestros Clientes</h5>
            <h2 class="title" style="font-family: 'Poppins', 'Open Sans', sans-serif; ">Confían en nosotros</h2>
        </header>
        
    </div> <!-- /.col-lg-8 mx-auto -->

</div> <!-- /.row -->

</div>
</section>


<section class="section pt-50 pb-50">

<?php 
    $clientes = getClientes();

    if ( $clientes != null ) : ?>

<div class="col-md-10 mx-auto">

<div class="carousel-container " data-carousel-options='{"autoplay":"true","autoplayTimeout":"6000","items":"2"}'>
<div class="carousel-items">
    

        <?php

            foreach ( $clientes as $cliente ) { ?>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <figure class="client-opaque-inverted client-opaque-inverted-alt">
                        <img src="<?php echo UPLOADSURL . '/' . $cliente['cliente_imagen']; ?>" alt="<?php echo UPLOADSURL . '/' . $cliente['cliente_titulo']; ?>">
                    </figure>      
                </div> 
        <?php } ?>

    

</div>
<div class="carousel-nav">
    <button class="flickity-prev-next-button previous">
        <i class="fa fa-angle-left"></i>
    </button>
    <button class="flickity-prev-next-button next">
        <i class="fa fa-angle-right"></i>
    </button>
</div>
</div>
</div>

<?php endif; ?>

</section>


<section class="section pt-100 pb-110 mt-100" style="background-image: url(./images/bg/bg-22.jpg);" data-parallax-bg="true">

<div class="container">
<div class="row">

    <div class="col-md-10 mx-auto text-center">

        <h2 class="h1 text-white mt-0 mb-2" style="font-family: 'Poppins', 'Open Sans', sans-serif; font-size: 40px;">¿Queres potenciar tu equipo de trabajo?</h2>
        <!--<p class="mb-5"><span style="font-size: 20px; color: rgba(255,255,255,0.72);">Dales todo para que ellos disfruten al maximo su pasion.</span></p>-->

        <a href="#" class="btn btn-solid semi-round btn-md border-none wide btn-linear mt-30">
            <span>Comunicate con nosotros</span>
        </a>

    </div> <!-- /.col-md-8 mx-auto -->

</div> <!-- /.row -->
</div> <!-- /.container -->

</section>


<?php include 'footer.php'; ?>