<?php
/*
 * lista de post
*/

function getPosts( $postType, $limit = '', $categoria = '', $orden = '', $status = 'publicado' ) {
	$connection = connectDB();
	$tabla = 'posts';

	//queries según parámetros
    $query = "SELECT * FROM " .$tabla . " WHERE post_type='".$postType."'";
    
	//si tiene categoria:
	if ( $categoria != '' ) {
		$query  .= " AND post_categoria='".$categoria."'";
	}
	//status
	if ( $status != 'all'  ) {
		$query  .= " AND post_status='".$status."'";
	}
    
    //order
    if ( $orden == 'fecha' ) {
        $query  .= " ORDER by post_timestamp DESC";
    }
    if ( $orden == 'orden' ) {
        $query  .= " ORDER by orden ASC";
    }

    //limite
    if ($limit != '') {
        $query  .= " LIMIT ".$limit;
    }
	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {
		return null;
	} else {

		while ( $row = $result->fetch_array() ) {
			$posts[] = $row;
        }

        return $posts;
    }
}

//recupera post, por el slug
function getPostBySlug( $slug ) {
	$connection = connectDB();
	$tabla = 'posts';

	//queries según parámetros
	$query  = "SELECT * FROM " .$tabla. " WHERE post_url='".$slug."'";
	
	$result = mysqli_query($connection, $query);
	$post = $result->fetch_array();
	
	return $post;
}

//recupera post, por el id
function getPostById( $id ) {
	$connection = connectDB();
	$tabla = 'posts';

	//queries según parámetros
	$query  = "SELECT * FROM " .$tabla. " WHERE post_ID='".$id."'";
	
	$result = mysqli_query($connection, $query);
	$post = $result->fetch_array();
	
	return $post;
}