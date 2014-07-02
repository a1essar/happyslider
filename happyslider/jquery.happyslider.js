/* ========================================================================
 * HappySlider: happyslider.js v1.0
 * ========================================================================
 * Copyright 2013 Happycms.ru
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * ======================================================================== 
 */
(function( $ ){
    $.fn.happyslider = function( options ) {  
        /* global var */
        var $this = this
        ,   params = {}
        ;
        
        params.el = $this.selector;
        params.container = '.js__happyslider-container';
        params.wrap = '.js__happyslider-wrap';
        params.item = '.js__happyslider-item';
        params.previous = '.js__happyslider-previous';
        params.next = '.js__happyslider-next';
        params.isAnimate = false;
        
        /* custom options */
        var settings = $.extend({
            width: $(window).width(),
            height: $(window).height(),
            infiniti: false, 
            animateType: 'slide', /* slide, fade, scale */
            animateDuration: 1000,
            animateEase: 'ease', /* css3 timing-function */
            animateCallback: function($el){
            },
        }, options);
        
        if(this.data('happyslider-options') !== 'undefined'){
            settings = $.extend(settings, this.data('happyslider-options'));    
        }
        
        console.log(settings);
        
        if(settings.animateType == 'slide'){
            $this.attr('data-happyslider-animatetype', 'slide');        
        }
            
        if(settings.animateType == 'fade'){
            $this.attr('data-happyslider-animatetype', 'fade');        
        }
        
        if(settings.animateType == 'scale'){
            $this.attr('data-happyslider-animatetype', 'scale');        
        }
        
        /* render sizes and other */
        function render(index){
            var index = index || 0
            ,   $el = $this.eq(index)
            ,   $container = $el.find(params.container)
            ,   $wrap = $el.find(params.wrap)
            ,   $item = $el.find(params.item)
            ;
            
            $el.css('width', settings.width).css('height', settings.height);
            
            if(!$item.is('.active')){
                $item.eq(0).addClass('active');    
            }

            //console.log('$.fn.happyslider -> render', 'index', index, '$el', $el, '$item', $item);        
        }
        
        function animate(index, slideIndex){
            if(params.isAnimate){
                return false;
            }
            
            params.isAnimate = true;
            
            var index = index || 0
            ,   slideIndex = slideIndex || 0
            ,   $el = $this.eq(index)
            ,   $container = $el.find(params.container)
            ,   $wrap = $el.find(params.wrap)
            ,   $item = $el.find(params.item)
            ,   itemWidth = $item.width()
            ,   top = 0
            ,   left = - itemWidth * slideIndex
            ;
            
            $item.css('transition', 'all ' + settings.animateDuration/1000 + 's ' + settings.animateEase);
                
            if(settings.animateType == 'slide'){
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $item.css('transform' , 'translate3d('+left+'px,'+top+'px, 0px)');    
                } 
                
                else if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $item.css('transform' , 'translate('+left+'px,'+top+'px)');   
                } 
                
                else if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $item.css('left' , left).css('top' , top);                       
                }  
                
                else{
                    $item.stop().animate({'left' : left, 'top' : top}, settings.animateDuration, settings.animateEase, function(){    
                    });  
                }      
            }
            
            if(settings.animateType == 'fade'){
                $item.css('opacity', 0);
                $item.eq(slideIndex).css('opacity', 1);
            }
            
            if(settings.animateType == 'scale'){
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $item.filter('.active').css('transform' , 'scale(0, 0)').css('opacity', 0); 
                    $item.eq(slideIndex).css('transform' , 'scale(1, 1)').css('opacity', 1); 
                }    
            }
            
            setTimeout(function(){
                params.isAnimate = false;
                
                $item.removeClass('active');
                $item.eq(slideIndex).addClass('active');
                $item.css('transition', 'none');
                
                if(settings.animateType == 'scale'){
                    $item.not('.active').css('transform' , 'scale(0, 0)').css('opacity', 0);   
                }

                settings.animateCallback();    
            }, settings.animateDuration);
        }
        
        function addEvents(e){
            if(e.target !== 'undefined'){
                $(e.selector).on(e.event, e.target, function(event){
                    e.callback(event);    
                });     
            }else{
                $(e.selector).on(e.event, function(event){
                    e.callback(event);    
                });    
            }
        }
        
        /* plugin initialize */
        function pluginInitialize(index, el){
            $this.initializeTime = Date.now();
            render(index);
            
            //console.log('$.fn.happyslider -> pluginInitialize', 'index', index, 'el', el, params.el);
        };
        
        /* handle events for resizes */
        addEvents({
            selector: window,
            event: 'load.happyslider resize.happyslider orientationchange.happyslider',
            callback: function(){
                $this.each(render); 
            }
        });
        
        addEvents({
            selector: 'body',
            event: 'click.happyslider',
            target: params.el + ' ' + params.previous + ', ' + params.el + ' ' + params.next,
            callback: function(event){
                var $el = $(event.target).closest(params.el)
                ,   $item = $el.find(params.item)
                ,   index = $el.index(params.el)
                ,   slideIndex = $item.index($item.filter('.active'))
                ;
                
                if(!settings.infiniti && $(event.target).is(params.previous) && slideIndex > 0){
                    slideIndex--;    
                }
                
                if(!settings.infiniti && $(event.target).is(params.next) && slideIndex < $item.length - 1){
                    slideIndex++;    
                }
    
                animate(index, slideIndex);
                
                //console.log('$.fn.happyslider -> click.happyslider', 'params.el', params.el);                   
            }
        });
        
        //console.log('$.fn.happyslider ->', 'params.el', params.el);
        
        return this.each(pluginInitialize);
    };
    
    function dataInit(){
        if($('[data-happyslider]').length > 0){
            $('[data-happyslider]').happyslider();
        }
    }
    
    $(function() {
        dataInit();
    });
})( jQuery );