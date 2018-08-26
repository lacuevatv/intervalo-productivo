<?php
//chequea que no se acceda directo
if(!defined("SECUREACCESS"))
{
    die("El acceso directo a este archivo no está permitido.");
}
?>
</main><!--//main -->
<!------- pie ------>
<footer class="navbar-fixed-bottom">
	<div class="container">
	    Módulo de administración. <?php echo SITENAME; ?> - <?php echo DATEPUBLISHED; ?>
	</div>
	<div style="position: absolute; bottom: 20px;right: 5%;color:#bbb;"><a href="http://lacueva.tv" title="Agencia de desarrollo web" style="color: #bbb;text-decoration: none;">LaCueva.tv</a></div>
</footer>
<!------- // fin contenido ------>
<!------- script jqueryUI ------>
<?php 
	global $modulo;
	get_footer_scripts($modulo); 
?>
</body>
</html>
