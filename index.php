<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html class="no-js" lang="en">
<!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Slider</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="happyslider/happyslider.css"/>

    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.6/jquery.mousewheel.min.js"></script>
    
    <script>$(window).on('mobileinit', function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
    <script src="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.js"></script>
    
    <script src="happyslider/jquery.happyslider.js"></script>
    
    <link href='http://fonts.googleapis.com/css?family=Josefin+Sans:700' rel='stylesheet' type='text/css'>
    
    <style>
body{
    background: rgb(202, 202, 202);
}

.happyslider-example-thumbs{
    padding: 60px;    
}

.happyslider-example-thumbs .happyslider-item{
    width: 307.25px;
}

.happyslider-example-thumbs .happyslider-item img{
    width: 100%;
}

.happyslider-pagination-item{
    color: #A0A0A0;
}

.happyslider-pagination-item.active{
    color: #000;
}

.happyslider-example-content{
    padding: 60px;    
}

.happyslider-example-content .happyslider-item{
    width: 409.6666666666667px;
}

.happyslider-example-content h3,
.happyslider-example-content p{
    white-space: normal;
}

.happyslider-example-content p{
    font-size: 14px;
}
    </style>
    
    <script>
$(function() {
    $(".js__happyslider").happyslider({
        callback: function () { 

        }
    });
    
    $(".js__happyslider-content").happyslider({
        pagination: false,
        
        responsiveBreakpointXsCol: 1,
        responsiveBreakpointSmCol: 1,
        responsiveBreakpointMdCol: 1,
        responsiveBreakpointLgCol: 1,
        
        callback: function () { 

        }
    });
});   
    </script>
    
</head>
<body style="">
    <div class="js__happyslider happyslider happyslider-example-thumbs">
        <div class="js__happyslider-container happyslider-container">
            <div class="js__happyslider-wrap happyslider-wrap">
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="1.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="2.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="3.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="4.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="5.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="6.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="7.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="8.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="9.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="10.jpg"/></a>
                </div>
                <div class="js__happyslider-item happyslider-item">
                    <a href="#"><img src="11.jpg"/></a>
                </div>
            </div>
        </div>
        <div class="js__happyslider-prev happyslider-prev">&larr;</div>
        <div class="js__happyslider-next happyslider-next">&rarr;</div>
    </div>
    
    <div class="js__happyslider-content happyslider happyslider-example-content">
        <div class="js__happyslider-container happyslider-container">
            <div class="js__happyslider-wrap happyslider-wrap">
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 1</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 2</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 3</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 4</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 5</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 6</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 7</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
                
                <div class="js__happyslider-item happyslider-item">
                    <h3 style="text-align: center;"><i class="glyphicon glyphicon-bell"></i></h3>
                    <h3>Заголовок 8</h3>
                    <p>Описание контента не самое длинное и многословное</p>
                </div>
            </div>
        </div>
        <div class="js__happyslider-prev happyslider-prev">&larr;</div>
        <div class="js__happyslider-next happyslider-next">&rarr;</div>
    </div>
</body>
</html>