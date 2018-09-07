<?php 
/*
 * Sitio web: cuvl
 * @LaCueva.tv
 * Since 1.0
 * FUNCTIONS
 * 
*/

require_once 'config.php';
require_once 'lib/mobile-detect/Mobile_Detect.php';

//busca la página $name = nombre del archivo sin extensión
function getPage( $name ) {
	$error = '404';
	$namePage = PAGESDIR . '/'. $name. '.php';

	if (is_file($namePage)) {
		include $namePage;
	} else {
		include PAGESDIR . '/'. $error. '.php';		
	}
}

//busca el template $name = nombre del archivo sin extensión
function getTemplate ( $name, $data = array() ) {
	$namePage = TEMPLATEDIR . '/'. $name. '.php';

	if (is_file($namePage)) {
		include $namePage;
	}
}



//detecta el dispositivo
function dispositivo () {
	$dispositivo = 'pc';
	$detect = new Mobile_Detect;

	if ( $detect->isMobile() ) {
		$dispositivo = 'movil';
	}
		
	// Any tablet device.
	if( $detect->isTablet() ){
		$dispositivo = 'tablet';
	}

	return $dispositivo;

}

//esta función limpia el url si el sitio no está instalado en la rais del servidor para que funcionen los permalinks sin problemas
function cleanUri() {
	$uri = $_SERVER["REQUEST_URI"];
	$uri = str_replace(CARPETASERVIDOR, '', $uri);
	return $uri;	
}

/*
* FUNCIÓN DE PERMALINKS
 * Define la page actual y redirecciona segun url, devuelve el slug o template part.
 * a) En el caso de que sean paginas, busca el template en la carpeta templates y listo.
 * b) En el caso de que sea noticia, categoria o curso, busca el template adecuado (cursos = curso.php / o en en el archivo index elige la primera opcion (la segunda es de paginas).
 * Pero ademas, e importante, busca en la base de datos mediante el slug. Si es noticia hace un loop de la categoria elegida o de todas las noticias y si es noticia single busca la noticia específica.
 *
*/
function pageActual ( $uri ) {
	$slug = 'inicio'; //slug por defecto
	
	//borramos la barra / luego del dominio:
	$url = $uri;
	$parseUrl = explode('/', $url);
	$RequestURI = $parseUrl[1];

	//busca el simbolo ? en la url
	$permalink = strpos($RequestURI, '?');
	$permalink2 = strpos($RequestURI, '&');
	
	//si en el url no aparece ni ? ni & es porque es un link bonito
	if ( $permalink === false && $permalink2 === false ) {
		
		//si no está vacío, hay que procesar cual es
		if ( $url != '/' ) {

			$slug = $RequestURI;		
			
		}

	} 
	//en cambio, si aparece el ? o el & el url funciona con ids, ejecuta la segunda opcion
	else {
		//BUSCAR PAGE EN EL URL, por defecto sería home
		$slug = isset($_REQUEST['page'])?$_REQUEST['page']:'inicio';
		$noticia = isset($_REQUEST['noticia'])?$_REQUEST['noticia']:'none';
		$cat = isset($_REQUEST['cat'])?$_REQUEST['cat']:'none';

		if ( $noticia != 'none' ) {
			$slug = $noticia;
		}

		if ( $cat != 'none' ) {
			$slug = $cat;
		}
	}

	return $slug;

}//pageActual()


/*
ESTA FUNCIÓN TOMA LA VARIANTE DE ALGUNAS PAGINAS POR EJEMPLO NOTICIAS, EL SLUG ES UNA CATEGORIA O EL URL DE UNA NOTICIA
@return: string
* la url de esta pagina al separar por "/" puede tener hasta cuatro indices: 0) "" 1) row 2) categoria 3) slug o url del post o page y 4) ""
1. lo primero que hace la función es chequear si el uri (en caso de ser unico indice) es categoria o row y sino lo es rescata ese slug.
2. si es categoria o row, chequea porque debería haber más indices. Si hay un 3 indice es una pagina o un post 
3. Y si no hay un tercero va por el segundo indice que sería la categoria para hacer el loop
*/
function getPageVar ( $uri ) {
	$slug = '';

	//parsear el url para buscar informacion
	$parseUrl = explode('/', $uri);
	
	if ( isset($parseUrl[2]) && $parseUrl[2] != '' ) {
		$slug = $parseUrl[2];
	}

	return $slug;

}

//acorta el texto
function acortaTexto( $texto, $cantPalabras = 50, $final = null ) {
	if ( null === $final ) {
	$final = '&hellip;';
	}	
	$textoOriginal = $texto;
	
	//quitar html
	$texto = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', $texto );
	$texto = strip_tags($texto);
	
	//reducir texto y agregar el final
	 $words_array = preg_split( "/[\n\r\t ]+/", $texto, $cantPalabras + 1, PREG_SPLIT_NO_EMPTY );
	$sep = ' ';
	
	//devolver texto reducido
	if ( count( $words_array ) > $cantPalabras ) {
		array_pop( $words_array );
		$texto = implode( $sep, $words_array );
		$texto = $texto . $final;
	} else {
		$texto = implode( $sep, $words_array );
	}
	return $texto;
}


/**
 * Checks if a request is a AJAX request
 * @return bool
 */
function isAjax() {
    return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']  == 'XMLHttpRequest');
}

function traducirFecha($fecha, $long= false ) {
	$meses = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
	$dias = array('Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado');

	if ($long) {
	
		$date = $dias[date("w", strtotime($fecha))] .' '. date("j", strtotime($fecha)) .' de '. $meses[date("n", strtotime($fecha))-1];
	} else {
		$date = date("j", strtotime($fecha)) .'/'. $meses[date("n", strtotime($fecha))-1];
	}

	return $date;
}

/*
 *
 * FUNCIONES CON BASE DE DATOS
 *
*/

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
function closeDataBase( $connection ){
	if ( isset($connection) ) {
    	mysqli_close( $connection );
    }
}



//busca datos para loop de noticias por categoria y los devuelve en una variables:
function getPosts( $postType, $categoria = 'none', $number = -1, $exclude = 'none', $status = 'publicado', $offset = 0 ) {
	$connection = connectDB();
	$fecha_actual = date("Y-m-d");
	$tabla = 'posts';

	if ( $offset != '0' ) {
		$number = $offset.','.$number;
	}

	$query  = "SELECT * FROM " .$tabla;
	$query .= " WHERE post_type = '".$postType."'";
	/*$query .= " AND post_status='";
	$query .= $status . "'";*/
	if ( $categoria != 'none' ) {
		$query .= " AND post_categoria = '".$categoria."'";
	}
	if ( $exclude != 'none' ) {
		$query .= " AND post_url!='".$exclude."'";
	}
	if ( $status == 'publicado' ) {
		$query .= " AND post_timestamp <= '".$fecha_actual."'";	
	}
	$query .= " ORDER by post_orden asc, post_timestamp desc ";
	if ( $number != -1 ) {
		$query .= " LIMIT ".$number." ";
	}
	
	$result = mysqli_query($connection, $query);
	
	closeDataBase( $connection );

	if ( $result->num_rows == 0 ) {
		$loop = null;
	} else {

		while ($row = $result->fetch_array()) {
				$loop[] = $row;
			}

	}
	
	return $loop;
}

function getDestacados( $number ) {
	$connection = connectDB();
	$tabla = 'posts';

	$query  = "SELECT * FROM " .$tabla ." WHERE post_type = 'acciones' AND post_destacado='1' ORDER by post_orden ASC LIMIT ". $number;
	
	$result = mysqli_query($connection, $query);
	
	closeDataBase( $connection );

	if ( $result->num_rows == 0 ) {
		$loop = null;
	} else {

		while ($row = $result->fetch_array()) {
				$loop[] = $row;
			}

	}
	
	return $loop;
}

function getLasts( $number ) {
	$connection = connectDB();
	$tabla = 'posts';

	$query  = "SELECT * FROM " .$tabla ." WHERE post_type = 'acciones' ORDER by post_timestamp DESC LIMIT ". $number;
	
	$result = mysqli_query($connection, $query);
	
	closeDataBase( $connection );

	if ( $result->num_rows == 0 ) {
		$loop = null;
	} else {

		while ($row = $result->fetch_array()) {
				$loop[] = $row;
			}

	}
	
	return $loop;
}

//busca la noticia en particular y recoge los datos para pasar al template
function singlePostData ( $postSlug ) {
	$connection = connectDB();
	$fecha_actual = date("Y-m-d");
	$tabla = 'posts';

	$query  = "SELECT * FROM " .$tabla. " WHERE post_url='".$postSlug."' LIMIT 1 ";
	$result = mysqli_query($connection, $query);

	closeDataBase( $connection );

	if ( $result->num_rows == 0 ) {
		$singlePost = null;
	} else {

		$singlePost = mysqli_fetch_array($result);

	}

	return $singlePost;

}

function getPostById($id) {
	$connection = connectDB();
	$tabla = 'posts';

	$query  = "SELECT * FROM " .$tabla. " WHERE post_ID='".$id."' LIMIT 1 ";
	$result = mysqli_query($connection, $query);

	

	if ( $result->num_rows == 0 ) {
		$singlePost = null;
	} else {

		$singlePost = mysqli_fetch_array($result);

	}
	closeDataBase( $connection );
	
	return $singlePost;
}

function postType( $slug ) {
	$post = singlePostData($slug);
	
	if ( $post == null ) {
		$postType = null;
	} else {

		$postType = $post['post_type'];

	}

	return $postType;
}

function getCategoryData($id) {
	$connection = connectDB();
	$tabla = 'posts';

	$query  = "SELECT * FROM " .$tabla. " WHERE post_ID='".$id."' LIMIT 1 ";
	$result = mysqli_query($connection, $query);

	closeDataBase( $connection );

	if ( $result->num_rows == 0 ) {
		$singlePost = null;
	} else {

		$singlePost = mysqli_fetch_array($result);
		
		return array(
			'nombre' => $singlePost['post_titulo'],
			'slug' => $singlePost['post_url'],
		);
	}

}

//busca el slider en base de datos de acuerdo a su 'ubicacion' pasada
function getSliders( $slider ) {

	$connection = connectDB();
	$tabla = 'sliders';
	$query  = "SELECT * FROM " .$tabla. " WHERE slider_ubicacion='".$slider."' ORDER by slider_orden asc";
		
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		echo '<div></div>';
	} else {

		while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
			$dataSliderdataSlider[] = $row;
		}
		
		return $dataSliderdataSlider;

	}//else
	closeDataBase( $connection );
} //getSliders()

function getClientes() {

	$connection = connectDB();
	$tabla = 'clientes';
	$query  = "SELECT * FROM " .$tabla. " ORDER by cliente_orden asc";
		
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		$rows = null;
	} else {

		while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
			$rows[] = $row;
		}
	}//else

	closeDataBase( $connection );

	return $rows;
} //getSliders()


function openPopUp ( $page ) {
	
	if ( $page == 'inicio' ) {

		$connection = connectDB();
		$tabla = 'options';
		$option_name = 'popupValue';
		$query  = "SELECT * FROM " .$tabla. " WHERE options_name = '{$option_name}' LIMIT 1";
		$result =  mysqli_query($connection, $query);
		
		
		if ($result->num_rows == 0) {
			return;
		}
		
		$data = mysqli_fetch_array($result);
		
		if ($data[2] == '1') {
			getTemplate( 'popup' );
		} else {
			return;
		}
	}
}//funcion openPopUp

function showPopupImg () {
	
	$connection = connectDB();
	$tabla = 'medios';
	$post_type = 'promo';
	$query  = 'SELECT * FROM ' .$tabla. ' WHERE medio_post_type = "'.$post_type.'" order by medio_id desc LIMIT 1';

	$result =  mysqli_query($connection, $query);
	$data = mysqli_fetch_array($result);
	$urlPoup = $data[3];
	
	mysqli_close($connection);
	if ( $urlPoup == NULL ) {
		echo MAINSURL . '/images/popupdefault.png';
	} else {
		echo UPLOADSURL . '/' . $urlPoup;
	}
}

//busca el url si existe
function getUrlPromo() {
	$connection = connectDB();
	$tabla = 'options';
	$option_name = 'urlPopup';

	$query  = "SELECT * FROM " .$tabla. " WHERE options_name = '{$option_name}' LIMIT 1";
	$result =  mysqli_query($connection, $query);
	
	closeDataBase($connection);

	if ($result->num_rows == 0) {
		return '#';
	}
	
	$data = mysqli_fetch_array($result);
	
	if ($data[2] == '') {
		return '#';
	} else {
		return $data[2];
	}

	closeDataBase($connection);
}

