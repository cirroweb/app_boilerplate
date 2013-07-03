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
			self.$toggleNav						 = $('#toggle-nav');
			self.$pageWrap						 = $('#page-wrap');
			self.$alert 							 = $('.alert-close-trigger');



			// Call touchstart for touchscreen functionality for mobile menu on devices
			// if ( navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) ){

			// // or just use the regular JS click events in on a computer
			// } else {

			// }

			// Click handlers
			self.$toggleNav.on('click', function(){
				self.modernizrTransition();
			});
			self.$alert.on('click', function(){
				self.alertClose();
			});

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
				}
				else {
					self.$pageWrap.removeClass('nav-shown');
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
				}, 200, 'linear');
				self.toggle = 1;
			} 

			// If nav is shown, hide it
			if ( self.$pageWrap.css('left')=='-200px' ) {
				//close nav
				self.$pageWrap.stop().animate({
					left: '0'
				}, 200, 'linear');
				self.toggle = 0;
			}


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

	});		

	// Window resize
	$window.resize(function(){

		polco.windowWidthFunction();


	});

}( jQuery, window, document));