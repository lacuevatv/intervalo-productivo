<div id="slider-inicio" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <!--<ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>-->

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
  
    <?php
    for ($i=0; $i < count($data); $i++) { ?>
        <div class="item<?php if ($i==0) {echo ' active';} ?>">

            <div class="item row header-block">
                <div class="col-md-4 col-sm-12 inscription-left">
                    <div class="line"></div>
                    <div class="title1">
                        <?php echo $data[$i]['slider_titulo']; ?>
                    </div>
                    <div class="text">
                        <?php echo $data[$i]['slider_texto']; ?>
                    </div>
                    <div class="date-inscription">
                        <a href="<?php echo $data[$i]['slider_link']; ?>"><span class="left-date">
                            <?php echo $data[$i]['slider_textoLink']; ?>
                        </span></a>
                    
                        <span class="arrows" >
                            <a class="left carousel-control" href="#slider-inicio" role="button" data-slide="prev">
                                <span class="fas fa-arrow-circle-left" aria-hidden="true"></span>
                                <span class="sr-only">Anterior</span>
                            </a>
                             
                            <a class="right carousel-control" href="#slider-inicio" role="button" data-slide="next">
                                <span class="fas fa-arrow-circle-right" aria-hidden="true"></span>
                                <span class="sr-only">Siguiente</span>
                            </a>
                        </span>

                    </div>
                </div>
                <div class="col-md-8 col-sm-12 inscription-right" style="background-image: url(<?php echo UPLOADSURL . '/'. $data[$i]['slider_imagen']; ?>);">
                </div>
            </div>

        </div>

    <?php } ?>
    
  </div>

</div>