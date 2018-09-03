<?php
/*
 * editor
 * Since 3.0
 * Maneja el backend del editor de noticias, ya sea para una nueva noticia o editar alguna
*/
session_start();
require_once('../functions.php');
if ( isAjax() ) {
    
    //se toman los datos para variables
	$connection          = connectDB();
	$tabla               = 'posts';
	$user                = $_SESSION['user_id'];
	$postID              = isset( $_POST['post_ID'] ) ? $_POST['post_ID'] : 'new';
	$postType            = isset( $_POST['post_type'] ) ? $_POST['post_type'] : 'post';
    $postTitulo          = isset( $_POST['post_title'] ) ? $_POST['post_title'] : '';
    $postPreTitulo       = isset( $_POST['post_pre_titulo'] ) ? $_POST['post_pre_titulo'] : '';
	$postCategoria       = isset( $_POST['post_categoria'] ) ? $_POST['post_categoria'] : '';
	$postUrl             = isset( $_POST['post_url'] ) ? $_POST['post_url'] : '';
	$postStatus          = isset( $_POST['post_status'] ) ? $_POST['post_status'] : 'publicado';
	$postDate            = isset( $_POST['post_date'] ) ? $_POST['post_date'] : '';
    $postResumen         = isset( $_POST['post_resumen'] ) ? $_POST['post_resumen'] : '';
    $postMiniTexto       = isset( $_POST['post_mini_texto'] ) ? $_POST['post_mini_texto'] : '';
    $postImagen          = isset( $_POST['post_imagen'] ) ? $_POST['post_imagen'] : '';
	$postContenido       = isset( $_POST['post_contenido'] ) ? $_POST['post_contenido'] : '';
	$postVideo           = isset( $_POST['post_video'] ) ? $_POST['post_video'] : '';
	$postGaleria         = isset( $_POST['post_galeria'] ) ? $_POST['post_galeria'] : '0';//si es true hay que pasarlo a 1 para que se guarde correctamente
    $imgGaleria          = isset( $_POST['imgGaleria'] ) ? $_POST['imgGaleria'] : '';
    $tabs                = isset( $_POST['tabs'] ) ? json_decode($_POST['tabs']) : '';
    $acordion            = isset( $_POST['acordion'] ) ? json_decode($_POST['acordion']) : '';
    $orden               = isset( $_POST['post_orden'] ) ? $_POST['post_orden'] : '0';
    $postHead            = isset( $_POST['post_head'] ) ? $_POST['post_head'] : '';
    $fechaPost           = isset( $_POST['post_date'] ) ? $_POST['post_date'] : null;

    //saneamiento
    $postResumen         = mysqli_real_escape_string($connection, $postResumen);
    $postMiniTexto       = mysqli_real_escape_string($connection, $postMiniTexto);
	$postContenido       = mysqli_real_escape_string($connection, $postContenido);
	$postTitulo          = mysqli_real_escape_string($connection, $postTitulo);
    $postResumen         = filter_var($postResumen,FILTER_SANITIZE_STRING);
    $postMiniTexto       = filter_var($postMiniTexto,FILTER_SANITIZE_STRING);
    $postTitulo          = filter_var($postTitulo,FILTER_SANITIZE_STRING);
    $orden               = filter_var($orden,FILTER_SANITIZE_NUMBER_INT);

	//si hay una galería hay que armar un array con las imagenes y luego serializarlas
	if ( $postGaleria == 'true' ) {
		//en la base de datos se escribe como 1 y 0 así que traduzco a 1 y 0 para que se guarde correctamente
		$postGaleria = '1';
	}	else {
		//en la base de datos se escribe como 1 y 0 así que traduzco a 1 y 0 para que se guarde correctamente
		$postGaleria = '0';
	}
	if ( $imgGaleria != '' ) {
		$imagenesGaleria = explode(',', $imgGaleria );
		
		for ($i=0; $i < count($imagenesGaleria)-1; $i++) { 
			$imagenesGaleria[$i] = trim($imagenesGaleria[$i]);
		}
		
		$imagenesGaleria = serialize($imagenesGaleria);
	} else {
		$imagenesGaleria = '';
	}
    
    //acordion
    if ( is_array($tabs) && ! empty($tabs) ) {
        $tabs = serialize($tabs);
    } else {
        $tabs = '';
    }

    //acordion
    if ( is_array($acordion) && ! empty($acordion) ) {
        $acordion = serialize($acordion);
    } else {
        $acordion = '';
    }

/*
* GUARDAR POST
*/

    //es nuevo post
    
	if ($postID == 'new') {

		//primero hay que ver si el url no está tomado y si está tomado enviar un mensaje
		$query  = "SELECT * FROM " .$tabla. " WHERE post_url='".$postUrl."' ";
		$result = mysqli_query($connection, $query);
		if ( $result->num_rows != 0 ) {
			echo 'error-url';
			exit;
		}

        //sino se guarda
        $query = "INSERT INTO $tabla (post_autor,post_pre_titulo,post_titulo,post_url,post_contenido,post_resumen,post_mini_texto,post_imagen,post_video,post_categoria,post_galeria,post_imagenesGal,post_tabs,post_acordion,post_head,post_status,post_orden,post_type";
        
        if ( $fechaPost != null ) {
            $query .= ",post_timestamp";
        }

        $query .= ") VALUES ('$user', '$postPreTitulo', '$postTitulo', '$postUrl', '$postContenido', '$postResumen','$postMiniTexto', '$postImagen', '$postVideo', '$postCategoria', '$postGaleria', '$imagenesGaleria','$tabs','$acordion', '$postHead','$postStatus', '$orden','$postType'";

        if ( $fechaPost != null ) {
            $query .= ", '".$fechaPost."'";
        }

        $query .= ")";

        $nuevoPost = mysqli_query($connection, $query); 

        if ($nuevoPost) {
            $postID = mysqli_insert_id($connection);
            echo $postID;
        } else  {
            echo 'error';
        }

	} //es viejo post
		else {

        $query = "UPDATE ".$tabla." SET post_autor='".$user."',post_pre_titulo='".$postPreTitulo."', post_titulo='".$postTitulo."',post_url='".$postUrl."',post_contenido='".$postContenido."',post_resumen='".$postResumen."',post_mini_texto='".$postMiniTexto."',post_imagen='".$postImagen."',post_video='".$postVideo."',post_categoria='".$postCategoria."',post_galeria='".$postGaleria."',post_imagenesGal='".$imagenesGaleria."',post_tabs='".$tabs."',post_acordion='".$acordion."',post_head='".$postHead."', post_status='".$postStatus."',post_orden='".$orden."',post_type='".$postType."'";

        if ( $fechaPost != null ) {
            $query .= ",post_timestamp='".$fechaPost."'";
        }
        
        $query .= " WHERE post_ID='".$postID."' LIMIT 1";

		$updatePost = mysqli_query($connection, $query); 
		if ($updatePost) {
            echo 'updated';
        } else {
            echo 'error';
        }	
	}

    //cierre base de datos
    mysqli_close($connection);

} //if not ajax
else {
	exit;
}