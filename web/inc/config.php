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
	array( 'slug' => 'pausas-activas', 'nombre' => 'Pausas Activas' ),
	array( 'slug' => 'bienestar', 'nombre' => 'Bienestar' ),
	array( 'slug' => 'salud', 'nombre' => 'Salud' ),
	array( 'slug' => 'deportivo', 'nombre' => 'Deportivo' ),
	array( 'slug' => 'eventos', 'nombre' => 'Eventos' ),
	array( 'slug' => 'futbol-interempresarial', 'nombre' => 'Fútbol interempresarial' ),
);

/*
 * MENU
*/
global $menuPrincipal;

$menuPrincipal = array(
	array( 'url_ext' => false, 'url' => 'inicio', 'target_blank' => false, 'nombre' => 'Inicio', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url_ext' => false, 'url' => 'clientes', 'target_blank' => false, 'nombre' => 'Portfolio', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url_ext' => false, 'url' => 'acciones', 'target_blank' => false, 'nombre' => 'Acciones', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url_ext' => true, 'url' => 'http://www.intervaloproductivo.com.ar/turnos', 'target_blank' => true, 'nombre' => 'Turnos', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url_ext' => true, 'url' => 'http://www.intervaloproductivo.com.ar/blog', 'target_blank' => false, 'nombre' => 'Blog', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	array( 'url_ext' => false, 'url' => 'contacto', 'target_blank' => false, 'nombre' => 'Contacto', 'classes' => '', 'submenu' => false, 'subItems' => array(),  ),
	/*
	EJEMPLO CON SUBMENUS
	array( 'url_ext' => false, 'url' => 'cursos-cortos', 'target_blank' => false, 'nombre' => 'Cursos Cortos', 'classes' => '', 'submenu' => true, 'subItems' => array(
		array( 'url_ext' => false, 'url' => '', 'target_blank' => false, 'nombre' => 'Programación Web', ),
		array( 'url_ext' => false, 'url' => '', 'target_blank' => false, 'nombre' => 'Operador de Pc', ),
		array( 'url_ext' => false, 'url' => '', 'target_blank' => false, 'nombre' => 'Photoshop', ),
		),
	),*/

);