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

    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/pausas-activas.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25">
                            <a href="#" rel="bookmark">Pausas Activas</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->

    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/bienestar.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25" >
                            <a href="#" rel="bookmark">Bienestar</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->

    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/salud.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25">
                            <a href="#" rel="bookmark">Salud</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->
    
    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/belleza.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25">
                            <a href="#" rel="bookmark">Belleza</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->

    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/eventos.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25">
                            <a href="#" rel="bookmark">Eventos</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->

    <div class="col-lg-4 col-sm-10 offset-sm-1 offset-lg-0 px-0">

        <article class="blog-post post-featured-alt" data-hover3d="true">

            <div class="blog-post-inner" data-stacking-factor="0.5">

                <figure class="post-image hmedia">
                    <figure><img width="380" height="380" src="images/acciones/deportivo.jpg" alt="Blog post"></figure>
                </figure><!-- /.main-image -->
            
                <div class="post-contents">

                    <header>
                        <h2 class="entry-title pb-25">
                            <a href="#" rel="bookmark">Deportivo</a>
                        </h2>
                        
                    </header>
            
                </div><!-- /.contents -->
            
            </div> <!-- /.blog-post-inner -->
            
            <a href="#" class="overlay-link"></a>

        </article>

    </div><!-- /.col-lg-4 -->

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

<!--<div class="container">
<div class="row align-items-center slick">

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-13.png" alt="Client">
        </figure>

    </div> 

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-14.png" alt="Client">
        </figure>

    </div> 

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-15.png" alt="Client">
        </figure>

    </div> 

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-16.png" alt="Client">
        </figure>

    </div> 

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-17.png" alt="Client">
        </figure>

    </div> 

    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-18.png" alt="Client">
        </figure>

    </div> 
    
    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-18.png" alt="Client">
        </figure>

    </div> 
    
    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-18.png" alt="Client">
        </figure>

    </div> 
    
    <div class="col-lg-2 col-md-4 col-sm-6">

        <figure class="client-opaque-inverted client-opaque-inverted-alt">
            <img src="./images/clients/client-18.png" alt="Client">
        </figure>

    </div> 

</div>
</div> -->

</section>

<!-- 
<section class="section mt-100 pt-110 pb-80" id="testimonials" style="background-image: url(./images/bg/bg-21.jpg);" data-parallax-bg="true">

<div class="container">
<div class="row">
    <div class="col-md-6 mx-auto">

        <header class="section-title section-title-gradient-underline align-center mb-80">
            <h2 class="title color-white xs ltr-sp-175">TRUSTED BY THE GLOBAL BRANDS</h2>
        </header>

    </div> 
</div>
</div> 

<div class="container-fluid">
<div class="row">
    <div class="col-sm-12 px-0">

        <div class="carousel-container carousel-nav-style12 nav-light testi-carousel" data-flickity-options='{"cellAlign":"center","groupCells":true,"prevNextButtons":true,"pageDots":true,"pauseAutoPlayOnHover":false}'>

            <div class="carousel-nav text-center">
                <button class="btn flickity-prev-next-button previous"><i class="fa fa-angle-left"></i></button>
                <button class="btn flickity-prev-next-button next"><i class="fa fa-angle-right"></i></button>
            </div>

            <div class="carousel-items">

                <div class="ra-carousel-item col-sm-12">

                    <div class="ra-carousel-item-inner text-center">

                        <h4><span style="color: #ffffff;">I’ve been buying a lot of wordpress themes and Boo is by far the easiest to customize and yet includes the strongest features I’ve ever seen.</span></h4>
                        <p style="font-size: 14px;color: rgba(255,255,255,0.4);line-height: 1.5em;text-align: center;letter-spacing:0.15em">BRUCE SANCHEZ</p>

                    </div> 


                </div>

                <div class="ra-carousel-item col-sm-12">

                    <div class="ra-carousel-item-inner text-center">

                        <h4><span style="color: #ffffff;">I’ve been buying a lot of wordpress themes and Boo is by far the easiest to customize and yet includes the strongest features I’ve ever seen.</span></h4>
                        <p style="font-size: 14px;color: rgba(255,255,255,0.4);line-height: 1.5em;text-align: center;letter-spacing:0.15em">BRUCE SANCHEZ</p>

                    </div> 


                </div>

                <div class="ra-carousel-item col-sm-12">

                    <div class="ra-carousel-item-inner text-center">

                        <h4><span style="color: #ffffff;">I’ve been buying a lot of wordpress themes and Boo is by far the easiest to customize and yet includes the strongest features I’ve ever seen.</span></h4>
                        <p style="font-size: 14px;color: rgba(255,255,255,0.4);line-height: 1.5em;text-align: center;letter-spacing:0.15em">BRUCE SANCHEZ</p>

                    </div> 


                </div>

            </div> 

        </div> 

    </div>
</div> 
</div> -->

</section>
<!-- /End Testimonials -->


<!--
<section class="section pt-100 pb-100" id="shop">

<div class="container">
<div class="row align-items-center">

    <div class="col-lg-6">

        <figure>
            <img src="./images/misc/shop.jpg" alt="Shop">
        </figure>

    </div> 

    <div class="col-lg-5 ml-auto">

        <h2 class="h1 my-0">Start selling online.</h2>
        <h5 class="font-weight-bold mt-0 mb-4"><span style="color: #83888f;">No coding skills required to create unique sites.</span></h5>

        <div class="icon-box icon-container-shadowed icon-box-circle icon-box-custom icon-box-inline icon-container-shadowed-static icon-box-sm icon-box-heading-sm mb-25">

            <span class="icon-container bg-white" data-plugin-animated-icon="true" data-plugin-options='{"color":"#94abae","hoverColor":"#ffffff"}'>
                <span class="icon-container-hover-gradient"></span>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <g id="1" transform="translate(1.000000, 1.000000)" fill-rule="nonzero" stroke="#000000" stroke-width="2">
                            <path d="M2.1122883,2.125 L2.1122883,0.375 L0.3622883,0.375 L0.3622883,2.125 L2.1122883,2.125 Z M9.6122883,2.125 L9.6122883,0.375 L7.8622883,0.375 L7.8622883,2.125 L9.6122883,2.125 Z M17.1122883,2.125 L17.1122883,0.375 L15.3622883,0.375 L15.3622883,2.125 L17.1122883,2.125 Z M2.1122883,7.875 L0.3622883,7.875 L0.3622883,9.625 L2.1122883,9.625 L2.1122883,7.875 Z M9.6122883,7.875 L7.8622883,7.875 L7.8622883,9.625 L9.6122883,9.625 L9.6122883,7.875 Z M17.1122883,7.875 L15.3622883,7.875 L15.3622883,9.625 L17.1122883,9.625 L17.1122883,7.875 Z M2.1122883,17.125 L2.1122883,15.375 L0.3622883,15.375 L0.3622883,17.125 L2.1122883,17.125 Z M9.6122883,15.375 L7.8622883,15.375 L7.8622883,17.125 L9.6122883,17.125 L9.6122883,15.375 Z M17.1122883,17.125 L17.1122883,15.375 L15.3622883,15.375 L15.3622883,17.125 L17.1122883,17.125 Z" id="Shape" stroke="url(#grad923412)" fill="none" style="stroke-dasharray: 63, 65; stroke-dashoffset: 0;"></path>
                        </g>
                    </g>
                </svg>
            </span>
            <h3 class="weight-medium">Sell your products and receive payments.</h3>

        </div>

        <div class="icon-box icon-container-shadowed icon-box-circle icon-box-custom icon-box-inline icon-container-shadowed-static icon-box-sm icon-box-heading-sm mb-25">

            <span class="icon-container bg-white" data-plugin-animated-icon="true" data-plugin-options='{"color":"#94abae","hoverColor":"#ffffff"}'>
                <span class="icon-container-hover-gradient"></span>
                <svg width="50px" height="49px" viewBox="0 0 50 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="icon-1" transform="translate(1.000000, 1.000000)" fill-rule="nonzero" stroke="#000000" stroke-width="2">
                    <path d="M6.566208,0.25 L6.566208,40.90625 L6.597458,0.28125 L47.191208,0.28125 L47.191208,44.0644531 C47.191208,44.8419967 46.8924165,45.5391766 46.3270261,46.1045674 C45.7616355,46.6699584 45.0644549,46.96875 44.286911,46.96875 L3.408005,46.96875 C2.6304611,46.96875 1.93328051,46.6699584 1.36789003,46.1045675 C0.802499452,45.5391766 0.503708,44.8419967 0.503708,44.0644531 L0.503708,6.375 L2.534958,6.375 L0.472458,6.34375 L0.472458,44.0644531 C0.472458,44.9010609 0.7490828,45.5772547 1.32214255,46.1503149 C1.89520345,46.7233754 2.57139688,47 3.408005,47 L44.286911,47 C45.1235191,47 45.7997125,46.7233754 46.3727729,46.1503154 C46.9458332,45.5772547 47.222458,44.9010609 47.222458,44.0644531 L47.222458,0.25 L6.566208,0.25 Z M26.909958,6.375 L26.909958,6.34375 L12.659958,6.34375 L12.659958,6.375 L26.909958,6.375 Z M12.659958,16.53125 L41.128708,16.53125 L41.128708,16.5 L12.659958,16.5 L12.659958,16.53125 Z M35.034958,26.6875 L35.034958,26.65625 L12.659958,26.65625 L12.659958,26.6875 L35.034958,26.6875 Z M12.659958,36.84375 L41.128708,36.84375 L41.128708,36.8125 L12.659958,36.8125 L12.659958,36.84375 Z" id="ion-ios-paper-outline---Ionicons" stroke="url(#grad98752)" fill="none" style="stroke-dasharray: 618, 620; stroke-dashoffset: 0;"></path>
                </g>
                </g>
                </svg>
            </span>
            <h3 class="weight-medium">Sell your products and receive payments.</h3>

        </div>

        <div class="icon-box icon-container-shadowed icon-box-circle icon-box-custom icon-box-inline icon-container-shadowed-static icon-box-sm icon-box-heading-sm mb-25">

            <span class="icon-container bg-white" data-plugin-animated-icon="true" data-plugin-options='{"color":"#94abae","hoverColor":"#ffffff"}'>
                <span class="icon-container-hover-gradient"></span>
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M22.5497883,0.9375 L22.5497883,22.5625 L0.9247883,22.5625 L0.9247883,0.9375 L22.5497883,0.9375 Z M19.6629965,6.125 L7.4872883,6.125 L19.6629965,6.125 Z M19.7372883,11.71875 L7.4872883,11.71875 L19.7372883,11.71875 Z M19.7372883,17.34375 L7.4872883,17.34375 L19.7372883,17.34375 Z M5.1747883,6.5625 C5.52364903,6.5625 5.6122883,6.47386073 5.6122883,6.125 C5.6122883,5.77613927 5.52364903,5.6875 5.1747883,5.6875 C4.82592757,5.6875 4.7372883,5.77613927 4.7372883,6.125 C4.7372883,6.47386073 4.82592757,6.5625 5.1747883,6.5625 Z M5.1747883,12.1875 C5.52364903,12.1875 5.6122883,12.0988607 5.6122883,11.75 C5.6122883,11.4011393 5.52364903,11.3125 5.1747883,11.3125 C4.82592757,11.3125 4.7372883,11.4011393 4.7372883,11.75 C4.7372883,12.0988607 4.82592757,12.1875 5.1747883,12.1875 Z M5.1747883,17.8125 C5.52364903,17.8125 5.6122883,17.7238607 5.6122883,17.375 C5.6122883,17.0261393 5.52364903,16.9375 5.1747883,16.9375 C4.82592757,16.9375 4.7372883,17.0261393 4.7372883,17.375 C4.7372883,17.7238607 4.82592757,17.8125 5.1747883,17.8125 Z" id="Shape" stroke="url(#grad979908)" fill-rule="nonzero" fill="none" style="stroke-dasharray: 169, 171; stroke-dashoffset: 0;"></path>
                </g>
                </svg>
            </span>
            <h3 class="weight-medium">Sell your products and receive payments.</h3>

        </div>

    </div> 

</div> 
</div> 

</section>
-->


<!-- /Start News -->
<!--
<section class="section pt-60 pb-60" id="news">

<div class="container">

<div class="row">

    <div class="col-sm-12">

        <header class="section-title section-title-default">
            <h5 class="subtitle md text-uppercase">OFFICE CHAT</h5>
            <h2 class="title">Recent Posts</h2>
        </header>

    </div> 

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="latest-posts latest-classic">

            <figure>
                <img width="360" height="223" src="./images/blog/featured-img-7.jpg" alt="Introducing Boo Universe">
                <div class="latest-post-categories">
                    <a href="#">Updates</a>
                </div>
            </figure>

            <div class="latest-content">

                <header>
                    <h3 class="entry-title">
                        <a href="#">Introducing Boo Universe</a>
                    </h3>
                </header>

                <div class="excerpt">
                    <p>Let the stories unfold and unleash yourself. Much&nbsp; ouch&nbsp; one grizzly a</p>
                </div>

            </div> 

            <a href="#" class="overlay-link"></a>

        </div>

    </div>

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="latest-posts latest-classic">

            <figure>
                <img width="360" height="223" src="./images/blog/featured-img-8.jpg" alt="Introducing Boo Universe">
                <div class="latest-post-categories">
                    <a href="#">Updates</a>
                </div>
            </figure>

            <div class="latest-content">

                <header>
                    <h3 class="entry-title">
                        <a href="#">Improve your website performance</a>
                    </h3>
                </header>

                <div class="excerpt">
                    <p>Let the stories unfold and unleash yourself. Much&nbsp; ouch&nbsp; one grizzly a</p>
                </div>

            </div> 

            <a href="#" class="overlay-link"></a>

        </div>

    </div>

    <div class="col-lg-4 col-md-10 mx-auto">

        <div class="latest-posts latest-classic">

            <figure>
                <img width="360" height="223" src="./images/blog/featured-img-9.jpg" alt="Introducing Boo Universe">
                <div class="latest-post-categories">
                    <a href="#">Updates</a>
                </div>
            </figure>

            <div class="latest-content">

                <header>
                    <h3 class="entry-title">
                        <a href="#">Let the stories unfold</a>
                    </h3>
                </header>

                <div class="excerpt">
                    <p>Let the stories unfold and unleash yourself. Much&nbsp; ouch&nbsp; one grizzly a</p>
                </div>

            </div> 

            <a href="#" class="overlay-link"></a>

        </div>

    </div>

    <div class="col-sm-12">
        <a href="#" class="btn btn-default semi-round border-thin btn-block text-uppercase btn-dark btn-dark-alt">
            <span>See all blog posts</span>
        </a>
    </div> 

</div> 

</div> 

</section>
-->


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