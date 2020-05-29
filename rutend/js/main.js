$(document).ready(function() {
	
	// -------- Menu Humb -------- //	
	let menu = $('.menu__hamb'),
			links = $('.menu__link'),
			overlay = $('.menu__hamb-overlay');

	menu.click(function() {
		toggleMenu();
	});

	links.click(function() {
		toggleMenu();
	});

	overlay.click(function() {
		toggleMenu();
	});

	function fileUpload(){
		let fileName = $('.form__file-input')[0].files[0].name;
		$('.form__path').html(fileName);
		$('.form__path').attr('title', fileName);
	}

	$('.form__file-input').on('change', fileUpload);

	function toggleMenu() {
		if ($(window).width() < '768') {
			$(menu).toggleClass('menu__hamb_active');
			$(overlay).toggleClass('menu__hamb-overlay_active');
			$('.menu__list').toggleClass('d-none').toggleClass('menu-opened');

			if(menu.hasClass('menu__hamb_active')) {
				$('body').css('overflow', 'hidden');
			} else {
				$('body').css('overflow', 'visible');
			}
		}
	};
	// --------------------------- //
});