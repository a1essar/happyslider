/* ========================================================================
 * HappySlider: happyslider.js v1.3
 * ========================================================================
 * Copyright 2013 Happycms.ru
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * ======================================================================== 
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('happyslider', ['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    // Create the defaults once
    var happyslider = "happyslider",
        defaults = {
            width: 'auto',
            height: 'auto',
            fullscreen: false,
            infiniti: false, 
            swipe: true,
            autoHeight: false,
            animateType: 'slide', /* slide, fade, scale */
            animateDuration: 300,
            animateEase: 'ease', /* css3 timing-function */
            animateCallback: function($el){
            },
        };

    function Plugin( element, options ) {
        this.element = element;

        this.$element = $(this.element);
        this.$container = $(this.element).find('.js__happyslider-container');
        this.$wrap = $(this.element).find('.js__happyslider-wrap');
        this.$item = $(this.element).find('.js__happyslider-item');
        this.$previous = $(this.element).find('.js__happyslider-previous');
        this.$next = $(this.element).find('.js__happyslider-next');
        this.container = '.js__happyslider-container';
        this.wrap = '.js__happyslider-wrap';
        this.item = '.js__happyslider-item';
        this.previous = '.js__happyslider-previous';
        this.next = '.js__happyslider-next';
        this.isAnimate = false;
        this.isMouseUp = false,
        this.isMouseDown = false;
        this.touchDistance = 0;
        this.startPos = 0;
        this.slideIndex = 0;  
        this.itemSize = [];

        this.oldie = false;
        if(isIE() <= 9 && isIE() !== false){
            this.oldie = true;
        }
        
        this.options = $.extend( {
        }, defaults, options, $(this.element).data('happyslider-options')) ;

        this._defaults = defaults;
        this._name = happyslider;
        
        this.init();

        this.slide = this.slide;

        this.bindMethods();
        this.bindEventListeners();
    }

    Plugin.prototype = {

        init: function() {
            if(this.options.animateType == 'slide'){
                $(this.element).attr('data-happyslider-animatetype', 'slide');        
            }
                
            if(this.options.animateType == 'fade'){
                $(this.element).attr('data-happyslider-animatetype', 'fade');        
            }
            
            if(this.options.animateType == 'scale'){
                $(this.element).attr('data-happyslider-animatetype', 'scale');        
            }
            
            this.render();    
        },

        render: function() {
            this.draw();
            
            if(!this.$item.is('.active')){
                this.$item.eq(0).addClass('active');    
            }
            
            if(!this.options.infiniti || this.slideIndex == 0){
                this.$element.find(this.previous).addClass('dissable');
            }    
        },
        
        draw: function() {
            if(this.options.fullscreen){
                this.options.width = $(window).width();
                this.options.height = $(window).height();                
            }
            
            if(this.options.autoHeight){ 
                this.$item.eq(this.slideIndex).css('height', 'auto');
                this.options.height = this.$item.eq(this.slideIndex)[0].scrollHeight;  
            }
            
            this.$element.css('width', this.options.width).css('height', this.options.height);
        },
        
        slide: function(index) {
            if(index !== 'undefined' && !isNaN(index)){
                this.slideIndex = index * 1;
            }

            if(this.isAnimate){
                return false;
            }
                        
            this.isAnimate = true;
            
            var that = this;
            
            if(this.slideIndex == 'undefined'){
                this.slideIndex = this.$item.index(this.$item.filter('.active'));
            }
            
            this.$item.css('transition', 'all ' + this.options.animateDuration + 'ms ' + this.options.animateEase);
                
            if(this.options.animateType == 'slide'){
                this.animationSlide();
            }
            
            if(this.options.animateType == 'fade'){
                this.animationFade();    
            }
            
            if(this.options.animateType == 'scale'){
                this.animationScale();    
            }
            
            if(!this.options.infiniti && this.slideIndex >= this.$item.length - 1){
                this.$element.find(this.next).addClass('dissable');
            }else{
                this.$element.find(this.next).removeClass('dissable');    
            }
            
            if(!this.options.infiniti && this.slideIndex <= 0){
                this.$element.find(this.previous).addClass('dissable');
            }else{
                this.$element.find(this.previous).removeClass('dissable');    
            }
            
            setTimeout(function(){
                that.isAnimate = false;
                that.$item.removeClass('active');
                that.$item.eq(that.slideIndex).addClass('active');
                that.$item.css('transition', 'none');
                that.$element.find(that.previous).removeClass('active');
                that.$element.find(that.next).removeClass('active');                
                
                that.animationScaleCallback();
                that.options.animateCallback();
                that.draw();    
            }, that.options.animateDuration);            
        },
        
        animationSlide: function(){
            var itemWidth = this.$item.outerWidth(true)
            ,   top = 0
            ,   left = - itemWidth * this.slideIndex
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                this.$item.css('transform' , 'translate3d('+left+'px,'+top+'px, 0px)');    
            }
                
            else if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                this.$item.css('transform' , 'translate('+left+'px,'+top+'px)');   
            } 
                
            else if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                this.$item.css('left' , left).css('top' , top);                       
            }  
                
            else{
                this.$item.stop().animate({'left' : left, 'top' : top}, this.options.animateDuration, 'swing', function(){
                });  
            }                 
        },
        
        animationFade: function(){
            this.$item.css('opacity', 0);
            this.$item.eq(this.slideIndex).css('opacity', 1);            
        },
        
        animationScale: function(){
            var that = this;
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                this.$item.filter('.active').css('transform' , 'scale(0, 0)').css('opacity', 0); 
                this.$item.eq(this.slideIndex).css('transform' , 'scale(1, 1)').css('opacity', 1);                  
            }           
        },
        
        animationScaleCallback: function(){
            if(this.options.animateType == 'scale'){
                this.$item.not('.active').css('transform' , 'scale(0, 0)').css('opacity', 0);   
            }
        },
        
        touchmove: function(position){
            var itemLength = this.$item.length
            ,   itemWidth = this.$item.outerWidth(true)
            ,   slideIndex = this.$item.index(this.$item.filter('.active'))
            ,   offsetRight
            ,   offsetLeft
            ,   top = 0
            ,   left = - itemWidth * slideIndex
            ;  
            
            this.$item.css('transition', 'none');
            
            position.x = position.x - this.$element.position().left;
            position.y = position.y - this.$element.position().top;
            
            left = left + this.touchDistance;
            offsetRight = (itemWidth * (slideIndex+1) - itemWidth * 0.75) * -1;
            offsetLeft = (itemWidth * slideIndex - itemWidth * 0.25) * -1;

            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d){
                this.$item.css('transform' , 'translate3d('+left+'px,'+top+'px, 0px)');    
            }        
            
            else if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && !this.oldie){
                this.$item.css('transform' , 'translate('+left+'px,'+top+'px)');   
            } 
                
            else{
                this.$item.css('left' , left).css('top' , top);                       
            } 
            
            if(this.touchDistance < 0 && slideIndex >= 0 && slideIndex < itemLength - 1 && left < offsetRight){
                this.$element.find(this.next).addClass('active');
                return slideIndex + 1;
            }else{
                this.$element.find(this.next).removeClass('active');    
            }
            
            if(this.touchDistance >= 0 && slideIndex > 0 && slideIndex <= itemLength - 1 && left >= offsetLeft){
                this.$element.find(this.previous).addClass('active');
                return slideIndex - 1;   
            }else{
                this.$element.find(this.previous).removeClass('active');    
            }            
            
            return slideIndex;
        },
        
        onHandleNextClick: function(e){
            if(!this.options.infiniti && this.slideIndex < this.$item.length - 1){
                this.slideIndex++;    
            }
            
            this.slide();
        },
        
        onHandlePreviousClick: function(e){
            if(!this.options.infiniti && this.slideIndex > 0){
                this.slideIndex--;    
            }
            
            this.slide();
        },
        
        onHandleTouchstart: function(e){
            this.startPos = e.originalEvent.touches[0].pageX;
            e.preventDefault();
        },
        
        onHandleTouchend: function(e){
            this.slide();
        },
        
        onHandleTouchmove: function(e){
            var touch = e.originalEvent.touches[0];
            this.touchDistance = touch.pageX - this.startPos;
            this.slideIndex = this.touchmove({x: touch.pageX, y: touch.pageY});
            e.preventDefault();
        },
        
        onHandleDrag: function(e){
            e.preventDefault();
        },
        
        onHandleMousedown: function(e){
            this.isMouseDown = true;
            this.startPos = e.pageX;
                                
            this.$element.addClass('grabbing');
            this.$element.removeClass('grab');
                
            e.preventDefault();
            
            //console.log('mousedown');
        },
        
        onHandleMouseup: function(e){
            this.isMouseDown = false;
            this.startPos = e.pageX;
                
            this.$element.removeClass('grabbing');
            this.$element.addClass('grab');
                
            if(!this.isMouseUp){
                return false;
            }
                
            this.isMouseUp = false;
                
            this.$item.removeClass('active');
            this.$item.eq(this.slideIndex).addClass('active'); 
                                
            this.slide();
            
            //console.log('mouseup');
        },
        
        onHandleMouseout: function(e){
            $(e.target).trigger('mouseup');
            
            //console.log('mouseout');
        },
        
        onHandleMousemove: function(e){
            if(!this.isMouseDown){
                return false;
            }
            
            this.touchDistance = e.pageX - this.startPos;
            this.slideIndex = this.touchmove({x: e.pageX, y: e.pageY});
            this.isMouseUp = true;
            
            e.preventDefault();
            
            //console.log('mousemove');
        },
        
        bindMethods: function(){
            this.onHandleNextClick = bind(this.onHandleNextClick, this);
            this.onHandlePreviousClick = bind(this.onHandlePreviousClick, this); 
            this.onHandleTouchstart = bind(this.onHandleTouchstart, this);   
            this.onHandleTouchend = bind(this.onHandleTouchend, this);
            this.onHandleTouchmove = bind(this.onHandleTouchmove, this);
            this.onHandleDrag = bind(this.onHandleDrag, this);
            this.onHandleMousedown = bind(this.onHandleMousedown, this);
            this.onHandleMouseup = bind(this.onHandleMouseup, this);
            this.onHandleMouseout = bind(this.onHandleMouseout, this);
            this.onHandleMousemove = bind(this.onHandleMousemove, this); 
        },
        
        bindEventListeners: function(){
            addEventListener(this.$next, 'click', this.onHandleNextClick);
            addEventListener(this.$previous, 'click', this.onHandlePreviousClick);
            
            if(this.options.animateType == 'slide'){
                this.$element.addClass('grab');
                
                addEventListener(this.$wrap, 'touchstart', this.onHandleTouchstart);
                addEventListener(this.$wrap, 'touchend', this.onHandleTouchend);
                addEventListener(this.$wrap, 'touchmove', this.onHandleTouchmove);
                addEventListener(this.$wrap, 'drag', this.onHandleDrag);
                addEventListener(this.$wrap, 'mousedown', this.onHandleMousedown);
                addEventListener(this.$wrap, 'mouseup', this.onHandleMouseup);
                addEventListener(this.$wrap, 'mouseout', this.onHandleMouseout);
                addEventListener(this.$wrap, 'mousemove', this.onHandleMousemove);
            }
        }
    };

    $.fn[happyslider] = function ( options ) {
        
        // global events
        onWindowResize = bind(onWindowResize, this); 
        addEventListener($(window), 'load', onWindowResize); 
        addEventListener($(window), 'resize', onWindowResize);
        
        return this.each(function () {
            if (!$.data(this, "plugin_" + happyslider)) {
                $.data(this, "plugin_" + happyslider, new Plugin( this, options ));
            }
        });
    };
    
    function onWindowResize(e){
        this.each(function () {
            $.data(this, "plugin_" + happyslider).draw();    
        });
    }
    
    function bind(fn, context) {
        return function() {
            return fn.apply(context, arguments);
        };
    };
        
    function addEventListener(element, type, callback) {
        element.on(type, callback);
    };
        
    function removeEventListener(element, type, callback) {
        element.off(type, callback);
    };
    
    function dataInit(){
        if($('[data-happyslider]').length > 0){
            $('[data-happyslider]').happyslider();
        }
    }

    /*http://stackoverflow.com/questions/10964966/detect-ie-version-in-javascript*/
    function isIE(){
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
    
    $(function() {
        dataInit();
    });

}));