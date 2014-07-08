/* ========================================================================
 * HappySlider: happyslider.js v1.1
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
        params.isMouseUp = false;
        
        params.mousedown = false;
        params.startPos = 0;
        params.slideIndex = 0;
        
        /* custom options */
        var settings = $.extend({
            width: 'auto',
            height: 'auto',
            fullscreen: false,
            infiniti: false, 
            swipe: true,
            animateType: 'slide', /* slide, fade, scale */
            animateDuration: 300,
            animateEase: 'ease', /* css3 timing-function */
            animateCallback: function($el){
            },
        }, options);
        
        if(this.data('happyslider-options') !== 'undefined'){
            settings = $.extend(settings, this.data('happyslider-options'));   
        }
        
        console.log('settings', settings);
        
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
            
            if(settings.fullscreen){
                settings.width = $(window).width();
                settings.height = $(window).height();                
            }
            console.log('1', $(window).width(), $el.css('width'));
            $el.css('width', settings.width).css('height', settings.height); 
            console.log('2', $(window).width(), $el.css('width'));
            if(!$item.is('.active')){
                $item.eq(0).addClass('active');    
            }
            
            if(!settings.infiniti || params.slideIndex == 0){
                $el.find(params.previous).addClass('dissable');
            }else{
                $el.find(params.previous).removeClass('dissable');    
            }

            //console.log('$.fn.happyslider -> render', 'width', $(window).width(), $el.css('width'));        
        }
        
        function slidesChangeEvent(_this){
            var $el = $(_this).closest(params.el)
            ,   $item = $el.find(params.item)
            ,   index = $el.index(params.el)
            ,   slideIndex = $item.index($item.filter('.active'))
            ;

            if(!settings.infiniti && $(_this).is(params.previous) && slideIndex > 0){
                slideIndex--;    
            }
                
            if(!settings.infiniti && $(_this).is(params.next) && slideIndex < $item.length - 1){
                slideIndex++;    
            }
            
            params.slideIndex = slideIndex;
            animate(index, slideIndex);
                
            //console.log('$.fn.happyslider -> click.happyslider', 'slideIndex', slideIndex, $item.length - 1);  
        }
        
        function slidesSwipeEvent(e){
            var $el = $(e.target).closest(params.el)
            ,   $item = $el.find(params.item)
            ,   index = $el.index(params.el)
            ,   itemWidth = $item.width()
            ,   distance = 0
            ;
            
            if(e.type == 'drag'){
                e.preventDefault();
                //console.log('drag');
            }
            
            if(e.type == 'mousedown'){
                params.mousedown = true;
                params.startPos = e.pageX;
                                
                $this.addClass('grabbing');
                $this.removeClass('grab');
                
                e.preventDefault();
                //console.log('mousedown');
            }
                        
            if(e.type == 'mouseup'){
                params.mousedown = false;
                params.startPos = e.pageX;
                
                $this.removeClass('grabbing');
                $this.addClass('grab');
                
                if(!params.isMouseUp){
                    return false;
                }
                
                params.isMouseUp = false;
                
                $item.removeClass('active');
                $item.eq(params.slideIndex).addClass('active'); 
                                
                animate(index, params.slideIndex);
                //console.log('mouseup');
            }
                        
            if(e.type == 'mouseout'){
                $(e.target).trigger('mouseup');
                //console.log('mouseout');
            }
                        
            if(e.type == 'mousemove' && params.mousedown){
                distance = e.pageX - params.startPos;
                params.slideIndex = touchmove(index, distance, {x: e.pageX, y: e.pageY});
                params.isMouseUp = true;
                //console.log('dragmove');
            } 
            
            if(e.type == 'touchstart'){
                params.startPos = e.originalEvent.touches[0].pageX;
                e.preventDefault();
                //console.log('touchstart');      
            }
            
            if(e.type == 'touchmove'){
                var touch = e.originalEvent.touches[0];
                distance = touch.pageX - params.startPos;
                params.slideIndex = touchmove(index, distance, {x: touch.pageX, y: touch.pageY});
                e.preventDefault();
                //console.log('touchmove', distance);
            }
            
            if(e.type == 'touchend'){
                animate(index, params.slideIndex);
                //console.log('touchend');   
            }
        }
        
        function animate(index, slideIndex){
            if(params.isAnimate){
                return false;
            }
                        
            params.isAnimate = true;
            
            var index = index || 0
            ,   $el = $this.eq(index)
            ,   $container = $el.find(params.container)
            ,   $wrap = $el.find(params.wrap)
            ,   $item = $el.find(params.item)
            ,   slideIndex = slideIndex || 0
            ,   itemWidth = $item.width()
            ,   top = 0
            ,   left = - itemWidth * slideIndex
            ;
            
            if(slideIndex == 'undefined'){
                slideIndex = $item.index($item.filter('.active'));
            }
            
            $item.css('transition', 'all ' + settings.animateDuration + 'ms ' + settings.animateEase);
                
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
            
            if(settings.animateType == 'scale' && typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                $item.filter('.active').css('transform' , 'scale(0, 0)').css('opacity', 0); 
                $item.eq(slideIndex).css('transform' , 'scale(1, 1)').css('opacity', 1); 
            }
            
            if(!settings.infiniti && slideIndex >= $item.length - 1){
                $el.find(params.next).addClass('dissable');
            }else{
                $el.find(params.next).removeClass('dissable');    
            }
            
            if(!settings.infiniti && slideIndex <= 0){
                $el.find(params.previous).addClass('dissable');
            }else{
                $el.find(params.previous).removeClass('dissable');    
            }
            
            setTimeout(function(){
                params.isAnimate = false;
                
                $item.removeClass('active');
                $item.eq(slideIndex).addClass('active');
                $item.css('transition', 'none');
                
                $el.find(params.previous).removeClass('active');
                $el.find(params.next).removeClass('active');
                
                if(settings.animateType == 'scale'){
                    $item.not('.active').css('transform' , 'scale(0, 0)').css('opacity', 0);   
                }

                settings.animateCallback();    
            }, settings.animateDuration);
            
            //console.log('$.fn.happyslider -> animate', 'slideIndex', slideIndex, 'left', left);
        }
        
        function touchmove(index, distance, position){
            var index = index || 0
            ,   $el = $this.eq(index)
            ,   $item = $el.find(params.item)
            ,   itemLength = $item.length
            ,   itemWidth = $item.width()
            ,   slideIndex = $item.index($item.filter('.active'))
            ,   offsetRight
            ,   offsetLeft
            ,   top = 0
            ,   left = - itemWidth * slideIndex
            ;  
            
            $item.css('transition', 'none');
            
            position.x = position.x - $el.position().left;
            position.y = position.y - $el.position().top;
            
            left = left + distance;
            offsetRight = (itemWidth * (slideIndex+1) - itemWidth * 0.75) * -1;
            offsetLeft = (itemWidth * slideIndex - itemWidth * 0.25) * -1;

            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d){
                $item.css('transform' , 'translate3d('+left+'px,'+top+'px, 0px)');    
            }        
            
            else if(typeof Modernizr != 'undefined' && Modernizr.csstransforms){
                $item.css('transform' , 'translate('+left+'px,'+top+'px)');   
            } 
                
            else{
                $item.css('left' , left).css('top' , top);                       
            } 
            
            if(distance < 0 && slideIndex >= 0 && slideIndex < itemLength - 1 && left < offsetRight){
                $el.find(params.next).addClass('active');
                return slideIndex + 1;
            }else{
                $el.find(params.next).removeClass('active');    
            }
            
            if(distance >= 0 && slideIndex > 0 && slideIndex <= itemLength - 1 && left >= offsetLeft){
                $el.find(params.previous).addClass('active');
                return slideIndex - 1;   
            }else{
                $el.find(params.previous).removeClass('active');    
            }
            
            //console.log('$.fn.happyslider -> touchmove', 'distance', distance, 'slideIndex', slideIndex, 'itemLength', itemLength, 'left', left, 'offsetLeft', offsetLeft);
            
            return slideIndex;
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
        
        /* handle events for next, prev click */
        addEvents({
            selector: 'body',
            event: 'click.happyslider',
            target: params.el + ' ' + params.previous + ', ' + params.el + ' ' + params.next,
            callback: function(e){
                slidesChangeEvent(e.target);         
            }
        });
        
        if(settings.swipe && settings.animateType == 'slide'){
            /* handle events for touch */
            $this.addClass('grab');
            
            addEvents({
                selector: params.wrap,
                event: 'touchstart.happyslider touchend.happyslider touchmove.happyslider drag.happyslider mousedown.happyslider mouseup.happyslider mouseout.happyslider mousemove.happyslider',
                callback: function(e){
                    slidesSwipeEvent(e);
                }
            });  
        }
        
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