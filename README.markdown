

Nipple
------

[^1]: <https://github.com/kdubbicles/nipple>

Mobile Finger Navigation
------------------------

Author: Ken Wheeler

Date: 06/20/13

Version: 1.0b

### Demo

[Demo](<http://www.dubmediagroup.com/nipple/>)

### Options

longPressLength: int - (default: 750)

leftSelect: callback function

upSelect: callback function

rightSelect: callback function

downSelect: callback function  


### Example



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### License

Copyright (c) 2013 Ken Wheeler

Dual licensed under the MIT and GPL licenses.

Free as in Bacon.


