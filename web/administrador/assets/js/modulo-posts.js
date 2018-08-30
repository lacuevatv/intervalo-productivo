/*
* LOOP POSTS
*/

var currentPage = 1;

/*
* pagina LOOP
*/
$(document).ready(function(){

    /*
    * LOAD MORE
    */
   $(document).on('click', '#load-more', function( event ){
        event.preventDefault();

        var contenedorNews = $('.loop-noticias-backend');
        var contenedorAjax = $('.loading-news-ajax');
        var actualCategoria = $('#post_categoria').val();
        if (actualCategoria == 'todas') {
            actualCategoria = '';
        }
        $.ajax( {
            type: 'POST',
            url: ajaxFunctionDir + '/load-more-posts.php',
            data: {
                page: currentPage,
                categoria: actualCategoria,
            },
            beforeSend: function() {
                contenedorAjax.html('cargando');
                $('.info-resumen').remove();
            },
            success: function ( response ) {
                console.log(response)
                    currentPage++;
                    contenedorNews.append(response);
                    contenedorAjax.html('');
            },
            error: function ( ) {
                console.log('error');
            },
        });//cierre ajax

    });//load-more-news

    /*
    * FILTRA POR CATEGORIA
    */
    $('#post_categoria').change(function(){
        var categoria = $(this).val();
        if (categoria == 'todas') {
            categoria = '';
        }
        var contenedorNews = $('.loop-noticias-backend');
        $.ajax( {
            type: 'POST',
            url: ajaxFunctionDir + '/new-query-category.php',
            data: {
                categoria: categoria,
            },
            beforeSend: function() {
                contenedorNews.empty(); 
                $('.info-resumen').remove();       
            },
            success: function ( response ) {
                contenedorNews.append(response);
                currentPage = 1;
            },
            error: function ( ) {
                console.log('error');
            },
        });//cierre ajax
    });//change

    /*
    * BORRAR POST
    */
    $(document).on('click', '.btn-delete-post', function( event ){
        var deletePost = false;
        event.preventDefault();
        var postToDelete = $(this).attr('href');
        var itemToDelete = this.closest('li');
        if ( confirm( '¿Está seguro de querer BORRAR la noticia?' ) ) {
            deletePost = true;
        }

        if (deletePost) {
            $.ajax( {
                type: 'POST',
                url: ajaxFunctionDir + '/delete-post.php',
                data: {
                    post_id: postToDelete,
                },
                success: function ( response ) {
                    console.log(response);
                    if (response == 'deleted') {
                    //borra la noticia del front
                        itemToDelete.remove()
                        //myFunctionNoticias();
                    }
                },
                error: function ( ) {
                    console.log('error');
                },
            });//cierre ajax
        }
    });//click .btn-delete-post



});//READY


/*
* pagina EDICION
*/
$(document).ready(function(){

});//READY