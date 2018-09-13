</div>
		<!-- End #content -->

		<!-- Start Main Footer -->
		<footer class="main-footer main-footer--style-neoclassic pt-60 pb-80" style="font-size: 12px;">

			<div class="container">
				<div class="row">

					<div class="col-lg-3 col-md-12">

						
						<a href="index.html" class="navbar-brand d-sm-none d-md-none d-lg-inline-block">
							<img src="<?php echo MAINSURL; ?>/images/logo/logo-color.png" alt="Intervalo Productivo">
						</a>
						<ul class="social-icon faded scheme-white social-icon-lg" >
									<li><a href="https://www.facebook.com/Intervalo-Productivo-455420774469752/?fref=ts" target="_blank"><i class="fa fa-facebook" style="font-size:35px;"></i></a></li>
									<li><a href="https://www.instagram.com/intervaloproductivo/" target="_blank"><i class="fa fa-instagram" style="font-size:35px;"></i></a></li>
									<li><a href="https://www.youtube.com/channel/UCZyXoQRC-8heAPndIOHDPmw" target="_blank"><i class="fa fa-youtube-play" style="font-size:35px;"></i></a></li>
									<li><a href="https://www.linkedin.com/company/intervalo-productivo/" target="_blank"><i class="fa fa-linkedin" style="font-size:35px;"></i></a></li>
								</ul>
					

					</div> <!-- /.col-lg-3 col-md-12 -->

					<div class="col-lg-2 col-md-6">
						
						<h3 class="widget-title">Navegacion</h3>
						<div class="widget widget_nav_menu">
							<ul class="menu">
								<li class="local-scroll"><a href="<?php echo MAINSURL; ?>">Inicio</a></li>
								<li class="local-scroll"><a href="<?php echo MAINSURL; ?>/acciones">Acciones</a></li>
								<li class="local-scroll"><a href="<?php echo MAINSURL; ?>/clientes">Clientes</a></li>
								<li class="local-scroll"><a href="http://www.intervaloproductivo.com.ar/turnos" target="_blank">Turnos</a></li>
								<li class="local-scroll"><a href="http://www.intervaloproductivo.com.ar/blog" target="_blank">Blog</a></li>
								<li class="local-scroll"><a href="<?php echo MAINSURL; ?>/contacto">Contacto</a></li>
							
							</ul>
						</div> <!-- /.widget widget_nav_menu -->
					</div> <!-- /.col-lg-2 col-md-6 -->

					<div class="col-lg-2 col-md-6">

						<h3 class="widget-title">Categorias</h3>
						<div class="widget widget_nav_menu">
							<ul class="menu">
							<?php $categorias = getPosts('categorias');
							if ( $categorias != null ) {
								foreach ( $categorias as $categoria ) {
									echo '<li class="local-scroll"><a href="'.MAINSURL . '/' .$categoria['post_url'].'">'.$categoria['post_titulo'].'</a></li>';
								}
							}
							?>
							</ul>
						</div> <!-- /.widget widget_nav_menu -->

					</div> <!-- /.col-lg-2 col-md-6 -->
					
					<div class="col-lg-2 col-md-6">

								<h3 class="widget-title">Más solitados</h3>
								<div class="widget widget_nav_menu">
									<ul class="menu">

									<?php $destacados = getDestacados( 4 );
										if ($destacados== null) {
											$destacados = getLasts( 4 );
										}

										foreach ( $destacados as $destacado ) {
										 echo '<li class="local-scroll"><a href="'.MAINSURL . '/'.getCategoryData($destacado['post_categoria'])['slug'].'/'.$destacado['post_url'].'">'.$destacado['post_titulo'].'</a></li>';
										}
									?>
									
									</ul>
								</div> <!-- /.widget widget_nav_menu -->

							</div> <!-- /.col-lg-6 col-md-12 -->

					<div class="col-lg-3 col-md-12">

						<div class="row">

						

							<div class="col-lg-12 col-md-12">

								<h3 class="widget-title">Nuestros contactos</h3>
									<ul style="padding-left: 0; list-style: none;">
							<li style="font-weight: bolder;"><a href="tel:+54 11 3091-2007" target="_blank"><i class="fa fa-phone" style="font-size:15px; margin-right: 5px;"></i></a>+54 11 3091-2007</li>
							<li style="font-weight: bolder;"><a href="" target="_blank"><i class="fa fa-whatsapp" style="font-size:15px; margin-right: 5px;"></i></a>+54 11 5505-9112</li>
							<li style="font-weight: bolder;"><a href="#" target="_blank"><i class="fa fa-envelope" style="font-size:10px; margin-right: 5px;"></i></a>info@intervaloproductivo.com.ar</li>
						</ul>
						<a href="#" class="btn btn-underlined border-thin btn-light" style="font-size: 12px;">
							<span>Registrar una cuenta</span>
						</a>
						<a href="#" class="btn btn-underlined border-thin btn-light" style="font-size: 12px;">
							<span>Encontranos!</span>
						</a>

							</div> <!-- /.col-lg-6 col-md-12 -->

						</div> <!-- /.row -->


					</div> <!-- /.col-lg-5 col-md-12 -->

				</div><!-- /.row -->
			</div><!-- /.container -->

		</footer>
		<!-- End Main Footer -->

	</div>
	<!-- End #wrap -->

	<div class="snackbars" id="form-output-global"></div>
	<script src="<?php echo MAINSURL; ?>/js/core.min.js"></script>
	<script src="<?php echo MAINSURL; ?>/js/theme.vendors.min.js"></script>
	
	
	
	<script src="<?php echo MAINSURL; ?>/js/script.js"></script>
	<script src="<?php echo MAINSURL; ?>/js/theme.min.js"></script>
	<!--<script src="js/slick.js"></script>-->
	<script src="<?php echo MAINSURL; ?>/js/custom.js"></script>
	
	

	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/jquery.themepunch.tools.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/jquery.themepunch.revolution.min.js"></script>

	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.actions.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.carousel.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.kenburn.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.layeranimation.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.migration.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.navigation.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.parallax.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.slideanims.min.js"></script>
	<script type="text/javascript" src="<?php echo MAINSURL; ?>/vendors/themepunch/extensions/revolution.extension.video.min.js"></script>

	<script type="text/javascript">function setREVStartSize(e){
			try{ var i=jQuery(window).width(),t=9999,r=0,n=0,l=0,f=0,s=0,h=0;
				if(e.responsiveLevels&&(jQuery.each(e.responsiveLevels,function(e,f){f>i&&(t=r=f,l=e),i>f&&f>r&&(r=f,n=e)}),t>r&&(l=n)),f=e.gridheight[l]||e.gridheight[0]||e.gridheight,s=e.gridwidth[l]||e.gridwidth[0]||e.gridwidth,h=i/s,h=h>1?1:h,f=Math.round(h*f),"fullscreen"==e.sliderLayout){var u=(e.c.width(),jQuery(window).height());if(void 0!=e.fullScreenOffsetContainer){var c=e.fullScreenOffsetContainer.split(",");if (c) jQuery.each(c,function(e,i){u=jQuery(i).length>0?u-jQuery(i).outerHeight(!0):u}),e.fullScreenOffset.split("%").length>1&&void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0?u-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0&&(u-=parseInt(e.fullScreenOffset,0))}f=u}else void 0!=e.minHeight&&f<e.minHeight&&(f=e.minHeight);e.c.closest(".rev_slider_wrapper").css({height:f})
			}catch(d){console.log("Failure at Presize of Slider:"+d)}
		};</script>

		<script type="text/javascript">
	var revapi19,
	tpj=jQuery;

	tpj(document).ready(function() {
	if(tpj("#rev_slider_19_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_19_1");
	}else{
		revapi19 = tpj("#rev_slider_19_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"<?php echo MAINSURL; ?>/vendors/themepunch/extensions/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
							mouseScrollReverse:"default",
				onHoverStop:"off",
				arrows: {
					style:"boo2018",
					enable:true,
					hide_onmobile:false,
					hide_onleave:true,
					hide_delay:200,
					hide_delay_mobile:1200,
					tmp:'<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
					left: {
						h_align:"left",
						v_align:"center",
						h_offset:0,
						v_offset:0
					},
					right: {
						h_align:"right",
						v_align:"center",
						h_offset:0,
						v_offset:0
					}
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			parallax: {
				type:"scroll",
				origo:"enterpoint",
				speed:400,
				speedbg:0,
				speedls:0,
				levels:[2,4,6,8,10,12,14,16,18,20,47,48,49,50,51,55],
			},
			shadow:0,
			spinner:"spinner0",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}

	});	/*ready*/
	</script>

</body>

</html>