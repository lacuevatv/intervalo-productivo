<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Iniciar sesión</title>

<!-- jQquery UI css -->
  <link href="<?php echo URLADMINISTRADOR; ?>/assets/css/jquery-ui.min.css" rel="stylesheet">
<!-- Custom CSS -->
  <link href="<?php echo URLADMINISTRADOR; ?>/assets/css/style-admin.css" rel="stylesheet">

</head>
<body>
<main>
	<article class="login-section">
		<div class="container">
			<h1>Iniciar Sesión</h1>
			<form action="" method="POST" id="login" name="login">
				<span class="error-tag">&nbsp;</span>
			<!------ usuario ---------->
				<div class="form-group">
					<label for="userid">Usuario</label>
					<input type="email" id="userid" name="userid" required>
				</div>
			
			<!------ contraseña ---------->
				<div class="form-group">
					<label for="password">Contraseña</label>
					<input type="password" id="password" name="password" required>
				</div>

			<!------ GUARDAR ---------->
				<div class="form-group">
					<input type="submit" value="Iniciar sesión" class="btn btn-primary">
				</div>
			</form>
		</div>
	</article>
</main>
<!------- // fin contenido ------>
<!------- scripts ------>
<!------- jquery 3.1.1 ------>
	<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/jquery-3.1.1.min.js"></script>
	<script src="<?php echo URLADMINISTRADOR; ?>/assets/js/admin-script.js"></script>
</body>
</html>
