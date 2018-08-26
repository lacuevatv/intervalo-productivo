<?php 
//chequea permisos de usuario
global $userStatus;
if ($userStatus != '0' ) {
	echo 'No tiene permisos para ver esta sección';
  	
  	exit;
}
?>

<div class="contenido-modulo">
	<div class="container">
		<h1 class="titulo-modulo">
			Manejo de usuarios
		</h1>
		
		<div class="usuarios-wrapper">
			<div class="subtitulo-gral-admin">
				<h2>lista de usuarios</h2>
				<table class="users-list-admin">
					<thead>
						<tr>
							<td width="40%">Usuario</td>
							<td width="20%">Nombre</td>
							<td width="20%">Status</td>
							<td width="5%">Cambiar</td>
							<td width="3%">Borrar</td>
						</tr>
					</thead>
					<tbody>
				<?php 
					$users = getUsers();
					for ($i=0; $i < count($users); $i++) { ?>
						<tr>
							<td>
								<?php echo $users[$i]['user_usuario']; ?>
							</td>
							<td>
								<?php echo $users[$i]['user_nombre']; ?>
							</td>
							<td>
								<?php
									global $usertype;
									$statusUser = $users[$i]['user_status'];
									switch ( $statusUser ) {
										case '0':
											echo $usertype[0]['nombre'];
											break;
										case '1':
											echo $usertype[1]['nombre'];
											break;
										case 'd':
											echo $usertype[3]['nombre'];
											break;
										default:
											echo $usertype[2]['nombre'];
											break;
									}
								?>
							</td>
							<td>
								<button class="btns-user update-user" data-userid="<?php echo $users[$i]['user_id']; ?>">
									<span class="icon-save-user"></span>
									<span class="sr-only">Actualizar Usuario</span>
								</button>
							</td>
							<td>
								<button class="btns-user delete-user" data-userid="<?php echo $users[$i]['user_id']; ?>">
									<span class="icon-del-user"></span>
									<span class="sr-only">Borrar Usuario</span>
								</button>
							</td>
						</tr>
				
				<!-- FORMULARIO PARA CAMBIAR USUARIO -->			
						<tr class="change-user-form-wrapper" data-userid="<?php echo $users[$i]['user_id']; ?>">
							<form class="change-user-form" method="POST">
								<input type="hidden" name="userid" value="<?php echo $users[$i]['user_id']; ?>">
								<td>
									<div class="form-group">
										<input type="password" name="password" placeholder="Ingrese contraseña si quiere cambiarla o dejelá en blanco">
									</div>
								</td>
								<td>
									<div class="form-group">
										<input type="nombre_usuario" name="user_nombre" value="<?php echo $users[$i]['user_nombre']; ?>">
									</div>
								</td>
								<td>
									<div class="form-group">
										<select name="user_status">
											<?php 
												global $usertype;

												for ($y=0; $y < count($usertype); $y++) {
													echo '<option value="'.$usertype[$y]['status'].'"';
													if ( $usertype[$y]['status'] == $statusUser ) {
														echo ' selected="selected"';
													}
													echo '>'.$usertype[$y]['nombre'].'</option>';
												}
											?>
										</select>
									</div>
								</td>
								<td colspan="2">
									<div class="form-group">
										<input type="submit" value="Guardar" class="btn btn-primary">
									</div>
								</td>
							</form>
						</tr>
						
					<?php };
				?>
					</tbody>
				</table>
			</div>
			<button class="btn btn-primary new-user-button">Crear Nuevo Usuario</button>
		</div>

		<div class="wrapper-nuevo-usuario">
			<form method="POST" id="register" name="register">
				<h2>
					Nuevo Usuario
				</h2>
				<span class="error-tag">&nbsp;</span>

				<div class="row">
						<div class="col-50">
							<!------ usuario ---------->
							<div class="form-group">
								<label for="userid">Usuario (email)</label>
								<input type="email" id="userid" name="userid" required>
							</div>
						
						<!------ contraseña ---------->
							<div class="form-group">
								<label for="password">Contraseña</label>
								<input type="password" id="password" name="password" required>
							</div>
						</div>
						
						<div class="col-50">
							<!------ nombre ---------->
							<div class="form-group">
								<label for="username">Nombre</label>
								<input type="text" id="username" name="username">
							</div>

							<div class="form-group">
								<label for="user_status">Tipo de Usuario </label>
								<select name="user_status">
									<?php 
										global $usertype;

										for ($i=0; $i < count($usertype); $i++) {
											echo '<option value="'.$usertype[$i]['status'].'"';
											echo '>'.$usertype[$i]['nombre'].'</option>';
										}
									?>
								</select>
							</div>
						</div>

						<div class="col-30">
							<!------ GUARDAR ---------->
							<div class="form-group">
								<input type="submit" value="Registrar" class="btn btn-primary">
							</div>
						</div>
					</div>
			</form>
	</div>
	</div>
</div>
<!-- botones del modulo -->
<footer class="footer-modulo container">
    <a type="button" href="index.php" class="btn">Volver al inicio</a>
</footer>