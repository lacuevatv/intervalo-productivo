<?php
/*
 * save slider
 * guarda el cliente seleccionado
*/
require_once('../functions.php');
require_once('../modulos/modulo-sliders.php');
if ( isAjax() ) {

	$connection = connectDB();
	$tabla      = 'clientes';
	$imagen  = isset( $_POST['imagen'] ) ? $_POST['imagen'] : '';
	$new  = isset( $_POST['new'] ) ? $_POST['new'] : 'false';
	
	//actualizar slider
	if ($new != 'true') {
		$clienteID        = isset( $_POST['clienteId'] ) ? $_POST['clienteId'] : '';
        $titulo           = isset( $_POST['titulo'] ) ? $_POST['titulo'] : '';
        $url              = isset( $_POST['url'] ) ? $_POST['url'] : '';
		$texto            = isset( $_POST['texto'] ) ? $_POST['texto'] : '';
		$servicios        = isset( $_POST['servicios'] ) ? $_POST['servicios'] : '';
		$orden            = isset( $_POST['orden'] ) ? intval($_POST['orden']) : 0;

		$titulo     = filter_var($titulo,FILTER_SANITIZE_STRING); 
		$texto      = filter_var($texto,FILTER_SANITIZE_STRING); 
		$orden      = filter_var($orden,FILTER_SANITIZE_NUMBER_INT); 
 		$url        = filter_var($url,FILTER_SANITIZE_URL); 
         
        if  ( $servicios != '' && is_array($servicios) ) {
            $servicios = unserialize($servicios); 
        }

		$query      = "UPDATE ".$tabla." SET cliente_imagen='".$imagen."', cliente_titulo='".$titulo."', cliente_url='".$url."', cliente_texto='".$texto."', cliente_servicios_activos='".$servicios."', cliente_orden='".$orden."' WHERE cliente_id='".$clienteID."' LIMIT 1";
		$result     = mysqli_query($connection, $query);
   
		if ($result) {
			echo 'saved';
	   	} else {
	   		echo 'error';
	   	}
	   
	} //crear nuevo slider

	else {
		$queryCreateSlider  = "INSERT INTO " .$tabla. " (cliente_imagen, cliente_texto,cliente_servicios_activos) VALUES ('".$imagen."','','')";
		$result = mysqli_query($connection, $queryCreateSlider);
		//var_dump($connection);
		$clienteID = mysqli_insert_id($connection);
		?>
		
        <li class="item-slider" id="<?php echo $clienteID; ?>">
            
            <div class="row">	 
                <!-- col -->
                <div class="col-50">
                <form name="edit_cliente_imagen" data-clienteID="<?php echo $clienteID; ?>" method="POST" >
                    <div class="form-group">
                        <input type="hidden" name="cliente_imagen" value="<?php echo $imagen; ?>">

                        <img id="cliente_imagen_Preview-<?php echo $clienteID; ?>" src="<?php echo UPLOADSURLIMAGES . '/' . $imagen; ?>" class="img-responsive">
                    </div>
                    <div class="form-group recargar-btn-wrapper">
                        
                        <button data-clienteID="<?php echo $clienteID; ?>" type="button" class="btn btn-primary btn-recargar">Cargar nueva foto</button>
                        <span class="msj-guardar-imagen"></span>
                        
                    </div>
                    <div class="form-group input-sliders col-50">
                        <label for="cliente_orden">Orden de ubicación</label>
                        <input type="number" name="cliente_orden" value="0">
                    </div>
                </form>
                </div><!-- //col -->
                <!-- col -->
                <div class="col-50">
                    <div class="form-group input-sliders">
                        <label for="cliente_titulo">Titulo a mostrar</label>
                        <input type="text" name="cliente_titulo">
                    </div>

                    <div class="form-group input-sliders">
                        <label for="cliente_url">URL</label>
                        <input type="text" name="cliente_url">
                    </div>

                    <div class="form-group input-sliders">
                        <label for="cliente_texto">Texto:</label>
                        <textarea name="cliente_texto"></textarea>
                    </div>

                    <div class="form-group input-sliders">
                        <label for="cliente_servicios_activos">Servicios Activos:</label>
                        <input type="text" name="cliente_servicios_activos">
                    </div>

                </div><!-- //col -->
            </div><!-- //row -->
            <div class="row">	 
                <!-- col -->
                <div class="col-50">
                    
                </div><!-- //col -->

                <div class="col-50">
                <hr>
                    <div class="row save-button-right">
                        <div class="col">
                            <div class="form-group input-sliders borrar-guardar-btns">
                                <span class="msj-guardar"></span>
                                <button data-id="<?php echo $clienteID ?>" type="button" class="btn btn-primary btn-guardar">Guardar item</button>
                                <button data-id="<?php echo $clienteID ?>" type="button" class="btn btn-danger btn-xs btn-borrar">Borrar item</button>
                                
                            </div>
                        </div><!-- //col -->
                    </div><!-- //row -->
                </div><!-- //col -->

            </div><!-- //row -->
        </li>

	<?php
	}//else
	
   	//cierre base de datos
	mysqli_close($connection);


} //if not ajax
else {
	exit;
}