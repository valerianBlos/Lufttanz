/*
  - Focuspoint geht noch nicht
  - menu tauscht noch nicht richtig pfeile aus
  -  slide down für startseite programmieren
  */

/*---------------------- 
LUFTTANZ MAIN JavaScript
-----------------------*/

/*---------------------- 
GLOBAL VARIABLES
-----------------------*/
var mobileSize = false;
var tabletSize = false;
var stickyMenueActive = false;
var desktopSize = false
var scrollTimeout; //undefined function for scroll event
var bottomHeadline; //global var for Project Headline
var backgroundVideoInit = false;

  //Sizes for Window View Points
  var MobileMaximumWidth = 749;
  var TabletMaximumWidth = 999;
  var breakPointMobile = 450;

/*---------------------- 
KONSTRUKTOR FUNCTION
-----------------------*/

function _mainConstructor()
{
      //fadein the main Wrapper on Load
      initTheMenue();
      subMenuAccordion();
      resizeRect();
      $('.focuspoint').focusPoint();
      //$("#startVideoTeaser").fitVids();
      //$("#portfolioImageShowProject div").fitVids();

      checkWindowSize();
      generalAnimation(); //text expand
      expandTextToggle(); //show project infos at the gallery
      theMosaicFunction();
      $('.submenuMini').each(function(){$(this).slideToggle();});
      initSlick();

          //Check if Startsite - if so: init fullpage plugin, deactivate breadcrumps and align videoContainer
          if (window.location.pathname == "/html/" || window.location.pathname == "/Lufttanz/dev/index.php" || window.location.pathname == "/html/index.php")
          {
            $('#fullpage').fullpage({
              loopBottom: true,

              onLeave: function(index, nextIndex, direction){
                $(".fullscreenHeadlineBox").fadeOut(100,'swing');
              },

              afterLoad: function(anchorLink, index){
                $(".fullscreenHeadlineBox").delay( 300 ).fadeIn(400,'swing');
              }

            });

            $(".headlineBoxArrowDown").click(function(e)
            {
             e.preventDefault();
             $.fn.fullpage.moveSectionDown();

           });

            $('#breadcrumps').css("display", "none");
            var heigtMenue = $("#theMenu").height();
            var heightTextBox = $("#headlineBoxNumber01").height();
            var heightViewport = $(window).height() - (heightTextBox + heigtMenue);
            var heightVideoContainer = $("#startVideoTeaser").height();
            $(".videoStartFullscreen").css("padding-top", heightViewport-heightVideoContainer);

            backgroundVideo();

            $("#soundControll").on( 'click', function() {
              toggleSound();
            });

            //deactivate video autoplay and loop for mobile devices so it wont restart 
            if(mobileSize == true)
            {
              $('video').removeAttr("autoplay");
              $('video').removeAttr("loop");
            }
            
          }

        }

/*---------------------- 
GENERAL CONTROLL AND OPTION VARIABLES
-----------------------*/

function checkWindowSize()
{
          //mobile
          if($(window).width() <= MobileMaximumWidth)
          {
            mobileSize = true;
            tabletSize = false;
            desktopSize = false;
          }
          //tablet
          if($(window).width() <= TabletMaximumWidth && $(window).width() >= MobileMaximumWidth)
          {
            mobileSize = false;
            tabletSize = true;
            desktopSize = false;
          }
          //desktop
          if($(window).width() >= TabletMaximumWidth+1)
          {
            mobileSize = false;
            tabletSize = false;
            desktopSize = true;
          }
          //console.log(mobileSize + " " + tabletSize + " " + desktopSize );
        }

        function backgroundVideo()
        {

          backgroundVideoInit = true;
            /*THE VIDEO FUNCTION FOR STARTSITE
            */        
              // IE detect
              function iedetect(v) {

                var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
                return r.test(navigator.userAgent);

              }

              // For mobile screens, just show an image called 'poster.jpg'. Mobile
              // screens don't support autoplaying videos, or for IE.
              if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {

                (adjSize = function() { // Create function called adjSize

                  $width = $(window).width(); // Width of the screen
                  $height = $(window).height(); // Height of the screen
                  
                  // Resize image accordingly
                  $('#container').css({
                    'background-image' : 'url(images/fullscreenStart.jpg)', 
                    'background-size' : 'cover', 
                    'width' : $width+'px', 
                    'height' : $height+'px'
                  });
                  
                  // Hide video
                  $('video').hide();
                  
                })(); // Run instantly
                
                // Run on resize too
                $(window).resize(adjSize);
              }
              else {

                // Wait until the video meta data has loaded
                $('#container video').on('loadedmetadata', function() {

                  var $width, $height, // Width and height of screen
                    $vidwidth = this.videoWidth, // Width of video (actual width)
                    $vidheight = this.videoHeight, // Height of video (actual height)
                    $aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width are in

                  (adjSize = function() { // Create function called adjSize

                    $width = $(window).width(); // Width of the screen
                    $height = $(window).height(); // Height of the screen

                    $boxRatio = $width / $height; // The ratio the screen is in

                    $adjRatio = $aspectRatio / $boxRatio; // The ratio of the video divided by the screen size

                    // Set the container to be the width and height of the screen
                    $('#container').css({'width' : $width+'px', 'height' : $height+'px'}); 

                    if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
                      // Set the width of the video to the screen size multiplied by $adjRatio
                      $vid = $('#container video').css({'width' : $width*$adjRatio+'px'}); 
                    } else {
                      // Else just set the video to the width of the screen/container
                      $vid = $('#container video').css({'width' : $width+'px'});
                    }

                  })(); // Run function immediately



                });
}
}

    //theMosaicFunction to Sort Elements in AllProejects
    function theMosaicFunction()
    {
      console.log("asdad");
      var $grid = $('.previewPortfolio').isotope({
            // options
            itemSelector: '.linkToProject',
            layoutMode: 'fitRows',
            getSortData: {
              eventshow: '.eventshow',
              culturalProduction: '.culturalProduction',
              weight: function( itemElem ) {
                var weight = $( itemElem ).find('.weight').text();
                return parseFloat( weight.replace( /[\(\)]/g, '') );
              }
            }
          });

          // sort items on button click
          $('.allProjectsMenue ul li').on( 'click', 'a', function() {
            var sortByValue = $(this).attr('data-filter');
            $grid.isotope({ filter: sortByValue });

            $(".allProjectsMenue ul li a").each(function(){
              $(this).removeClass("blueLink");
            });

            $(this).addClass("blueLink");

          });
        }

        function toggleSound()
        {
          if($("video").prop('muted'))
          {
        $("video").prop('muted', false); //unmute
        $("#soundControll").removeClass("soundOff");
        $("#soundControll").addClass("soundOn");

      }
      else
      {
        $("video").prop('muted', true); //unmute
        $("#soundControll").addClass("soundOff");
        $("#soundControll").removeClass("soundOn");
      }

      if(mobileSize == true)
      {
        $('video').trigger('play');
      }
    }

/*---------------------- 
THE MENU
-----------------------*/

function initTheMenue()
{
          // 0 = hide, 1 = visible
          var menuState = 0;
          $(".btn-select").on("click",function() {
            event.stopPropagation();
            if(menuState === 0) {
              $(".mini-menu-options").slideDown("slow");
              $(this).css("background", "url('images/burgerClosed.png') no-repeat");
              menuState = 1;
            } else {
              $(".mini-menu-options").slideUp("slow");
              $(this).css("background", "url('images/icon.png') no-repeat");
              menuState = 0;
            }
          });
        }

        //animation of accordion
        function subMenuAccordion()
        {
          $(".mini-menu-options").find('li').each(function() 
          {
            $(this).on("click",function(){
              event.stopPropagation(); 
              $(this).children('.submenuMini').slideToggle(400);

              if($(this).hasClass('deactivate'))
              {
               $(this).removeClass('deactivate');
               $(this).addClass('activate');
             }
             else
             {
               $(this).removeClass('activate');
               $(this).addClass('deactivate');
             }

              //check if other submenue are open and close them
              $(this).siblings(".linkSubMenu").each(function(){
                if($(this).hasClass("activate"))
                {
                  $(this).children('.submenuMini').slideUp(); //
                  $(this).removeClass('activate');
                  $(this).addClass('deactivate');       
                }
              });
            });
          });  

          $(document).click( function(){
            $(".mini-menu-options").slideUp("slow");
          });  
        }

/*---------------------- 
GENERAL STYLING
-----------------------*/

      //expand text
      function generalAnimation()
      {
        if(mobileSize == true)
        {
          var showChar = 200;
          var ellipsestext = "...";
          var moretext = "<br/><br/>More";
          var lesstext = "<br/><br/>Less";
          $('.textWrapper').each(function() {
            var content = $(this).html();

            if(content.length > showChar) {

              var c = content.substr(0, showChar);
              var h = content.substr(showChar-1, content.length - showChar);

              var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink blueLink">' +moretext + '</a></span>';

              $(this).html(html);
            }

          });

          $(".morelink").click(function(){
            if($(this).hasClass("less")) {
              $(this).removeClass("less");
              $(this).html(moretext);
            } else {
              $(this).addClass("less");
              $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
          });
        }

        //slide up the footer after 1,5sec
        if(tabletSize == true || desktopSize == true && !$( ".showReelContainer" ).length)
        {
          $("#theFooter").delay(2000).slideDown('slow');
        }

      }

      //expand text for projectgallery with mouse over
      function expandTextToggle()
      {
        if(mobileSize == false){ //deactivate in case of mobile device
          $('.linkToProject').each(function(){

            //mouse in
            $(this).on("mouseover",function(){
              //console.log("in");
              $(this).find(".hiddenDescription").slideDown( 300, "linear" );
            });

            //mouse out
            $(this).on("mouseleave",function(){
              //console.log("out");
              $(this).find(".hiddenDescription").slideUp( 300, "linear" );
            });
          });
        }
      }

      //stop headline scrolling under image
      function stopHeadline()
      {
        if(mobileSize == true && $( ".headlineProject" ).length )
        {
          var bottomImage = $('.portfolioImageShowProject').position().top+$('.portfolioImageShowProject').outerHeight(true)-$(window).scrollTop();

          if(80 >= bottomImage)
          {
            //$(".headlineProject").css("position", "absolute");
            $(".headlineProject").css("top", (bottomImage-$('.headlineProject').outerHeight(true))+ 80 + "px");
            //console.log("no!");
          }
          else
          {
            $(".headlineProject").css("top", ""); 
            //console.log("jo!");
          }
        }
      }

      //init the slick windows
      function initSlick()
      {
        $('.portfolioImageShow').slick({
          infinite: true,
          speed: 300,
          slidesToScroll: 1,
          cssEase: 'linear',
          centerMode: true,
          variableWidth: true
        });

        $('.portfolioImageShowProject').slick({
          infinite: true,
          speed: 300,
          slidesToScroll: 1,
          cssEase: 'linear',
          centerMode: true,
          variableWidth: true
        });

        $('.releatedProjects').slick({
          infinite: true,
          speed: 300,
          slidesToScroll: 1,
          cssEase: 'linear',
          centerMode: true,
          variableWidth: true
        });
      }

      // Rezize Function for all Images and Videos
      function resizeRect()
      {
            //1:1 Ratio
            if($(window).width() >= breakPointMobile)
            {
              $(".previewPortfolio .linkToProject").each(function(){
                var imageWidth =  $(this).width();

                console.log(imageWidth);
                $(this).css("height", imageWidth);
                $(this).find(".portfolioImage").css("height", imageWidth);
              });


              //1:1 Ratio for Latest Prduction
              $(".previewPortfolioLatestProduction .linkToProject").each(function(){
                var imageWidth =  $(this).width();

                $(this).css("height", imageWidth);
                $(this).find(".portfolioImage").css("height", imageWidth);
              });
            }
            /*if( $( ".portfolioImageShowProject iframe" ).length)
            {
              if(mobileSize)
              {
                $( ".portfolioImageShowProject iframe" ).height = 250;
                $( ".portfolioImageShowProject iframe" ).width = 444;
              }
              if(tabletSize)
              {
                $( ".portfolioImageShowProject iframe" ).height = 350;
                $( ".portfolioImageShowProject iframe" ).width = 622;
              }
              if(desktopSize)
              {
                $( ".portfolioImageShowProject iframe" ).height = 550;
                $( ".portfolioImageShowProject iframe" ).width = 978;
              }
            }*/
          }

/*---------------------- 
DOCUMENT READY FUNCTION
-----------------------*/
$(document).on("ready",function() {

    //init plugins and settings first
    _mainConstructor();

    //if actual site is single Project - save position of bottom headline
    if ( $( ".headlineProject" ).length ) 
    {
      bottomHeadline = $('.headlineProject').position().top+$('.headlineProject').outerHeight(true);
    }

    //fade main content in after loading site
    $("#mainWrapper").delay(100).fadeTo(400, 1, function(){});

    //check if window resize
    $( window ).resize(function() 
    {
      checkWindowSize();
      if(backgroundVideoInit){adjSize();}
      resizeRect();
    });

    // ----------------------------------  
    // In case of scrolling
    $(window).scroll(function()
    {
      stopHeadline();
    });  
    // ---------------------------------- 


  });









