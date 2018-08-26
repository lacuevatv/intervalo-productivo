<?php
/*
 * @LaCueva.tv
 * INDEX: ROUTEADOR
 *
*/
//functions incluye config, por lo tanto no es necesario llamarlo
require_once 'inc/functions.php';

//define la pageactual que se usa en toda la navegación
global $pageActual;

$pageActual = pageActual( cleanUri() );

switch ( $pageActual ) {    
    default:
        getPage( $pageActual );
    break;
}