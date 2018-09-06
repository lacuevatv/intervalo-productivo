<li data-index="rs-<?php echo $data['slider_id']; ?>" data-transition="crossfade" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off"  data-easein="default" data-easeout="default" data-masterspeed="default"  data-thumb="<?php echo UPLOADSURL . '/' . $data['slider_imagen']; ?>"  data-rotate="0"  data-saveperformance="off"  data-title="Slide" data-param1="" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-param10="" data-description="">
    <!-- MAIN IMAGE -->
    <img src="<?php echo UPLOADSURL . '/' . $data['slider_imagen']; ?>"  alt="" title="slide2"  width="2300" height="1535" data-bgposition="center center" data-kenburns="on" data-duration="10000" data-ease="Linear.easeNone" data-scalestart="100" data-scaleend="110" data-rotatestart="0" data-rotateend="0" data-blurstart="0" data-blurend="0" data-offsetstart="0 0" data-offsetend="0 0" data-bgparallax="10" class="rev-slidebg" data-no-retina>
    <!-- LAYERS -->

    <!-- LAYER NR. 1 -->
    <div class="tp-caption   tp-resizeme rs-parallaxlevel-6"
            id="slide-<?php echo $data['slider_id']; ?>-layer-1"
            data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
            data-y="['middle','middle','middle','middle']" data-voffset="['-60','-60','-60','-50']"
                    data-fontsize="['90','90','70','70']"
        data-fontweight="['600','600','400','400']"
        data-letterspacing="['-1.5','-1.5','0','0']"
        data-width="['none','none','none','463']"
        data-height="['none','none','none','242']"
        data-whitespace="['nowrap','nowrap','nowrap','normal']"

        data-type="text"
        data-responsive_offset="on"

        data-frames='[{"delay":800,"split":"words","splitdelay":0.18,"speed":800,"split_direction":"forward","frame":"0","from":"y:100px;rX:-120deg;sX:1;sY:1;opacity:0;","to":"o:1;","ease":"Quint.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
        data-textAlign="['inherit','inherit','inherit','center']"
        data-paddingtop="[0,0,0,0]"
        data-paddingright="[0,0,0,0]"
        data-paddingbottom="[0,0,0,0]"
        data-paddingleft="[0,0,0,0]"

        style="z-index: 5; white-space: nowrap; font-size: 90px; line-height: 80px; font-weight: 600; color: #ffffff; letter-spacing: -1.5px;font-family: 'Poppins', 'Open Sans', sans-serif;transform-origin:0% 50% -50%;"
        
        data-plugin-textslide="true" data-plugin-textslide-options="{&quot;element&quot;:&quot;div&quot;,&quot;autoplay&quot;:true,&quot;delay&quot;:2000}"><?php echo $data['slider_titulo']; ?> <?php if ($data['slider_texto'] != '') : ?><span class="typed-keywords">
                    <?php 
                    $textos = explode(' ', $data['slider_texto']);
                    //var_dump($textos);
                    for ($i=0; $i < count($textos); $i++) { ?>
                        <span class="keyword<?php if ( $i == 0 ) {echo ' active'; } ?>" style="font-size:86px;"><?php echo $textos[$i]; ?></span>
                    <?php } ?>
                    
                </span><?php endif; ?> </div>

    <!-- LAYER NR. 2 -->
    <a href="<?php echo $data['slider_link']; ?>"><div class="tp-caption rev-btn rev-hiddenicon  rs-parallaxlevel-7"
            id="slide-<?php echo $data['slider_id']; ?>-layer-2"
            data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
            data-y="['middle','middle','middle','middle']" data-voffset="['80','80','80','80']"
                    data-width="none"
        data-height="none"
        data-whitespace="nowrap"

        data-type="button"
        data-responsive_offset="on"
        data-responsive="off"
        data-frames='[{"delay":1250,"speed":800,"frame":"0","from":"y:80px;rX:-75deg;opacity:0;","to":"o:1;","ease":"Quint.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"},{"frame":"hover","speed":"0","ease":"Linear.easeNone","to":"o:1;rX:0;rY:0;rZ:0;z:0;","style":"c:rgba(255,255,255,1);bg:linear-gradient(50deg, rgba(255,100,145,1) 0%, rgba(124,104,245,1) 100%);bs:solid;bw:0 0 0 0;"}]'
        data-textAlign="['inherit','inherit','inherit','inherit']"
        data-paddingtop="[22,22,22,22]"
        data-paddingright="[35,35,35,35]"
        data-paddingbottom="[22,22,22,22]"
        data-paddingleft="[35,35,35,35]"

        style="z-index: 6; white-space: nowrap; font-size: 16px; line-height: 14px; font-weight: 500; color: rgba(255,255,255,1); letter-spacing: px;font-family:Radnika;background:linear-gradient(50deg, rgba(124,104,245,1) 0%, rgba(255,100,145,1) 100%);border-color:rgba(0,0,0,1);border-radius:2px 2px 2px 2px;outline:none;box-shadow:none;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:pointer;">
        <?php echo $data['slider_textoLink']; ?>
        <i class="fa fa-angle-right"></i> </div></a>
</li>