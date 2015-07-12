/*
  - Focuspoint geht noch nicht
  - menu tauscht noch nicht richtig pfeile aus
  -  slide down für startseite programmieren
*/

$(document).on("ready",function() {
  // 0 = hide, 1 = visible
  var menuState = 0;
  //if($(".mini-menu-options").is(":hidden")) {
    $(".btn-select").on("click",function() {
      if(menuState === 0) {
        $(".mini-menu-options").slideDown("slow");
        menuState = 1;
      } else {
        $(".mini-menu-options").slideUp("slow");
        menuState = 0;
      }
    });
  //}



  $(".linkToPage").on("click",function(){
    e.preventDefault();
    console.log("hallo");
    window.location.href = $(this).attr('href');
  })

  /*$(".mini-menu-options li").on("click", function() {
      var numHijos = $(this).children().length;
      if(numHijos < 2) {
        // hide the menu
        
        $(".mini-menu-options").hide("fast");

        var texto = $(this).text();

        $(".menu-select .menu-actual").text(texto);
      }
      menuState = 0;
    });*/




  $('.mini-menu-options').find('li a').click(function(){
     //removing the previous selected menu state
      //is this element from the second level menu?
      if($(this).parent('li').hasClass('linkSubMenu')){
           $(this).parent('li').removeClass('linkSubMenu');
           $(this).parent('li').addClass('activeMiniMenu');

      //this is a parent element
      }else{
           $(this).parent('li').removeClass('activeMiniMenu');
           $(this).parent('li').addClass('linkSubMenu');
      }
  });


    $('.focuspoint').focusPoint(); //init focus point plugin
    $("#startVideoTeaser").fitVids();

    //das muss später geändert werden
    console.log(window.location.pathname);
    if (window.location.pathname == "/Lufttanz/dev/index.php") 
    {
       $('#fullpage').fullpage();
        $('#breadcrumps').css("display", "none");
      var heigtMenue = $("#theMenu").height();
      var heightTextBox = $("#headlineBoxNumber01").height();
      var heightViewport = $(window).height() - (heightTextBox + heigtMenue);
      var heightVideoContainer = $("#startVideoTeaser").height();
      $(".videoStartFullscreen").css("padding-top", heightViewport-heightVideoContainer);


    }




});