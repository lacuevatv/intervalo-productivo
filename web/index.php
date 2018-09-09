<?php
/*
 * @LaCueva.tv
 * INDEX: ROUTEADOR
 *
*/
//functions incluye config, por lo tanto no es necesario llamarlo
require_once 'inc/functions.php';

//define la pageactual que se usa en toda la navegación
//global $pageActual;
define('PAGEACTUAL', pageActual( cleanUri() ) );

switch ( PAGEACTUAL ) {   
    case 'inicio':
    case 'clientes':
    case 'contacto':
    case 'acciones':
    getPage( PAGEACTUAL );
    break;

    default:
        getPage( 'loop' );
    break;
}