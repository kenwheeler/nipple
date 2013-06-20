$(document).ready(function(){
	$('.nav').nipple({ 
		longPressDuration: 750, 
		leftSelect: function() {
			$('.mobile-message').text('You selected Settings!');
		},
		upSelect: function() {
			$('.mobile-message').text('You selected Home!');
		},
		rightSelect: function() {
			$('.mobile-message').text('You selected Comments!');
		},
		downSelect: function() {
			$('.mobile-message').text('You selected Favorites!');
		} 
	});
});