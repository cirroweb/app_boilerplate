;(function( $, window, document, undefined ) {

	var $document		= $( document );
	var $window			= $( window );
	var x						= screen.width/2 - 500/2;
	var y 					= screen.height/2 - 500/2;

	$document.ready(function() {
		// Facebook Button Function
		var $facebookButton = $( "a.facebook-like-button" );		

		$facebookButton.on( "click", function( event ) {


			var recipeUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
			var UrlLink = window.location.hash;
			var img = $(this).data( "img" );
			var title = $(this).data( "title" );
			console.log(encodeURIComponent(img));
			//var hashTag = UrlLink.replace(/\#/g, '%23');
			// window.open('https://www.facebook.com/sharer.php?s=100&p[title]=' + title, + '&p[url]=' + recipeUrl + hashTag + '&p[images][0]=' +img, 'left='+x+',top='+y+', width=500, height=500');
			window.open('http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent(title) + '&p[images][0]=' + encodeURIComponent(img) + '&p[url]=' + encodeURIComponent(recipeUrl + UrlLink), '_blank','left='+x+',top='+y+', width=500, height=500');

		});

		var $twitterButton = $("a.popup");

		$twitterButton.on("click", function( event ) {
			var width = 575,
					height = 400,
					left = ($(window).width() - width )/2,
					top = ($(window).height() - height)/2,
					url = this.href
					opts = 'status=1' +
					       ',width='  + width +
					       ',height=' + height +
					       ',top='    + top +
					       ',left='   + left;

					window.open(url, 'twitter', opts);

		});
		// var $pinterestButton = $( "a.pinterest-button");

		// $pinterestButton.on("click", function( event ) {
		// 	var recipeUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
		// 	var UrlLink = window.location.hash;
		// 	var img = $(this).data( "img" );
		// 	var title = $(this).data( "title" );
		// 	var hashTag = UrlLink.replace(/\#/g, '%23');

		// 	window.open('http://pinterest.com/pin/create/button/?url=' + recipeUrl + hashTag +'&media=' + img + '&description=' + title, '_blank', 'left='+x+',top='+y+', width=500, height=500');
		// });
	
	});
	
	}( jQuery, window, document ));