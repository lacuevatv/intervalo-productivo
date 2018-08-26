<?php
/*
 * Modulo auto administrable
 * Since 2.0
 * Pagina de funciones
*/

require_once('config.php');

/*
 * Funciones sin base de datos
*/

//busca el template $name = nombre del archivo sin extensión
function getTemplate ($name, $data = array() ) {

	$namePage = TEMPLATEDIR . '/'. $name. '.php';
	if (is_file($namePage)) {
		include $namePage;
	}
}


//carga las funciones del modulo
function load_module( $nombre ) {
	include MODULOSDIR . '/modulo-'. $nombre. '.php';
}

//funcion renombrar archivo para que no se sobreescriba
function renombrar_archivo( $file, $slug ) {
	
	$extension = explode(".", $file );
	$no_aleatorio = rand(100, 999);
	$file = date('Y-m-d') . '-' .$no_aleatorio . '-' . $slug . '.' . end($extension);
	return $file;
}

/**
 * Checks if a request is a AJAX request
 * @return bool
 */
function isAjax() {
    return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']  == 'XMLHttpRequest');
}

/*
busca los scripts necesarios y los inserta a continuación
*/
function get_footer_scripts ($modulo) { ?>

	<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/jquery-ui.min.js"></script>
	<!------- admin scripts ------>
	<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/admin-script.js"></script>
	<!------- scripts modulos ------>
	<?php 
	switch ( $modulo ) {
		case 'noticias':
		case 'editar-noticias': ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/lib/tinymce/tinymce.min.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-noticias.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			
			<?php break;
		
		case 'galeria-imagenes': ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<?php break;

		case 'contacts': ?>
		<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-contacts.js"></script>
		<?php break;

		case 'biblioteca-medios': ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<?php break;
		
		case 'archivos-descargas' :
		case 'info-adicional': ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-otros-opciones.js"></script>
			<?php break;

		case 'sliders' :
		case 'editar-slider' : ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-sliders.js"></script>
			<?php break;

		case 'promociones' : ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-promociones.js"></script>
			<?php break;
		
		default: ?>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/lib/tinymce/tinymce.min.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-noticias.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-medios.js"></script>
			<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/modulo-sliders.js"></script>
			<?php break;
	}
	?>
<?php }

/*
 * Funciones con base de datos
*/

//conección a base de datos y db específica
function connectDB () {
	global $connection;
	$connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
  // Test if connection succeeded
  if( mysqli_connect_errno() ) {
    die("Database connection failed: " . mysqli_connect_error() . 
         " (" . mysqli_connect_errno() . ")"
    );
  }
  if (!mysqli_set_charset($connection, "utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", mysqli_error($connection));
    exit();
	} else {
		mysqli_character_set_name($connection);
	}
  return $connection;
}

//cierre base de datos
function closeDataBase($connection){
	if ( isset($connection) ) {
    	mysqli_close($connection);
    }
}

/*
 * TRAE LA LISTA DE USUARIOS
 * DEVUELVE ARRAY CON USUARIOS
*/
function getUsers() {
	$connection = connectDB();
	$tabla = 'usuarios';
	$query  = "SELECT * FROM " .$tabla;

	$result = mysqli_query($connection, $query);

	while ( $user = $result->fetch_array() ) {
			$users[] = $user;
		}

	return $users;
}