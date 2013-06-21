/*
                            
nipple.js

*/

/*global window, document, $ */

var nipple = window.nipple || {};

/************ Helpers ***********/

// Function Binder

var functionBinder = function(fn, me) {
    'use strict';
    return function () {
        return fn.apply(me, arguments);
    };
};

// Mobile Detect

var mobileDetect = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; 
}

/********** End Helpers *********/

TouchObject = (function() {

    function TouchObject(startX,startY,curX,curY) {
        this.startX = startX;
        this.startY = startY;
        this.curX = curX;
        this.curY = curY;
    };

    return TouchObject;

})();


nipple = (function() {

    'use strict';

    function nipple(element, options) {

        var defaults = {
            longPressLength: 750,
            leftSelect: null,
            upSelect: null,
            rightSelect: null,
            downSelect: null
        };

        this.touchObject = null;
        this.circleNav = null;
        this.circleLabel = null;
        this.targetList = $(element);
        this.targetListLeft = this.targetList.find('ul li.left a');
        this.targetListUp = this.targetList.find('ul li.up a');
        this.targetListRight = this.targetList.find('ul li.right a');
        this.targetListDown = this.targetList.find('ul li.down a');
        this.currentSelection = null;

        this.options = $.extend({}, defaults, options);

        this.handleTouch = functionBinder(this.handleTouch, this);
        this.checkTouch = functionBinder(this.checkTouch, this);

        this.init();

    }

    nipple.prototype.init = function() {

        this.targetList.hide();
        this.initializeEvents();
    
    };

    nipple.prototype.initializeEvents = function() {

        $('body').on('touchstart', {message: 'touchstart'}, this.handleTouch);
        $('body').on('touchmove', {message: 'touchmove'}, this.handleTouch);
        $('body').on('touchend', {message: 'touchend'}, this.handleTouch);
        $('body').on('touchcancel', {message: 'touchcancel'}, this.handleTouch);
    
    }

    nipple.prototype.handleTouch = function(event) {
        var message = event.data.message, touches = event.originalEvent.touches, touchTimeout = null;

        switch (message) {

        case 'touchstart':

            touchTimeout = setTimeout(this.checkTouch, this.options.longPressLength);

            this.touchObject = new TouchObject(touches[0].pageX, touches[0].pageY, touches[0].pageX, touches[0].pageY);

        break;

        case 'touchmove':

            if (this.circleNav && this.circleNav.length > 0) {
                event.preventDefault();
                this.touchObject.curX = touches[0].pageX, this.touchObject.curY = touches[0].pageY;
                this.checkQuadrant();
            }

            this.touchObject.curX = touches[0].pageX, this.touchObject.curY = touches[0].pageY;

        break;

        case 'touchend':

            clearTimeout(touchTimeout);

            this.touchObject = {};

            this.selectHandler();

        break;

        case 'touchcancel':

            clearTimeout(touchTimeout);

            this.touchObject = {};

            this.selectHandler();

        break;

        }

    }

    nipple.prototype.selectHandler = function() {

        var self = this;

        if (this.circleNav && this.circleNav.length > 0) {

            if (this.currentSelection !== null) {

                switch (this.currentSelection) {

                case 'left':
                    this.circleNav.remove();
                    this.currentSelection = null;
                    this.circleNav = null;
                    if (this.options.leftSelect !== undefined) {
                        this.options.leftSelect();
                    }
                break;

                case 'up':
                    this.circleNav.remove();
                    this.currentSelection = null;
                    this.circleNav = null;
                    this.currentSelection = null;
                    if (this.options.upSelect !== undefined) {
                        this.options.upSelect();
                    }
                break;

                case 'right':
                    this.circleNav.remove();
                    this.currentSelection = null;
                    this.circleNav = null;
                    this.currentSelection = null;
                    if (this.options.rightSelect !== undefined) {
                        this.options.rightSelect();
                    }
                break;

                case 'down':
                    this.circleNav.remove();
                    this.currentSelection = null;
                    this.circleNav = null;
                    this.currentSelection = null;
                    if (this.options.downSelect !== undefined) {
                        this.options.downSelect();
                    }
                break;

                }
            } else {

                this.circleNav.remove();
                this.circleNav = null;
                this.currentSelection = null;

            }
        }

    };

    nipple.prototype.checkTouch = function() {

        var self = this;

        if (this.touchObject.curX !== null) {
            
            if(this.checkPress() === 0 && this.circleNav === null){

                this.circleNav = $('<div class="circle"/>').appendTo(document.body).css({left: this.touchObject.curX, top: this.touchObject.curY});

                setTimeout(function(){
                    self.circleNav.addClass('zoom-up');
                    self.circleLabel = $('<span class="label"></span>').appendTo(self.circleNav);
                    self.targetList.find('ul').clone().appendTo(self.circleNav);
                }, 100);

            }

        }

    }

    nipple.prototype.checkPress = function() {
        
        var xDiff,yDiff, touchDiff = null;

        xDiff = this.touchObject.startX -  this.touchObject.curX;

        yDiff = this.touchObject.startY - this.touchObject.curY;

        return Math.round(Math.atan2(yDiff, xDiff));

    };

    nipple.prototype.checkQuadrant = function() {

        var circlePosition, circleX, circleY, xDiff, yDiff, touchDiff, touchAngle, touchDist = null;

        circlePosition = this.circleNav.position();

        circleX = circlePosition.left, circleY = circlePosition.top;

        xDiff = circleX -  this.touchObject.curX;

        yDiff = circleY - this.touchObject.curY;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 25 && xDiff < 100) {
                this.circleNav.removeClass('up down right').addClass('left');
                this.circleLabel.text(this.targetListLeft.data('title'));
                this.currentSelection = "left";
            } else if (xDiff < -25 && xDiff > -100) {
                this.circleNav.removeClass('up down left').addClass('right');
                this.circleLabel.text(this.targetListRight.data('title'));
                this.currentSelection = "right";
            } else {
                this.circleNav.removeClass('up left right down');
                this.circleLabel.text('');
                this.currentSelection = null;
            }
        } else if (Math.abs(yDiff) > Math.abs(xDiff)) {
            if (yDiff > 25 && yDiff < 100) {
                this.circleNav.removeClass('down left right').addClass('up');
                this.circleLabel.text(this.targetListUp.data('title'));
                this.currentSelection = "up";
            } else if (yDiff < -25 && yDiff > -100) {
                this.circleNav.removeClass('up left right').addClass('down');
                this.circleLabel.text(this.targetListDown.data('title'));
                this.currentSelection = "down";
            } else {
               this.circleNav.removeClass('up left right down');
                this.circleLabel.text('');
                this.currentSelection = null; 
            }
        } else {
            this.circleNav.removeClass('up left right down');
            this.circleLabel.text('');
            this.currentSelection = null;
        }

    };

    return nipple;

}());


$.fn.nipple = function (options) {

    'use strict';

    return this.each(function (index) {
        window.nipple = new nipple(this, options);
        return false
    });

};