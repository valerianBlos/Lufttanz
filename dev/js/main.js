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

  //Sizes for Window View Points
  var MobileMaximumWidth = 749;
  var TabletMaximumWidth = 999;

/*---------------------- 
KONSTRUKTOR FUNCTION
-----------------------*/

  function _mainConstructor()
  {
      initTheMenue();
      subMenuAccordion();
      $('.focuspoint').focusPoint(); //init focus point plugin
      $("#startVideoTeaser").fitVids();
      checkWindowSize();
      textAnimation(); //text expand
      expandTextToggle(); //show project infos at the gallery

      $('.submenuMini').each(function(){$(this).slideToggle();});

      //Check if Startsite - if so: init fullpage plugin, deactivate breadcrumps and align videoContainer
      if (window.location.pathname == "/Lufttanz/dev/index.php") 
      {
        $('#fullpage').fullpage({loopBottom: true});

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
          menuState = 1;
        } else {
          $(".mini-menu-options").slideUp("slow");
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
  function textAnimation()
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
  }

  //expand text for projectgallery with mouse over
  function expandTextToggle()
  {
    $('.linkToProject').each(function(){

      //mouse in
      $(this).on("mouseover",function(){
        console.log("in");
          $(this).find(".hiddenDescription").slideDown( 300, "linear" );
      });

      //mouse out
      $(this).on("mouseleave",function(){
        console.log("out");
          $(this).find(".hiddenDescription").slideUp( 300, "linear" );
      });
    });

  }

/*---------------------- 
DOCUMENT READY FUNCTION
-----------------------*/
  $(document).on("ready",function() {

    _mainConstructor();

  $('.portfolioImageShow').slick({
    lazyLoad: 'ondemand',
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true
  });

    //check if window resize
    $( window ).resize(function() 
    {
      checkWindowSize();
    });

  });









