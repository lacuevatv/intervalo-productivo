<?php
/*
 * Sitio web: Cuvl
 * @LaCueva.tv
 * Since 1.0
 * CONFIG
 * Contenido: conneccion
*/
//BD
define('DB_SERVER', 'localhost');
define('DB_USER', 'dbuser');
define('DB_PASS', '123');
define('DB_NAME', 'intervalo_bd');
//DEFINICIONES HEAD Y SCRIPTS
define ( 'VERSION', '1.1' );
//CARPETAS
define ( 'UPLOADS', dirname( __FILE__ ) . '/../contenido' );
define ( 'PAGESDIR', dirname( __FILE__ ) . '/../pages' );
define ( 'TEMPLATEDIR', dirname( __FILE__ ) . '/../templates' );
//urls
define ('CARPETASERVIDOR', '' );//esta variable se define si el sitio no está en el root del dominio y si está en una subcarpeta
define ('MAINSURL', 'http://' . $_SERVER['HTTP_HOST'] . CARPETASERVIDOR );
define ('UPLOADSURL', MAINSURL . '/contenido');
define ('UPLOADSFILE', MAINSURL . '/contenido');
//META TAGS
define('SITETITLE', 'Intervalo Productivo');
define('METADESCRIPTION', 'Mejoramos el Clima laboral ofreciendo el servicio de masajes para empresas o en la oficina. Somos un equipo que genera sinergia en otros equipos. Nuestro know how juega siempre a favor del cliente');
define('METAKEYS', '');
//DATA Y LINKS:
define('TELEFONO', '1530912007');
define('DIRECCION', 'Miguens 3560 - Victoria, San Fernando');
define('EMAILGENERAL', 'info@intervaloproductivo.com');
define('LINK_FACEBOOK', 'https://www.facebook.com/Intervalo-Productivo-455420774469752/?fref=ts');
define('LINK_INSTAGRAM', 'https://www.instagram.com/intervaloproductivo/');
define('LINK_LINKEDIN', 'info@intervaloproductivo.com');
define('LINK_YOUTUBE', 'https://www.youtube.com/channel/UCZyXoQRC-8heAPndIOHDPmw');
define('POSTPERPAG', '20');//indica al paginador cuantos se muestran por pagina para calcular el offset además de que el loop muestra solo esos


/*
 * CATEGORIAS
*/
//noticias
global $categorias;
$categorias = array(
	array( 'slug' => 'novedades', 'nombre' => 'Novedades' ),
	array( 'slug' => 'agenda', 'nombre' => 'Agenda Institucional' ),
);

/*
 * MENU
*/
global $menuPrincipal;

$menuPrincipal = array(
	array( 'url' => 'institucional', 'target_blank' => false, 'nombre' => 'Institucional', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url' => 'oferta-academica', 'target_blank' => false, 'nombre' => 'Oferta académica', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url' => 'cursos-cortos', 'target_blank' => false, 'nombre' => 'Cursos Cortos', 'classes' => '', 'submenu' => true, 'subItems' => array(
		array( 'url' => '', 'target_blank' => false, 'nombre' => 'Programación Web', ),
		array( 'url' => '', 'target_blank' => false, 'nombre' => 'Operador de Pc', ),
		array( 'url' => '', 'target_blank' => false, 'nombre' => 'Photoshop', ),
		),
	),
	//array( 'url' => 'inscripcion', 'target_blank' => false, 'nombre' => 'Inscripción', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	//array( 'url' => 'orientacion-vocacional', 'target_blank' => false, 'nombre' => 'Orientación Vocacional', 'classes' => '', 'submenu' => true, 'subItems' => array(),  ),
	array( 'url' => 'novedades', 'target_blank' => false, 'nombre' => 'Novedades', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url' => 'contacto', 'target_blank' => false, 'nombre' => 'Contacto', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	//array( 'url' => '', 'target_blank' => false, 'nombre' => '', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),

);