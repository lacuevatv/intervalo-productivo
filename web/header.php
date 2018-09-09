<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<?php 
		//TITULO Y METADESCRIPTION
		global $headPost;
		
		if ($headPost != '') {
			echo $headPost;

		} else {
			//titulo por defecto, en archivo config
			?>
			<title><?php echo SITETITLE; ?></title>
			<meta name="keywords" content="<?php echo METAKEYS; ?>">
			<meta name="description" content="<?php echo METADESCRIPTION; ?>">

		<?php }
	?>

	<link rel="icon" href="images/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="<?php echo MAINSURL; ?>/css/bootstrap.css">
	<link rel="stylesheet" href="<?php echo MAINSURL; ?>/css/theme-vendors.css">
	<link rel="stylesheet" href="<?php echo MAINSURL; ?>/css/theme.css">
	<link rel="stylesheet" href="<?php echo MAINSURL; ?>/css/theme-color/theme-neoclassic.css">
	<script src="<?php echo MAINSURL; ?>/vendors/modernizr.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<?php echo MAINSURL; ?>/vendors/themepunch/settings.css">
	<!--Slick CSS-->
    <link rel="stylesheet" type="text/css" href="<?php echo MAINSURL; ?>/css/slick.css">
</head>

<body class="footer-fixed">	
	
	<?php openPopUp(PAGEACTUAL); ?>

	<div id="wrap">
	
		<!-- Start Main Header -->
		<header class="main-header header-overlay logo-sm-left main-header--style-neoclassic<?php if (PAGEACTUAL != 'inicio' ) {echo ' blacknav'; } ?> ">

			<!-- Start Mainbar -->
			<section class="no-side-spacing header-fullwidth-justified main-bar-container">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<div class="main-bar navbar-expand-lg">

								<div class="navbar-header d-lg-none d-xl-none py-0 px-0">
									<a href="index.html" class="navbar-brand">
										<img src="<?php echo MAINSURL; ?>/images/logo/logo-color-black.png" alt="Intervalo Productivo">
									</a>
								</div>
								<a href="index.html" class="navbar-brand d-sm-none d-md-none d-lg-inline-block">
									<img src="<?php echo MAINSURL; ?>/images/logo/logo-color.png" alt="Intervalo Productivo">
								</a>
								<div id="main-header-nav" class="collapse navbar-collapse">
									<ul class="nav navbar-nav main-nav">
										<li class="menu-item local-scroll current-menu-item"><a href="<?php echo MAINSURL; ?>"><span class="link-txt">Inicio</span></a></li>
										
										<li class="menu-item local-scroll"><a href="<?php echo MAINSURL; ?>/clientes"><span class="link-txt">Portfolio</span></a></li>
										<li class="menu-item megamenu">
											<a href="<?php echo MAINSURL; ?>/acciones">
												<span class="link-txt">Acciones</span>
											</a>
											<ul class="nav-item-children">
												<li>
													<div class="container">
														<div class="row">
															<div class="col-lg-2 megamenu-column">
																<div class="widget widget_nav_menu">
																	<h5 class="widget_title">Categorias</h5>
																	<?php 
																	$categorias = getPosts('categorias');
																	if ($categorias != null) : ?>
																		<ul>
																			<?php foreach ($categorias as $categoria) { ?>
																			<li class="menu-item">
																				<a href="<?php echo MAINSURL . '/' . $categoria['post_url']; ?>">
																					<span class="link-txt"><?php echo $categoria['post_titulo']; ?></span>
																				</a>
																			</li>

																		<?php } ?>
																		</ul>
																	<?php endif; ?>
																</div>
																<!-- /.custom-menu -->
															</div>
															<!-- /.col-lg-2 -->
															<div class="col-lg-4 megamenu-column">
																<div class="widget widget_latest_posts_entries widget_latest_posts_entries_with_thumb latest-posts">
																	<h5 class="widget_title"></h5>
																	<ul>

																		<?php $destacados = getDestacados( 3 );
																		if ($destacados== null) {
																			$destacados = getLasts( 3 );
																		}

																		foreach ( $destacados as $destacado ) {
																			$imagen = UPLOADSURL . '/' . $destacado['post_imagen'];
																			if ($destacado['post_imagen'] == '') {
																				$imagen = MAINSURL . '/images/default-rectangular.png';
																			}
																			$categoria = getCategoryData($destacado['post_categoria']);
																			?>
																			<li>
																				<figure>
																					<a href="<?php echo MAINSURL . '/'. $categoria['slug'] . '/' . $destacado['post_url']; ?>">
																						<img width="80" height="80" src="<?php echo $imagen; ?>" alt="<?php echo $destacado['post_titulo']; ?>">
																					</a>
																				</figure>
																				<div class="contents">
																					<h3>
																						<a href="<?php echo MAINSURL . '/'. $categoria['slug'] . '/' . $destacado['post_url']; ?>">
																						<?php echo $destacado['post_titulo']; ?>
																						</a>
																					</h3>
																					<span class="time"><?php echo $categoria['nombre']; ?></span>
																				</div>
																			</li>
																		<?php } ?>

																	</ul>
																</div>
																<!-- /.widget -->
															</div>
															<!-- /.col-lg-4 -->
															<div class="col-lg-6 megamenu-column d-flex flex-column align-items-stretch px-0">
																<div class="widget widget_latest_posts_entries-style2 latest-posts d-flex flex-column align-items-stretch">
																	<ul class="d-flex flex-column">
																		
																		<?php 
																		$promos = getPosts('promos', 'none', 3);
																		if ($promos != null) :

																			foreach ( $promos as $promo ) {
																				$imagen = UPLOADSURL . '/'. $promo['post_imagen'];
																				if ($promo['post_imagen'] == '') {
																					$imagen = MAINSURL . '/images/default-rectangular-promos.jpg';
																				}

																				if ( $promo['post_link_externo'] == '' ) {
																					$aTag = '<a href="'.MAINSURL . '/promos/' .$promo['post_url'].'">';
																				} else {
																					$aTag = '<a href="'.$promo['post_link_externo'].'" target="_blank">';
																				}
																				?>
																				<li class="masonry-item">
																					<?php echo $aTag; ?>
																						<article>
																							<figure class="megamenu-lp-bg-1">
																								<img width="295" height="220" src="<?php echo $imagen; ?>" alt="<?php echo $promo['post_titulo']; ?>"> </figure>
																							<div class="contents">
																								<span class="time">NOVEDAD</span>
																								<h3>
																									<?php echo $promo['post_titulo']; ?>
																								</h3>
																							</div>
																						</article>
																					</a>
																				</li>		
																			<?php }
																			
																		endif; ?>

																	</ul>
																</div>
																<!-- /.widget -->
															</div>
															<!-- /.col-lg-6 -->
														</div>
														<!-- /.row -->
													</div>
													<!-- /.container -->
												</li>
												
											</ul>
										</li>
										<li class="menu-item local-scroll"><a href="http://www.intervaloproductivo.com.ar/turnos"><span class="link-txt">Turnos</span></a></li>
										<li class="menu-item local-scroll"><a href="http://www.intervaloproductivo.com.ar/blog"><span class="link-txt">Blog</span></a></li>
										<li class="menu-item local-scroll"><a href="<?php echo MAINSURL; ?>/contacto"><span class="link-txt">Contacto</span></a></li>
										
									</ul>
									
								
									<!-- /.mobile-header-container -->
								<div class="modules-container">
								
									<div class="mobile-header-container">
										<div class="header-module">
											<p>info@intervaloproductivo.com.ar</p>
										</div>
										<div class="header-module">
											<p>(+5411) 3091-2007 • (+5411) 5505-9112</p>
										</div>
										<div class="header-module">
											<p>Victoria, San Fernando</p>
										</div>
										<div class="header-module">
											<ul class="social-icon faded scheme-gray social-icon-md">
												<li>
													<a href="https://www.facebook.com/Intervalo-Productivo-455420774469752/?fref=ts" target="_blank">
														<i class="fa fa-facebook-square novi-icon"></i>
													</a>
												</li>
												<li>
													<a href="https://www.instagram.com/intervaloproductivo/" target="_blank">
														<i class="fa fa-instagram novi-icon"></i>
													</a>
												</li>
												<li>
													<a href="https://www.youtube.com/channel/UCZyXoQRC-8heAPndIOHDPmw" target="_blank">
														<i class="fa fa-youtube novi-icon"></i>
													</a>
												</li>
												<li>
													<a href="https://www.linkedin.com/company/intervalo-productivo/" target="_blank">
														<i class="fa fa-linkedin novi-icon"></i>
													</a>
												</li>
											</ul>
										</div>
										<!-- /.header-module -->
								</div>

									<div class="header-module" style="margin-right: 20px; width: 260px; height: 100px;">
										<ul class="social-icon scheme-white social-icon-md ra_social_icons_5add93f2d2ce2" id="ra_social_icons_5add93f2d2ce2">
											<li><a href="#" target="_blank"><i class="fa fa-facebook" style="font-size:30px;"></i></a></li>
											<li><a href="#" target="_blank"><i class="fa fa-instagram" style="font-size:30px;"></i></a></li>										
											<li><a href="#" target="_blank"><i class="fa fa-youtube-play" style="font-size:30px;"></i></a></li>
											<li><a href="#" target="_blank"><i class="fa fa-linkedin" style="font-size:30px;"></i></a></li>
										</ul>
									</div><!-- /.header-module -->

									<div class="v-sep">
									</div><!-- /.header-module -->

									

								</div> <!-- /.modules-container -->
								<div class="header-module module-nav-trigger d-lg-none d-xl-none">
									<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mobile-nav" aria-expanded="false">
										<span class="sr-only">Toggle navigation</span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- End Mainbar -->

		</header>
        <!-- End Main Header -->
        
        <!-- Start #content -->
		<div id="content">