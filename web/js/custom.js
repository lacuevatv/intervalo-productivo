/*!
* Themerella
*
* (c) Copyright themerella.com
*
* @version 1.0.0
* @author  Themerella
*/

var baseUrl = 'http://' + window.location.host;
var ajaxFileUrl = baseUrl + '/inc/ajax.php';
var paginaActual = 1;


(function($) {
    'use strict';

    /*
     * POPUP PROMO
    */
    $(window).on('load', function(){

        var popup = $( '.popup' );
        var popupIMG = $( '.popup img' );
        var tiempo = 7000;
        if ( popup.length != 0 ) {
            var closeX = $( '.close-popup' );
            var closeBTN = $( '.cerrar-popup' );
    
            function openPop () {
                popup.addClass('popup-active');
                popupIMG.fadeIn();
            }
    
            setTimeout( openPop, tiempo);
    
            function closePopup() {
                popup.removeClass('popup-active');
                popupIMG.fadeOut(tiempo);
            }
    
            closeX.click(closePopup);
            closeBTN.click(closePopup);
    
        }
    });
    
})(jQuery);