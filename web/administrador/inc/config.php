<?php
// BASE DE DATOS
define('DB_SERVER', 'localhost');
define('DB_USER', 'dbuser');
define('DB_PASS', '123');
define('DB_NAME', 'intervalo_bd');
//CARPETAS
define ( 'TEMPLATEDIR', dirname( __FILE__ ) . '/../templates' );
define ( 'MODULOSDIR', dirname( __FILE__ ) . '/modulos' );
define ( 'UPLOADS', dirname( __FILE__ ) . '/../../contenido' );
define ( 'UPLOADSIMAGES', UPLOADS . '' );
define ( 'UPLOADSFILES', UPLOADS . '' );
//URL
define ('CARPETASERVIDOR', '' );//esta variable se define si el sitio no está en el root del dominio y si está en una subcarpeta
define ('MAINURL', 'http://' . $_SERVER['HTTP_HOST'] . CARPETASERVIDOR );
define ('URLADMINISTRADOR', MAINURL . '/administrador' );//esta variable define la carpeta del administrador - también debe cambianser en el .js
define ('UPLOADSURL', MAINURL . '/contenido');//carpeta donde esta el contenido subido por el usuario
define ('UPLOADSURLIMAGES', UPLOADSURL . '');//carpeta  de imagenes (por si tiene distintas carpetas de contenido)
define ('UPLOADSURLFILES', UPLOADSURL . '');//carpeta de archivos (por si tiene distintas carpetas de contenido)

//DEFINICIONES HEAD Y SCRIPTS
define ( 'SITENAME', 'Intervalo Productivo' );
define ( 'DATEPUBLISHED', '2018');
define ('LOGOSITE' , URLADMINISTRADOR . '/assets/images/logosite.png');
define ( 'SITETITLE', 'Nombre - Panel de control' );
define ( 'FAVICONICO', URLADMINISTRADOR . '/favicon.ico' );

//variables tipo de usuario
global $usertype;
$usertype = array(
	array( 'status' => '0', 'nombre' => 'Administrador'),
	array( 'status' => '1', 'nombre' => 'Editor'),
	array( 'status' => 'a', 'nombre' => 'default'),
);
//variables de categorias de noticia
global $categorias;//define las categorias para cargar noticias
$categorias = array(
	array( 'slug' => 'noticias', 'nombre' => 'Noticias'),
);
//variables de categorias de galeria de imagenes / si existen
global $categoriasGalerias;//define las categorias para cargar galerias
$categoriasGalerias = array(
	array( 'slug' => 'galeria1', 'nombre' => 'Galeria 1'),
	array( 'slug' => 'galeria2', 'nombre' => 'Galeria 2'),
);

//variables de categorias de galeria de archivos //normalmente pdf para descargar
global $categoriasArchivos;//define las categorias para cargar galerias
$categoriasArchivos = array(
	array( 'slug' => 'cat1', 'nombre' => 'Categoría 1', 'lista' => array(
		'archivo1', 'archivo2', 'archivo3'
	) ),
	array( 'slug' => 'cat2', 'nombre' => 'Categoría 2', 'lista' => array(
		'archivo1', 'archivo2', 'archivo3'
	)),
);

//variable de info adicional, por ejemplo, redes sociales, teléfonos y emails
global $infoAdicional;
$infoAdicional = array(
	array(
		'name' => 'Redes Sociales', 'id' => 'redes-sociales', 'data' =>	array(
			array( 'type' => 'text', 'id' => 'instragram', 'name' => 'Instagram', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'pinterest', 'name' => 'Pinterest', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'linkedin', 'name' => 'Linkedin', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'twitter', 'name' => 'Twitter', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'snapchat', 'name' => 'Snapchat', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'vimeo', 'name' => 'Vimeo', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'youtube', 'name' => 'Youtube', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'spotify', 'name' => 'Spotify', 'data' => '#', 'extra'=> '' ),
			array( 'type' => 'text', 'id' => 'facebook', 'name' => 'Facebook', 'data' => '#', 'extra'=> '' ),
		),
	),
	array(
			'name' => 'Teléfonos', 'id' => 'telefonos', 'data' =>	array(
			'telefono1' => array( 'type' => 'text', 'id' => 'telefono-1', 'name' => 'telefono', 'data' => '#', 'extra'=> '' ),
			'telefono2' => array( 'type' => 'text', 'id' => 'telefono-2', 'name' => 'telefono auxiliar', 'data' => '#', 'extra'=> '' ),
		),
	),
	array(
		'name' => 'Email', 'id' => 'emails', 'data' =>	array(
			'email1' => array( 'type' => 'text', 'text', 'id' => 'email-1', 'name' => 'email', 'data' => '#', 'extra'=> '' ),
			'email2' => array( 'type' => 'text', 'text', 'id' => 'email-2', 'name' => 'email', 'data' => '#', 'extra'=> '' ),
		),
	),	
);//$infoAdicional
