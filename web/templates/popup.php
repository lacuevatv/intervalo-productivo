<?php
/*
 * Abre el popup si está activado
*/
?>

<!------- popup ------>
<style>
	.popup {
		position: fixed;
		z-index: 111111;
		top: 0;
		left: 0;
		width: 100%;
		margin: 0 auto;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
		display: none;
		
		
		
	}

	.popup .popup-inner {
		position: relative;
	}

	.popup .popup-inner img {
		width: 100%;
		max-width: 768px;
		display: none;
	}

	.cerrar-popup {
		width: 100px;
		border: 1px solid #808080;
		background-color: transparent;
		color: #808080;
		display: block;
		font-size: 80%;
		padding: 5px;
		text-transform: uppercase;
		margin: 10px 0;
		cursor: pointer;

		&:hover {
			color:#fff;
			border-color: #fff;
		}
	}

.popup-active {
    display: flex;
    display: -o-flex;
    display: -ms-flex;
    display: -moz-flex;
    display: -webkit-flex;   
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
}
</style>
<div class="popup">
<div class="popup-inner">
	    <a href="<?php echo getUrlPromo(); ?>" target="_blank">
	    	<img src="<?php showPopupImg (); ?>">
	    </a>
	    <span class="close-popup btn"></span>
	    <button class="cerrar-popup">Cerrar</button>
	</div>
</div>