/*----------------------------------------------------
TOPページ（id-of-crossfader）スライドショー
-----------------------------------------------------*/

(function($){

	$.fn.crossFader = function(options){
		var options = $.extend({
			timer: 6500,
			speed: 2500,
			changeSpd: 800,
			clickStep: true,
			random: true,
			loop: true
		}, options);
		
		return this.each(function(){
		
			// prepare elements
			var $unit = $(this);
			var $slide = $('img', $unit);
			var timerID;
			var links = $('a', $unit).length;
			var clicked = false;
			var slides = $slide.length;
			var switches = 1;

			// init
			function init(){
				slideSet();
				timerID = setInterval(function(){
					slideSwitch(options.speed);
				}, options.timer);
				
				$slide.bind('click', slideClick);
			}

			// set first image
			function slideSet(){
				$slide.removeClass('active');
				// set first image in random order, if random is true
				var $start = (options.random) ? Math.floor(Math.random() * $slide.length) : 0;
				$($slide[$start]).addClass('active');
			}
			
			// slideSwitch
			function slideSwitch(sp){
				
				//prevent from continuous click
				$slide.unbind('click');
				
				var $active = $('img.active', $unit);
				
				//for loop
				if(options.loop || switches < slides || clicked) {
					if ($active.length == 0) $active = $('img:last-child', $unit);
					switches++;
					clicked = false;
				} else {
					clearInterval(timerID);
					$slide.bind('click', slideClick);
					return;
				}
				
				//pull the images in the order they appear in the markup
				//var $next = ($active.next().length) ? $active.next() : $('img:first-child', $unit);
				if(links){
					var $next = ($active.parent("a").next().length) ? $active.parent("a").next().find('img') : $('img:first', $unit);
				} else {
					var $next = ($active.next().length) ? $active.next() : $('img:first-child', $unit);
				}
				
				//set z-index lower than "class=active"
				$active.addClass('last-active');
			
				//transition
				$next
					.css({opacity: 0.0})
					.addClass('active')
					.animate({opacity: 1.0}, sp, function(){
						$active.removeClass('active last-active');
						$slide.bind('click', slideClick);
					});
			}
			
			// slideClick Action
			function slideClick(){
				if(options.clickStep){
					clearInterval(timerID);
					clicked = true;
					slideSwitch(options.changeSpd);
					timerID = setInterval(function(){
						slideSwitch(options.speed);
					}, options.timer);
				}
			}
			
			// execute
			init();
		});
	};
})(jQuery);


$(function(){
    $('#id-of-crossfader').crossFader({
	random: true
});
});

/*----------------------------------------------------
サイドメニューアコーディオン
-----------------------------------------------------*/

$(document).ready(function () {

$('#faq .answer').not().hide();
$('#faq .question').click(function () {
if ($(this).next('.answer').is(':visible')) {
$(this).next('.answer').slideUp(300);
} else {
$(this).next('.answer').slideDown(300).siblings('.answer').slideUp(300);
}
});

});



/*----------------------------------------------------
おすすめ商品スライダー
-----------------------------------------------------*/
$(function(){
	$('#carousel').each(function(){
		var slideTime = 500;
		var delayTime = 5000;

		var carouselWidth = $(this).width();
		var carouselHeight = $(this).height();
		$(this).append('<div id="carousel_prev"></div><div id="carousel_next"></div>');
		$(this).children('ul').wrapAll('<div id="carousel_wrap"><div id="carousel_move"></div></div>');

		$('#carousel_wrap').css({
			width: (carouselWidth),
			height: (carouselHeight),
			position: 'relative',
			overflow: 'hidden'
		});

		var listWidth = parseInt($('#carousel_move').children('ul').children('li').css('width'));
		var listCount = $('#carousel_move').children('ul').children('li').length;

		var ulWidth = (listWidth)*(listCount);

		$('#carousel_move').css({
			top: '0',
			left: -(ulWidth),
			width: ((ulWidth)*3),
			height: (carouselHeight),
			position: 'absolute'
		});

		$('#carousel_wrap ul').css({
			width: (ulWidth),
			float: 'left'
		});
		$('#carousel_wrap ul').each(function(){
			$(this).clone().prependTo('#carousel_move');
			$(this).clone().appendTo('#carousel_move');
		});

		carouselPosition();

		$('#carousel_next').click(function(){
			clearInterval(setTimer);
			$('#carousel_move:not(:animated)').animate({left: '+=' + (listWidth)},slideTime,function(){
				carouselPosition();
			});
			timer();
		});
    
		$('#carousel_prev').click(function(){
			clearInterval(setTimer);
			$('#carousel_move:not(:animated)').animate({left: '-=' + (listWidth)},slideTime,function(){
				carouselPosition();
			});
			timer();
		});

		function carouselPosition(){
			var ulLeft = parseInt($('#carousel_move').css('left'));
			var maskWidth = (carouselWidth) - ((listWidth)*(listCount));
			if(ulLeft == ((-(ulWidth))*2)) {
				$('#carousel_move').css({left:-(ulWidth)});
			} else if(ulLeft == 0) {
				$('#carousel_move').css({left:-(ulWidth)});
			};
		};

		timer();

		function timer() {
			setTimer = setInterval(function(){
				$('#carousel_next').click();
			},delayTime);
		};

	});
});

