<?php 
require_once("inc/functions.php");
?>
<div class="wrapper-modulo">
	<!-- wrapper interno modulo -->
	<div class="contenido-modulo">
		<h1 class="titulo-modulo">
			Cambiar contraseña
		</h1>
		<div class="container">
			<form method="POST" id="password_form" name="password_form">
				<span class="error-tag">&nbsp;</span>
				<input type="hidden" name="userid" value="<?php echo $_SESSION['username']; ?>">
			<!------ contraseña ---------->
				<div class="form-group">
					<label for="password">Contraseña Anterior</label>
					<input type="password" id="password" name="password" required>
				</div>

			<!------ nombre ---------->
				<div class="form-group">
					<label for="new_password">Contraseña nueva</label>
					<input type="password" id="new_password" name="new_password">
				</div>
				<div class="form-group">
					<label for="re_new_password">Re escribir contraseña</label>
					<input type="password" id="re_new_password" name="re_new_password">
				</div>

			<!------ GUARDAR ---------->
				<div class="form-group">
					<input type="submit" value="cambiar" class="btn">
				</div>
			</form>
		</div>
	</div>
	<!-- botones del modulo -->
	    <div class="modal-footer container">
		    <a type="button" href="index.php" class="btn btn-default">Volver al inicio</a>
	    </div>
</div>