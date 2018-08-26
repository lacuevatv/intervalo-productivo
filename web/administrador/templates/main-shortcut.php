<?php 
/*
 * ESTE TEMPLATE MANEJA EL ACCESO DIRECTO PARA EL USUARIO, QUE AL SER ASIGNADO MUESTRA LO QUE A ÉSTE LE CORRESPONDE
 * a = status usuario por default, por defecto maneja las noticias
 */

load_module( 'noticias' );

if ( $data == 'a' ) : ?>

  <div class="container">
    <div class="subtitulo-gral-admin">
      <h2 class="text-center">Noticias Recientes</h2>
      <p>Estas son las últimas 5 noticias publicadas:</p>
    </div>
<!---------- noticias ---------------->
    <ul class="loop-noticias-backend-excerpt">

      <?php listaNoticias( 5, 'publicado', true, $categoria = 'agenda', true ); ?>
      
    </ul>
    <div class="row">
      <div class="col-30">
        <p>
          <a class="btn btn-primary" href="index.php?admin=noticias" role="button">Ver todas</a>
        </p>
      </div>
      <div class="col-30">
        <p>
          <a class="btn btn-danger" href="index.php?admin=editar-noticias" role="button">Agregar nueva</a>
        </p>
      </div>
    </div>
<!---------- fin noticias ---------------->
  </div>

<?php endif;