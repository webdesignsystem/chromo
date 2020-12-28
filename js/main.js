// Smoot and active nav nav

$( document ).ready(function() {


    $('.carousel').carousel('pause');

    /*
    ========================================
    Custom animation trigger
    ========================================
    */

    // Hero animation (on page load)


    $( ".c-hero .elementContainer" ).each(function( index ) {

      var thisElement = this;

      setTimeout(function(){
        $(thisElement).find('.element').addClass("up");
      }, index*100);


    });

    $('.e-tooltip').addClass("animated");


    /*
    ========================================
    ScrollMagic trigger
    ========================================
    */

    var controller = new ScrollMagic.Controller();

    //SimpleShowOff Animation

    var scrollShowOffAnimationScene = [];

    jQuery('.f-scrollShowOff').each(function(i,v){

      var thisElement = jQuery(v);

      var id = "scrollShowOff" + "_" + jQuery(v).parent().index() + "_" +  jQuery(v).index();


      // Trigger Custom

      var triggerElement = jQuery(this).data("trigger");

      if(!triggerElement){
        triggerElement = v;
      }

      // offset custom

      var screenOffset = jQuery(this).data("offset");


      if(!screenOffset){
        var screenOffset = -($(window).height() * Math.floor(Math.random() / 8));
      }



      scrollShowOffAnimationScene[id] = new ScrollMagic.Scene({triggerElement: triggerElement, offset: screenOffset, reverse: true})
      .on("enter", function () {
  			thisElement.addClass( "animated" );
  		})
  		.on("leave", function () {
  			thisElement.removeClass( "animated" );
      })
  		// .addIndicators({name: "?"}) // add indicators (requires plugin)
  		.addTo(controller)


    });


      // == Parallax Cellphone ==

      if ($(window).width() < 500) {
        cellphoneEnd = 0;
      } else {
        cellphoneEnd = -200;
      }

      var parallaxTween = new TimelineMax ()
  		.add([
  			TweenMax.fromTo(".parallax > *", 1, {top: "200"}, {top: cellphoneEnd, ease: Linear.easeNone}),
  		]);

	   var scene = new ScrollMagic.Scene({triggerElement: ".parallax", duration: $(window).width()})
          .offset(-300)
          .setTween(parallaxTween)
					// .addIndicators() // add indicators (requires plugin)
					.addTo(controller);

        // == Parallax QUOTES ==

        var parallaxTween = new TimelineMax ()
    		.add([
    			TweenMax.fromTo(".parallax-quotes > *", 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone}),
    		]);

  	   var scene = new ScrollMagic.Scene({triggerElement: ".parallax-quotes", duration: $(window).width() / 4})
            .offset(-300)
            .setTween(parallaxTween)
  					// .addIndicators() // add indicators (requires plugin)
  					.addTo(controller);


      // == Stagger by Scroll ==

      var parallaxTween = new TimelineMax ()
      .add([
        TweenMax.staggerFromTo(".stagger > *", 1, {opacity:0}, {opacity:1}, 0.2),
      ]);

     var scene = new ScrollMagic.Scene({triggerElement: ".stagger-trigger", offset: -200, reverse: true})
          .setTween(parallaxTween)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);


    /*
    ========================================
    Last and frist item carousel behavior
    ========================================
    */

    $('#carouselQuote').bind('slid.bs.carousel', function (e)
          {

              var $this = $(this);

              $('.carousel-control-next').css('opacity',1);
              $('.carousel-control-prev').css('opacity',1);

              if ($('.carousel-inner .carousel-item:last').hasClass('active'))
              {
                 $('.carousel-control-next').css('opacity',0.3);

              } else if ($('.carousel-inner .carousel-item:first').hasClass('active'))
              {
                  $('.carousel-control-prev').css('opacity',0.3);

              }
      });

});


/*
========================================
 Slick, Smooth and Active
 ========================================
*/

let mainNav = document.querySelectorAll("nav.c-sectionNavBar");
let mainNavLinks = document.querySelectorAll("nav.c-sectionNavBar ul li");
let mainSections = document.querySelectorAll("main section");
let previousSection = 0;
let currentSection = 0;

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;


  let indexSection = 0;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.querySelector('a').hash);

    indexSection = indexSection + 1;

    overlap = 0;
    offset = window.innerHeight/3;

    /*

    if(indexSection == 3) {
      overlap = -100;
      offset = window.innerHeight/2;
    }

    if(indexSection == 4) {
      overlap = 0;
      offset = 100;
    }

    if(indexSection == 5) {
      offset = 100;
      overlap = 0;
    }

    if(indexSection == 6) {
      offset = 100;
      overlap = 0;
    }

    */



    /*
    console.log(section);
    console.log("=============");
    console.log(section.offsetTop + " - " + "(" + window.innerHeight + "-" + offset + ") <= " + fromTop );
    console.log(section.offsetTop + "_ + _" + section.offsetHeight + " - (" + window.innerHeight-offset + " ) > " + fromTop );


    500 - la mitad de la pantalla es mayor que el scroll  ====> Cuando el scroll ya paso, ya inicio.
    YYYYY
    500 + el alto de la seccion

    */

    if (
      section.offsetTop - (window.innerHeight-offset) <= fromTop &&
      section.offsetTop + section.offsetHeight - (window.innerHeight-offset - overlap) >= fromTop
    ) {

      currentSection = indexSection;
      link.classList.add("active");

    } else {
      link.classList.remove("active");
    }


    if(currentSection != previousSection ) {
      previousSection = currentSection;

      /* TODO: Pasar a JS pure */

      if ($(window).width() < 500) {

        jQuery("nav.c-sectionNavBar").animate({
              scrollLeft: link.offsetLeft - 25
        }, 300);

      }


    }

  });
});

mainNavLinks.forEach(link => {
  link.querySelector('a').addEventListener("click", event => {
    event.preventDefault();

    const element = document.querySelector(event.target.hash);
    const offset = 120;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

  });
});
