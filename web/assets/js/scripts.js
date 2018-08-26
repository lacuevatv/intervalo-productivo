var baseUrl = 'http://' + window.location.host;
var ajaxFileUrl = baseUrl + '/inc/ajax.php';
var paginaActual = 1;

$(document).ready(function(){
   
  if (window.location.pathname.indexOf('cursos-cortos') != -1 ) {
      //masonry
      $('.news-contenedor').masonry({
        // options...
        itemSelector: '.news-box',
        columnWidth: '.grid-sizer',
        percentPosition: true,
    });
  }

  $(document).on('click', '#load-more', function(){
    var postperpag = $(this).attr('data-post');
    var loader = $('.wrapper-mas-button p').fadeIn();
    $.ajax( {
      type: 'POST',
      url: ajaxFileUrl,
      data: {
        function: 'load-more',
        postperpag: postperpag,
        page: paginaActual,
      },
      //funcion antes de enviar
      beforeSend: function() {
          //imagen cargador
          loader.fadeIn();
      },
      success: function ( response ) {
          loader.fadeOut();
          //console.log(response);
          
          if (response) {
            $('#contenedor-novedades').append( response );
          } else {
            $('.wrapper-mas-button').remove();
          }
          paginaActual++
      },
      error: function ( ) {
          console.log('error');
      },
    });//cierre ajax


  });


  /*NOVEDAD SLIDER*/
  if (window.location.pathname.indexOf('novedades') != -1 ) {
 
    $('#novedad-slider').owlCarousel({
      loop:true,
      margin:50,
      nav:false,
      //navText : ['<span class="icon-arrow icon-arrow-left"></span>','<span class="icon-arrow icon-arrow-right"></span>'],
      dots:false,
      responsive:{
          0:{
              items:1
          },
        },
    });
  }

  //inicio slider by bootstrap
  $('#slider-inicio').carousel();

  
});//ready