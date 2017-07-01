// ======= МОДУЛЬ МЕНЮ =======
var AdaptiveMenu = (function() {

	var _menu = $('.nav-menu-list'),
		_link = $('.nav-menu-link'),
		_trigger = $('.nav-menu-trigger'),
		_header = $('.header'),
		_transparentBg = 'rgba(12, 39, 40, 0.3)',
		_notTransparentBg = 'rgb(12, 39, 40)';

	function init() {
		_setUpListener();
	}

	function _scrollHeader(offsetValue) {
		_link.mPageScroll2id({
			offset: offsetValue,
			onStart: function() {
				if (_menu.css('position') == 'absolute') {
					_toggleList();
				}
			}			
		});
	}

	function _toggleList() {
		_menu.stop().slideToggle(500, function() {
			if ($(this).css('display') == 'none') {
				$(this).removeAttr('style');
			}
		});
	}

	function _switchMenu(event) {
		event.preventDefault();
		_toggleList();
	}

	function _changeWidth() {
		if (window.innerWidth < 768) {
			_header.css('background', _transparentBg);
			_scrollHeader(0);
		} else {
			_scrollHeader(_header.height());
		}
	}

	function _changeScroll() {
		if (window.innerWidth > 768) {
			if ($(this).scrollTop() > 30) {
				_header.css('background', _notTransparentBg);
			} else {
				_header.css('background', _transparentBg);
			}	
		}
	}


	function _setUpListener() {
		_trigger.on('click', _switchMenu);
		$(window).on('resize', _changeWidth);
		$(document).on('scroll', _changeScroll);
		_scrollHeader(offsetValue = (window.innerWidth > 768) ? _header.height() : 0);
		if (_header.offset().top > 0) {
			_header.css('background', _notTransparentBg);
		}
	}

	return {
		init: init
	};

})();



$(document).ready(function() {

	AdaptiveMenu.init();

	$('.slider-list').bxSlider({
		mode: 'fade',
		controls: false
	});

	$('.portfolio-item').click(function(){}); // hover для iOS

});