/* ========================================================================
 * HappySlider: happyslider.js v0.1
 * ========================================================================
 * Copyright 2013 Happycms.ru
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * ======================================================================== 
 */
(function( $ ){
    $.fn.happyslider = function( options ) {  
        var $this
        ,   happysliderContainer
        ,   happysliderWrap
        ,   happysliderItem
        ,   happysliderNext
        ,   happysliderPrev
        
        ,   happysliderPagination
        ,   happysliderPaginationItem
        
        ,   happysliderContainerW
        ,   happysliderWrapW
        
        ,   windowW
        
        ,   happysliderItemPages
        ;
        
        var settings = $.extend( {
            pagination: true,
            paginationNumber: true,
            mousewheel: true,
            swipe: true,
            swipeMobileOnly: false,
            
            responsiveBreakpointSm: 768,
            responsiveBreakpointMd: 992,
            responsiveBreakpointLg: 1200,
            
            responsiveBreakpointXsCol: 1,
            responsiveBreakpointSmCol: 2,
            responsiveBreakpointMdCol: 4,
            responsiveBreakpointLgCol: 6,
            
            currentPage: 1,
            
            callback: function() {},
        }, options);
        
        function init(){
            $this = $(this);
            
            render();
        };
        
        function render(){
            happysliderContainer = $this.find('.js__happyslider-container')
            ,   happysliderWrap = $this.find('.js__happyslider-wrap')
            ,   happysliderItem = $this.find('.js__happyslider-item')

            ,   happysliderNext = $this.find('.js__happyslider-next')
            ,   happysliderPrev = $this.find('.js__happyslider-prev')            

            ,   happysliderPagination = $this.find('.js__happyslider-pagination')
            
            ,   happysliderContainerW = parseInt(happysliderContainer.css('width'))
            ,   happysliderWrapW = parseInt(happysliderWrap.outerWidth(true))
            ,   happysliderWrapH = parseInt(happysliderWrap.outerHeight(true))
            
            ,   windowW = $(window).width()
            
            ,   happysliderItemPages = Math.ceil(happysliderWrapW/happysliderContainerW) - 1
            ,   happysliderItemSize = happysliderItem.length
            ;

            happysliderContainer
            .css('height', happysliderWrapH);    
            
            renderResponsiveContainer();
            
            happysliderNext.off('click.happyslider').on('click.happyslider', slideNext);
            happysliderPrev.off('click.happyslider').on('click.happyslider', slidePrev);
            
            if(settings.pagination == true){
                renderPagination();
            }   
            
            if(settings.mousewheel == true){
                happysliderContainer.off('mousewheel.happyslider').on('mousewheel.happyslider', slideMousewheel);    
            }
            
            if(settings.swipe == true && settings.swipeMobileOnly == true && typeof Modernizr != 'undefined' && Modernizr.touch || settings.swipe == true && settings.swipeMobileOnly == false){
                happysliderContainer.off('swipeleft.happyslider').on('swipeleft.happyslider', slideNext); 
                happysliderContainer.off('swiperight.happyslider').on('swiperight.happyslider', slidePrev);    
            }
        }
        
        function renderResponsiveContainer(){
            if(windowW < settings.responsiveBreakpointSm){
                happysliderItem.css('width', happysliderContainerW/settings.responsiveBreakpointXsCol);
            }
            
            if(windowW >= settings.responsiveBreakpointSm && windowW < settings.responsiveBreakpointMd){
                happysliderItem.css('width', happysliderContainerW/settings.responsiveBreakpointSmCol);
            }
            
            if(windowW >= settings.responsiveBreakpointMd && windowW < settings.responsiveBreakpointLg){
                happysliderItem.css('width', happysliderContainerW/settings.responsiveBreakpointMdCol);
            }
            
            if(windowW >= settings.responsiveBreakpointLg){
                happysliderItem.css('width', happysliderContainerW/settings.responsiveBreakpointLgCol);
            }            
            
            slide();
        }
        
        function renderPagination(){
            if(happysliderPagination.length <= 0){
                $this.append('<div class="js__happyslider-pagination happyslider-pagination"></div>');    
            }
            
            happysliderPagination.html('');
            
            for(var i = 0; i <= happysliderItemPages; i++){
                if(settings.paginationNumber == true){
                    happysliderPagination.append('<div class="js__happyslider-pagination-item happyslider-pagination-item">'+parseInt(i+1)+'</div>');  
                }else{
                    happysliderPagination.append('<div class="js__happyslider-pagination-item happyslider-pagination-item"></div>');    
                }
            }
            
            updadePaginationItemState();
            happysliderPaginationItem.on('click.happyslider', slidePagination);
        }
        
        function updadePaginationItemState(){
            happysliderPaginationItem = $this.find('.js__happyslider-pagination-item');
            
            happysliderPaginationItem.removeClass('active');
            happysliderPaginationItem.eq(settings.currentPage).addClass('active');            
        }
        
        function slide(){
            if(happysliderWrap.is(':animated')){
                return false;
            }
            
            if(happysliderPagination.length > 0){
                updadePaginationItemState();                
            }
            
            if(settings.currentPage > happysliderItemPages){
                settings.currentPage = happysliderItemPages;
                updadePaginationItemState();
            }
            
            var slideOffset = -settings.currentPage * happysliderContainerW;
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d){
                happysliderWrap.css('transform', 'translate3d('+slideOffset+'px,0,0)'); 
                return true;     
            } 
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransforms){
                happysliderWrap.css('transform', 'translate('+slideOffset+'px,0)'); 
                return true;     
            } 
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                happysliderWrap.css('left', slideOffset); 
                return true;     
            }  
            
            happysliderWrap.animate({'left': slideOffset}, 1000, 'swing', function(){
                return true;     
            }); 
                
        }
        
        function slideNext(e){
            e.preventDefault();
            
            if(settings.currentPage>=happysliderItemPages){
                return false;
            }
            
            settings.currentPage++;
            slide();
        }
        
        function slidePrev(e){
            e.preventDefault();
            
            if(settings.currentPage<=0){
                return false;
            }
            
            settings.currentPage--;
            slide();
        }
        
        function slidePagination(e){
            e.preventDefault(); 
            
            settings.currentPage = $(e.currentTarget).index('.js__happyslider-pagination-item');
            slide();
        }
        
        function slideMousewheel(e){
            if(e.deltaY < 1){
                slideNext(e);
            }else{
                slidePrev(e);    
            }
        }
        
        $(window).on('load resize orientationchange', function(){
            render(); 
        });
        
        return this.each(init);
    };
})( jQuery );