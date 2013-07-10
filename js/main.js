;(function( $, window, document, undefined ) {

	'use strict';

	var Cirro				= window.Cirro || {},
			$document   = $( document ),
			$window 	  = $( window );
		
	// The polco singleton controller object
	var polco = {

		init: function(){
			var self = this;

			// Variables
			self.win                   = {};
			self.$html                 = $("html, body");
			self.docuHeight						 = $(document).height();
			self.windHeight						 = $(window).height();
			self.$toggleNav						 = $('.nav-toggle');
			self.$mainNav							 = $('.main-nav');
			self.$pageWrap						 = $('.page-wrap');
			self.$alert 							 = $('.alert-close-trigger');
			self.$introSlider					 = $('#intro-slider');
			self.$slide 							 = $('.slide');
			// Variables for isotope
			self.$container						 = $('div#bills-container');
			self.$billButoons					 = $('ul#product-buttons a');

			// Call touchstart for touchscreen functionality for mobile menu on devices
			// if ( navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) ){

			// // or just use the regular JS click events in on a computer
			// } else {

			// }

			// Click handlers
			self.$toggleNav.on('click', function(){
				self.modernizrTransition();
				self.initialScrollHeight();
			});
			self.$alert.on('click', function(){
				self.alertClose();
			});
			// Click handlers for isotope
			//self.$productButton.on('click', self.filter);

			// Init isotope
			// self.$container.isotope({
			// 	itemSelector: '.bill',
			// 	filter: '*'
			// });

			// Fade in isotope container
			self.$container.fadeIn();

			// Init methods
			self.navScrollClosed();
			self.fancyInit();
			self.flexContent();
			self.flexsliderInit();
		},

		// Utilizing Modernizer to check if CSS transition is supported by the browser
		// and if not use pure jquery/JS
		modernizrTransition: function() {
			var self = this;

			if ( Modernizr.csstransitions ) {
					
					self.navBarToggleCss();
			}
			else {
				self.navBarToggleJs();
			}			
		},

		// Toggle the Nav bar using CSS transitions
		navBarToggleCss: function() {
			var self = this;
		
				if ( self.$pageWrap.hasClass('nav-shown') !== true ) {
					self.$pageWrap.addClass('nav-shown');	
					self.$mainNav.addClass('nav-shown');	
				}
				else {
					self.$pageWrap.removeClass('nav-shown');
					self.$mainNav.removeClass('nav-shown');
				}			

		},

		// Function that grabs the scroll top when menu is initially shown
		initialScrollHeight: function() {
			var self = this;
			self.initScroll = self.theTop;
		},

		// Close the nav if user scrolls a certain amount
		navScrollClosed: function() {
			var self = this;

			self.theTop = $window.scrollTop();

			if( self.$pageWrap.hasClass('nav-shown') === true ) {
				if((self.theTop - self.initScroll)> 1000 || (self.theTop - self.initScroll) < -1000 ){
					self.$toggleNav.trigger('click');
				}
			}
		},

		// Toggle the Nav bar using JS/Jquery animate
		navBarToggleJs: function() {
			var self = this;

			// If nav is hidden, show it
			if ( self.$pageWrap.css('left')=='auto' || self.$pageWrap.css('left')=='0px' ) {
				//open nav
				self.$pageWrap.stop().animate({
					left: '-200'
				}, 250, 'linear');
				self.$mainNav.stop().animate({
					left: '-200'
				}, 250, 'linear');
				self.toggle = 1;
			} 

			// If nav is shown, hide it
			if ( self.$pageWrap.css('left')=='-200px' ) {
				//close nav
				self.$pageWrap.stop().animate({
					left: '0'
				}, 250, 'linear');
				self.$mainNav.stop().animate({
					left: '-200'
				}, 250, 'linear');
				self.toggle = 0;
			}


		},

		//init Fancybox for every div with correct hash and href
		fancyInit: function() {
			var self = this;

			$(".fancybox").fancybox({
			  helpers : {
	        overlay : {
            css : {
                'background' : 'rgba(0, 0, 0, 0.75)'
            }
	        }
    		},
    		padding: 0,
    		minWidth: 350,
    		arrows: true, 
    		beforeShow: function(){
			    $window.on('resize.fancybox', function(){
		        $.fancybox.update();
		      });
			  },
			  afterClose: function(){
			    $window.off('resize.fancybox');
			  }

			});
		},

		alertClose: function() {
			var self = this;

			if( self.$alert.css('display') !== 'none'){
				self.$alert.remove();
			} 

		},

		alertCloseJS: function() {
			var self = this;

			self.$alert.toggle();

		},

		flexsliderInit: function() {
			var self = this;

			self.$introSlider.flexslider({
				animation: "slide",
				controlNav: true,
				animationLoop: false,
				slideshow: false,
				directionNav: true,
				after: function(){
					self.flexContent();
				}
			});

		},
		flexContent: function() {
			var self = this;
			if(self.$slide.hasClass('flex-active-slide')){
				$('slide-content').fadeIn('slow');
			}
			else {
				$('slide-content').fadeOut('fast');
			}

		},

		// ISOTOPE FUNCTIONS
		filter: function(e) {
			e.preventDefault();

			var self = recipes,
					$this = $(this);

			// Filter isotope
			self.$container.isotope({filter: $this.data('filter')});

			// Adjust selected class
			self.$productButton.removeClass('selected');
			$this.addClass('selected');
		},


		// Find the width of the window
		windowWidthFunction: function() {
			var self = this;

			self.windowWidth = $window.width();

		},

	};


	// Attach the object controller to the Cirro namespace
	Cirro.polco = polco;

	// Window load
	$window.load(function(){

		var $loader = $("div#loader");
		var $html   = $("html");
		
		
		// Show site after timeout
		setTimeout(function() {

			$html.css("overflow","auto");
			$loader.fadeOut();

		}, 3000);

		 $(document).ready(function(){
   		// Target your .container, .wrapper, .post, etc.

   		self.$docuHeight = $(document).height();
   		
  	});

		// Initialize the singleton object controller after images loaded

			polco.init();

	});

	// Window scroll
	$window.scroll(function(){
		polco.navScrollClosed();
	});		

	// Window resize
	$window.resize(function(){

		polco.windowWidthFunction();


	});

}( jQuery, window, document));