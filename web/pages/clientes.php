<?php include 'header.php'; 

getTemplate('turnos'); ?>


<section class="section pt-250 pb-70">
    <div class="container">
        <div class="row">
            
            <div class="col-md-12">
                <header class="section-title section-title-resolve section-title-default" data-plugin-resolve="true" data-plugin-resolve-options="{ &quot;seperator&quot;: &quot;chars&quot; }" style="padding-top: 200px;">
                    <h5 class="subtitle md text-uppercase">Nuestros clientes</h5>
                    <h2 class="title">Confían en nosotros</h2>
                    <!--<p style="padding-left: 20%; padding-right: 20%;"> Los invitamos a que conozcan algunas de las acciones que venimos realizando para nuestros clientes, compañías nacionales e internacionales que han confiado en nosotros para mejorar el rendimiento de sus equipos a través de ciertos beneficios laborales. </p>-->
                </header>
                <div class="portfolio-grid" data-plugin-portfolio="false">
                    <div class="masonry-filters default" data-target="#grid-1">
                        <span class="filters-toggle-link"> Filtros
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                                <line x1="0" y1="32" x2="63" y2="32"></line>
                                <polyline points="50.7,44.6 63.3,32 50.7,19.4 "></polyline>
                                <circle cx="32" cy="32" r="31"></circle>
                            </svg>
                        </span>
                        
                        <ul class="list-unstyled list-inline">
                            <li data-filter="*" class="active">
                                <span>
                                    <span>All</span>
                                </span>
                            </li>
                            <?php 
                            $categorias = getPosts( 'categorias' );
                            if ($categorias != null) :
                                
                                foreach ( $categorias as $categoria ) { ?>
                                    <li data-filter=".filter-<?php echo $categoria['post_ID']; ?>">
                                        <span>
                                            <span><?php echo $categoria['post_titulo']; ?></span>
                                        </span>
                                    </li>
                                <?php }

                            endif;
                            ?>
                            <!--<li data-filter=".photography">
                                <span>
                                    <span>Pausas Activas</span>
                                </span>
                            </li>-->
                        </ul>
                    </div>
                    
                    <div id="grid-1" class="row items-container sp-10">
                        <div class="items-loader">
                            <svg class="circular" viewBox="25 25 50 50">
                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                            </svg>
                        </div>

                        <?php 
                        $clientes = getClientes();

                        if ( $clientes != null ) :
                            
                            foreach ( $clientes as $cliente ) {
                                $imagen = UPLOADSURL . '/' . $cliente['cliente_imagen'];
                                if ( $cliente['cliente_imagen'] == '' ) {
                                    $imagen = MAINSURL . '/images/default-rectangular.png';
                                }

                                $serviciosActivos = '';
                                $servicios = $cliente['cliente_servicios_activos'];
                                $filtro = '';

                                if ( $servicios != '' ) {
                                    $servicios = explode(',' , $servicios);    

                                    for ($i=0; $i < count($servicios)-1 ; $i++) { 
                                        $post = getPostById($servicios[$i]);
                                        
                                        if ( $post != null) {
                                            
                                            $filtro .= ' filter-' . $post['post_categoria'];
                                            if ( $i != 0 ) {
                                                $serviciosActivos .= ' - ';    
                                            }
                                            $serviciosActivos .= '<a href="'.getCategoryData($post['post_categoria'])['slug'] . '/' . $post['post_url'].'">'.$post['post_titulo'].'</a>';
                                        }

                                    }
                                }
                                
                                ?>
                                <div class="col-lg-3 col-md-6 masonry-item <?php echo $filtro; ?>">
                                    <div class="portfolio-item grid masonry hover-bottom style-hover buttons-circle text-left text-light" data-custom-image="true"
                                        data-custom-image-selector="{ &quot;src&quot;: &quot;.pf-image&quot; }">
                                        <div class="inner-wrapper">
                                            <div class="portfolio-inner">
                                                <div class="portfolio-main-image">
                                                    <figure>
                                                        <img src="<?php echo $imagen; ?>" class="pf-image" alt="Tenaris">
                                                    </figure>
                                                </div>
                                                <div class="portfolio-content">
                                                    <div class="title-wrapper">
                                                        <h2>
                                                            <a href="#" rel="bookmark"><?php echo $cliente['cliente_titulo']; ?></a>
                                                        </h2>
                                                        <ul class="category">
                                                            <li>
                                                                <?php echo $serviciosActivos; ?>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <a class="portfolio-overlay-link" href="#"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php }
                        ?>
                            
                        <?php endif; ?>
                        
                        
                        
                    <!--
                    <div class="page-nav page-ajax">
                        <nav aria-label="Page navigation">
                            <a href="#" data-plugin-ajaxify="true" class="btn btn-md btn-default btn-dark btn-dark-alt ajax-load-more" data-plugin-options="{&quot;wrapper&quot;:&quot;.portfolio-grid .items-container&quot;,&quot;items&quot;:&quot;.portfolio-item&quot;}">
                                <span>Load more
                                    <i class="fa fa-angle-down"></i>
                                </span>
                                <i class="icon-arrows_clockwise loading-icon"></i>
                            </a>
                        </nav>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>