<?php
/*
 * editar clientes
 * 
*/
global $userStatus;
if ($userStatus != '0' && $userStatus != '1' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
require_once("inc/functions.php");
load_module( 'clientes' );
//recupera slug a buscar

$clientes = getClientes();

?>

<div class="contenido-modulo">
	<h1 class="titulo-modulo">
		Editor Clientes
	</h1>
	<div class="container">

		<div id="imagen_destacada_wrapper">
			<button id="new-item" class="btn btn-danger">Agregar nuevo</button>
		</div>

		<ul class="sliders-wrapper">
            
			<?php for ($i=0; $i < count($clientes); $i++) {
			 	$row = $clientes[$i];
				$clienteID           = isset($row['cliente_id'])? $row['cliente_id']:'';
				$clienteImagen       = isset($row['cliente_imagen'])? $row['cliente_imagen']:'';
				$clienteTitulo       = isset($row['cliente_titulo'])? $row['cliente_titulo']:'';
				$clienteURL          = isset($row['cliente_url'])? $row['cliente_url']:'';
				$clienteServicios    = isset($row['cliente_servicios_activos'])? $row['cliente_servicios_activos']:'';
				$clienteTexto        = isset($row['cliente_texto'])? $row['cliente_texto']:'';
				$clienteOrden        = isset($row['cliente_orden'])? $row['cliente_orden']:'';
			?>
			<li class="item-slider" id="<?php echo $clienteID; ?>">
				
				<div class="row">	 
					<!-- col -->
					<div class="col-40">
					<form name="edit_cliente_imagen" data-clienteID="<?php echo $clienteID; ?>" method="POST" >
						<div class="form-group">
							<input type="hidden" name="cliente_imagen" value="<?php echo $clienteImagen; ?>">

							<img id="cliente_imagen_Preview-<?php echo $clienteID; ?>" src="<?php echo UPLOADSURLIMAGES . '/' . $clienteImagen; ?>" class="img-responsive">
						</div>
						<div class="form-group recargar-btn-wrapper">
							
							<button data-clienteID="<?php echo $clienteID; ?>" type="button" class="btn btn-primary btn-recargar">Cargar nueva foto</button>
							<span class="msj-guardar-imagen"></span>
							
						</div>
						<div class="form-group input-sliders col-50">
							<label for="cliente_orden">Orden de ubicación</label>
							<input type="number" name="cliente_orden" value="<?php echo $clienteOrden; ?>">
						</div>
					</form>
					</div><!-- //col -->
					<!-- col -->
					<div class="col-60">
						<div class="form-group input-sliders">
							<label for="cliente_titulo">Titulo a mostrar</label>
							<input type="text" name="cliente_titulo" value="<?php echo $clienteTitulo; ?>">
						</div>

						<div class="form-group input-sliders">
							<label for="cliente_url">URL</label>
							<input type="text" name="cliente_url" value="<?php echo $clienteURL; ?>">
						</div>

                        <div class="form-group input-sliders">
							<label for="cliente_texto">Texto:</label>
							<textarea name="cliente_texto"><?php echo $clienteTexto; ?></textarea>
						</div>

						<div class="form-group input-sliders">
                            <label for="cliente_servicios_activos">Servicios Activos:</label>
                            <input type="text" name="cliente_servicios_activos" value="<?php echo $clienteServicios; ?>">
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
			}//for ?>
		
		</ul>
	</div><!-- // container -->
</div><!-- // wrapper interno modulo -->
<div id="dialog">
	
</div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>