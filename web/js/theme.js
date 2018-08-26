/*!
* Themerella
*
* (c) Copyright themerella.com
*
* @version 1.0.0
* @author  Themerella
*/



(function($) {
    var instanceName = '__rellaFullpage';
    var RellaFullpage = function(el, options) {
        return this.init(el, options);
    };
    RellaFullpage.defaults = {
        sectionSelector: '> .container > article > .entry-content > .wpb_row',
        navigationTooltips: true,
        navigation: true,
        showActiveTooltip: false,
        navigation: true,
        scrollOverflow: true,
        easingcss3: 'cubic-bezier(.32,.18,.22,1)',
        scrollingSpeed: 850
    };
    RellaFullpage.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, RellaFullpage.defaults, options);
            return this;
        },
        build: function() {
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var el = $(this.el), options = this.options;
                if (!el.length || $('body').hasClass('compose-mode')) {
                    return;
                }
                var navTooltips = [], sections = el.find(options.sectionSelector), mainHeader = $('.main-header'), mainFooter = $('.main-footer'), pageNavs = $('.main-header, body');
                var ua = window.navigator.userAgent;
                if (ua.indexOf('Trident/') > 0 || ua.indexOf('MSIE ') > 0) {
                    el.removeAttr('data-fullpage-parallax');
                    sections = el.find('> .container > article > .entry-content > div:not(.vc_row-full-width)');
                }
                sections.parent().children().not('.wpb_row, .section, .vc_row-full-width, .vc_ie-flexbox-fixer').appendTo('head');
                sections.each(function() {
                    var $this = $(this), $thisName = $this.data('section-name'), sectionContainer = $('<section class="fp-section-container"></section>');
                    if (typeof $thisName != 'undefined') {
                        navTooltips.push($thisName);
                    } else {
                        navTooltips.push(' ');
                    }
                    if (!$this.is('.main-footer')) {
                        $this.wrap(sectionContainer);
                        sectionContainer = $this.parent();
                        if ($this.parent().next('.vc_row-full-width').length) {
                            $this.parent().next('.vc_row-full-width').appendTo(sectionContainer);
                        }
                        sectionContainer.data('row-brightness', $this.data('row-brightness'));
                        options.sectionSelector = ".fp-section-container";
                    }
                });
                if (mainHeader.length) {
                    mainHeader.addClass('header-overlay');
                }
                if (mainFooter.length) {
                    mainFooter.addClass('fp-section-container fp-auto-height-responsive fp-auto-height');
                    mainFooter.appendTo(el.find('> .container > article > .entry-content'));
                    $('body').addClass('fullpage-footer-exist');
                }
                sections = el.find(options.sectionSelector);
                el.fullpage($.extend(true, {}, this.options, {
                    navigationTooltips: navTooltips,
                    onLeave: function(index, nextIndex, direction) {
                        sections.removeClass('fp-leaving fp-entering fp-leaving-to-bottom fp-leaving-to-top fp-entering-from-top fp-entering-from-bottom fp-leaving-to-autoheight-row');
                        var rows = el.find(options.sectionSelector), currentRow = rows.eq(index - 1), nextRow = rows.eq(nextIndex - 1), nextRowBrightness = nextRow.data('row-brightness');
                        currentRow.addClass('fp-leaving');
                        nextRow.addClass('fp-entering');
                        currentRow.add(nextRow).css({
                            'will-change': 'transform, opacity',
                            '-webkit-transition': '-webkit-transform 0.95s cubic-bezier(0.29, 0.23, 0.13, 1)',
                            transition: 'transform 0.95s cubic-bezier(0.29, 0.23, 0.13, 1)'
                        });
                        mainHeader.addClass('fp-moving');
                        if (nextRow.is('.fp-auto-height')) {
                            currentRow.addClass('fp-leaving-to-autoheight-row');
                        }
                        if (direction == 'down') {
                            currentRow.addClass('fp-leaving-to-bottom');
                            nextRow.addClass('fp-entering-from-top');
                            if (!nextRow.is('.main-footer')) {
                                pageNavs.removeClass('header-over-dark-row header-over-light-row').addClass('fp-moving-down header-over-' + nextRowBrightness + '-row');
                            }
                        } else if (direction == 'up') {
                            currentRow.addClass('fp-leaving-to-top');
                            nextRow.addClass('fp-entering-from-bottom');
                            if (!nextRow.is('.main-footer')) {
                                pageNavs.removeClass('header-over-dark-row header-over-light-row').addClass('header-over-' + nextRowBrightness + '-row');
                            }
                        }
                        $('#fp-nav').addClass('slides-moving');
                    },
                    afterLoad: function(anchorLink, index) {
                        var currentRow = $(this);
                        sections.removeClass('fp-leaving fp-entering fp-leaving-to-bottom fp-leaving-to-top fp-entering-from-top fp-entering-from-bottom fp-leaving-to-autoheight-row');
                        sections.css({
                            'will-change': 'auto',
                            '-webkit-transition': 'none',
                            transition: 'none'
                        });
                        $('#fp-nav').removeClass('slides-moving');
                        if (currentRow.find('.vc_video-bg-container').length) {
                            currentRow.find('.vc_video-bg iframe.inner').get(0).contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        }
                        if (!currentRow.is('.main-footer')) {
                            var rowBrightness = $(this).data('row-brightness');
                            pageNavs.removeClass('header-over-dark-row header-over-light-row fp-moving fp-moving-down').addClass('header-over-' + rowBrightness + '-row');
                            $('.rella_animate_when_almost_visible', currentRow.siblings()).removeClass('wpb_start_animation animated');
                            $(".rella_animate_when_almost_visible:not(.wpb_start_animation)", currentRow).addClass('wpb_start_animation animated');
                        } else {
                            var prevRowBrightness = $(this).prev().children().children().data('row-brightness');
                            pageNavs.removeClass('header-over-dark-row header-over-light-row fp-moving fp-moving-down').addClass('header-over-' + prevRowBrightness + '-row');
                            $('.rella_animate_when_almost_visible', currentRow.prev()).prevAll().removeClass('wpb_start_animation animated');
                            $(".rella_animate_when_almost_visible:not(.wpb_start_animation)", currentRow.prev()).addClass('wpb_start_animation animated');
                            $(".rella_animate_when_almost_visible:not(.wpb_start_animation)", currentRow).addClass('wpb_start_animation animated');
                        }
                        $(document).RellaHover3d();
                        $('[data-hover3d]').each(function() {
                            ATicon.getInstance($(this));
                        });
                        if (typeof progressively !== typeof undefined && $('.progressive__img').length) {
                            var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                            enableProgressiveLoad.init();
                            $('.progressive__img').RellaProgressiveLoad();
                        }
                    }
                }));
                $('.fp-move-next-section').on('click', function(event) {
                    event.preventDefault();
                    $.fn.fullpage.moveSectionDown();
                });
                $('.fp-move-prev-section').on('click', function(event) {
                    event.preventDefault();
                    $.fn.fullpage.moveSectionUp();
                });
            } else {
                $('body').removeClass('overflow-hidden header-visible-first-section');
            }
            return this;
        }
    };
    $.fn.rellaFullpage = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-fullpage-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new RellaFullpage(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-enable-fullpage]').rellaFullpage();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    if (typeof ScrollMagic === typeof undefined || typeof TweenMax === typeof undefined) {
        return;
    }
    var instanceName = '__Parallax';
    var Parallax = function(el, uniqueID, options, parallaxFrom, parallaxTo) {
        return this.init(el, uniqueID, options, parallaxFrom, parallaxTo);
    };
    Parallax.defaults = {
        time: 1,
        duration: '100%',
        triggerHook: 1,
        reverse: true,
        offset: 0,
        applyHeight: false,
        addPerspective: false,
        ease: Linear.easeNone,
        delay: 0
    };
    Parallax.from = {
        y: 35
    };
    Parallax.to = {
        y: 0,
        x: 0,
        z: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1
    };
    if (typeof parallaxController !== typeof undefined || parallaxController !== null) {
        var parallaxController = new ScrollMagic.Controller();
    }
    Parallax.prototype = {
        init: function(el, uniqueID, options, parallaxFrom, parallaxTo) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.uniqueID = uniqueID;
            this.setOptions(uniqueID, options, parallaxFrom, parallaxTo).build();
            return this;
        },
        setOptions: function(uniqueID, options, parallaxFrom, parallaxTo) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Parallax.defaults, options);
            this.uniqueID = Math.round(Math.random() * 1e7);
            this.optionsParallaxFrom = $.extend(true, {}, Parallax.from, parallaxFrom);
            this.optionsParallaxTo = $.extend(true, {}, Parallax.to, parallaxTo);
            return this;
        },
        build: function() {
            var el = this.el, self = this;
            this.createDummyElement().enableParallax();
            if (this.options.applyHeight) {
                el.imagesLoaded(function() {
                    el.parent().height(el.parent().height());
                });
            }
            $(window).on('load resize', function() {
                setTimeout(function() {
                    self.createDummyElement();
                    parallaxController.updateScene();
                }, 1e3);
            });
            return this;
        },
        buildController: function() {
            return parallaxController;
        },
        createDummyElement: function() {
            var self = this, element = self.el, elementOffset = element.offset(), offsetTop = elementOffset.top, offsetLeft = elementOffset.left, dummyEl = $('<div class="dummy-parallax-element" />');
            if (!$('#prlx-dummy-' + self.uniqueID).length) {
                dummyEl.attr('id', 'prlx-dummy-' + self.uniqueID).appendTo('body');
            }
            dummyEl = $('#prlx-dummy-' + self.uniqueID);
            dummyEl.css({
                width: '',
                height: '',
                top: '',
                left: ''
            });
            dummyEl.css({
                width: element.width(),
                height: element.height(),
                position: 'absolute',
                top: element.offset().top,
                left: element.offset().left,
                zIndex: 99999,
                visibility: 'hidden'
            });
            return self;
        },
        enableParallax: function() {
            var element = this.el.addClass('prlx-obj-' + this.uniqueID), parallaxOptionsFrom = this.optionsParallaxFrom, parallaxOptionsTo = this.optionsParallaxTo, dataDuration = this.options.duration, dataTime = parseInt(this.options.time, 10), dataReverse = this.options.reverse, dataOffset = parseInt(this.options.offset, 10), dataTriggerHook = this.options.triggerHook, sceneSettings = {
                triggerElement: $('#prlx-dummy-' + this.uniqueID),
                duration: dataDuration,
                offset: dataOffset,
                triggerHook: dataTriggerHook
            };
            $.extend(parallaxOptionsTo, {
                ease: this.options.ease,
                delay: this.options.delay
            });
            if (this.options.addPerspective) {
                element.parent().addClass('perspective');
            }
            if ($(window).width() >= 992) {
                var scene = new ScrollMagic.Scene(sceneSettings);
                scene.setTween(TweenMax.fromTo(element, dataTime, parallaxOptionsFrom, parallaxOptionsTo));
                scene.addTo(this.buildController()).reverse(dataReverse).setClassToggle(element, 'is-active');
            }
            return this;
        }
    };
    $.fn.RellaParallax = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('parallax-options'), dataParallaxFrom = el.attr('data-parallax-from'), dataParallaxTo = el.attr('data-parallax-to'), opts, uniqueID, parallaxFrom, parallaxTo;
                if (typeof el.attr('data-parallax-from') !== typeof undefined && el.attr('data-parallax-from').indexOf(String.fromCharCode(160)) >= 0) {
                    el.attr('data-parallax-from', dataParallaxFrom.replace(String.fromCharCode(160), ' '));
                }
                if (typeof el.attr('data-parallax-to') !== typeof undefined && el.attr('data-parallax-to').indexOf(String.fromCharCode(160)) >= 0) {
                    el.attr('data-parallax-to', dataParallaxTo.replace(String.fromCharCode(160), ' '));
                }
                dataParallaxFrom = el.data('parallax-from');
                dataParallaxTo = el.data('parallax-to');
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                if (dataParallaxFrom) {
                    parallaxFrom = $.extend(true, {}, settings, dataParallaxFrom);
                }
                if (dataParallaxTo) {
                    parallaxTo = $.extend(true, {}, settings, dataParallaxTo);
                }
                return new Parallax(el, uniqueID, opts, parallaxFrom, parallaxTo);
            }
        });
    };
    if ($(window).width() >= 992) {
        $(document).ready(function() {
            $('[data-parallax]').RellaParallax();
        });
    }
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    if (typeof ScrollMagic === typeof undefined || typeof TweenMax === typeof undefined) {
        return;
    }
    var instanceName = '__ParallaxBG';
    var ParallaxBG = function(el, options) {
        return this.init(el, options);
    };
    ParallaxBG.defaults = {};
    var parallaxBgController = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onEnter'
        }
    });
    ParallaxBG.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, ParallaxBG.defaults, options);
            return this;
        },
        build: function() {
            this.enableParallaxBG();
        },
        calculateFillHeight: function(srcWidth, srcHeight, maxWidth) {
            var ratio = srcHeight / srcWidth;
            return maxWidth * ratio;
        },
        buildController: function() {
            return parallaxBgController;
        },
        enableParallaxBG: function() {
            var element = this.el, self = this;
            if (!element.length) {
                return;
            }
            var bgImage = element.css('background-image'), parallaxOptions = element.data('parallax-options'), dataDuration = element.data('parallax-duration'), parallaxImg = element.children().addClass('section-parallax-img'), prlxImageContainer = $('<div class="parallax-img-container" />'), prlxBgParent = $('<figure class="parallax-img-parent">'), imageElement = parallaxImg, defaultDuration;
            if (bgImage == 'none') {
                return;
            }
            if (parallaxImg.hasClass('aspect-ratio-container')) {
                parallaxImg.removeClass('section-parallax-img');
                parallaxImg = parallaxImg.find('img');
            }
            prlxImageContainer.appendTo(prlxBgParent);
            bgImage = bgImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
            if (element.find('.parallax-img-parent').length) {
                return;
            }
            parallaxImg.imagesLoaded(function() {
                if (parallaxImg.hasClass('progressive__img')) {
                    parallaxImg = element.children('.progressive__img');
                    parallaxImg.addClass('section-parallax-img').appendTo(prlxImageContainer);
                    prlxBgParent.prependTo(element);
                    parallaxImg = element.find('.progressive__img');
                } else if (parallaxImg.is('img')) {
                    parallaxImg = element.children('img');
                    parallaxImg.addClass('section-parallax-img').attr('src', bgImage).prependTo(element);
                    parallaxImg.wrap(prlxBgParent);
                } else {
                    parallaxImg = $('<img class="section-parallax-img" >');
                    parallaxImg.attr('src', bgImage).prependTo(element);
                    parallaxImg.wrap(prlxBgParent);
                }
                if (parallaxImg.closest('.aspect-ratio-container').length && !prlxImageContainer.children('img').length) {
                    parallaxImg.closest('.aspect-ratio-container').appendTo(prlxImageContainer);
                }
                parallaxImg.addClass('section-parallax-img').clone('true').removeClass('section-parallax-img progressive__img progressive--not-loaded').addClass('parallax-img-placeholder').appendTo(parallaxImg.parent());
                element.css({
                    'background-image': 'none',
                    opacity: 1,
                    visibility: 'visible'
                });
                if ($(window).width() >= 992) {
                    if (parallaxOptions === null || typeof parallaxOptions === typeof undefined) {
                        parallaxOptions = {
                            y: "-25%"
                        };
                    }
                    if (dataDuration === null || typeof dataDuration === typeof undefined) {
                        dataDuration = defaultDuration;
                    }
                    $.extend(parallaxOptions, {
                        ease: Linear.easeNone
                    });
                    new ScrollMagic.Scene({
                        triggerElement: element,
                        duration: '200%'
                    }).setTween(TweenMax.from(parallaxImg, 1, parallaxOptions)).addTo(self.buildController());
                }
            });
        }
    };
    $.fn.RellaParallaxBG = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new ParallaxBG(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-parallax-bg]').RellaParallaxBG();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__StickyElement';
    var StickyElement = function(el, options) {
        return this.init(el, options);
    };
    StickyElement.defaults = {
        limitElement: '#content',
        offset: 0
    };
    StickyElement.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, StickyElement.defaults, options);
            return this;
        },
        buildController: function() {
            return pinElementController;
        },
        build: function() {
            var self = this;
            var reset_scroll;
            if ($(window).width() <= 991) {
                return;
            }
            $(self.options.limitElement).attr('data-sticky-parent', 'true');
            $(function() {
                var offset = $('[data-sticky="true"]').length ? $('[data-sticky="true"]').outerHeight() + self.options.offset : self.options.offset;
                if ($('.promote-box').length) {
                    offset += 70;
                }
                if (!$(self.el).closest(self.options.limitElement).length) {
                    self.options.limitElement = '#content';
                }
                return self.el.stick_in_parent({
                    parent: self.options.limitElement,
                    offset_top: offset
                });
            });
            reset_scroll = function() {
                var scroller;
                scroller = $("body,html");
                scroller.stop(true);
                if ($(window).scrollTop() !== 0) {
                    scroller.animate({
                        scrollTop: 0
                    }, "fast");
                }
                return scroller;
            };
            window.scroll_it = function() {
                var max;
                max = $(document).height() - $(window).height();
                return reset_scroll().animate({
                    scrollTop: max
                }, max * 3).delay(100).animate({
                    scrollTop: 0
                }, max * 3);
            };
            window.scroll_it_wobble = function() {
                var max, third;
                max = $(document).height() - $(window).height();
                third = Math.floor(max / 3);
                return reset_scroll().animate({
                    scrollTop: third * 2
                }, max * 3).delay(100).animate({
                    scrollTop: third
                }, max * 3).delay(100).animate({
                    scrollTop: max
                }, max * 3).delay(100).animate({
                    scrollTop: 0
                }, max * 3);
            };
            $(window).on("resize", function(_this) {
                return function(e) {
                    return $(document.body).trigger("sticky_kit:recalc");
                };
            }(this));
            return this;
        }
    };
    $.fn.RellaStickyElement = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-sticky-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new StickyElement(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('[data-sticky-element]').RellaStickyElement();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__Carousel';
    var Carousel = function(el, options) {
        return this.init(el, options);
    };
    Carousel.defaults = {};
    Carousel.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Carousel.defaults, options);
            return this;
        },
        build: function() {
            this.flickitySlider();
        },
        flickitySlider: function() {
            var el = $('.carousel-container'), gallery = $('.gallery-style2'), Flickity = window.Flickity, isRTL = $('html').attr('dir') == 'rtl';
            if (typeof Flickity === typeof undefined) {
                return;
            }
            $.extend(Flickity.defaults, {
                contain: true,
                imagesLoaded: true,
                percentPosition: true,
                prevNextButtons: false,
                pageDots: false,
                adaptiveHeight: false,
                cellAlign: "left",
                groupCells: true,
                dragThreshold: 20,
                rightToLeft: isRTL ? true : false
            });
            if (!el.length) {
                return;
            }
            el.each(function() {
                var self = $(this);
                var $this = $(this), itemsContainer = $this.find('.carousel-items'), carouselNav = $this.find('.carousel-nav'), navContainer = carouselNav.find('.row'), options = {
                    autoPlay: false
                };
                if (!$this.find('.carousel-nav .row').length) {
                    navContainer = $this.find('.carousel-nav');
                }
                if ($this.data('flickity-options')) {
                    options = $this.data('flickity-options');
                    if (options.prevNextButtons !== null) {
                        options.prevNextButtons = null;
                    }
                }
                if (options.autoPlay && options.autoPlayTime > 0) {
                    options.autoPlay = options.autoPlayTime;
                }
                if ($this.parents('.portfolio-item.caption-fixed').length || $this.parents('.portfolio-item.style-hover').length) {
                    $this.find('.carousel-nav').appendTo($this.parents('.portfolio-item'));
                    navContainer = $this.parents('.portfolio-item').find('.carousel-nav');
                }
                if (window.xMode && !options.prevNextButtons && !el.find('.carousel-nav').length) {
                    options.draggable = false;
                    options.pageDots = true;
                }
                itemsContainer.imagesLoaded(function() {
                    itemsContainer.flickity(options);
                    var flkty = itemsContainer.data('flickity');
                    if ($this.find('.flickity-prev-next-button').length) {
                        $this.addClass('nav-buttons-exist');
                    }
                    carouselNav.find('.flickity-prev-next-button').off('click');
                    carouselNav.find('.flickity-prev-next-button.previous').on('click', function(event) {
                        event.preventDefault();
                        itemsContainer.flickity('previous');
                    });
                    carouselNav.find('.flickity-prev-next-button.next').on('click', function(event) {
                        event.preventDefault();
                        itemsContainer.flickity('next');
                    });
                    if (typeof flkty != typeof undefined || flkty != null) {
                        flkty.on('select', function() {
                            $this.addClass('is-moving');
                        }).on('dragMove', function() {
                            $this.addClass('is-moving');
                        }).on('settle', function() {
                            $this.removeClass('is-moving');
                        });
                    }
                    if ($this.hasClass('carousel-parallax') && (typeof flkty != typeof undefined || flkty != null)) {
                        var $imgs = itemsContainer.find('img').not('.section-parallax-img');
                        if (itemsContainer.find('[data-parallax-bg]').length) {
                            $imgs = itemsContainer.find('[data-parallax-bg]');
                        }
                        itemsContainer.on('scroll.flickity', function() {
                            flkty.slides.forEach(function(slide, i) {
                                var img = $imgs[i];
                                var tx = (slide.target + flkty.x) * -1 / 3;
                                if (typeof img != 'undefined' || img != null) {
                                    img.style.transform = 'translate3d(' + tx + 'px, 0, 0)';
                                }
                            });
                        });
                    }
                    setTimeout(function() {
                        if ($('[data-mh]').length) {
                            $.fn.matchHeight._update();
                        }
                        if ($('[data-hover3d]').length) {
                            $("body").RellaHover3d();
                            $('[data-hover3d]').each(function() {
                                ATicon.getInstance($(this));
                            });
                        }
                    }, 400);
                    if (typeof flkty !== typeof undefined) {
                        if ($(flkty.element).closest('.row').length && $(flkty.element).closest('.row').data('isotope')) {
                            $(flkty.element).closest('.row').isotope('layout');
                            if ($('[data-mh]').length) {
                                $.fn.matchHeight._update();
                            }
                        }
                        flkty.on('settle', function(e) {
                            if ($('[data-mh]').length) {
                                $.fn.matchHeight._update();
                            }
                        });
                    }
                });
            });
            if (gallery.length) {
                gallery.each(function() {
                    var $this = $(this), $carousel = $this.find('.carousel-items'), galleryHeight;
                    $this.css({
                        height: $('.main-header').not('.header-overlay').length ? $(window).height() - $('.main-header').height() : $(window).height()
                    }).addClass('height-applied');
                    $carousel.flickity();
                    var $thumbs = $this.find('.thumbs'), $thumbsInner = $thumbs.find('.thumbs-inner'), $carouselNavCells = $thumbs.find('figure'), tumbsToggle = $this.find('.toggle-thumbs');
                    if (!$this.hasClass('nav-vertical')) {
                        $thumbs = $this.find('.carousel-nav').flickity({
                            asNavFor: '.carousel-items'
                        });
                    }
                    $thumbs.on('click', 'figure', function(event) {
                        var index = $(event.currentTarget).index();
                        $carousel.flickity('select', index);
                    });
                    var flkty = $carousel.data('flickity'), navCellHeight = $carouselNavCells.height(), navHeight = $thumbs.height(), autoPlayTime = flkty.options.autoPlay / 1e3;
                    $carousel.on('select.flickity', function() {
                        $thumbs.find('.is-nav-selected').removeClass('is-nav-selected');
                        var $selected = $carouselNavCells.eq(flkty.selectedIndex).addClass('is-nav-selected');
                        var scrollY = $selected.position().top - navCellHeight / 2;
                        setTimeout(function() {
                            TweenMax.to($thumbsInner, .8, {
                                scrollTo: $selected.position().top,
                                ease: Power3.easeOut
                            });
                        }, 150);
                        if ($this.find('.progress').length) {
                            TweenMax.set($this.find('.progress .progress-inner'), {
                                scaleX: 0
                            });
                            TweenMax.to($this.find('.progress .progress-inner'), autoPlayTime, {
                                scaleX: 1,
                                ease: Linear.easeNone
                            });
                        }
                    });
                    var inViewCallback = function(enteries, observer) {
                        enteries.forEach(function(entery) {
                            if (entery.isIntersecting) {
                                TweenMax.staggerTo($this.find('.carousel-nav > button, .carousel-nav .toggle-thumbs'), .8, {
                                    scale: 1,
                                    opacity: 1,
                                    visibility: 'visible',
                                    delay: .3,
                                    ease: Power4.easeOut
                                }, .15);
                            }
                        });
                    };
                    var options = {
                        threshold: .2
                    };
                    var observer = new IntersectionObserver(inViewCallback, options);
                    var observerTarget = $carousel.get(0);
                    observer.observe(observerTarget);
                    $('.toggle-thumbs-on').on('click', function() {
                        TweenMax.to($thumbs, .8, {
                            x: '100%',
                            delay: .2,
                            ease: Power4.easeOut
                        });
                        TweenMax.staggerTo($($carouselNavCells.get().reverse()), .8, {
                            scale: .5,
                            opacity: 0,
                            ease: Power4.easeOut
                        }, .1);
                        TweenMax.to($this.find('.carousel-nav'), .8, {
                            x: 0,
                            right: '1.9%',
                            delay: .3,
                            ease: Power4.easeOut
                        });
                        $(this).parent().addClass('off');
                    });
                    $('.toggle-thumbs-off').on('click', function() {
                        TweenMax.to($this.find('.carousel-nav'), .8, {
                            x: 0,
                            right: '12%',
                            ease: Power4.easeOut
                        });
                        TweenMax.to($thumbs, .8, {
                            x: '0%',
                            delay: .15,
                            ease: Power4.easeOut
                        });
                        TweenMax.staggerTo($carouselNavCells, .8, {
                            scale: 1,
                            opacity: 1,
                            visibility: 'visible',
                            delay: .3,
                            ease: Power4.easeOut
                        }, .1);
                        $(this).parent().removeClass('off');
                    });
                    $(window).on('resize', function() {
                        $this.css({
                            height: $('.main-header').not('.header-overlay').length ? $(window).height() - $('.main-header').height() : $(window).height()
                        });
                    });
                });
            }
            var verticalCarouselThumb = $('.carousel-thumbnails-vertical');
            if (verticalCarouselThumb.length) {
                verticalCarouselThumb.each(function() {
                    var vThumbs = $(this), thumbItems = vThumbs.find('.thumb-item'), targetCarousel = $(vThumbs.attr('data-asnavfor'));
                    targetCarousel.imagesLoaded(function() {
                        vThumbs.off();
                        vThumbs.on('click', '.thumb-item', function(event) {
                            var index = $(event.currentTarget).index();
                            if (targetCarousel.data('flickity')) {
                                targetCarousel.flickity('select', index);
                            }
                        });
                        if (targetCarousel.data('flickity')) {
                            var flkty = targetCarousel.data('flickity');
                            var navTop = vThumbs.offset().top;
                            var navCellHeight = thumbItems.outerHeight();
                            var navHeight = vThumbs.outerHeight();
                            targetCarousel.off();
                            targetCarousel.on('select.flickity', function() {
                                vThumbs.find('.is-nav-selected').removeClass('is-nav-selected');
                                var $selected = thumbItems.eq(flkty.selectedIndex).addClass('is-nav-selected');
                                var scrollY = $selected.offset().top + vThumbs.scrollTop() - (navHeight + navCellHeight) / 2;
                                vThumbs.stop().animate({
                                    scrollTop: scrollY
                                });
                            });
                        }
                    });
                });
            }
        }
    };
    $.fn.RellaCarousel = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Carousel(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.carousel-items').RellaCarousel();
    });
    $(document).ajaxComplete(function(e) {
        if ($(e.target.activeElement).is('a.button.yith-wcqv-button')) {
            $('#yith-quick-view-modal').find('.carousel-items').RellaCarousel();
        }
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__OffsetTop';
    var OffsetTop = function(el, options) {
        return this.init(el, options);
    };
    OffsetTop.defaults = {};
    OffsetTop.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, OffsetTop.defaults, options);
            return this;
        },
        build: function() {
            this.offset();
            this.reSetOffset();
            return this;
        },
        offset: function() {
            var el = $(".carousel-vertical-random-offset");
            if (!el.length) {
                return;
            }
            el.each(function() {
                var maxHeight = 0;
                var self = $(this);
                $($(".flickity-slider", self).children()).each(function() {
                    var itemHeight = $(this).height();
                    if (itemHeight > maxHeight) {
                        maxHeight = itemHeight;
                    }
                });
                $($(".flickity-slider", self).children()).each(function() {
                    var itemHeight = $(this).height(), maxOffset = maxHeight - itemHeight;
                    var offset = (Math.random() * maxOffset).toFixed();
                    $(this).css("top", offset + "px");
                });
            });
        },
        getHeights: function() {
            var self = this, heights = [];
            $($(".flickity-slider", self.el).children()).each(function() {
                var itemHeight = $(this).height();
                heights.push(itemHeight);
            });
            return heights;
        },
        getTopOffsets: function() {
            var self = this, topOffsets = [];
            $($(".flickity-slider", self.el).children()).each(function() {
                var itemTopOffset = parseInt($(this).css("top"));
                topOffsets.push(itemTopOffset);
            });
            return topOffsets;
        },
        reSetOffset: function() {
            $($(".flickity-slider", self.el).children()).each(function(index) {});
        }
    };
    $.fn.RellaOffsetTop = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new OffsetTop(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $(document).RellaOffsetTop();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__Carousel3d';
    var Carousel3d = function(el, options) {
        return this.init(el, options);
    };
    Carousel3d.defaults = {
        parentClass: ".carousel-3d",
        itemClass: ".item-3d"
    };
    Carousel3d.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Carousel3d.defaults, options);
            return this;
        },
        build: function() {
            this.setHeight();
            this.setId();
            this.carousel3d();
            this.dragItem();
            return self;
        },
        newBuild: function() {
            this.setHeight();
            this.setId();
            this.dragItem();
            this.fixContainment();
        },
        setId: function() {
            var self = this;
            var total = $(self.options.itemClass, self.el).length, id = total;
            $(self.options.itemClass, self.el).each(function() {
                $(this).attr("data-id", id);
                id--;
            });
            $("span.all", self.el).text(total);
        },
        setHeight: function() {
            var self = this, maxHeight = 0;
            $("img", self.options.itemClass, self.el).each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });
            self.el.addClass('height-applied').height(maxHeight);
        },
        carousel3d: function() {
            var self = this;
            $(self.options.itemClass, self.el).on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass("noclick")) {
                    if ($(this).index() != $(self.options.itemClass, self.el).length - 1) {
                        e.preventDefault();
                        var id = self.showPrev();
                    }
                }
                $(this).removeClass("noclick");
            });
            return self;
        },
        dragItem: function() {
            var self = this;
            var containmentLeft = self.el.offset().left - 20, containmentRight = self.el.offset().left + 20, start, stop;
            $(self.options.itemClass, self.el).draggable({
                axis: "x",
                containment: [ containmentLeft, 0, containmentRight, 0 ],
                start: function(event, ui) {
                    start = ui.position.left;
                    $(this).css("top", "");
                    $(self.options.itemClass, self.el).removeClass("noclick");
                    $(this).addClass("noclick");
                },
                stop: function(event, ui) {
                    stop = ui.position.left;
                    ui.position.left = containmentLeft;
                    if (start > stop) {
                        var id = self.showNext();
                    } else {
                        ui.position.left = containmentRight;
                        var id = self.showPrev();
                    }
                    $(this).attr('style', "");
                }
            });
        },
        fixContainment: function() {
            var self = this;
            setTimeout(function() {
                $(self.options.itemClass, self.el).draggable("option", "containment", [ self.el.offset().left - 20, 0, self.el.offset().left + 20, 0 ]);
            }, 1e3);
        },
        showPrev: function() {
            var self = this;
            $(self.options.itemClass + ":last-child", self.el).addClass("out");
            $(self.options.itemClass, self.el).removeClass("last");
            $(self.options.itemClass + ":nth-last-child(2)", self.el).addClass("last");
            var lastItemClone = $(self.options.itemClass + ":last-child", self.el).clone(true);
            lastItemClone.prependTo($(self.options.parentClass, self.el)).removeClass("last out ui-draggable-dragging noclick").removeAttr('style');
            $(self.options.itemClass, self.el).draggable("option", "disabled", true);
            setTimeout(function() {
                $(self.options.itemClass + ":first-child", self.el).remove();
                $(self.options.itemClass + ":last-child", self.el).prependTo($(self.options.parentClass, self.el)).removeClass('out');
                $(self.options.itemClass + ":last-child", self.el).removeClass("last out");
                $(".active", self.el).text($(self.options.itemClass + ":last-child", self.el).attr("data-id"));
                $(self.options.itemClass, self.el).draggable("option", "disabled", false);
                $(self.options.itemClass, self.el).draggable("option", "containment", [ self.el.offset().left - 20, 0, self.el.offset().left + 20, 0 ]);
            }, 500);
            return $(self.options.itemClass + ":nth-last-child(2)", self.el).attr("data-id");
        },
        showNext: function() {
            var self = this;
            $(self.options.itemClass + ":first-child", self.el).addClass("out");
            $(self.options.itemClass, self.el).removeClass("last");
            $(self.options.itemClass + ":first-child", self.el).appendTo($(self.options.parentClass, self.el));
            $(self.options.itemClass, self.el).draggable("option", "disabled", true);
            setTimeout(function() {
                $(self.options.itemClass + ":last-child", self.el).removeClass("out");
                $(".active", self.el).text($(self.options.itemClass + ":last-child", self.el).attr("data-id"));
                $(self.options.itemClass, self.el).draggable("option", "disabled", false);
                $(self.options.itemClass, self.el).draggable("option", "containment", [ self.el.offset().left - 20, 0, self.el.offset().left + 20, 0 ]);
            }, 150);
            return $(self.options.itemClass + ":last-child", self.el).attr("data-id");
        }
    };
    $.fn.RellaCarousel3d = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName).newBuild();
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new Carousel3d(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('.slider-3d').RellaCarousel3d();
    });
}).apply(this, [ jQuery ]);

(function($) {
    if (window.xMode) {
        return;
    }
    var instanceName = '__counter';
    var Counter = function(el, options) {
        return this.init(el, options);
    };
    Counter.defaults = {
        from: 0,
        speed: 1e3,
        refreshInterval: 50
    };
    Counter.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Counter.defaults, options);
            return this;
        },
        build: function() {
            var el = this.el, opts = this.options, span = el.find('.counter-element > span'), to = parseInt(span.text(), 10);
            var inViewCallback = function(enteries, observer) {
                enteries.forEach(function(entery) {
                    if (entery.isIntersecting) {
                        if (!span.hasClass('counting-started')) {
                            span.countTo($.extend({
                                to: to
                            }, opts));
                            span.addClass('counting-started');
                        }
                    }
                });
            };
            var options = {
                threshold: .15
            };
            var observer = new IntersectionObserver(inViewCallback, options);
            var observerTarget = span.get(0);
            observer.observe(observerTarget);
            return this;
        }
    };
    $.fn.rellaCounter = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Counter(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-counter]').rellaCounter();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__animatedIcon';
    var AnimatedIcon = function(el, options) {
        return this.init(el, options);
    };
    AnimatedIcon.defaults = {
        color: '#f42958',
        hoverColor: null,
        type: 'delayed',
        delay: 0,
        animated: true,
        duration: 100,
        resetOnHover: false,
        customColorApplied: false
    };
    AnimatedIcon.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            if (typeof options.color !== typeof undefined && options.color !== null) {
                options.customColorApplied = true;
            }
            this.options = $.extend(true, {}, AnimatedIcon.defaults, options);
            return this;
        },
        build: function() {
            var self = this, el = this.el, obj = el.find('svg'), objVivus, delayTime = parseInt(self.options.delay, 10), canAnimate = self.options.animated, isCustomColorApplied = self.options.customColorApplied, parentIconbox = el.closest('.icon-box').attr('id', 'iconbox-' + Math.round(Math.random() * 1e6));
            if (!obj.length) {
                return;
            }
            objVivus = new Vivus(obj.get(0), {
                type: self.options.type,
                duration: self.options.duration,
                start: 'manual',
                onReady: function(event) {
                    var strokegradients, strokeHoverGradients = document.createElementNS('http://www.w3.org/2000/svg', 'style'), linearGradientEl = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'), gradientValues = typeof self.options.color !== typeof undefined && self.options.color !== null ? self.options.color.split(',') : '#000', hoverGradientValues = self.options.hoverColor, gid = Math.round(Math.random() * 1e6);
                    if (undefined === gradientValues[1]) {
                        gradientValues[1] = gradientValues[0];
                    }
                    strokegradients = '<defs xmlns="http://www.w3.org/2000/svg"><linearGradient gradientUnits="userSpaceOnUse" id="grad' + gid + '" x1="0%" y1="0%" x2="0%" y2="100%">' + '<stop offset="0%" stop-color="' + gradientValues[0] + '" />' + '<stop offset="100%" stop-color="' + gradientValues[1] + '" />' + "</linearGradient></defs>";
                    var xmlStrokegradients = new DOMParser().parseFromString(strokegradients, "text/xml");
                    obj.prepend(xmlStrokegradients.documentElement);
                    if (typeof undefined !== typeof hoverGradientValues && null !== hoverGradientValues) {
                        hoverGradientValues = hoverGradientValues.split(',');
                        if (undefined === hoverGradientValues[1]) {
                            hoverGradientValues[1] = hoverGradientValues[0];
                        }
                        strokeHoverGradients.innerHTML = '#' + parentIconbox.attr('id') + ':hover .icon-container defs stop:first-child{stop-color:' + hoverGradientValues[0] + ';}' + '#' + parentIconbox.attr('id') + ':hover .icon-container defs stop:last-child{stop-color:' + hoverGradientValues[1] + ';}';
                        obj.prepend(strokeHoverGradients);
                    }
                    if (isCustomColorApplied) {
                        obj.find('path, rect, ellipse, circle, polygon, polyline').attr({
                            stroke: 'url(#grad' + gid + ')',
                            fill: 'none'
                        });
                    }
                    $(event.el).closest('.icon-container').addClass('appear-animation-visible');
                }
            }).setFrameProgress(1);
            if ($(window).width() >= 992 && canAnimate && !window.xMode) {
                objVivus.reset().stop();
                var inViewCallback = function(enteries, observer) {
                    enteries.forEach(function(entery) {
                        if (entery.isIntersecting) {
                            if (objVivus.getStatus() == 'start' && objVivus.getStatus() != 'progress') {
                                objVivus.stop().reset();
                                setTimeout(function() {
                                    objVivus.play(self.options.duration / 100);
                                }, delayTime);
                            }
                        }
                    });
                };
                var options = {
                    threshold: .25
                };
                var observer = new IntersectionObserver(inViewCallback, options);
                var observerTarget = el.get(0);
                observer.observe(observerTarget);
                $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                    objVivus.stop().reset();
                    setTimeout(function() {
                        objVivus.play(self.options.duration / 100);
                    }, delayTime);
                });
                if (self.options.resetOnHover) {
                    parentIconbox.on('mouseenter', function() {
                        if (objVivus.getStatus() == 'end') {
                            objVivus.stop().reset().play(self.options.duration / 100);
                        }
                    });
                }
            }
            return this;
        }
    };
    $.fn.rellaAnimatedIcon = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new AnimatedIcon(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-animated-icon]').rellaAnimatedIcon();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__portfolio';
    var Portfolio = function(el, options) {
        return this.init(el, options);
    };
    Portfolio.defaults = {};
    Portfolio.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Portfolio.defaults, options);
            return this;
        },
        build: function() {
            var self = this, el = this.el, filters = $('.masonry-filters'), grid = filters.data('target') || el.children('[id*=grid-]'), counter = $('<span class="counter"><span></span></span>');
            grid = $(grid);
            grid.isotope({
                itemSelector: '.masonry-item',
                layoutMode: 'packery'
            });
            el.find('.sorting-option input[type=checkbox]').on('change', function() {
                var checkbox = $(this), value = checkbox.prop('checked') ? checkbox.val() : '';
                setTimeout(function() {
                    window.location = self.add_query_arg(checkbox.data('metric'), value);
                }, 300);
            });
            if (filters.length && !filters.find('li').find('.counter').length) {
                counter.appendTo(filters.find('li').not('[data-filter="*"]'));
            }
            self.update_filter_counts(grid, filters);
            var clones = $('.masonry-filters, .masonry-filters-clone .masonry-filters');
            filters.on('click', 'li', function() {
                var $this = $(this), filterValue = $this.attr('data-filter');
                clones.find('.active').removeClass('active');
                clones.find('[data-filter="' + filterValue + '"]').addClass('active');
                if (grid.attr('data-stagger') === null || typeof grid.attr('data-stagger') === typeof undefined) {
                    grid.isotope({
                        filter: filterValue
                    });
                    self.update_filter_counts(grid, filters);
                    if ('vc_js' in window) {
                        window.setTimeout(vc_waypoints, 500);
                    }
                    setTimeout(function() {
                        $(document).RellaHover3d();
                        $('[data-hover3d]').each(function() {
                            ATicon.getInstance($(this));
                        });
                    }, 500);
                } else {
                    var items = grid.isotope('getItemElements');
                    TweenMax.staggerTo($(items).filter(':visible').find('.inner-wrapper'), .2, {
                        y: 30,
                        opacity: 0,
                        onStart: function() {
                            filters.addClass('grid-transition-started');
                        }
                    }, .05, function() {
                        grid.isotope({
                            filter: filterValue
                        });
                        grid.addClass('stagger-done');
                        self.update_filter_counts(grid, filters);
                    });
                    grid.on('layoutComplete', function() {
                        filters.removeClass('grid-transition-started');
                        TweenMax.staggerTo($(items).filter(':visible').find('.inner-wrapper'), .25, {
                            y: 0,
                            opacity: 1
                        }, .1);
                        if ($('[data-mh]').length) {
                            $('[data-mh]').matchHeight({
                                remove: true
                            });
                            $('[data-mh]').matchHeight();
                        }
                        if ('vc_js' in window) {
                            window.setTimeout(vc_waypoints, 500);
                        }
                        if (typeof parallaxController !== typeof undefined || parallaxController !== null) {
                            parallaxController.updateScene();
                        }
                        setTimeout(function() {
                            $(document).RellaHover3d();
                            $('[data-hover3d]').each(function() {
                                ATicon.getInstance($(this));
                            });
                        }, 500);
                    });
                }
            });
            if ($('.carousel-items').length) {
                $('.carousel-items').imagesLoaded(function() {
                    self.update_layout(grid);
                });
            }
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                grid.isotope('layout');
            });
            $(window).on('load', function() {
                setTimeout(function() {
                    self.update_layout(grid);
                }, 500);
            });
            return this;
        },
        add_query_arg: function(key, val, url) {
            key = escape(key);
            val = escape(val);
            url = url || location.origin + location.pathname;
            var queries = {};
            if ('' !== document.location.search) {
                $.each(document.location.search.substr(1).split('&'), function(c, q) {
                    var i = q.split('=');
                    queries[i[0].toString()] = i[1].toString();
                });
            }
            if ('' != val) {
                queries[key] = val;
            } else {
                delete queries[key];
            }
            if (Object.keys(queries).length > 0) {
                url = url + '?' + $.param(queries);
            }
            return url;
        },
        update_filter_counts: function(grid, filters) {
            if (!filters.length) {
                return;
            }
            var itemElems = grid.isotope('getFilteredItemElements'), $itemElems = $(itemElems);
            filters.find('li').each(function(i, button) {
                var $button = $(button), filterValue = $button.attr('data-filter');
                if (!filterValue) {
                    return;
                }
                var count = $itemElems.filter(filterValue).length;
                $button.find('.counter span').text(count);
            });
            return this;
        },
        update_layout: function(grid) {
            setTimeout(function() {
                grid.isotope('layout');
            }, 400);
            return this;
        }
    };
    $.fn.rellaPortfolio = function(settings) {
        return this.map(function() {
            var el = $(this), filters = el.find('.masonry-filters'), grid = filters.data('target') || el.children('[id*=grid-]');
            el.imagesLoaded(function() {
                setTimeout(function() {
                    $(grid).addClass('items-loaded');
                }, 500);
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new Portfolio(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('[data-plugin-portfolio]').rellaPortfolio();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__masonryLayout';
    var MasonryLayout = function(el, options) {
        return this.init(el, options);
    };
    MasonryLayout.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, options);
            return this;
        },
        build: function() {
            var self = this, grid = this.el, filter = $(grid).siblings('.masonry-filters'), activeFilter = filter.find('.active'), activeValue = activeFilter.attr('data-filter');
            var $grid = grid.isotope({
                itemSelector: '.masonry-item',
                layoutMode: 'packery',
                filter: activeValue || '*',
                stamp: '.mid-bar'
            });
            filter.on('click', 'li', function() {
                var $this = $(this), filterVal = $this.attr('data-filter');
                filter.find('.active').removeClass('active');
                filter.find('[data-filter="' + filterVal + '"]').addClass('active');
                $grid.isotope({
                    filter: filterVal
                });
            });
            $grid.on('layoutComplete', self.layoutComplete);
            $grid.isotope('on', 'layoutComplete', self.layoutComplete);
            $grid.isotope('layout');
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                $grid.isotope('layout');
            });
            return this;
        },
        layoutComplete: function(event, laidOutItems) {
            var $element = $(this.element);
            setTimeout(function() {
                $element.addClass('items-loaded');
            }, 500);
        }
    };
    $.fn.rellaMasonryLayout = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new MasonryLayout(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        if (typeof $.fn.isotope === 'function') {
            $('[data-plugin-masonry]').rellaMasonryLayout();
        }
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__subscribeform';
    var SubscribeForm = function(el, options) {
        return this.init(el, options);
    };
    SubscribeForm.defaults = {
        icon: false,
        align: 'left'
    };
    SubscribeForm.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, SubscribeForm.defaults, options);
            return this;
        },
        build: function() {
            var self = this, el = this.el;
            var submit = el.find('.wysija-submit'), icon = self.options.icon ? '<span class="submit-icon"><i class="' + self.options.icon + '"></i></span>' : '', icon_left = '', icon_right = '', submitText = submit.val() == '' ? '' : '<span class="submit-text">' + submit.val() + '</span>', lastInput = el.find('.wysija-input').last().parent('.abs-req').length ? el.find('.wysija-input').last().parent('.abs-req').siblings('.wysija-input') : el.find('.wysija-input').last(), isRTL = $('html').attr('dir') == 'rtl';
            if ('left' === self.options.icon) {
                icon_left = icon;
            } else {
                icon_right = icon;
            }
            if (!el.find('.subscribe-form__submit-btn').length) {
                var button = $('<button class="wysija-submit wysija-submit-field" type="submit">' + icon_left + submitText + icon_right + '</button>');
                submit.hide();
            } else {
                var button = el.find('.subscribe-form__submit-btn');
            }
            if (el.hasClass('subscribe-form--button-inside')) {
                if (!el.find('.subscribe-form__submit-btn').length) {
                    lastInput.after(button);
                }
                button.css('line-height', parseInt(lastInput.outerHeight(), 10) - parseInt(lastInput.css('border-width'), 10) * 2 + 'px');
                if (!isRTL) {
                    lastInput.css('padding-right', button.outerWidth() + 15);
                } else {
                    lastInput.css('padding-left', button.outerWidth() + 15);
                }
            } else {
                submit.after(button);
            }
            el.addClass('subscribe-form--is-initialized');
            return this;
        }
    };
    $.fn.rellaSubscribeForm = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new SubscribeForm(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-subscribe-form]').rellaSubscribeForm();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__google_maps';
    function CustomMarker(latlng, map, className) {
        this.latlng_ = latlng;
        this.className = className;
        this.setMap(map);
    }
    if (typeof google !== typeof undefined && typeof google.maps !== typeof undefined) {
        CustomMarker.prototype = new google.maps.OverlayView();
        CustomMarker.prototype.draw = function() {
            var me = this;
            var div = this.div_, divChild, divChild2;
            if (!div) {
                div = this.div_ = document.createElement('DIV');
                div.className = this.className;
                divChild = document.createElement("div");
                div.appendChild(divChild);
                divChild2 = document.createElement("div");
                div.appendChild(divChild2);
                google.maps.event.addDomListener(div, "click", function(event) {
                    google.maps.event.trigger(me, "click");
                });
                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
        };
        CustomMarker.prototype.remove = function() {
            if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        };
        CustomMarker.prototype.getPosition = function() {
            return this.latlng_;
        };
    }
    var Maps = function(el, options) {
        return this.init(el, options);
    };
    Maps.defaults = {
        address: '',
        marker: '',
        primaryColor: '#2d313f',
        saturation: -20,
        brightness: 5,
        style: 'apple',
        markers: null,
        className: 'map_marker',
        marker_option: 'image'
    };
    Maps.styles = {
        aeropuerto: [ {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [ {
                weight: "2.00"
            } ]
        }, {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#9c9c9c"
            } ]
        }, {
            featureType: "all",
            elementType: "labels.text",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                color: "#f2f2f2"
            } ]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#ffffff"
            } ]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#ffffff"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 45
            } ]
        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#eeeeee"
            } ]
        }, {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#7b7b7b"
            } ]
        }, {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [ {
                color: "#ffffff"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [ {
                color: "#46bcec"
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#8cb6b6"
            } ]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#070707"
            } ]
        }, {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [ {
                color: "#ffffff"
            } ]
        } ],
        apple: [ {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [ {
                color: "#f7f1df"
            } ]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [ {
                color: "#d0e3b4"
            } ]
        }, {
            featureType: "landscape.natural.terrain",
            elementType: "geometry",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi.business",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi.medical",
            elementType: "geometry",
            stylers: [ {
                color: "#fbd3da"
            } ]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [ {
                color: "#bde6ab"
            } ]
        }, {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#ffe15f"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#efd151"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#ffffff"
            } ]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [ {
                color: "black"
            } ]
        }, {
            featureType: "transit.station.airport",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#cfb2db"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                color: "#a2daf2"
            } ]
        } ],
        blueWater: [ {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#444444"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                color: "#f2f2f2"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 45
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [ {
                color: "#46bcec"
            }, {
                visibility: "on"
            } ]
        } ],
        classy: [ {
            featureType: "all",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            }, {
                hue: "#ff0000"
            } ]
        }, {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 65
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 51
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                saturation: "0"
            }, {
                visibility: "on"
            }, {
                lightness: "6"
            }, {
                hue: "#ff9800"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 30
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "road.local",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 40
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                hue: "#ffff00"
            }, {
                lightness: -25
            }, {
                saturation: -97
            } ]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [ {
                visibility: "on"
            }, {
                lightness: -25
            }, {
                saturation: -100
            } ]
        } ],
        desaturatedRoad: [ {
            stylers: [ {
                saturation: 0
            } ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [ {
                lightness: 200
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "administrative",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            }, {
                saturation: 45
            } ]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            }, {
                saturation: -45
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                visibility: "simplified"
            }, {
                saturation: 45
            } ]
        }, {
            featureType: "landscape",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            }, {
                saturation: 45
            } ]
        }, {
            featureType: "transit",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            }, {
                saturation: 45
            } ]
        } ],
        flatPale: [ {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#6195a0"
            } ]
        }, {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [ {
                lightness: "0"
            }, {
                saturation: "0"
            }, {
                color: "#f5f5f2"
            }, {
                gamma: "1"
            } ]
        }, {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [ {
                lightness: "-3"
            }, {
                gamma: "1.00"
            } ]
        }, {
            featureType: "landscape.natural.terrain",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#bae5ce"
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 45
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#fac9a9"
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "labels.text",
            stylers: [ {
                color: "#4e4e4e"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#787878"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "transit.station.airport",
            elementType: "labels.icon",
            stylers: [ {
                hue: "#0a00ff"
            }, {
                saturation: "-77"
            }, {
                gamma: "0.57"
            }, {
                lightness: "0"
            } ]
        }, {
            featureType: "transit.station.rail",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#43321e"
            } ]
        }, {
            featureType: "transit.station.rail",
            elementType: "labels.icon",
            stylers: [ {
                hue: "#ff6c00"
            }, {
                lightness: "4"
            }, {
                gamma: "0.75"
            }, {
                saturation: "-68"
            } ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [ {
                color: "#eaf6f8"
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#c7eced"
            } ]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [ {
                lightness: "-49"
            }, {
                saturation: "-53"
            }, {
                gamma: "0.79"
            } ]
        } ],
        fuse: [ {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 65
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 51
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 30
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "road.local",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 40
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                hue: "#ffff00"
            }, {
                lightness: -25
            }, {
                saturation: -97
            } ]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [ {
                visibility: "on"
            }, {
                lightness: -25
            }, {
                saturation: -100
            } ]
        } ],
        lightAndDark: [ {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#444444"
            } ]
        }, {
            featureType: "administrative.land_parcel",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                color: "#f2f2f2"
            } ]
        }, {
            featureType: "landscape.natural",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            }, {
                color: "#052366"
            }, {
                saturation: "-70"
            }, {
                lightness: "85"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels",
            stylers: [ {
                visibility: "simplified"
            }, {
                lightness: "-53"
            }, {
                weight: "1.00"
            }, {
                gamma: "0.98"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 45
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [ {
                saturation: "-18"
            } ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road.local",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [ {
                color: "#57677a"
            }, {
                visibility: "on"
            } ]
        } ],
        shadesOfGrey: [ {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [ {
                saturation: 36
            }, {
                color: "#000000"
            }, {
                lightness: 40
            } ]
        }, {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [ {
                visibility: "on"
            }, {
                color: "#000000"
            }, {
                lightness: 16
            } ]
        }, {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 20
            } ]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 17
            }, {
                weight: 1.2
            } ]
        }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 20
            } ]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 21
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 17
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 29
            }, {
                weight: .2
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 18
            } ]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 16
            } ]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 19
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                color: "#000000"
            }, {
                lightness: 17
            } ]
        } ],
        ultraLight: [ {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                color: "#e9e9e9"
            }, {
                lightness: 17
            } ]
        }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [ {
                color: "#f5f5f5"
            }, {
                lightness: 20
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#ffffff"
            }, {
                lightness: 17
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#ffffff"
            }, {
                lightness: 29
            }, {
                weight: .2
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [ {
                color: "#ffffff"
            }, {
                lightness: 18
            } ]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [ {
                color: "#ffffff"
            }, {
                lightness: 16
            } ]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [ {
                color: "#f5f5f5"
            }, {
                lightness: 21
            } ]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [ {
                color: "#dedede"
            }, {
                lightness: 21
            } ]
        }, {
            elementType: "labels.text.stroke",
            stylers: [ {
                visibility: "on"
            }, {
                color: "#ffffff"
            }, {
                lightness: 16
            } ]
        }, {
            elementType: "labels.text.fill",
            stylers: [ {
                saturation: 36
            }, {
                color: "#333333"
            }, {
                lightness: 40
            } ]
        }, {
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [ {
                color: "#f2f2f2"
            }, {
                lightness: 19
            } ]
        }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [ {
                color: "#fefefe"
            }, {
                lightness: 20
            } ]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#fefefe"
            }, {
                lightness: 17
            }, {
                weight: 1.2
            } ]
        } ],
        pastel: [ {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#444444"
            } ]
        }, {
            featureType: "administrative.country",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            }, {
                saturation: "0"
            }, {
                lightness: "0"
            } ]
        }, {
            featureType: "administrative.locality",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "administrative.neighborhood",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            }, {
                color: "#ffffff"
            } ]
        }, {
            featureType: "landscape",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [ {
                saturation: "17"
            }, {
                visibility: "on"
            } ]
        }, {
            featureType: "landscape.natural",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi.park",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            }, {
                hue: "#91ff00"
            }, {
                lightness: "56"
            }, {
                saturation: "26"
            } ]
        }, {
            featureType: "road",
            elementType: "all",
            stylers: [ {
                saturation: -100
            }, {
                lightness: 45
            } ]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [ {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [ {
                color: "#f5d2c4"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "labels",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [ {
                visibility: "on"
            }, {
                color: "#f5d2c4"
            }, {
                lightness: "60"
            } ]
        }, {
            featureType: "road.arterial",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "road.local",
            elementType: "all",
            stylers: [ {
                visibility: "on"
            } ]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [ {
                color: "#f3f3f3"
            }, {
                visibility: "simplified"
            } ]
        }, {
            featureType: "road.local",
            elementType: "labels",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "water",
            elementType: "all",
            stylers: [ {
                color: "#e9f6f8"
            }, {
                visibility: "on"
            } ]
        } ]
    };
    Maps.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Maps.defaults, {
                map: {
                    center: new google.maps.LatLng(-37.823323, 145.04612),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    scrollwheel: false
                }
            }, options);
            return this;
        },
        build: function() {
            var opts = this.options, self = this, container = this.el, contentString = container.parent().not('.contents-style2, .contents-style3').find('[data-plugin-map]').next('.marker-contents'), infowindow = null, mapOpts = opts.map;
            mapOpts.styles = Maps.styles[opts.style];
            var map = new google.maps.Map(container.get(0), mapOpts);
            map.zoom = this.options.map.zoom || 14;
            if (contentString.length) {
                infowindow = new google.maps.InfoWindow({
                    content: contentString.get(0),
                    maxWidth: 1170
                });
                google.maps.event.addListener(infowindow, 'domready', function() {
                    var iwBackground = $('.gm-style-iw', container).prev();
                    iwBackground.css({
                        display: 'none'
                    });
                });
            }
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: opts.address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var result = results[0].geometry.location, latitude = results[0].geometry.location.lat(), longitude = results[0].geometry.location.lng(), contentWidth, contentHeight, overlay, marker;
                    if (self.options.marker_option == 'html') {
                        $(container).addClass('marker-html');
                    }
                    if (self.options.markers == null) {
                        if (self.options.marker_option == 'image') {
                            marker = new google.maps.Marker({
                                position: result,
                                map: map,
                                visible: true,
                                icon: opts.marker,
                                zIndex: 9999999
                            });
                        } else {
                            marker = new CustomMarker(result, map, self.options.className);
                        }
                    } else {
                        for (var i = 0; i < self.options.markers.length; i++) {
                            if (self.options.marker_option == 'image') {
                                marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(self.options.markers[i][0], self.options.markers[i][1]),
                                    map: map,
                                    visible: true,
                                    icon: opts.marker,
                                    zIndex: 9999999
                                });
                            } else {
                                marker = new CustomMarker(new google.maps.LatLng(self.options.markers[i][0], self.options.markers[i][1]), map, self.options.className);
                            }
                        }
                    }
                    map.setCenter(new google.maps.LatLng(latitude, longitude));
                    if (contentString.length && self.options.marker_option == 'image') {
                        var contentWidth = contentString.width(), contentHeight = contentString.height(), panValue = container.parent().hasClass('contents-style4') ? contentHeight / 2 + 25 : contentHeight / 2;
                        map.panBy(0, panValue * -1);
                    }
                    $('.lightbox-link[data-type=inline]').on('mfpOpen', function(e) {
                        setTimeout(function() {
                            map.setCenter(new google.maps.LatLng(latitude, longitude));
                        }, 500);
                    });
                    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                        setTimeout(function() {
                            map.setCenter(new google.maps.LatLng(latitude, longitude));
                        }, 500);
                    });
                    if (container.parent().hasClass('contents-style2') || container.parent().hasClass('contents-style3')) {
                        return;
                    }
                    if (contentString.length) {
                        infowindow.open(map, marker);
                    }
                }
            });
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
                setTimeout(function() {
                    google.maps.event.trigger(map, 'resize');
                }, 500);
            });
            $('.lightbox-link[data-type=inline]').on('mfpOpen', function(e) {
                setTimeout(function() {
                    google.maps.event.trigger(map, 'resize');
                }, 500);
            });
            return this;
        }
    };
    $.fn.rellaMaps = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Maps(el, opts);
            }
        });
    };
    $(window).on('load', function() {
        $('[data-plugin-map]').rellaMaps();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__lightbox';
    var Lightbox = function(el, options) {
        return this.init(el, options);
    };
    Lightbox.defaults = {
        closeBtnInside: false,
        removalDelay: 500,
        mainClass: 'mfp-fade',
        callbacks: {
            open: function() {
                if ($('body').hasClass('smooth-wheel-enabled')) {
                    $(document).smoothWheel({
                        remove: true
                    });
                }
            },
            close: function() {
                if ($('body').hasClass('smooth-wheel-enabled')) {
                    $(document).smoothWheel();
                }
            }
        }
    };
    Lightbox.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Lightbox.defaults, options);
            this.options.type = 'video' === this.el.data('type') ? 'iframe' : this.el.data('type');
            return this;
        },
        build: function() {
            var element = this.el;
            if ($('.listing-lightbox-gallery').length) {
                $('.listing-lightbox-gallery').each(function() {
                    $(this).find('.lightbox-link').addClass('lightbox-gallery').magnificPopup($.extend(this.options, {
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    }));
                });
            }
            $(element).not('.lightbox-gallery').magnificPopup(this.options);
            return this;
        }
    };
    $.fn.rellaLightbox = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Lightbox(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.lightbox-link').rellaLightbox();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__lettering';
    var Lettering = function(el, options) {
        return this.init(el, options);
    };
    Lettering.defaults = {
        splitter: 'init',
        animateOnAppear: false,
        animateOnParentHover: false,
        animateDelay: 0,
        animationType: null,
        parent: null,
        element: null,
        staggerDelay: .05
    };
    Lettering.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Lettering.defaults, options);
            if (this.options.parent === null || typeof this.options.parent === typeof undefined) {
                this.options.parent = $(this.el).parent();
            }
            return this;
        },
        completeFunc: function($this, letteringSelector) {
            $this.addClass('tweening-done');
            letteringSelector.addClass('tweening-done');
        },
        onEachStart: function($this) {
            $(this.target).parent().addClass('moving-started');
        },
        onEachComplete: function($this) {
            $(this.target).parent().addClass('moving-done');
        },
        typewriterCompleteFunc: function($this, letteringSelector) {
            $this.addClass('tweening-done');
            letteringSelector.addClass('tweening-done');
        },
        typewriterOnEachStart: function($this) {
            $(this.target).parent().addClass('moving-started');
        },
        typewriterOnEachComplete: function($this) {
            $(this.target).parent().addClass('moving-done');
        },
        build: function() {
            var self = this, letteringSelector = self.el;
            if (self.options.element != null) {
                letteringSelector = $(self.options.element, self.el);
            }
            if ($.isFunction($.fn.lettering)) {
                letteringSelector.lettering(self.options.splitter).addClass('lettering-applied');
            } else {
                console.warn(' Lettering.js is needed ');
            }
            self.el.addClass('lettering-applied');
            $(self.el).find('span').find('span').each(function() {
                var $this = $(this), content = $this.text();
                if (content == '&nbsp;' || content == ' ') {
                    $this.parent().css('display', 'inline');
                    $this.css('display', 'inline');
                }
            });
            if (self.options.animateOnAppear) {
                var $this = $(this.el), animateDelay = self.options.animateDelay, animationType = self.options.animationType, staggerDelay = self.options.staggerDelay;
                var inViewCallback = function(enteries, observer) {
                    enteries.forEach(function(entery) {
                        if (entery.isIntersecting) {
                            if (animationType !== "typewriter") {
                                if ($(entery.target).parent().hasClass('left') || $(entery.target).parent().hasClass('align-left') || $(entery.target).parent().hasClass('text-left')) {
                                    TweenMax.staggerTo($($(entery.target).find('span').find('span')).get().reverse(), .2, {
                                        x: '0%',
                                        delay: animateDelay,
                                        ease: Power2.easeOut,
                                        onStart: self.onEachStart($this),
                                        onComplete: self.onEachComplete($this)
                                    }, staggerDelay, self.completeFunc($this, letteringSelector));
                                } else {
                                    TweenMax.staggerTo($(entery.target).find('span').find('span'), .2, {
                                        x: '0%',
                                        delay: animateDelay,
                                        ease: Power2.easeOut,
                                        onStart: self.onEachStart($this),
                                        onComplete: self.onEachComplete($this)
                                    }, staggerDelay, self.completeFunc($this, letteringSelector));
                                }
                            } else {
                                if ($(entery.target).parent().hasClass('left') || $(entery.target).parent().hasClass('align-left') || $(entery.target).parent().hasClass('text-left')) {
                                    TweenMax.staggerFromTo($($(entery.target).find('span').find('span')).get().reverse(), .2, {
                                        x: '0%',
                                        visibility: 'hidden'
                                    }, {
                                        x: '0%',
                                        visibility: 'visible',
                                        delay: animateDelay,
                                        ease: Power2.easeOut,
                                        onStart: self.typewriterOnEachStart($this),
                                        onComplete: self.typewriterOnEachComplete($this)
                                    }, staggerDelay, self.typewriterCompleteFunc($this, letteringSelector));
                                } else {
                                    TweenMax.staggerFromTo($(entery.target).find('span').find('span'), .2, {
                                        x: '0%',
                                        visibility: 'hidden'
                                    }, {
                                        x: '0%',
                                        visibility: 'visible',
                                        delay: animateDelay,
                                        ease: Power2.easeOut,
                                        onStart: self.typewriterOnEachStart($this),
                                        onComplete: self.typewriterOnEachComplete($this)
                                    }, staggerDelay, self.typewriterCompleteFunc($this, letteringSelector));
                                }
                            }
                        }
                    });
                };
                var options = {
                    threshold: .25
                };
                var observer = new IntersectionObserver(inViewCallback, options);
                var observerTarget = $(self.el).get(0);
                observer.observe(observerTarget);
            }
            if (self.options.animateOnParentHover) {
                var animateDelay = self.options.animateDelay;
                self.el.parents(self.options.parent).on('mouseenter', function() {
                    TweenMax.set($(this).find('[data-lettering]').find('span').find('span'), {
                        x: '-110%'
                    });
                    TweenMax.staggerFromTo($(this).find('[data-lettering]').find('span').find('span'), .4, {
                        x: '-110%'
                    }, {
                        x: '0%',
                        delay: animateDelay,
                        ease: Power3.easeOut
                    }, staggerDelay);
                }).on('mouseleave', function() {
                    TweenMax.set($(this).find('[data-lettering]').find('span').find('span'), {
                        x: '-110%'
                    });
                });
            }
            return this;
        }
    };
    $.fn.rellaLettering = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Lettering(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-lettering]').rellaLettering();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__panr';
    var Panr = function(el, options) {
        return this.init(el, options);
    };
    Panr.defaults = {
        sensitivity: 15,
        scale: false,
        scaleOnHover: true,
        scaleTo: 1.08,
        scaleDuration: .25,
        panDuration: 1.25,
        panY: true,
        panX: true,
        resetPanOnMouseLeave: true,
        moveTarget: null
    };
    Panr.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Panr.defaults, options);
            return this;
        },
        build: function() {
            this.el.panr(this.options);
            return this;
        }
    };
    $.fn.rellaPanr = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new Panr(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('[data-panr]').rellaPanr();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__contact';
    var Contact = function(el, options) {
        return this.init(el, options);
    };
    Contact.defaults = {};
    Contact.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Contact.defaults, options);
            return this;
        },
        build: function() {
            $(this.el).each(function() {
                var $this = $(this);
                $this.find('input, textarea').on('focus', function() {
                    $this.addClass('input-focused');
                }).on('blur', function() {
                    var input = $(this);
                    $this.removeClass('input-focused');
                    if (input.val() !== '') {
                        $this.addClass('input-filled');
                    } else {
                        $this.removeClass('input-filled');
                    }
                });
            });
            return this;
        }
    };
    $.fn.rellaContact = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Contact(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.wpcf7-form-control-wrap, .form-control-wrap, .contact-form .form-group').rellaContact();
    });
}).apply(this, [ jQuery ]);

(function($) {
    var instanceName = '__countdown';
    var Countdown = function(el, options) {
        return this.init(el, options);
    };
    Countdown.defaults = {
        daysLabel: "Days",
        hoursLabel: "Hours",
        minutesLabel: "Minutes",
        secondsLabel: "Seconds",
        timezone: null
    };
    Countdown.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Countdown.defaults, options);
            return this;
        },
        build: function() {
            var self = this, el = self.el, options = self.options, targetTime = options.until, opTimeZone = options.timezone;
            $(el).countdown({
                until: new Date(targetTime.replace(/-/g, "/")),
                padZeroes: true,
                timezone: opTimeZone,
                layout: '<span class="countdown-row">' + '<span class="countdown-section">' + '<span class="countdown-amount">{dn}</span>' + '<span class="countdown-period">' + options.daysLabel + '</span>' + '</span>' + '<span class="countdown-section">' + '<span class="countdown-amount">{hn}</span>' + '<span class="countdown-period">' + options.hoursLabel + '</span>' + '</span>' + '<span class="countdown-section">' + '<span class="countdown-amount">{mn}</span>' + '<span class="countdown-period">' + options.minutesLabel + '</span>' + '</span>' + '<span class="countdown-section">' + '<span class="countdown-amount">{sn}</span>' + '<span class="countdown-period">' + options.secondsLabel + '</span>' + '</span>' + '</span>'
            });
            return this;
        }
    };
    $.fn.rellaCountdown = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Countdown(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-countdown]').rellaCountdown();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__typed';
    var Typed = function(el, options) {
        return this.init(el, options);
    };
    Typed.defaults = {
        loop: true,
        backDelay: 1200,
        typeSpeed: 100
    };
    Typed.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Typed.defaults, options);
            this.options.stringsElement = this.el.find('.typed-strings');
            return this;
        },
        build: function() {
            this.el.addClass('typed-activated');
            this.el.find('.typed-element').typed(this.options);
            return this;
        }
    };
    $.fn.rellaTyped = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Typed(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-typed]').rellaTyped();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__testimonial_slider';
    var TestimonialSlider = function(el, options) {
        return this.init(el, options);
    };
    TestimonialSlider.defaults = {
        height: 530
    };
    TestimonialSlider.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, TestimonialSlider.defaults, options);
            return this;
        },
        build: function() {
            this.relist();
            this.reverse();
            this.slide();
            this.drag();
        },
        drag: function() {
            var self = this;
            var transform = Modernizr.prefixedCSS('transform'), start, stop, translateVal;
            $(".testimonial-slider-pagination", self.el).draggable({
                axis: "y",
                containment: 'parent',
                start: function(event, ui) {
                    start = ui.position.top;
                    $(this).addClass("noclick").removeClass('back-to-center');
                },
                drag: function(event, ui) {
                    stop = ui.position.top, translateVal = stop - ui.originalPosition.top;
                    $(this).css(transform, 'translateY(' + translateVal + 'px)');
                },
                stop: function(event, ui) {
                    stop = ui.position.top;
                    if (start > stop) {
                        self.slideItem("prev");
                    } else {
                        self.slideItem("next");
                    }
                    $(this).css('top', "");
                    $(this).one('bsTransitionEnd', function() {
                        $(this).addClass('back-to-center').attr('style', '');
                    }).emulateTransitionEnd(0);
                }
            });
        },
        relist: function() {
            var self = this;
            $(".testimonial-item", this.el).each(function() {
                var quote = $(".testimonial-quote", $(this)).html();
                var image = $(".testimonial-image", $(this)).html();
                var imageURL = $(".testimonial-image img", $(this)).attr("src");
                $(".testimonial-slider-opposite .item-left ul", self.el).append("<li><div class='testimonial-box'>" + quote + "</div></li>");
                $(".testimonial-slider-opposite .item-right ul", self.el).prepend("<li style='background-image: url(" + imageURL + ");'>" + image + "</li>");
            });
            this.el.attr("data-page", 0);
            self.activeItem();
            return this;
        },
        activeItem: function() {
            $(".testimonial-slider-opposite .item-left ul li:first-child", self.el).addClass("active");
            $(".testimonial-slider-opposite .item-right ul li:last-child", self.el).addClass("active");
        },
        reverse: function() {
            var self = this, transform = Modernizr.prefixedCSS('transform');
            var height = parseInt($(".testimonial-slider-opposite .item-right ul", self.el).css("height")) - parseInt($(".testimonial-slider-opposite .item-right").css("height"));
            $(".testimonial-slider-opposite .item-right ul", self.el).css(transform, 'translateY(' + -1 * height + 'px)');
            var total = $(".testimonial-slider-temporary .testimonial-item", self.el).length;
            $(".pages .all", self.el).text(total);
            for (var i = 0; i < total; i++) {
                $(".pages .actives ul", self.el).append("<li>" + (i + 1) + "</li>");
            }
            return this;
        },
        slideItem: function(direction) {
            var self = this, el = this.el, transform = Modernizr.prefixedCSS('transform');
            var height = parseInt($(".testimonial-slider-opposite .item-right", self.el).css("height"));
            var page = parseInt(el.attr("data-page"));
            var total = $(".testimonial-slider-temporary .testimonial-item", self.el).length;
            var maxHeight = height * (total - 1);
            var pageHeight = parseInt($(".testimonial-slider-pagination .actives", self.el).css("line-height"));
            if (direction === 'next') {
                var newLeftVal = height * -1 * (page + 1), newRightVal = -1 * maxHeight + height * (page + 1), newPageTop = pageHeight * -1 * (page + 1);
                if (total > page + 1) {
                    $(".testimonial-slider-opposite .item-left ul", self.el).css(transform, 'translateY(' + newLeftVal + 'px)');
                    $(".testimonial-slider-opposite .item-right ul", self.el).css(transform, 'translateY(' + newRightVal + 'px)');
                    el.attr("data-page", page + 1);
                    var rightItem = total - 1 - parseInt(self.el.attr("data-page"));
                    $(".testimonial-slider-opposite .item-left ul li", self.el).removeClass("active");
                    $(".testimonial-slider-opposite .item-left ul li:eq(" + self.el.attr("data-page") + ")", self.el).addClass("active");
                    $(".testimonial-slider-opposite .item-left ul li", self.el).removeClass("coming-from-top").removeClass("coming-from-bottom");
                    $(".testimonial-slider-opposite .item-left ul li:eq(" + self.el.attr("data-page") + ")", self.el).addClass("coming-from-bottom");
                    $(".testimonial-slider-opposite .item-right ul li", self.el).removeClass("active");
                    $(".testimonial-slider-opposite .item-right ul li:eq(" + rightItem + ")", self.el).addClass("active");
                    $(".testimonial-slider-opposite .item-right ul li", self.el).removeClass("coming-from-top").removeClass("coming-from-bottom");
                    $(".testimonial-slider-opposite .item-right ul li:eq(" + rightItem + ")", self.el).addClass("coming-from-top");
                    $(".testimonial-slider-pagination .pages ul", self.el).css(transform, 'translateY(' + newPageTop + 'px)');
                }
            } else {
                var newLeftVal = height * -1 * (page - 1), newRightVal = -1 * maxHeight + height * (page - 1), newPageTop = pageHeight * -1 * (page - 1);
                if (0 <= page - 1) {
                    $(".testimonial-slider-opposite .item-left ul", self.el).css(transform, 'translateY(' + newLeftVal + 'px)');
                    $(".testimonial-slider-opposite .item-right ul", self.el).css(transform, 'translateY(' + newRightVal + 'px)');
                    self.el.attr("data-page", page - 1);
                    var rightItem = total - 1 - parseInt(self.el.attr("data-page"));
                    $(".testimonial-slider-opposite .item-left ul li", self.el).removeClass("active");
                    $(".testimonial-slider-opposite .item-left ul li:eq(" + self.el.attr("data-page") + ")", self.el).addClass("active");
                    $(".testimonial-slider-opposite .item-left ul li", self.el).removeClass("coming-from-top").removeClass("coming-from-bottom");
                    $(".testimonial-slider-opposite .item-left ul li:eq(" + self.el.attr("data-page") + ")", self.el).addClass("coming-from-top");
                    $(".testimonial-slider-opposite .item-right ul li", self.el).removeClass("active");
                    $(".testimonial-slider-opposite .item-right ul li:eq(" + rightItem + ")", self.el).addClass("active");
                    $(".testimonial-slider-opposite .item-right ul li", self.el).removeClass("coming-from-top").removeClass("coming-from-bottom");
                    $(".testimonial-slider-opposite .item-right ul li:eq(" + rightItem + ")", self.el).addClass("coming-from-bottom");
                    $(".testimonial-slider-pagination .pages ul", self.el).css(transform, 'translateY(' + newPageTop + 'px)');
                }
            }
            $(".testimonial-slider-pagination .pages .active", self.el).text(parseInt(el.attr("data-page")) + 1);
        },
        slide: function() {
            var el = this.el, self = this;
            $(".testimonial-slider-pagination a", el).on('click', function(e) {
                e.preventDefault(0);
                var direction = $(this).attr("class");
                self.slideItem(direction);
            });
            return this;
        }
    };
    $.fn.rellaTestimonialSlider = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new TestimonialSlider(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('.testimonial-slider').rellaTestimonialSlider();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__FillIn';
    var FillIn = function(el, options) {
        return this.init(el, options);
    };
    FillIn.defaults = {
        element: "p",
        duration: .05,
        stagger: .01
    };
    FillIn.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, FillIn.defaults, options);
            return this;
        },
        build: function() {
            this.effect();
            return this;
        },
        effect: function() {
            var self = this, element = this.el.find(this.options.element).addClass('perspective');
            if (!element.length) {
                return;
            }
            var splitText = new SplitText(element, {
                type: "lines,chars"
            }), lines = $(splitText.lines).addClass('line'), startDelay = 0;
            element.addClass('element-original');
            element.wrapAll('<div class="fillin-wrap" />');
            this.el.addClass('splitting-applied');
            function animateLines(el) {
                el.each(function() {
                    var $this = $(this), chars = $this.children('div'), timeline = new TimelineMax(), startDelay = $this.index() / 6;
                    timeline = timeline.staggerTo(chars, self.options.duration, {
                        opacity: 1,
                        delay: startDelay,
                        ease: Expo.easeOut
                    }, self.options.stagger);
                    timeline.restart().pause();
                    var inViewCallback = function(enteries, observer) {
                        enteries.forEach(function(entery) {
                            if (entery.isIntersecting) {
                                timeline.restart().play();
                            } else {
                                timeline.restart().pause();
                            }
                        });
                    };
                    var options = {
                        threshold: 0
                    };
                    var observer = new IntersectionObserver(inViewCallback, options);
                    var observerTarget = element.get(0);
                    observer.observe(observerTarget);
                });
            }
            animateLines(lines);
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(ev) {
                if ($(ev.target.hash).find(self.el).length) {
                    splitText.split();
                    var lines = $(splitText.lines).addClass('line');
                    animateLines(lines);
                }
            });
            return this;
        }
    };
    $.fn.RellaFillIn = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-fillin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new FillIn(el, opts);
            }
        });
    };
    if ($(window).width() >= 992) {
        $(document).ready(function() {
            $('[data-plugin-fillIn]').RellaFillIn();
        });
    }
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__resolve';
    var Resolve = function(el, options) {
        return this.init(el, options);
    };
    Resolve.defaults = {
        seperator: "words",
        start: .12,
        end: .52,
        fixed: 6,
        refreshInterval: 50,
        element: "h2",
        startDelay: 0
    };
    Resolve.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Resolve.defaults, options);
            return this;
        },
        build: function() {
            this.effect();
            this.checkResolve();
            return this;
        },
        effect: function() {
            var self = this, elem, splitText, selector = self.el.find(self.options.element), seperator = self.options.seperator, transitionDelay = Modernizr.prefixedCSS('transition-delay');
            if (!selector.length) {
                return;
            }
            var splitText = new SplitText(selector, {
                type: seperator
            });
            selector.addClass('perspective').children('div').addClass('unit');
            selector.children('div').each(function() {
                var tDelay = (Math.random() * (self.options.end - self.options.start) + self.options.start).toFixed(self.options.fixed);
                $(this).css(transitionDelay, tDelay + "s");
            });
            return self;
        },
        checkResolve: function() {
            var self = this, timeout;
            var inViewCallback = function(enteries, observer) {
                enteries.forEach(function(entery) {
                    if (entery.isIntersecting) {
                        entery.target.classList.add('is-visible');
                    } else {
                        entery.target.classList.remove('is-visible');
                    }
                });
            };
            var options = {
                threshold: 0
            };
            var observer = new IntersectionObserver(inViewCallback, options);
            var observerTarget = this.el.get(0);
            observer.observe(observerTarget);
            return this;
        }
    };
    $.fn.rellaResolve = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName).build();
            } else {
                var pluginOptions = el.data('plugin-resolve-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Resolve(el, opts);
            }
        });
    };
    if ($(window).width() >= 992) {
        $(document).ready(function() {
            $('[data-plugin-resolve]').rellaResolve();
        });
    }
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__TextEffect';
    var TextEffect = function(el, options) {
        return this.init(el, options);
    };
    TextEffect.defaults = {
        seperator: "chars",
        element: "h2",
        autoplay: false,
        delay: 2e3
    };
    TextEffect.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.timeout;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, TextEffect.defaults, options);
            return this;
        },
        build: function() {
            this.hide();
            this.splitString();
            this.onHover();
            return this;
        },
        hide: function() {
            var self = this;
            $(".typed-strings span", $(self.options.element, self.el)).not(":first-child").hide();
        },
        splitString: function() {
            var self = this;
            if (self.options.seperator == "chars") {
                $(".typed-strings span", $(self.options.element, self.el)).each(function() {
                    var element = $(this), string = element.text(), splittedString = string.split("");
                    element.text("");
                    for (var i = 0; i < splittedString.length; i++) {
                        $('<div/>', {
                            text: splittedString[i],
                            css: {
                                display: 'inline',
                                position: 'relative'
                            }
                        }).appendTo(element);
                    }
                });
            }
        },
        effect: function(index) {
            var self = this;
            var selector = $(".typed-strings span", $(self.options.element, self.el)), totalItem = selector.length;
            if (index == totalItem) {
                index = 0;
            }
            $(".typed-strings span", $(self.options.element, self.el)).not(":eq(" + index + ")").hide();
            $(".typed-strings span:eq(" + index + ")", $(self.options.element, self.el)).show();
            var string = $(".typed-strings span:eq(" + index + ")", self.el);
            $(".typed-strings span:eq(" + index + ") div", self.el).each(function() {
                $(this).css({
                    left: "-5px",
                    opacity: 0
                });
                $(this).stop().animate({
                    left: 0,
                    opacity: 1
                }, 500);
            });
            self.timeout = setTimeout(function() {
                self.effect(index + 1);
            }, self.options.delay);
        },
        onHover: function() {
            var self = this;
            if (self.options.autoplay) {
                self.effect(0);
            } else {
                $(self.el).hover(function() {
                    clearTimeout(self.timeout);
                    self.effect(0);
                }, function() {
                    clearTimeout(self.timeout);
                });
            }
        }
    };
    $.fn.rellaTextEffect = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName).build();
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new TextEffect(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-texteffect]').rellaTextEffect();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__TextSlide';
    var TextSlide = function(el, options) {
        return this.init(el, options);
    };
    TextSlide.defaults = {
        element: "h2",
        autoplay: true,
        delay: 2e3
    };
    TextSlide.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.timeoutTextSlide;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, TextSlide.defaults, options);
            return this;
        },
        build: function() {
            this.order();
            this.onHover();
            return this;
        },
        order: function() {
            var self = this;
            var height = $(self.options.element, self.el).height(), i = 0, transform = Modernizr.prefixedCSS('transform');
            self.el.addClass('text-slide-activated');
            $(".typed-keywords span", $(self.options.element, self.el)).each(function() {
                if (i == 0) {
                    $(this).addClass('text-slide-in').removeClass('text-slide-down text-slide-up');
                } else {
                    $(this).addClass('text-slide-down').removeClass('text-slide-in text-slide-up');
                }
                i++;
            });
        },
        effect: function() {
            var self = this;
            var selector = $(".typed-keywords span", $(self.options.element, self.el)), totalItem = selector.length, height = $(".typed-keywords", self.el).height(), transform = Modernizr.prefixedCSS('transform'), prevIndex = $(".typed-keywords span.active", self.el).index(), activeItem = $(".typed-keywords span", self.el).eq(index), prevItem = $(".typed-keywords span", self.el).eq(prevIndex), index;
            if (prevIndex == totalItem - 1) {
                index = 0;
            } else {
                index = prevIndex + 1;
            }
            activeItem = $(".typed-keywords span:eq(" + index + ")", self.el), prevItem = $(".typed-keywords span:eq(" + prevIndex + ")", self.el);
            $(".typed-keywords", self.el).css({
                width: activeItem.width()
            });
            selector.not(":eq(" + index + ")").not(":eq(" + prevIndex + ")").css({
                width: ''
            }).addClass('text-slide-down').removeClass('text-slide-in text-slide-up');
            prevItem.addClass('text-slide-up').removeClass('text-slide-in text-slide-down');
            activeItem.addClass('text-slide-in').removeClass('text-slide-up text-slide-down');
            $(".typed-keywords span", self.el).removeClass("active");
            activeItem.addClass("active");
            self.timeoutTextSlide = setTimeout(function() {
                self.effect(index + 1);
            }, self.options.delay);
        },
        onHover: function() {
            var self = this;
            if (self.options.autoplay) {
                var inViewCallback = function(enteries, observer) {
                    enteries.forEach(function(entery) {
                        if (entery.isIntersecting) {
                            clearTimeout(self.timeoutTextSlide);
                            self.effect();
                        } else {
                            clearTimeout(self.timeoutTextSlide);
                        }
                    });
                };
                var options = {
                    threshold: .25
                };
                var observer = new IntersectionObserver(inViewCallback, options);
                var observerTarget = self.el.get(0);
                observer.observe(observerTarget);
            } else {
                $(self.el).hover(function() {
                    clearTimeout(self.timeoutTextSlide);
                    self.effect();
                }, function() {
                    clearTimeout(self.timeoutTextSlide);
                });
            }
        }
    };
    $.fn.rellaTextSlide = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName).build();
            } else {
                var pluginOptions = el.data('plugin-textslide-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new TextSlide(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-textslide]').rellaTextSlide();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__svg-text';
    var SVGText = function(el, options) {
        return this.init(el, options);
    };
    SVGText.defaults = {
        bgColor: '#fff'
    };
    SVGText.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).setID().build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, SVGText.defaults, options);
            return this;
        },
        setID: function() {
            var element = this.el;
            element.attr('id', 'svg-text-' + Math.floor(Math.random() * 1e4));
            return this;
        },
        build: function() {
            var element = this.el, self = this;
            var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), svgNS = svgEl.namespaceURI, defs = document.createElementNS(svgNS, 'defs'), mask = document.createElementNS(svgNS, 'mask'), textMask = document.createElementNS(svgNS, 'text'), textMain = document.createElementNS(svgNS, 'text'), tspan = document.createElementNS(svgNS, 'tspan'), rectMask = document.createElementNS(svgNS, 'rect'), rectMain = document.createElementNS(svgNS, 'rect'), headingText = element.prev().children('h1'), headingTextSpan = headingText.children('span'), headingFontSize = headingText.css('font-size'), thetext = document.createTextNode(headingText.text());
            svgEl.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svgEl.setAttribute('version', 1.1);
            svgEl.setAttribute('id', element.attr('id'));
            rectMask.setAttributeNS(null, 'width', '100%');
            rectMask.setAttributeNS(null, 'height', '100%');
            rectMask.setAttributeNS(null, 'fill', '#fff');
            textMask.setAttributeNS(null, 'font-family', $('h1').first().css('font-family') + ', Helvetica, Arial, sans-serif');
            textMask.setAttributeNS(null, 'x', 0);
            textMask.setAttributeNS(null, 'y', 0);
            textMask.setAttributeNS(null, 'text-anchor', 'middle');
            textMask.setAttributeNS(null, 'anchor', 'middle');
            tspan.setAttributeNS(null, 'x', '50%');
            tspan.setAttributeNS(null, 'y', '70%');
            tspan.appendChild(thetext);
            textMask.appendChild(tspan);
            mask.setAttribute('id', 'mask-' + element.attr('id'));
            mask.appendChild(rectMask);
            mask.appendChild(textMask);
            defs.appendChild(mask);
            rectMain.setAttributeNS(null, 'width', '100%');
            rectMain.setAttributeNS(null, 'height', '100%');
            rectMain.setAttributeNS(null, 'fill', self.options.bgColor);
            rectMain.setAttributeNS(null, 'mask', 'url(#mask-' + element.attr('id') + ')');
            svgEl.appendChild(defs);
            svgEl.appendChild(rectMain);
            $(svgEl).appendTo(element);
            var setSizes = function() {
                headingFontSize = headingText.css('font-size');
                textMask.setAttributeNS(null, 'x', 0);
                textMask.setAttributeNS(null, 'y', 0);
                svgEl.setAttributeNS(null, 'width', headingTextSpan.outerWidth());
                svgEl.setAttributeNS(null, 'height', headingTextSpan.outerHeight());
                var offsetDiff = $(svgEl).offset().top - $(textMask).offset().top;
                textMask.setAttributeNS(null, 'x', '50%');
                textMask.setAttributeNS(null, 'y', '45%');
                textMask.setAttributeNS(null, 'font-size', headingFontSize);
                element.addClass('is-ready');
            };
            setSizes();
            $(window).on('resize', function() {
                setSizes();
            });
            return this;
        }
    };
    $.fn.RellaSVGText = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('svg-text-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new SVGText(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-svg-text]').RellaSVGText();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__ChangeBGonScroll';
    var ChangeBGonScroll = function(el, options) {
        return this.init(el, options);
    };
    ChangeBGonScroll.defaults = {
        targetBG: '#fff'
    };
    ChangeBGonScroll.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, ChangeBGonScroll.defaults, options);
            return this;
        },
        getContrastYIQ: function(hexcolor) {
            var r = parseInt(hexcolor.substr(0, 2), 16);
            var g = parseInt(hexcolor.substr(2, 2), 16);
            var b = parseInt(hexcolor.substr(4, 2), 16);
            var yiq = (r * 299 + g * 587 + b * 114) / 1e3;
            return yiq >= 128 ? 'black' : 'white';
        },
        build: function() {
            var self = this, el = self.el, initBG = el.css('background-color'), targetBG = self.options.targetBG, contrastColor = this.getContrastYIQ(initBG), textElements = $('h1, h2, h3, h4, h5, h6, p, a, span');
            $('section, .vc_row').css({
                background: initBG
            });
            el.find('h1, h2, h3, h4, h5, h6, p, a, span').css({});
            if ($(window).width() >= 992) {
                var controller = new ScrollMagic.Controller();
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#wrap',
                    duration: '25%',
                    triggerHook: 0
                });
                scene.setTween(TweenMax.to($('section'), 1, {
                    backgroundColor: targetBG
                }));
                scene.addTo(controller).reverse(true).addIndicators();
            }
        }
    };
    $.fn.RellaChangeBGonScroll = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new ChangeBGonScroll(el, opts);
            }
        });
    };
    $(document).ready(function() {});
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__progressbar';
    var Progressbar = function(el, options) {
        return this.init(el, options);
    };
    Progressbar.defaults = {
        percent: 100
    };
    Progressbar.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Progressbar.defaults, options);
            return this;
        },
        build: function() {
            if (this.el.hasClass('progressbar')) {
                this.bar(false);
            } else if (this.el.hasClass('vertical-progressbar')) {
                this.bar(true);
            } else if (this.el.hasClass('progressbar-circle')) {
                this.circular();
            }
            return this;
        },
        bar: function(vertical) {
            var el = this.el, opts = this.options;
            if (opts.percent > 100) {
                opts.percent = 100;
            }
            var bar = $('<div class="progressbar-bar"><span></span></div>'), value = $('<span class="progressbar-value"><span>' + opts.percent + '</span>%</span>');
            el.append(bar).append(value);
            value.find('span').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1e3,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            if (vertical) {
                el.find('.progressbar-bar > span, .progressbar-value').animate({
                    height: opts.percent + "%"
                }, {
                    duration: 1e3,
                    easing: 'swing'
                });
            } else {
                el.find('.progressbar-bar > span, .progressbar-value, .polygon-container').animate({
                    width: opts.percent + "%"
                }, {
                    duration: 1e3,
                    easing: 'swing'
                });
            }
        },
        circular: function() {}
    };
    $.fn.rellaProgressbar = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Progressbar(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-plugin-progressbar]').rellaProgressbar();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__CircleProgressbar';
    var CircleProgressbar = function(el, options) {
        return this.init(el, options);
    };
    CircleProgressbar.defaults = {};
    CircleProgressbar.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, CircleProgressbar.defaults, options);
            return this;
        },
        build: function() {
            this.progressbarCircle();
        },
        progressbarCircle: function() {
            var el = $('.progressbar-circle');
            if (!el.length) {
                return;
            }
            el.each(function() {
                var $this = $(this), inner = $this.find('.progressbar-inner'), percentage = $this.attr('data-percentage') + '%', circleSize = $this.parent().width() > 0 ? $this.parent().width() - 20 : 150;
                var progress = inner.circleProgress({
                    value: 0,
                    size: circleSize,
                    thickness: $this.data('thickness'),
                    startAngle: Math.PI * 3.501411705537642,
                    emptyFill: $this.data('empty-fill'),
                    animation: {
                        duration: 1100
                    },
                    reverse: $this.data('reverse') === true ? true : false,
                    fill: {
                        gradient: [ $this.data('start-color'), $this.data('end-color') ],
                        gradientAngle: Math.PI * 3.501411705537642
                    }
                });
                progress.on('circle-animation-progress', function() {});
                var inViewCallback = function(enteries, observer) {
                    enteries.forEach(function(entery) {
                        if (entery.isIntersecting && !$this.hasClass('animate-started')) {
                            inner.circleProgress({
                                value: parseInt(percentage, 10) / 100
                            });
                            $this.addClass('animate-started');
                        }
                    });
                };
                var options = {
                    threshold: .5
                };
                var observer = new IntersectionObserver(inViewCallback, options);
                var observerTarget = $this.get(0);
                observer.observe(observerTarget);
            });
            $(window).on('resize', function() {
                el.find('.progressbar-inner').circleProgress('redraw');
            });
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function() {
                el.find('.progressbar-inner').circleProgress({
                    size: el.parent().width()
                });
                el.find('.progressbar-inner').circleProgress('redraw');
            });
        }
    };
    $.fn.RellaCircleProgressbar = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new CircleProgressbar(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaCircleProgressbar();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__EnableJqueryUI';
    var EnableJqueryUI = function(el, options) {
        return this.init(el, options);
    };
    EnableJqueryUI.defaults = {};
    EnableJqueryUI.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build().enableRangeSlider();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, EnableJqueryUI.defaults, options);
            return this;
        },
        build: function() {
            if ($('.select-dropdown').length) {
                $('.select-dropdown').selectmenu();
            }
            if ($('.datepicker').length) {
                $('.datepicker').datepicker();
            }
            if ($('input.spinner').length) {
                $('input.spinner').spinner({
                    spin: function() {
                        $(document).trigger('spinnerAction');
                    }
                });
            }
            return this;
        },
        enableRangeSlider: function() {
            var element = $('.rangeslider');
            if (!element.length || typeof slider == 'undefined' && !$.fn.slider) {
                return;
            }
            element.each(function() {
                var $this = $(this), min = $this.attr("data-min") ? $this.attr("data-min") : 0, max = $this.attr("data-max") ? $this.attr("data-max") : 100, style;
                var setMinMaxVal = function(min, max) {
                    if ($(".min-val-tooltip")) {
                        style = $($this.find(".ui-slider-handle")[0]).attr("style");
                        $(".min-val-tooltip").html(min).attr("style", style);
                    }
                    if ($(".max-val-tooltip")) {
                        style = $($this.find(".ui-slider-handle")[1]).attr("style");
                        $(".max-val-tooltip").html(max).attr("style", style);
                    }
                    if ($this.attr("data-min-val-return-to")) {
                        $($this.attr("data-min-val-return-to")).val(min);
                    }
                    if ($this.attr("data-max-val-return-to")) {
                        $($this.attr("data-max-val-return-to")).val(max);
                    }
                };
                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [ min, max ],
                    change: function(event, ui) {
                        setMinMaxVal(ui.values[0], ui.values[1]);
                    },
                    slide: function(event, ui) {
                        setMinMaxVal(ui.values[0], ui.values[1]);
                    }
                });
                setMinMaxVal(min, max);
            });
            return this;
        }
    };
    $.fn.RellaEnableJqueryUI = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new EnableJqueryUI(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaEnableJqueryUI();
    });
    $(document).ajaxComplete(function(e) {
        var quickViewModal = $('#yith-quick-view-modal');
        if (quickViewModal.length && quickViewModal.hasClass('open') && $('input.spinner', quickViewModal).length) {
            $('input.spinner').spinner({
                spin: function() {
                    $(document).trigger('spinnerAction');
                }
            });
        }
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__InputIcon';
    var InputIcon = function(el, options) {
        return this.init(el, options);
    };
    InputIcon.defaults = {};
    InputIcon.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, InputIcon.defaults, options);
            return this;
        },
        build: function() {
            var el = $('[data-input-icon]');
            if (!el.length) {
                return;
            }
            $('button.input-generated-button').remove();
            el.each(function(index) {
                var $this = $(this), val = $this.val(), classes = $this.attr('class'), icon = $this.data('input-icon');
                $this.after('<button class=" ' + classes + ' input-generated-button"><span>' + val + '<i class=" ' + icon + ' "></i></span></button>');
                $this.hide();
                if ($this.attr('disabled') == 'disabled') {
                    $this.parent().find('button.input-generated-button').attr('disabled', 'disabled');
                }
                $this.parent().find('button').on('click', function(e) {
                    e.preventDefault();
                    $this.triggerHandler('click');
                });
            });
        }
    };
    $.fn.RellaInputIcon = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new InputIcon(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaInputIcon();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__scroll_animation';
    var ScrollAnimation = function(el, options) {
        return this.init(el, options);
    };
    ScrollAnimation.defaults = {
        seperator: ".row",
        animation: "fadeInDown",
        bound: 35
    };
    ScrollAnimation.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, ScrollAnimation.defaults, options);
            return this;
        },
        build: function() {
            this.setId();
            this.scrollClick();
            this.paginateHeight();
            this.paginationSlide();
            this.onResizeFunc();
            this.onResize();
        },
        paginationSlide: function(id) {
            var self = this, totalItem = $(self.options.seperator, self.el).length, totalHeight = $(self.options.seperator + '.in', self.el).height(), pageButtons = $('.page-buttons', self.el), paginationHeight = $(".scrollable-pagination", self.el).height(), netHeight = totalHeight - paginationHeight, pageHeight = parseInt(netHeight / totalItem, 10), paginationTop = (id - 1) * pageHeight, bound = self.options.bound;
            pageButtons.height(totalHeight);
            $(".scrollable-pagination", self.el).css("top", paginationTop + "px");
            $(".bar.before", self.el).css("height", paginationTop + bound);
            $(".bar.after", self.el).css("height", netHeight - paginationTop - bound);
        },
        paginateHeight: function() {
            var self = this, totalHeight = $(self.options.seperator + '.in', self.el).height(), pageButtons = $('.page-buttons', self.el), pagination = $(".scrollable-pagination", self.el), paginationHeight = pagination.height(), netHeight = totalHeight - paginationHeight + 25, bound = self.options.bound, dragTop = pagination.position().top, totalHeight = parseInt($(".page-buttons", self.el).css("height")), netHeight = totalHeight - paginationHeight;
            pageButtons.height(totalHeight);
            $(".bar.before", self.el).css("height", dragTop + bound);
            $(".bar.after", self.el).css("height", netHeight - dragTop - bound);
        },
        onResizeFunc: function() {
            var self = this;
            self.paginateHeight();
            var id = $(self.options.seperator + ".active", self.el).attr("data-id");
            self.paginationSlide(id);
        },
        onResize: function() {
            var self = this;
            $(window).on("load resize", function() {
                setTimeout(function() {
                    self.onResizeFunc();
                }, 250);
            });
        },
        setId: function() {
            var self = this;
            var id = 0;
            self.el.attr("data-id", 1);
            $(self.options.seperator + "[data-id=1]", self.el).addClass("active");
            TweenMax.fromTo($(self.options.seperator + "[data-id=1]", self.el), .2, {
                y: 10,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            });
            $(self.options.seperator, self.el).each(function() {
                id++;
                $(this).attr("data-id", id);
                if (id != 1) {
                    $(this).addClass("non").removeClass('in');
                }
            });
            $(".all", self.el).text(id);
        },
        completeFunc: function(notSelectorId, selectorId, selectorCols) {
            var self = this;
            notSelectorId.removeClass("active in").addClass("non");
            selectorId.addClass("active in").removeClass("non");
            selectorId.addClass("in");
            TweenMax.staggerFromTo(selectorCols, .6, {
                y: '30px',
                opacity: 0
            }, {
                y: '0',
                opacity: 1,
                ease: Expo.easeOut
            }, .15);
            $(".slider-3d", selectorId).RellaCarousel3d();
            self.el.find('.page-buttons').removeClass('scrolling');
            self.onResizeFunc();
            self.onResize();
        },
        changeRow: function(id) {
            var self = this, selectorId = $(self.options.seperator + "[data-id=" + id + "]", self.el), notSelectorId = $(self.options.seperator + ".in", self.el), notSelectorCols = $("[class*=col-]", $(self.options.seperator + ".active", self.el)), selectorCols = $(" [class*=col-]", selectorId), transitionTime = parseFloat($(self.options.seperator, self.el).css("transition-duration"));
            notSelectorId.removeClass("in active");
            self.el.find('.page-buttons').addClass('scrolling animations-disabled');
            TweenMax.staggerFromTo(notSelectorCols, .6, {
                y: '0',
                opacity: 1
            }, {
                y: '30px',
                opacity: 0,
                ease: Expo.easeInOut
            }, .15, self.completeFunc(notSelectorId, selectorId, selectorCols));
        },
        scrollClick: function() {
            var self = this, totalItem = parseInt($(self.options.seperator, self.el).length);
            $(".scrollable-pagination a", self.el).on('click', function(e) {
                e.preventDefault();
                var direction = $(this).attr("class");
                var id = parseInt(self.el.attr("data-id"));
                if (direction == "next") {
                    if (id == totalItem) {
                        self.changeRow(1);
                        self.el.attr("data-id", 1);
                        $(".scrollable-pagination .active", self.el).text(1);
                        self.paginationSlide(1);
                    } else {
                        self.changeRow(id + 1);
                        self.el.attr("data-id", id + 1);
                        $(".scrollable-pagination .active", self.el).text(id + 1);
                        self.paginationSlide(id + 1);
                    }
                } else {
                    if (id == 1) {
                        self.changeRow(totalItem);
                        self.el.attr("data-id", totalItem);
                        $(".scrollable-pagination .active", self.el).text(totalItem);
                        self.paginationSlide(totalItem);
                    } else {
                        self.changeRow(id - 1);
                        self.el.attr("data-id", id - 1);
                        $(".scrollable-pagination .active", self.el).text(id - 1);
                        self.paginationSlide(id - 1);
                    }
                }
            });
        },
        paginationDrag: function() {}
    };
    $.fn.rellaScrollAnimation = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new ScrollAnimation(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('[data-plugin-scroll-animation]').rellaScrollAnimation();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__HeightToWidth';
    var HeightToWidth = function(el, options) {
        return this.init(el, options);
    };
    HeightToWidth.defaults = {};
    HeightToWidth.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, HeightToWidth.defaults, options);
            return this;
        },
        build: function() {
            var el = this.el;
            if (!el.length) {
                return;
            }
            el.each(function() {
                var $this = $(this), target = $this.attr('data-heighttowidth-target');
                $(window).on('resize', function() {
                    $this.find(target).css('width', '');
                    $this.find(target).width($this.height());
                });
                $(window).triggerHandler('resize');
                $this.imagesLoaded(function() {
                    $this.find(target).width($this.height());
                    $this.addClass('width-applied');
                });
            });
        }
    };
    $.fn.RellaHeightToWidth = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new HeightToWidth(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-heighttowidth]').RellaHeightToWidth();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__ElevateZoom';
    var ElevateZoom = function(el, options) {
        return this.init(el, options);
    };
    ElevateZoom.defaults = {};
    ElevateZoom.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, ElevateZoom.defaults, options);
            return this;
        },
        build: function() {
            var el = $(this.el);
            if (!el.length) {
                el.elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair"
                });
            }
        }
    };
    $.fn.RellaElevateZoom = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new ElevateZoom(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.images .carousel-items img').RellaElevateZoom();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__smoothMouseWheel';
    var SmoothMouseWheel = function(el, options) {
        return this.init(el, options);
    };
    SmoothMouseWheel.defaults = {};
    SmoothMouseWheel.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, SmoothMouseWheel.defaults, options);
            return this;
        },
        build: function() {
            var self = this, container, running = false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop = 0, minScrollTop, direction, onRenderCallback = null, fricton = .92, vy = 0, stepAmt = 2, minMovement = .12, ts = .11;
            var updateScrollTarget = function(amt) {
                targetY += amt;
                vy += (targetY - oldY) * stepAmt;
                oldY = targetY;
            };
            var render = function() {
                if (vy < -minMovement || vy > minMovement) {
                    currentY = currentY + vy;
                    if (currentY > maxScrollTop) {
                        currentY = vy = 0;
                    } else if (currentY < minScrollTop) {
                        vy = 0;
                        currentY = minScrollTop;
                    }
                    container.scrollTop(-currentY);
                    vy *= fricton;
                    if (onRenderCallback) {
                        onRenderCallback();
                    }
                }
            };
            var animateLoop = function() {
                if (!running) return;
                requestAnimFrame(animateLoop);
                render();
            };
            var onWheel = function(e) {
                e.preventDefault();
                var evt = e.originalEvent;
                var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
                var dir = delta < 0 ? -1 : 1;
                if (dir != direction) {
                    vy = 0;
                    direction = dir;
                }
                currentY = -container.scrollTop();
                updateScrollTarget(delta);
            };
            window.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                    window.setTimeout(callback, 1e3 / 60);
                };
            }();
            var normalizeWheelDelta = function() {
                'use strict';
                var PIXEL_STEP = 25;
                var LINE_HEIGHT = 50;
                var PAGE_HEIGHT = document.innerHeight;
                function normalizeWheel(event) {
                    var sX = 0, sY = 0, pX = 0, pY = 0;
                    if ('detail' in event) {
                        sY = event.detail;
                    }
                    if ('wheelDelta' in event) {
                        sY = -event.wheelDelta / 120;
                    }
                    if ('wheelDeltaY' in event) {
                        sY = -event.wheelDeltaY / 120;
                    }
                    if ('wheelDeltaX' in event) {
                        sX = -event.wheelDeltaX / 120;
                    }
                    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                        sX = sY;
                        sY = 0;
                    }
                    pX = sX * PIXEL_STEP;
                    pY = sY * PIXEL_STEP;
                    if ('deltaY' in event) {
                        pY = event.deltaY;
                    }
                    if ('deltaX' in event) {
                        pX = event.deltaX;
                    }
                    if ((pX || pY) && event.deltaMode) {
                        if (event.deltaMode == 1) {
                            pX *= LINE_HEIGHT;
                            pY *= LINE_HEIGHT;
                        } else {
                            pX *= PAGE_HEIGHT;
                            pY *= PAGE_HEIGHT;
                        }
                    }
                    if (pX && !sX) {
                        sX = pX < 1 ? -1 : 1;
                    }
                    if (pY && !sY) {
                        sY = pY < 1 ? -1 : 1;
                    }
                    return {
                        spinX: sX,
                        spinY: sY,
                        pixelX: pX,
                        pixelY: pY
                    };
                }
                normalizeWheel.getEventType = function() {
                    return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
                };
            }();
            $.fn.smoothWheel = function() {
                var options = jQuery.extend({}, arguments[0]);
                return this.each(function(index, elm) {
                    if (!('ontouchstart' in window)) {
                        container = $(this);
                        container.on("mousewheel", onWheel);
                        container.on("DOMMouseScroll", onWheel);
                        targetY = oldY = container.scrollTop();
                        currentY = -targetY;
                        minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                        if (options.onRender) {
                            onRenderCallback = options.onRender;
                        }
                        if (options.remove) {
                            console.log('Mousewheel Removed');
                            running = false;
                            container.unbind("mousewheel", onWheel);
                            container.unbind("DOMMouseScroll", onWheel);
                        } else if (!running) {
                            running = true;
                            animateLoop();
                        }
                    }
                });
            };
            var isMac = navigator.userAgent.indexOf('Mac OS X') != -1;
            var isFirefox = navigator.userAgent.indexOf('Firefox') != -1;
            if (!isMac && !isFirefox) {
                $(document).smoothWheel();
            }
            return this;
        }
    };
    $.fn.rellaSmoothMouseWheel = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new SmoothMouseWheel(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $("body.smooth-wheel-enabled").rellaSmoothMouseWheel();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__FooterFixed';
    var FooterFixed = function(el, options) {
        return this.init(el, options);
    };
    FooterFixed.defaults = {};
    FooterFixed.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, FooterFixed.defaults, options);
            return this;
        },
        build: function() {
            var element = this.el, mainContents = $('#content'), footerHeight = element.outerHeight() - 1;
            element.addClass('is-fixed');
            mainContents.css({
                marginBottom: footerHeight
            });
            $(window).on('resize', function() {
                mainContents.css('marginBottom', 0);
                mainContents.css('marginBottom', footerHeight);
            });
        }
    };
    $.fn.RellaFooterFixed = function(settings) {
        return this.map(function() {
            var el = $(this);
            el.imagesLoaded(function() {
                if (el.data(instanceName)) {
                    return el.data(instanceName);
                } else {
                    var pluginOptions = el.data('plugin-options'), opts;
                    if (pluginOptions) {
                        opts = $.extend(true, {}, settings, pluginOptions);
                    }
                    return new FooterFixed(el, opts);
                }
            });
        });
    };
    $(document).ready(function() {
        $('footer[data-fixed]').RellaFooterFixed();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if (window.xMode) {
        return;
    }
    var instanceName = '__Hover3d';
    var Hover3d = function(el, options) {
        return this.init(el, options);
    };
    Hover3d.defaults = {};
    Hover3d.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Hover3d.defaults, options);
            return this;
        },
        build: function() {
            'use strict';
            window.ATicon = {};
            window.ATicon.getInstance = function(jQueryDOMElement) {
                jQueryDOMElement.imagesLoaded(function() {
                    if (jQueryDOMElement === null) throw new Error("Passed in element doesn't exist in DOM");
                    return new ATicon(jQueryDOMElement);
                });
            };
            function ATicon(jQueryDomElement) {
                this.$icon = jQueryDomElement;
                if (!this.$icon.length) {
                    return;
                }
                this.perspectiveAmount = 1200;
                this.offset = this.$icon.offset();
                this.width = this.$icon.width();
                this.height = this.$icon.height();
                this.maxRotation = 8;
                this.maxTranslation = 4;
                var that = this;
                this.$icon.on('mousemove', function(e) {
                    that.events.hover.call(that, e);
                }).on('mouseleave', function(e) {
                    that.events.leave.call(that, e);
                });
            }
            ATicon.prototype = {
                appleTvAnimate: function(element, config) {
                    var rotate = "rotateX(" + config.xRotationPercentage * config.maxRotationX + "deg)" + " rotateY(" + config.yRotationPercentage * config.maxRotationY + "deg)";
                    var translate = " translate3d(" + config.xTranslationPercentage * config.maxTranslationX + "px," + config.yTranslationPercentage * config.maxTranslationY + "px, 0px)";
                    TweenMax.to(element, .3, {
                        rotationX: -config.xRotationPercentage * config.maxRotationX,
                        rotationY: -config.yRotationPercentage * config.maxRotationY,
                        x: -config.xTranslationPercentage * config.maxTranslationX,
                        y: -config.yTranslationPercentage * config.maxTranslationY,
                        ease: Linear.easeNone,
                        perspective: this.perspectiveAmount
                    });
                }
            };
            ATicon.prototype.events = {
                hover: function(e) {
                    var that = this;
                    var mouseOffsetInside = {
                        x: e.pageX - this.offset.left,
                        y: e.pageY - this.offset.top
                    };
                    that.$icon.addClass('mouse-in');
                    function calculateRotationPercentage(offset, dimension) {
                        return -2 / dimension * offset + 1;
                    }
                    function calculateTranslationPercentage(offset, dimension) {
                        return -2 / dimension * offset + 1;
                    }
                    var xRotationPercentage = calculateRotationPercentage(mouseOffsetInside.y, this.height);
                    var yRotationPercentage = calculateRotationPercentage(mouseOffsetInside.x, this.width) * -1;
                    var xTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.x, this.width);
                    var yTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.y, this.height);
                    this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                        var stackingFactor = $(element).attr('data-stacking-factor');
                        that.appleTvAnimate($(element), {
                            maxTranslationX: that.maxTranslation * stackingFactor,
                            maxTranslationY: that.maxTranslation * stackingFactor,
                            maxRotationX: that.maxRotation * stackingFactor,
                            maxRotationY: that.maxRotation * stackingFactor,
                            xRotationPercentage: xRotationPercentage,
                            yRotationPercentage: yRotationPercentage,
                            xTranslationPercentage: xTranslationPercentage,
                            yTranslationPercentage: yTranslationPercentage
                        });
                    });
                },
                leave: function(e) {
                    var that = this;
                    that.$icon.removeClass('mouse-in');
                    this.$icon.find('[data-stacking-factor]').each(function(index, element) {
                        that.appleTvAnimate($(element), {
                            maxTranslationX: 0,
                            maxTranslationY: 0,
                            maxRotationX: 0,
                            maxRotationY: 0,
                            xRotationPercentage: 0,
                            yRotationPercentage: 0,
                            xTranslationPercentage: 0,
                            yTranslationPercentage: 0
                        });
                    });
                }
            };
        }
    };
    $.fn.RellaHover3d = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-hover3d-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Hover3d(el, opts);
            }
        });
    };
    if ($(window).width() >= 992) {
        $(window).on('load resize', function() {
            $(document).RellaHover3d();
            $('[data-hover3d]').each(function() {
                ATicon.getInstance($(this));
            });
        });
    }
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__ProgressiveLoad';
    var ProgressiveLoad = function(el, options) {
        return this.init(el, options);
    };
    ProgressiveLoad.defaults = {};
    ProgressiveLoad.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, ProgressiveLoad.defaults, options);
            return this;
        },
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        build: function() {
            var self = this, progressiveImage = self.el;
            if (typeof progressively === typeof undefined) {
                return;
            }
            setAspectRatio();
            vcCares();
            function setAspectRatio(el) {
                progressiveImage.each(function() {
                    var $this = $(this), elementRowParent = $this.closest('.row');
                    var onImagesLoad = self.debounce(function() {
                        $.fn.matchHeight._update();
                    }, 1e3);
                    $this.imagesLoaded(function() {
                        if ($this.closest('[data-mh]').length) {
                            onImagesLoad();
                        }
                    });
                    if (typeof elementRowParent !== typeof undefined || elementRowParent !== null) {
                        elementRowParent.imagesLoaded(function() {
                            if (elementRowParent.data('isotope')) {
                                elementRowParent.isotope('layout');
                            }
                            if ($('[data-mh]').length) {
                                $.fn.matchHeight._afterUpdate = function(event, groups) {
                                    if (elementRowParent.data('isotope')) {
                                        elementRowParent.isotope('layout');
                                    }
                                };
                            }
                        });
                    }
                });
            }
            function vcCares() {
                $(progressiveImage).each(function() {
                    var $this = $(this), vcParent = $this.closest('.wpb_single_image').addClass('wpb_single_image_progressive');
                    if (vcParent.length) {
                        if (vcParent.is(':only-child') || vcParent.width() === vcParent.parent().width()) {
                            vcParent.find('.vc_figure').css('display', 'block');
                            vcParent.find('.vc_single_image-wrapper').css('display', 'block');
                            $(this).addClass('width-auto');
                            setAspectRatio();
                        }
                    }
                });
            }
            var progressive = progressively.init({
                throttle: 50,
                delay: 30,
                onLoad: function(el) {
                    $(el).parent().addClass('progressive-image--is-loaded');
                    if ($(el).closest('.portfolio-main-image').length) {
                        $(el).closest('.portfolio-main-image').addClass('progressive-image--is-loaded');
                    }
                    if ($(el).closest('.carousel-items').length && $(el).closest('.carousel-items').data('flickity')) {
                        $(el).closest('.carousel-items').flickity('resize');
                    }
                    setTimeout(function() {
                        if ($(el).closest('[data-plugin-masonry]').length && $(el).closest('[data-plugin-masonry]').data('isotope')) {
                            $(el).closest('[data-plugin-masonry]').isotope('layout');
                        }
                    }, 300);
                }
            });
            $('body').addClass('progressive-load--activated');
            $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function() {});
            $(document).on('shown.bs.collapse', '.collapse', function() {});
        }
    };
    $.fn.RellaProgressiveLoad = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new ProgressiveLoad(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.progressive__img').RellaProgressiveLoad();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__MobileNav';
    var MobileNav = function(el, options) {
        return this.init(el, options);
    };
    MobileNav.defaults = {};
    MobileNav.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, MobileNav.defaults, options);
            return this;
        },
        build: function() {
            var mainHeader = $('.main-header'), mainNav = mainHeader.find('.main-nav'), submenu = mainNav.find('.nav-item-children');
            if ($(window).width() <= 991) {
                mainHeader.addClass('mobile').removeClass('desktop');
                submenu.parent().off('mouseenter mouseleave');
                submenu.css({
                    overflow: '',
                    visibility: '',
                    opacity: '',
                    height: '',
                    transform: ''
                });
            } else {
                mainHeader.removeClass('mobile').addClass('desktop');
            }
        }
    };
    $.fn.RellaMobileNav = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new MobileNav(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaMobileNav();
    });
    $(window).on('resize', function() {
        $(document).RellaMobileNav();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__Header';
    var Header = function(el, options) {
        return this.init(el, options);
    };
    Header.defaults = {};
    Header.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, Header.defaults, options);
            return this;
        },
        build: function() {
            this.resizeWindow();
            this.headerModules();
            this.megamenu();
            this.desktopHeaderSubmenu();
            this.mobileHeaderSubmenuInit();
            this.headerSticky();
        },
        headerModules: function() {
            var self = this, mainHeader = $('.main-header'), mainBar = mainHeader.find('.main-bar'), secondaryBar = mainHeader.find('.secondary-bar'), module = mainHeader.find('.header-module'), navbarCollapse = mainHeader.find('.navbar-collapse'), transformPrefixed = Modernizr.prefixedCSS('transform'), navToggle = mainHeader.find('.navbar-toggle').not('.module-toggle'), navTopBar = $('<div class="nav-top-bar"></div>'), mobileModules = $('.mobile-header-container'), ghostSearhSelectors = [], isRTL = $('html').attr('dir') == 'rtl';
            if (typeof TimelineMax != 'undefined' || typeof TimelineMax == 'function') {
                var itemsTimeline = new TimelineMax({
                    callbackScope: module
                }), timelineTotalDuration = 0;
            }
            if (navToggle.length) {
                navToggle.each(function() {
                    var $this = $(this).wrap('<div class="header-module module-nav-trigger hidden-lg hidden-md d-lg-none d-xl-none"></div>'), toggleParent = $this.parents('.main-bar') || $this.parents('.secondary-bar');
                    $this.attr('data-target', '#mobile-nav');
                    if (!toggleParent.children('.header-module.module-nav-trigger.hidden-lg.hidden-md').length) {
                        $this.parent().appendTo(toggleParent);
                    }
                });
            }
            mainBar.each(function() {
                var $this = $(this), headerModule = $this.find('.header-module');
                $this.find('.navbar-header').prependTo($this);
            });
            $('.module-fullheight-side').appendTo('body');
            if (!$('body').children('.main-header.clone').length) {
                var mainHeaderClone = $('.main-header').clone(true).addClass('clone'), mainNav = $('.main-header').find('.main-nav'), navbarCollapseClone = mainNav.parent('.navbar-collapse').clone(true).attr('aria-expanded', 'false'), mobileMainNav = $('<ul class="main-nav"></ul>');
                mobileMainNav.append(mainNav.children('li').clone(true));
                navbarCollapseClone.attr('id', 'mobile-nav');
                navbarCollapseClone.find('.main-nav').remove();
                mainHeaderClone.children().remove();
                mobileMainNav.appendTo(navbarCollapseClone);
                navbarCollapseClone.children('.main-nav').wrap('<div class="navbar-collapse-inner"></div>');
                navbarCollapseClone.appendTo(mainHeaderClone);
                mainHeaderClone.appendTo('body');
                if (mobileModules.length) {
                    mobileModules.appendTo($('.navbar-collapse', mainHeaderClone).first());
                }
                if (!$('.mobile-header-overlay').length) {
                    $('.mobile-header-container', mainHeaderClone).wrap('<div class="mobile-modules-container"></div>');
                }
            }
            if (mainHeader.hasClass('mobile')) {
                navbarCollapseClone.on('show.bs.collapse', function() {
                    $('body').addClass('mobile-nav-is-showing');
                }).on('hide.bs.collapse', function() {
                    $('body').removeClass('mobile-nav-is-showing');
                });
                navbarCollapseClone.on('shown.bs.collapse', function() {
                    document.querySelector('.main-header.clone .navbar-collapse').addEventListener('touchstart', handleTouchStart, false);
                    document.querySelector('.main-header.clone .navbar-collapse').addEventListener('touchmove', handleTouchMove, false);
                    var xDown = null;
                    var yDown = null;
                    function handleTouchStart(evt) {
                        xDown = evt.touches[0].clientX;
                        yDown = evt.touches[0].clientY;
                    }
                    function handleTouchMove(evt) {
                        if (!xDown || !yDown) {
                            return;
                        }
                        var xUp = evt.touches[0].clientX;
                        var yUp = evt.touches[0].clientY;
                        var xDiff = xDown - xUp;
                        var yDiff = yDown - yUp;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            console.log(xDiff);
                            if (xDiff >= 11) {
                                navbarCollapseClone.collapse('hide');
                            }
                        }
                        xDown = null;
                        yDown = null;
                    }
                });
            }
            module.each(function() {
                var $this = $(this), moduleContainer = $this.find('.module-container'), moduleTrigger = $this.find('.module-trigger'), dataTarget = moduleTrigger.data('target'), sectionParent = $this.closest('.vc_section');
                if ($('.masonry-filters').length && $this.find('.masonry-filters-clone').length) {
                    $('.masonry-filters').clone('true').appendTo($this.find('.masonry-filters-clone'));
                }
                if (typeof dataTarget === typeof undefined || dataTarget === null) {
                    $this.off('mouseenter mouseleave');
                    $this.off('mouseenter mouseleave', '.module-trigger');
                    $this.on('mouseenter', '.module-trigger', function() {
                        moduleContainer.stop().slideDown(300);
                        $this.addClass('module-container-is-showing');
                        sectionParent.addClass('module-is-showing');
                        if ($this.find('input[type="search"]').length) {
                            setTimeout(function() {
                                $this.find('input[type="search"]').focus();
                            }, 250);
                        }
                        if (typeof progressively !== typeof undefined && $this.find('.progressive__img').length) {
                            var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                            enableProgressiveLoad.init();
                        }
                    }).on('mouseleave', function() {
                        moduleContainer.stop().slideUp(300);
                        $this.removeClass('module-container-is-showing');
                        sectionParent.removeClass('module-is-showing');
                        if ($this.find('input[type="search"]').length) {
                            setTimeout(function() {
                                $this.find('input[type="search"]').blur();
                            }, 150);
                        }
                    });
                } else {
                    moduleTrigger.off('click');
                    moduleTrigger.on('click', function(event) {
                        var dataTarget = $(this).data('target');
                        event.preventDefault();
                        if ($('body').hasClass('smooth-wheel-enabled') && $(dataTarget).hasClass('navbar-collapse')) {
                            $(document).smoothWheel({
                                remove: true
                            });
                        }
                        if ($this.closest('.module-search-form').length) {
                            var moduleClassList = $this.closest('.module-search-form').attr('class').split(' '), classesToBody = [ 'search-module-is-showing' ];
                            for (var i = 0; i < moduleClassList.length; i++) {
                                if (moduleClassList[i].match('style-')) classesToBody.push('search-module-' + moduleClassList[i]);
                            }
                            $('body').addClass(classesToBody.join(' '));
                            $this.find('input[type="search"]').on('keyup', function() {
                                if ($this.find('input[type="search"]').val() != '') {
                                    $this.addClass('input-filled');
                                } else {
                                    $this.removeClass('input-filled');
                                }
                            });
                        }
                        if (!$this.closest('.style-ghost').length) {
                            $(dataTarget).toggleClass('is-active');
                            $('[data-target="' + dataTarget + '"]').parent('.header-module').toggleClass('module-container-is-showing');
                            sectionParent.toggleClass('module-is-showing');
                            if ($('.modules-fullscreen').has(this).length) {
                                $('html').toggleClass('overflow-hidden');
                                $('.main-header').toggleClass('module-is-showing');
                                $('body').toggleClass('header-module-is-showing');
                            }
                            if ($this.find('input[type="search"]').length && $this.closest('.module-container-is-showing').length) {
                                setTimeout(function() {
                                    $this.find('input[type="search"]').focus();
                                }, 250);
                            }
                        } else {
                            var siblingModules = $this.prevAll('div'), searchSiblings = [];
                            if ($this.closest('.modules-container').siblings('.navbar-collapse').find('.main-nav').children('li').length) {
                                searchSiblings.push($this.closest('.modules-container').siblings('.navbar-collapse').find('.main-nav').children());
                            }
                            if ($this.closest('.modules-container').siblings('.navbar-brand').length) {
                                if (!isRTL) {
                                    $this.find('.search-form').css({
                                        marginLeft: $this.closest('.modules-container').siblings('.navbar-brand').outerWidth()
                                    });
                                } else {
                                    $this.find('.search-form').css({
                                        marginRight: $this.closest('.modules-container').siblings('.navbar-brand').outerWidth()
                                    });
                                }
                            }
                            siblingModules.each(function() {
                                var $this = $(this);
                                if ($this.find('li').length) {
                                    searchSiblings.push($this.find('li'));
                                } else {
                                    searchSiblings.push($this);
                                }
                            });
                            $.each(searchSiblings, function(i, sibling) {
                                $.each(sibling, function(i, selector) {
                                    ghostSearhSelectors.push(selector);
                                });
                            });
                            if (typeof TimelineMax != 'undefined' || typeof TimelineMax == 'function') {
                                itemsTimeline.staggerTo($(ghostSearhSelectors).get().reverse(), .3, {
                                    scale: .5,
                                    opacity: 0,
                                    ease: Power3.easeIn
                                }, .04);
                                timelineTotalDuration = timelineTotalDuration == 0 ? itemsTimeline.duration() : timelineTotalDuration;
                                itemsTimeline.pause();
                                if (itemsTimeline.progress() < 1) {
                                    itemsTimeline.play();
                                    setTimeout(function() {
                                        $this.addClass('module-container-is-showing');
                                        sectionParent.addClass('module-is-showing');
                                    }, timelineTotalDuration * 700);
                                    setTimeout(function() {
                                        $this.find('input[type="search"]').focus();
                                    }, timelineTotalDuration * 1e3);
                                }
                                $this.find('.module-container').find('.module-trigger').on('click', function() {
                                    if (itemsTimeline.progress() > 0 && itemsTimeline.reversed() === false) {
                                        itemsTimeline.seek(timelineTotalDuration).reverse();
                                        setTimeout(function() {
                                            TweenMax.set($(ghostSearhSelectors), {
                                                clearProps: 'all'
                                            });
                                        }, timelineTotalDuration * 1100);
                                    }
                                });
                            }
                        }
                    });
                    if (!$(dataTarget).children('.module-nav-trigger').length && $this.is('.module-nav-trigger')) {
                        $this.clone('true').appendTo(dataTarget);
                    }
                    if ($this.siblings('.modules-container').length && $this.closest('.modules-fullscreen:not([class*=modules-fullscreen-alt-])').length) {
                        $this.siblings('.modules-container').appendTo(dataTarget);
                    }
                    $this.find('.module-container').find('.module-trigger').off('click');
                    $this.find('.module-container').find('.module-trigger').on('click', function() {
                        $this.removeClass('module-container-is-showing');
                        sectionParent.removeClass('module-is-showing');
                        $this.find('input[type="search"]').blur();
                        $('body').removeClass('search-module-is-showing');
                        $('html').removeClass('overflow-hidden');
                    });
                }
            });
            if ($('.main-bar-container.modules-fullscreen').not('.modules-fullscreen-alt-2, .modules-fullscreen-alt-3').length && !$('.navbar-collapse').siblings('.header-module').not('.module-nav-trigger').length) {
                $('.main-bar-container, .main-header').addClass('width-auto');
            }
            if ($('.main-bar-container.modules-fullscreen-alt-3').length && $('.navbar-collapse').length) {
                var mask = $('<div class="header-mask"><div class="mask-inner"></div></div>\x3c!-- /.header-mask --\x3e');
                mask.prependTo('.navbar-collapse');
            }
            function closeAllModules(event) {
                var sectionParent = module.closest('.vc_section');
                if ($('body').hasClass('smooth-wheel-enabled') && $('html').hasClass('overflow-hidden')) {
                    $(document).smoothWheel({
                        remove: true
                    });
                    console.log('smooth mousewheel initialized');
                    $(document).smoothWheel();
                }
                module.find('.module-container').stop().slideUp(300);
                module.removeClass('module-container-is-showing');
                module.closest('.main-bar-container, .secondary-bar').removeClass('module-is-showing');
                if (module.find('input[type="search"]').length) {
                    setTimeout(function() {
                        module.find('input[type="search"]').blur();
                    }, 150);
                }
                module.find('.is-active').removeClass('is-active');
                $('html').removeClass('overflow-hidden');
                $('body').removeClass('header-module-is-showing search-module-is-showing');
                $('.main-header').removeClass('module-is-showing');
                module.not('.style-ghost').removeClass('module-container-is-showing is-active');
                $('.module-container-is-showing').removeClass('module-container-is-showing');
                module.find('input[type="search"]').blur();
                $('.navbar-collapse').removeClass('is-active');
                $('.module-nav-trigger').removeClass('dl-active');
                if (typeof TimelineMax != 'undefined' || typeof TimelineMax == 'function') {
                    if (itemsTimeline.progress() > 0 && itemsTimeline.reversed() === false) {
                        $('.header-module.style-ghost').removeClass('module-container-is-showing');
                        sectionParent.removeClass('module-is-showing');
                        itemsTimeline.seek(timelineTotalDuration).reverse();
                        setTimeout(function() {
                            TweenMax.set($(ghostSearhSelectors), {
                                clearProps: 'all'
                            });
                        }, timelineTotalDuration * 1100);
                    }
                }
            }
            function closeMobileNav(event) {
                $('.navbar-collapse').attr('aria-expanded', 'false').addClass('collapsing').removeClass('in');
                navToggle.attr('aria-expanded', 'false').addClass('collapsed');
            }
            $(document).on('click touchend', function(e) {
                var target = $(e.target);
                if (!module.is(target) && !module.has(target).length && !target.has('.modules-fullscreen').length || target.parents().is('.module-trigger-inner')) {
                    closeAllModules(e);
                }
                if (!navToggle.is(target) && !navToggle.parent().is(target) && !$('.navbar-collapse').is(target) && !$('.navbar-collapse').has(target).length && $('.navbar-collapse').hasClass('in')) {
                    $('.navbar-toggle', '.module-nav-trigger').trigger('click');
                }
            });
            $(document).on('keyup', function(e) {
                if (e.keyCode == 27) {
                    closeAllModules(e);
                }
            });
            $('.module-inner + .module-nav-trigger .module-trigger').on('click', function(e) {
                closeAllModules(e);
            });
        },
        megamenu: function() {
            var el = $('.megamenu');
            el.each(function() {
                var liParent = $(this);
                var megamenu = liParent.children('.nav-item-children'), megamenuContainer = liParent.find('.nav-item-children > li > .container'), megamenuColumns, megamenuColumnsWidth = 0, parentPos = liParent.offset().left + liParent.outerWidth(), parentContainer = liParent.closest('.container').length ? liParent.closest('.container') : liParent.closest('.container-fluid'), megamenuPos;
                if (megamenuContainer.children('.vc_row').children('.wpb_column').length) {
                    megamenuColumns = megamenuContainer.children('.vc_row').children('.wpb_column');
                } else {
                    megamenuColumns = megamenuContainer.children('.row').children('.megamenu-column');
                }
                liParent.addClass('columns-' + megamenuColumns.length);
                megamenuColumns.each(function() {
                    megamenuColumnsWidth += $(this).outerWidth();
                });
                megamenuContainer.css('width', '');
                liParent.removeClass('width-applied');
                if (liParent.closest('.main-bar-side').length) {
                    if (megamenuContainer.offset().left + megamenuContainer.outerWidth() >= $(window).width()) {
                        megamenuContainer.width('');
                        megamenuContainer.width($(window).width() - $('.main-bar-container').outerWidth());
                    }
                }
                megamenuPos = parentPos - megamenu.outerWidth() / 2 < 0 ? 0 : parentPos - megamenu.outerWidth() / 2;
                megamenu.css({
                    display: 'block',
                    visibility: 'hidden',
                    opacity: 0
                });
                megamenu.show().css({
                    left: '',
                    right: ''
                });
                megamenu.css('left', megamenuPos);
                if (megamenuPos + megamenuColumnsWidth >= parentContainer.outerWidth()) {
                    megamenu.css({
                        left: 'auto',
                        right: -15
                    });
                } else if (parentPos <= 0) {
                    megamenu.css({
                        left: -15,
                        right: 'auto'
                    });
                }
                setTimeout(function() {
                    megamenuContainer.width('');
                    megamenuContainer.width(megamenuColumnsWidth);
                    liParent.addClass('width-applied');
                    megamenu.css({
                        display: 'none',
                        visibility: 'visible',
                        opacity: 1
                    });
                }, 650);
            });
        },
        desktopHeaderSubmenu: function() {
            var mainHeader = $('.main-header'), mainBarContainer = mainHeader.find('.main-bar-container'), mainNav = mainHeader.find('.main-nav'), submenu = mainNav.find('.nav-item-children, .children'), megamenuParent = mainNav.find('.megamenu'), isRTL = $('html').attr('dir') == 'rtl';
            mainBarContainer.each(function() {
                var $this = $(this);
                if ($this.find('.module-search-form.style-offcanvas').length) {
                    $this.find('.module-search-form.style-offcanvas').each(function() {
                        var offCanvasSearch = $(this);
                        offCanvasSearch.children('.module-container').css({
                            right: parseInt(Math.abs($(window).innerWidth() - (offCanvasSearch.offset().left + offCanvasSearch.width()))) * -1,
                            top: parseInt(Math.abs(offCanvasSearch.offset().top)) * -1
                        });
                    });
                }
                if ($this.hasClass('modules-fullscreen')) {
                    $('.modules-fullscreen').find('.main-nav').dlmenu({
                        animationClasses: {
                            classin: 'dl-animate-in-2',
                            classout: 'dl-animate-out-2'
                        }
                    });
                    if (!$('.modules-fullscreen').find('.main-nav').parent('.main-nav-container').length) {
                        $('.modules-fullscreen').find('.main-nav').wrap('<div class="main-nav-container"></div>');
                    }
                    var mainBar = $('.main-bar'), navbarCollapse = mainBar.find('.navbar-collapse'), mainBarOffset = mainBar.offset();
                    if (navbarCollapse.length) {
                        navbarCollapse.css({
                            top: '',
                            left: '',
                            right: ''
                        });
                        navbarCollapse.closest('.wpb_column').imagesLoaded(function() {
                            navbarCollapse.css({});
                        });
                    }
                    if ($('.module-search-form.style-fullscreen').length) {
                        $('.module-search-form.style-fullscreen .module-container').css({
                            top: '',
                            left: '',
                            right: ''
                        });
                        navbarCollapse.closest('.wpb_column').imagesLoaded(function() {
                            $('.module-search-form.style-fullscreen .module-container').css({});
                        });
                    }
                    $(window).on('resize', function() {
                        if (navbarCollapse.length) {
                            navbarCollapse.css({
                                top: '',
                                left: '',
                                right: ''
                            });
                            navbarCollapse.css({});
                        }
                        if ($('.module-search-form.style-fullscreen').length) {
                            $('.module-search-form.style-fullscreen .module-container').css({
                                top: '',
                                left: '',
                                right: ''
                            });
                            navbarCollapse.closest('.wpb_column').imagesLoaded(function() {
                                $('.module-search-form.style-fullscreen .module-container').css({});
                            });
                        }
                    });
                }
                if ($this.hasClass('modules-fullscreen-alt')) {
                    $this.find('.navbar-collapse').children().wrapAll('<div class="container"></div>');
                }
            });
            if (mainHeader.hasClass('mobile') || mainBarContainer.hasClass('modules-fullscreen')) {
                return;
            }
            if (mainHeader.find('.custom-menu').find('.sub-menu').length) {
                submenu.add(mainHeader.find('.custom-menu').find('.sub-menu'));
            }
            submenu.add(mainHeader.find('.custom-menu').find('.sub-menu')).each(function() {
                var $this = $(this), subParent = $this.parent();
                if (!isRTL) {
                    if ($this.offset().left + $this.outerWidth() >= $(window).width() && !subParent.is('.megamenu')) {
                        $this.addClass('to-right');
                    } else {
                        $this.removeClass('to-right');
                    }
                } else {
                    if ($this.offset().left <= 0 && !subParent.is('.megamenu')) {
                        $this.addClass('to-right');
                    } else {
                        $this.removeClass('to-right');
                    }
                }
                setTimeout(function() {
                    $this.hide();
                }, 50);
                if (!window.xMode) {
                    subParent.on('mouseenter', function() {
                        var mainHeader = $('.main-header');
                        if (mainHeader.hasClass("desktop")) {
                            var $liParent = $(this), navChild = $liParent.children('.nav-item-children, .sub-menu, .children');
                            if (navChild.length) {
                                navChild.css({
                                    visibility: 'visible',
                                    opacity: 1
                                });
                                $liParent.addClass('submenu-is-showing');
                                navChild.stop().fadeIn(200);
                            }
                        }
                        if (typeof progressively !== typeof undefined && $(this).find('.progressive__img').length) {
                            var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                            enableProgressiveLoad.init();
                        }
                    }).on('mouseleave', function() {
                        var mainHeader = $('.main-header');
                        if (mainHeader.hasClass("desktop")) {
                            var $liParent = $(this), navChild = $liParent.children('.nav-item-children, .sub-menu, .children');
                            if (navChild.length) {
                                $liParent.removeClass('submenu-is-showing');
                                navChild.stop().fadeOut(100);
                            }
                        }
                    });
                } else {
                    var arrow = $('<i class="fa fa-angle-down xmode-toggle"></i>');
                    subParent.children('a').append(arrow);
                    subParent.on('click', '> a', function() {
                        var mainHeader = $('.main-header');
                        if (mainHeader.hasClass("desktop")) {
                            var $liParent = $(this).parent(), navChild = $liParent.children('.nav-item-children');
                            if (navChild.length) {
                                $liParent.toggleClass('submenu-is-showing').siblings().removeClass('submenu-is-showing').find('.nav-item-children').hide();
                                navChild.stop().toggle(100);
                            }
                        }
                    });
                }
                if (submenu.closest('.modules-fullscreen').length) {
                    submenu.parent().off('mouseenter mouseleave');
                }
            });
        },
        responsiveMenu: function(status) {
            var self = this, mainHeader = $(".main-header"), mainNav = mainHeader.find('.main-nav'), submenu = mainNav.find('.nav-item-children, .children');
            if (status) {
                submenu.each(function() {});
            } else {
                submenu.each(function() {});
            }
        },
        resizeWindow: function(status) {
            var mainHeader = $('.main-header'), windowWidth = $("body").prop("scrollWidth"), fullWidthRow = mainHeader.find('.main-bar').children('[data-vc-full-width]'), flexBasis = Modernizr.prefixedCSS('flex-basis'), self = this;
            if (windowWidth > 991) {
                mainHeader.addClass("desktop");
                mainHeader.removeClass("mobile");
                setTimeout(function() {
                    fullWidthRow.each(function() {
                        $(this).css(flexBasis, $(this).next('.vc_row-full-width').width() + $(this).next('.vc_row-full-width').offset().left * 2);
                    });
                }, 250);
                self.responsiveMenu(false);
            } else {
                mainHeader.removeClass("desktop");
                mainHeader.addClass("mobile");
                setTimeout(function() {
                    fullWidthRow.each(function() {
                        $(this).css(flexBasis, '');
                    });
                }, 250);
                self.responsiveMenu(true);
            }
            $(window).on('load resize', function() {
                windowWidth = $(window).width();
                if (windowWidth > 991) {
                    mainHeader.addClass("desktop");
                    mainHeader.removeClass("mobile");
                    setTimeout(function() {
                        fullWidthRow.each(function() {
                            $(this).css(flexBasis, $(this).next('.vc_row-full-width').width() + $(this).next('.vc_row-full-width').offset().left * 2);
                        });
                    }, 250);
                    self.responsiveMenu(false);
                    $('.megamenu .nav-item-children', mainHeader).css({
                        display: 'block',
                        visibility: 'hidden',
                        opacity: 0
                    });
                    self.megamenu();
                } else {
                    mainHeader.removeClass("desktop");
                    mainHeader.addClass("mobile");
                    setTimeout(function() {
                        fullWidthRow.each(function() {
                            $(this).css(flexBasis, '');
                        });
                    }, 250);
                    self.responsiveMenu(true);
                }
            });
        },
        mobileHeaderSubmenuInit: function() {
            var self = this, mainNav = $('.main-header.mobile').find('.main-nav'), submenu = mainNav.find('.nav-item-children, .children');
            if ($('.main-header').data('add-mobile-submenutoggle')) {
                this.mobileSubmenuAddToggleBtn();
                $('.main-header.mobile .main-nav li > .submenu-toggle-btn').on('click', function() {
                    self.mobileHeaderSubmenu(this);
                });
            } else {
                $('.main-header.mobile .main-nav li > a').on('click', function(e) {
                    if ($(this).siblings('.nav-item-children').length) {
                        e.preventDefault();
                        self.mobileHeaderSubmenu(this);
                    }
                });
            }
        },
        mobileSubmenuAddToggleBtn: function() {
            var mobileMainHeader = $('.main-header.mobile.clone'), toggleBtnArray = [];
            $('.nav-item-children', mobileMainHeader).each(function(i, element) {
                var toggleBtn = $('<span class="submenu-toggle-btn"><i class="fa fa-angle-down"></i></span>');
                toggleBtn.insertBefore(element);
            });
        },
        mobileHeaderSubmenu: function(element) {
            var $this = $(element);
            if (!$this.siblings('.nav-item-children, .children').length) {
                return;
            }
            var submenu = $this.siblings('.nav-item-children, .children');
            submenu.stop().slideToggle();
            $this.parent().toggleClass('submenu-is-showing');
            $this.parent().siblings().find('.nav-item-children, .children').slideUp(300).end().removeClass('submenu-is-showing');
        },
        headerSticky: function() {
            var el = $('[data-sticky]');
            var isStickyOnMobile = el.data('sticky-onmobile');
            if ($(window).width() >= 768 || isStickyOnMobile) {
                if (!el.length) {
                    return;
                }
                el.each(function() {
                    var $this = $(this).wrap('<div class="sticky-placeholder"></div>'), stickyPlaceholder = $this.parent(), mainBar = $this.find('.main-bar'), mainBarOffset = mainBar.offset(), navbarCollapse = $('.main-header').find('.navbar-collapse'), transformPrefixed = Modernizr.prefixedCSS('transform'), offsetEl = $($this.data('sticky-offset')), offsetElOffsetTop = 0, offsetElHeight = 0, elementOffsetTop = 0, onStickyOffset = 0, stickyType = $this.data(), placeholderType = $this.is('.main-bar-container') ? 'main-bar-placeholder' : 'secondary-bar-placeholder', newClassNames, prevClassNames, hr;
                    stickyPlaceholder.addClass(Object.keys(stickyType).join(' ') + ' ' + placeholderType).removeClass('sticky');
                    stickyPlaceholder.attr({
                        'data-height': $this.outerHeight(),
                        'data-sticky-offset-top': 0
                    });
                    var getClassames = function(element) {
                        return element.attr('class');
                    };
                    var switchClasses = function(searchIn, searchFor, targetClassname) {
                        if (searchIn.search(searchFor) >= 0) {
                            $this.addClass(targetClassname);
                        } else {
                            $this.removeClass(targetClassname);
                        }
                    };
                    var getStickyOffset = function() {
                        var prevEl = stickyPlaceholder.prevAll('.sticky-placeholder').children(), prevElHeight = parseInt(prevEl.parent().attr('data-height'), 10) || 0, prevElOffset = prevElHeight + parseInt(prevEl.parent().attr('data-sticky-offset-top'), 10) || 0;
                        return prevElOffset;
                    };
                    if (offsetEl.length && offsetEl.is(':visible')) {
                        offsetEl.each(function() {
                            var $this = $(this);
                            $this.imagesLoaded(function() {
                                offsetElHeight += $this.outerHeight();
                                offsetElOffsetTop += $this.offset().top;
                            });
                        });
                    } else {
                        offsetElHeight = 0;
                    }
                    $this.imagesLoaded(function() {
                        if (!$this.closest('.titlebar[data-enable-fullheight]').length) {
                            stickyPlaceholder.not('.onlyVisibleOnsticky').height($this.outerHeight());
                        }
                        stickyPlaceholder.attr({
                            'data-height': '',
                            'data-sticky-offset-top': 0
                        });
                        stickyPlaceholder.attr({
                            'data-height': $this.outerHeight(),
                            'data-sticky-offset-top': getStickyOffset()
                        });
                        hr = new Headroom($this.get(0), {
                            tolerance: {
                                up: $this.data('tolerance') || 6,
                                down: 1
                            },
                            offset: $this.attr('data-start-point') == 'start' ? $this.offset().top : $(".main-header").outerHeight(),
                            onPin: function() {
                                stickyPlaceholder.attr({
                                    'data-height': '',
                                    'data-sticky-offset-top': 0
                                });
                                stickyPlaceholder.attr({
                                    'data-height': $this.outerHeight(),
                                    'data-sticky-offset-top': getStickyOffset()
                                });
                                $this.css({
                                    top: ''
                                });
                                $this.css({
                                    top: parseInt(stickyPlaceholder.attr('data-sticky-offset-top'), 10)
                                });
                                prevClassNames = newClassNames;
                                newClassNames = getClassames($this);
                                switchClasses(prevClassNames, 'headroom--top', 'pinned-from-top');
                                if ($this.hasClass('modules-fullscreen')) {
                                    navbarCollapse.css({
                                        top: '',
                                        left: '',
                                        right: ''
                                    });
                                }
                                if ($('.module-search-form.style-fullscreen').length) {
                                    $('.module-search-form.style-fullscreen .module-container').css({
                                        top: '',
                                        left: '',
                                        right: ''
                                    });
                                }
                            },
                            onUnpin: function() {
                                stickyPlaceholder.attr({
                                    'data-height': '',
                                    'data-sticky-offset-top': 0
                                });
                                stickyPlaceholder.attr({
                                    'data-height': $this.outerHeight(),
                                    'data-sticky-offset-top': getStickyOffset()
                                });
                                $this.css({
                                    top: ''
                                });
                                if ($this.is('[data-sticky-always]')) {
                                    $this.css({
                                        top: parseInt(stickyPlaceholder.attr('data-sticky-offset-top'), 10)
                                    });
                                } else {
                                    $this.css({
                                        top: ''
                                    });
                                }
                                prevClassNames = newClassNames;
                                newClassNames = getClassames($this);
                                switchClasses(prevClassNames, 'headroom--top', 'pinned-from-top');
                                if ($this.hasClass('modules-fullscreen')) {
                                    navbarCollapse.css({
                                        top: '',
                                        left: '',
                                        right: ''
                                    });
                                }
                                $this.find('.is-active').removeClass('is-active');
                                $this.find('.module-container-is-showing').not('.style-ghost, .style-fullscreen').removeClass('module-container-is-showing');
                                $('body').not('.search-module-style-ghost, .search-module-style-fullscreen').removeClass('header-module-is-showing search-module-is-showing');
                                $('html').removeClass('overflow-hidden');
                                $('.main-header').removeClass('module-is-showing');
                            },
                            onNotTop: function() {
                                stickyPlaceholder.attr({
                                    'data-height': '',
                                    'data-sticky-offset-top': 0
                                });
                                stickyPlaceholder.attr({
                                    'data-height': $this.outerHeight(),
                                    'data-sticky-offset-top': getStickyOffset()
                                });
                                $this.css({
                                    top: ''
                                });
                                $this.css({
                                    top: parseInt(stickyPlaceholder.attr('data-sticky-offset-top'), 10)
                                });
                                $this.removeClass('slide-up').parent().removeClass('bar-sliding-up');
                            },
                            onTop: function() {
                                $this.css({
                                    top: ''
                                });
                                $this.parent('.onlyVisibleOnsticky').height('');
                                if ($this.hasClass('modules-fullscreen')) {
                                    navbarCollapse.css({
                                        top: '',
                                        left: '',
                                        right: ''
                                    });
                                }
                                if ($('.module-search-form.style-fullscreen').length) {
                                    $('.module-search-form.style-fullscreen .module-container').css({
                                        top: '',
                                        left: '',
                                        right: ''
                                    });
                                }
                                if (prevClassNames && prevClassNames.indexOf('headroom--not-top')) {
                                    $this.addClass('slide-up').parent().addClass('bar-sliding-up');
                                }
                                prevClassNames = newClassNames;
                                newClassNames = getClassames($this);
                            }
                        });
                        hr.init();
                        newClassNames = getClassames($this);
                        $(window).on('resize', function() {
                            if (!$this.closest('.titlebar[data-enable-fullheight]').length) {
                                stickyPlaceholder.not('.onlyVisibleOnsticky').height($this.outerHeight());
                            }
                            hr.offset = $this.attr('data-start-point') == 'start' ? $this.offset().top : $(".main-header").outerHeight();
                        });
                    });
                });
            } else {
                if (!$('body').hasClass('mobile-header-overlay')) {
                    var mainHeader = $('.main-header').not('.clone'), headerHeight = mainHeader.outerHeight(), heightPlaceholder = $('<div class="main-header-placeholder"></div>');
                    heightPlaceholder.height(headerHeight).insertBefore(mainHeader);
                    mainHeader.addClass('is-fixed');
                }
            }
        }
    };
    $.fn.RellaHeader = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new Header(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaHeader();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__EnableFitText';
    var EnableFitText = function(el, options) {
        return this.init(el, options);
    };
    EnableFitText.defaults = {};
    EnableFitText.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, EnableFitText.defaults, options);
            return this;
        },
        build: function() {
            var el = $('[data-fitText]');
            if (!el.length) {
                return;
            }
            $.fn.fitText = function(kompressor, options) {
                var compressor = kompressor || 1, settings = $.extend({
                    minFontSize: Number.NEGATIVE_INFINITY,
                    maxFontSize: Number.POSITIVE_INFINITY
                }, options);
                return this.each(function() {
                    var $this = $(this);
                    var resizer = function() {
                        $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
                    };
                    resizer();
                    $(window).on('resize.fittext orientationchange.fittext', resizer);
                });
            };
            el.each(function() {
                var $this = $(this), dataMaxFontSize = $this.attr('data-max-fontSize');
                $this.fitText(1, {
                    maxFontSize: dataMaxFontSize
                });
            });
        }
    };
    $.fn.RellaEnableFitText = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new EnableFitText(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaEnableFitText();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__EnableMediaElementJs';
    var EnableMediaElementJs = function(el, options) {
        return this.init(el, options);
    };
    EnableMediaElementJs.defaults = {};
    EnableMediaElementJs.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, EnableMediaElementJs.defaults, options);
            return this;
        },
        build: function() {
            var element = this.el, settings = {};
            if (!element.length || element.parents('.rev_slider_wrapper').length) {
                return;
            }
            if (typeof _wpmejsSettings !== 'undefined') {
                settings = $.extend(true, {}, _wpmejsSettings);
            }
            settings.success = settings.success || function(mejs) {
                var autoplay, loop;
                if ('flash' === mejs.pluginType) {
                    autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                    loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;
                    autoplay && mejs.addEventListener('canplay', function() {
                        mejs.play();
                    }, false);
                    loop && mejs.addEventListener('ended', function() {
                        mejs.play();
                    }, false);
                }
            };
            var rellamejsDefaults = {
                audioHeight: 60,
                audioVolume: 'vertical',
                features: [ 'playpause', 'current', 'progress', 'duration', 'tracks', 'volume' ]
            };
            rellamejsDefaults.success = function(media) {
                media.addEventListener('play', function(e) {
                    var $this = $(e.target), parent;
                    parent = $this.closest('.blog-post').length ? $this.closest('.blog-post') : $this.closest('.mejs-container');
                    parent.addClass('is-playing');
                });
                media.addEventListener('pause', function(e) {
                    var $this = $(e.target), parent;
                    parent = $this.closest('.blog-post').length ? $this.closest('.blog-post') : $this.closest('.mejs-container');
                    parent.removeClass('is-playing');
                });
            };
            if ("undefined" !== typeof _wpmejsSettings) {
                $.extend(_wpmejsSettings, rellamejsDefaults);
            }
            if (typeof mediaelementplayer === typeof undefined) {
                return;
            }
            element.not('.mejs-container').filter(function() {
                return !$(this).parent().hasClass('.mejs-mediaelement');
            }).mediaelementplayer(rellamejsDefaults);
        }
    };
    $.fn.RellaEnableMediaElementJs = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new EnableMediaElementJs(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('video, audio').not('.portfolio-main-video').RellaEnableMediaElementJs();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__RellaAjaxLoadMore';
    var AjaxLoadMore = function(el, options) {
        return this.init(el, options);
    };
    AjaxLoadMore.defaults = {};
    AjaxLoadMore.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, AjaxLoadMore.defaults, options);
            return this;
        },
        build: function() {
            var doc = this.el;
            doc.off('click', '[data-plugin-ajaxify]');
            doc.on('click', '[data-plugin-ajaxify]', function(event) {
                event.preventDefault();
                var button = $(this), target = button.attr('href'), opts = $.extend(true, {}, button.data('plugin-options'));
                button.addClass('loading');
                $.ajax({
                    type: 'GET',
                    url: target,
                    complete: function() {
                        button.removeClass('loading');
                    },
                    error: function(MLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    },
                    success: function(data) {
                        var wrapper = $(data).find(opts.wrapper), items = wrapper.find(opts.items), nextPageUrl = $(data).find('[data-plugin-ajaxify="true"]').attr('href'), lastDate = $(".timeline-date").last().text().trim(), timelineRows = $(opts.wrapper).find('.timeline-row'), lastTimelineRow = timelineRows.last(), parentOfNewItems;
                        items.imagesLoaded(function() {
                            if (nextPageUrl && target != nextPageUrl) {
                                button.attr('href', nextPageUrl);
                            } else {
                                button.parent().slideUp(300);
                            }
                            if (items.is('.row:not(.timeline-row)')) {
                                items = items.children('[class*=col-]');
                            }
                            if (items.is('.timeline-row')) {
                                $(items).insertBefore(button.parents('.page-nav'));
                            } else {
                                $(opts.wrapper).append(items.parent('[class*=col-]'));
                            }
                            if ($(opts.wrapper).hasClass('timeline')) {
                                var newFirstRow = items.first(), newFirstRowItems = newFirstRow.find('.masonry-item').not('.mid-bar'), timelineRows = $(opts.wrapper).find('.timeline-row'), newDate = $(".timeline-date", items.first()).text().trim();
                                if (newDate === lastDate) {
                                    newFirstRowItems.appendTo(lastTimelineRow).addClass('item-just-added');
                                    parentOfNewItems = newFirstRowItems.parent();
                                    timelineRows.each(function() {
                                        var $this = $(this);
                                        if (!$this.find('.masonry-item').not('.mid-bar').length) {
                                            $this.remove();
                                        }
                                    });
                                    parentOfNewItems.isotope('appended', newFirstRowItems);
                                    if (typeof progressively !== typeof undefined && $('.progressive__img').length) {
                                        var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                                        enableProgressiveLoad.init();
                                        $('.progressive__img').RellaProgressiveLoad();
                                    }
                                    setTimeout(function() {
                                        parentOfNewItems.isotope('layout');
                                    }, 300);
                                    parentOfNewItems.on('layoutComplete', function() {
                                        setTimeout(function() {
                                            parentOfNewItems.find('.masonry-item').removeClass('item-just-added');
                                        }, 300);
                                    });
                                }
                            }
                            if (typeof progressively !== typeof undefined && $('.progressive__img').length) {
                                var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                                enableProgressiveLoad.init();
                                $('.progressive__img').RellaProgressiveLoad();
                            }
                            $('[data-plugin-masonry]').rellaMasonryLayout();
                            $('video, audio').RellaEnableMediaElementJs();
                            $(document).RellaCarousel();
                            $(document).RellaOffsetTop();
                            $('[data-parallax="true"]').RellaParallax();
                            $('[data-parallax-bg="true"]').RellaParallaxBG();
                            $('[data-panr]').rellaPanr();
                            $('.lightbox-link').rellaLightbox();
                            if ($('[data-mh]').length && !button.parents('.masonry-creative').length) {
                                $('[data-mh]').matchHeight({
                                    remove: true
                                });
                                $('[data-mh]').matchHeight();
                            }
                            if ($(opts.wrapper).data('isotope')) {
                                if (!items.is('.timeline-row')) {
                                    $(opts.wrapper).isotope('appended', items.parent('[class*="col-"]'));
                                }
                                $(opts.wrapper).on('layoutComplete', function() {
                                    $(opts.wrapper).addClass('items-loaded');
                                });
                                $.fn.matchHeight._afterUpdate = function(event, groups) {
                                    $(opts.wrapper).isotope('layout');
                                    $(opts.wrapper).addClass('items-loaded');
                                    setTimeout(function() {
                                        $(opts.wrapper).isotope('layout');
                                    }, 600);
                                };
                            }
                            if ('vc_js' in window) {
                                window.setTimeout(vc_waypoints, 500);
                                if ($(opts.wrapper).data('isotope')) {
                                    window.setTimeout(function() {
                                        $(opts.wrapper).isotope('layout');
                                    }, 600);
                                }
                            }
                        });
                        $(window).trigger('resize');
                    }
                });
            });
        }
    };
    $.fn.RellaAjaxLoadMore = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new AjaxLoadMore(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaAjaxLoadMore();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    if ($('[data-enable-fullpage]').length) {
        return;
    }
    var instanceName = '__LocalScroll';
    var LocalScroll = function(el, options) {
        return this.init(el, options);
    };
    LocalScroll.defaults = {};
    LocalScroll.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, LocalScroll.defaults, options);
            return this;
        },
        build: function() {
            var el = $('.local-scroll'), isOnePageNav = $('.main-nav').find('.local-scroll').length || $('.custom-menu').find('a:not([href="#"]):not([href="#0"])').length ? true : false;
            if (isOnePageNav) {
                $('body').scrollspy({
                    target: '#main-header-nav'
                });
            }
            if (!el.length) {
                if ($('.custom-menu').find('a:not([href="#"]):not([href="#0"])').length) {
                    el = $('.custom-menu').find('a:not([href="#"]):not([href="#0"])').parent();
                } else {
                    return;
                }
            }
            el.on('click', 'a:not([href="#"]):not([href="#0"])', function(event) {
                var $this = $(this);
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 800, function() {
                            $('.navbar-toggle', '.module-nav-trigger .module-trigger').trigger('click');
                            $('.header-module').removeClass('is-active module-container-is-showing');
                            $('.navbar-collapse.is-active').removeClass('is-active');
                            $('html').removeClass('overflow-hidden');
                            if ($this.closest('#mobile-nav').length) {
                                $('#mobile-nav').collapse('hide');
                            }
                        });
                    }
                }
            });
        }
    };
    $.fn.RellaLocalScroll = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new LocalScroll(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $(document).RellaLocalScroll();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__SortingOption';
    var SortingOption = function(el, options) {
        return this.init(el, options);
    };
    SortingOption.defaults = {};
    SortingOption.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, SortingOption.defaults, options);
            return this;
        },
        build: function() {
            var el = $('.sorting-option');
            if (!el.length) {
                return;
            }
            el.each(function() {
                var $this = $(this), checkbox = $this.find('input[type=checkbox]');
                checkbox.on('change', function() {
                    if (checkbox.prop('checked')) {
                        $this.addClass('checked');
                    } else {
                        $this.removeClass('checked');
                    }
                });
            });
        }
    };
    $.fn.RellaSortingOption = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new SortingOption(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.sorting-option').RellaSortingOption();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__elementInView';
    var elementInView = function(el, options) {
        return this.init(el, options);
    };
    elementInView.defaults = {};
    elementInView.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, elementInView.defaults, options);
            return this;
        },
        build: function() {
            var element = $(this.el);
            var inViewCallback = function(enteries, observer) {
                enteries.forEach(function(entery) {
                    if (entery.isIntersecting) {
                        element.addClass('is-in-view');
                    }
                });
            };
            var options = {
                threshold: .25
            };
            var observer = new IntersectionObserver(inViewCallback, options);
            var observerTarget = element.get(0);
            observer.observe(observerTarget);
        }
    };
    $.fn.RellaelementInView = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-inview-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new elementInView(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('[data-element-inview]').RellaelementInView();
    });
}).apply(this, [ jQuery ]);

(function($) {
    'use strict';
    var instanceName = '__VideoBG';
    var VideoBG = function(el, options) {
        return this.init(el, options);
    };
    VideoBG.defaults = {};
    VideoBG.prototype = {
        init: function(el, options) {
            if (el.data(instanceName)) {
                return this;
            }
            this.el = el;
            this.setOptions(options).build();
            return this;
        },
        setOptions: function(options) {
            this.el.data(instanceName, this);
            this.options = $.extend(true, {}, VideoBG.defaults, options);
            return this;
        },
        build: function() {
            var el = $('.video-bg-player');
            if (!el.length) {
                return;
            }
            el.YTPlayer();
            el.on('YTPReady', function(e) {
                $(e.currentTarget).addClass('video-is-ready');
            });
        }
    };
    $.fn.RellaVideoBG = function(settings) {
        return this.map(function() {
            var el = $(this);
            if (el.data(instanceName)) {
                return el.data(instanceName);
            } else {
                var pluginOptions = el.data('plugin-options'), opts;
                if (pluginOptions) {
                    opts = $.extend(true, {}, settings, pluginOptions);
                }
                return new VideoBG(el, opts);
            }
        });
    };
    $(document).ready(function() {
        $('.video-bg-player').RellaVideoBG();
    });
}).apply(this, [ jQuery ]);

(function($) {
    var Themerella = {
        init: function() {
            'use strict';
            this.themeRTL();
            this.modules();
            this.rellaAnimations();
            this.backToTop();
            this.accordion();
            this.tabs();
            this.postShare();
            this.promoteBox();
            this.blogCoverSidebar();
            this.detectIE();
        },
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        themeRTL: function() {
            var isRTL = $('html').attr('dir') == 'rtl', fullwidthRow = $('[data-vc-full-width="true"]');
            if (isRTL && fullwidthRow.length) {
                fullwidthRow.each(function() {
                    var $this = $(this), elMarginLeft = parseInt($this.css('margin-left'), 10), elMarginRight = parseInt($this.css('margin-right'), 10), fullwidthPlaceholder = $this.next('.vc_row-full-width');
                    $this.css({
                        left: '',
                        right: ''
                    });
                    $this.css({
                        left: '',
                        right: (fullwidthPlaceholder.offset().left - elMarginRight - 30) * -1
                    });
                });
            }
        },
        rellaAnimations: function() {
            var rellaAnimateElement = $(".rella_animate_when_almost_visible:not(.wpb_start_animation)");
            if (rellaAnimateElement.length) {
                rellaAnimateElement.each(function() {
                    var $this = $(this), animationDelay = parseInt($this.attr('data-animation-delay'), 10) / 1e3 || 0;
                    $this.css({
                        '-webkit-animation-delay': animationDelay + 's',
                        'animation-delay': animationDelay + 's'
                    });
                });
                rellaAnimateElement.waypoint(function() {
                    var $this = $(this);
                    $this.addClass('wpb_start_animation animated');
                }, {
                    offset: "85%"
                });
            }
        },
        modules: function() {
            'use strict';
            var content = $('#content, #footer'), moduleTrigger = content.find('.module-trigger');
            moduleTrigger.each(function() {
                var $this = $(this), parentModule = $this.parent(), moduleContainer = $this.siblings('.module-container');
                $this.off('mouseenter mouseleave');
                parentModule.off('mouseenter mouseleave', '.moduleTrigger');
                parentModule.on('mouseenter', '.module-trigger', function() {
                    moduleContainer.stop().slideDown(300);
                    $this.addClass('module-container-is-showing');
                    if ($this.find('input[type="search"]').length) {
                        setTimeout(function() {
                            $this.find('input[type="search"]').focus();
                        }, 250);
                    }
                    if (typeof progressively !== typeof undefined && $(this).find('.progressive__img').length) {
                        var enableProgressiveLoad = new RellaProgressiveAspectRatio();
                        enableProgressiveLoad.init();
                    }
                }).on('mouseleave', function() {
                    moduleContainer.stop().slideUp(300);
                    $this.removeClass('module-container-is-showing');
                    if ($this.find('input[type="search"]').length) {
                        setTimeout(function() {
                            $this.find('input[type="search"]').blur();
                        }, 150);
                    }
                });
            });
        },
        objectFitPolyfill: function() {
            'use strict';
            if (typeof objectFitImages !== typeof undefined) {
                objectFitImages();
            }
        },
        preloader: function() {
            'use strict';
            var self = this, preloader = $('.page-loader'), preloaderStyle1 = $('.page-loader-style1'), preloaderStyle2 = $('.page-loader-style2'), preloaderStyle3 = $('.page-loader-style3'), preloaderInner = preloader.children('.page-loader-inner'), fadeDelay = parseInt(preloader.data('fade-delay'), 10) || 0, pageLoaded = false, waitForImageELements = $('.titlebar');
            var removePreloader = function() {
                $('body').addClass('page-loaded preloader-animation--started').removeClass('preloader-animation--not-started page-unloading');
                if (preloaderStyle1.length) {
                    var onPageLoad = Themerella.debounce(function() {
                        $(window).triggerHandler('resize');
                        $('body').removeClass('preloader-animation--not-started');
                    }, 250);
                    preloader.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                        onPageLoad();
                    });
                }
            };
            var pageLoad = function(event) {
                if ((typeof event !== typeof undefined || event !== null) && event.persisted) {
                    removePreloader();
                    return;
                }
                if (waitForImageELements.length) {
                    waitForImageELements.imagesLoaded({
                        background: true
                    }, function() {
                        setTimeout(function() {
                            removePreloader();
                        }, 80);
                    });
                } else {
                    removePreloader();
                }
            };
            var pageUnload = function() {
                $('body').addClass('preloader-animation--started page-unloading').removeClass('preloader-animation--not-started preloader-animation--done page-loaded');
            };
            if (preloaderStyle2.length || $('body').hasClass('preloader-style2')) {
                setTimeout(function() {
                    preloader.fadeOut();
                }, fadeDelay);
            }
            if (preloaderStyle3.length) {
                preloader.find('.curtain-back').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    preloader.fadeOut();
                    $('body').addClass('preloader-animation--done').removeClass('preloader-animation--started');
                });
            }
            $(document).ready(pageLoad);
            if ('onpagehide' in window) {
                window.addEventListener('pageshow', pageLoad, false);
                window.addEventListener('pagehide', pageUnload, false);
            } else {
                window.addEventListener('unload', pageUnload, false);
            }
        },
        backToTop: function() {
            var el = $('.site-backtotop'), $window = $(window);
            if (!el.length) {
                return;
            }
            $window.on('scroll', function() {
                if ($window.scrollTop() >= $window.outerHeight() / 2) {
                    el.addClass('is-visible');
                } else {
                    el.removeClass('is-visible');
                }
            });
        },
        accordion: function() {
            if (location.hash !== '' && $(location.hash).length) {
                var activeItemParent = $(location.hash).closest('.accordion-item');
                activeItemParent.addClass('active').find(location.hash).addClass('in');
                activeItemParent.find('.accordion-heading').find('a').attr('aria-expanded', 'true').removeClass('collapsed');
                activeItemParent.siblings().removeClass('active').find('.in').removeClass('in');
                activeItemParent.siblings().find('.accordion-heading').find('a').attr('aria-expanded', 'false').addClass('collapsed');
            }
            $('.accordion-collapse').on('show.bs.collapse', function(e) {
                var $this = $(this);
                $this.closest('.accordion-item').addClass('active');
                if (history.pushState) {
                    history.pushState(null, null, '#' + $(e.target).attr('id'));
                } else {
                    location.hash = '#' + $(e.target).attr('id');
                }
            });
            $('.accordion-collapse').on('shown.bs.collapse', function(e) {
                var $this = $(this), parent = $this.closest('.accordion-item'), $window = $(window), parentOffsetTop = parent.offset().top;
                if (parentOffsetTop <= $window.scrollTop() - 15) {
                    $('html, body').animate({
                        scrollTop: parentOffsetTop - 45
                    }, 1e3);
                }
            });
            $('.accordion-collapse').on('hide.bs.collapse', function() {
                $(this).closest('.accordion-item').removeClass('active');
            });
        },
        tabs: function() {
            if (location.hash !== '' && $(location.hash).length) {
                $(location.hash).addClass('in active').siblings().removeClass('in active');
                $('a[href=' + location.hash + ']').attr('aria-expanded', 'true').parent().addClass('active').siblings().removeClass('active').children().attr('aria-expanded', false);
            }
            $('[data-toggle=tab]').on('show.bs.tab', function(e) {
                var $this = $(this);
                if (history.pushState) {
                    history.pushState(null, null, $this.attr('href'));
                } else {
                    location.hash = $this.attr('href');
                }
                $this.parent('li').addClass('active').siblings().removeClass('active');
            });
        },
        postShare: function() {
            var postShare = $('.post-share');
            postShare.on('click', 'a:not([href="#"])', function(e) {
                e.preventDefault();
                window.open(this.href, 'rellaShareWindow', 'width=600, height=650');
            });
        },
        promoteBox: function() {
            var element = $('.promote-box.collapse');
            if (!element.length) return;
            element.on('hidden.bs.collapse', function() {
                createCookie("ra_promote_box_stats", 'hidden', 1);
            });
            if (readCookie("ra_promote_box_stats") == 'hidden') {
                element.removeClass('in');
            }
            function createCookie(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
                    var expires = "; expires=" + date.toGMTString();
                } else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            }
            function readCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        },
        blogCoverSidebar: function() {
            var blogSingleAlt = $('.blog-single-alt'), sidebarEnabled = $('body').hasClass('has-sidebar') ? true : false;
            if (blogSingleAlt.length && sidebarEnabled) {
                var contentsContainer = $('.contents-container'), sidebarContainer = $('.sidebar-container'), postHeader = $('.blog-single').find('.post-contents > header');
                sidebarContainer.css({
                    marginTop: postHeader.outerHeight(true),
                    opacity: 1
                });
            }
        },
        detectIE: function() {
            if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Trident/") > 0 && navigator.userAgent.indexOf("rv:11") > 0) {
                $('html').addClass('its-ie');
            }
        }
    };
    $(document).ready(function() {
        Themerella.init();
        Themerella.preloader();
        $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function() {
            var flickel = $('.flickity-enabled');
            if (flickel.length) {
                flickel.flickity('resize');
            }
        });
        +function($) {
            'use strict';
            function transitionEnd() {
                var el = document.createElement('bootstrap');
                var transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };
                for (var name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return {
                            end: transEndEventNames[name]
                        };
                    }
                }
                return false;
            }
            $.fn.emulateTransitionEnd = function(duration) {
                var called = false;
                var $el = this;
                $(this).one('bsTransitionEnd', function() {
                    called = true;
                });
                var callback = function() {
                    if (!called) $($el).trigger($.support.transition.end);
                };
                setTimeout(callback, duration);
                return this;
            };
            $(function() {
                $.support.transition = transitionEnd();
                if (!$.support.transition) return;
                $.event.special.bsTransitionEnd = {
                    bindType: $.support.transition.end,
                    delegateType: $.support.transition.end,
                    handle: function(e) {
                        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
                    }
                };
            });
        }(jQuery);
    });
    var wooButtonUpdate = function() {
        'use strict';
        var button = $('.woocommerce-cart .woocommerce input.update_cart');
        if (!button.length) {
            return;
        }
        if (button.attr('disabled') == 'disabled') {
            button.prop('disabled', false);
            var but = button.parent().find('button.input-generated-button');
            if (but.length) {
                but.prop('disabled', false);
            }
        }
    };
    $(document).on('spinnerAction', wooButtonUpdate);
    $(document).on('change input', 'div.woocommerce > form .cart_item :input', wooButtonUpdate);
    $(document).ajaxComplete(function(e) {
        if (typeof progressively !== typeof undefined && $('.progressive__img').length) {
            var enableProgressiveLoad = new RellaProgressiveAspectRatio();
            enableProgressiveLoad.init();
            progressively.render();
        }
    });
    $(window).on('resize', function() {
        Themerella.themeRTL();
        Themerella.blogCoverSidebar();
    });
    $(window).on('load', function() {
        Themerella.objectFitPolyfill();
    });
})(jQuery);