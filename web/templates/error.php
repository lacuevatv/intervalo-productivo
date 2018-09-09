<section class="section" style="background-color: #f6f8fb; padding: 200px 20px 100px;">
    <div class="container-fluid px-0">
        
        <div class="row align-items-center">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
                <h2 class="text-center">
                    Hagamos una pausa...
                </h2>
                <p class="text-center">
                    Parece que no encontramos su página, haga click en otra debajo.
                </p>
            </div>
            <div class="col-sm-1"></div>
        </div>

    </div>
</section>

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