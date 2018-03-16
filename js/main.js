
function main() {

(function () {
   'use strict';

   /* ==============================================
  	Testimonial Slider
  	=============================================== */ 

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('load', function() {
        var navHeight = $(window).height() - 700;
        if ($(window).scrollTop() > navHeight) {
			$('.navbar-default.home').addClass('on');
			$('#menu img').css('max-height', '32px')
        } else {
            $('.navbar-default.home').removeClass('on');
			$('#menu img').css('max-height', '77px')
        }
		});
    $(window).bind('scroll', function () {
        var navHeight = $(window).height() - 700;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default.home').addClass('on');
            $('#menu img').css('max-height', '32px')
        } else {
            $('.navbar-default.home').removeClass('on');
            $('#menu img').css('max-height', '77px')
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });

  	/*====================================
    Portfolio Isotope Filter
    ======================================*/
	$(window).load(function () {
	    new WOW().init();
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });

  	/*====================================
    CounterUp
    ======================================*/	

	$(document).ready(function( $ ) {
		if($("span.count").length > 0){	
			$('span.count').counterUp({
					delay: 10, // the delay time in ms
			time: 1000 // the speed time in ms
			});
		}
	});
	
}());


}
main();