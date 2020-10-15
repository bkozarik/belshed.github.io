$(document).ready(function(){ 
	let currFloor = 1;
	try{
		currFloor = Number(sessionStorage.getItem('floor'));
	}
	catch{}

	$('.open-menu').on( 'click', function() {
		$('.header-content').addClass('active');
		$('body').addClass('overlow-mobile');
		return false;
	});
	
	$('.close-menu, .header-content').on( 'click', function() {
		$('.header-content').removeClass('active');
		$('body').removeClass('overlow-mobile');
		return false;
	});
	
	$('.header-content-box').on( 'click', function(e){e.stopPropagation();});

	//стилизация селекта
	setTimeout(function() {
		$('select').styler();
	}, 100);

	$('.Slider').slick({
		arrows: false,
		dots: true,
		speed: 500,
		autoplay : 5000,
	});

	$('.CaruselArchitecture').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		draggable: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	$('.SliderGalery').slick({
		arrows: true,
		dots: true,
		draggable: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
				}
			}
		]
	});

	$('.CaruselArchitecture .SliderPlan').on('breakpoint', function(event, slick, breakpoint) {
		
		$("[data-fancybox]").fancybox({
			backFocus : false,
			buttons: [
				"close"
			],
			touch: {
				vertical: false,
				momentum: false
			},
			hash: false,
			transitionEffect: "slide",
			loop : true,
		});
	});


	if ($('.grid').length) {
		(function(){
			var $grid = $('.grid').imagesLoaded( function() {
			  $grid.isotope({
				itemSelector: '.grid-col',
				percentPosition: true,
				masonry: {
				  columnWidth: '.grid-width'
				}
			  });
			});
		})();
	}

	//маска для телефона
	$(".tx-phone").mask("+ 7 999 999 99 99");

	// попап
	function OpenPopup(NameId) {
		$('.popup').removeClass('active');
		$('body,  #header.fixed').removeClass('hidden').removeAttr('style');
		var ScrollWidht = window.innerWidth - document.documentElement.clientWidth;
		if (document.getElementById(NameId)) {
			$('#' + NameId).addClass('active');
			$('body, #header.fixed').addClass('hidden').css({
				marginRight: ScrollWidht
			});
		}
	}

	$('[data-id-popup]').on( 'click', function() {
		var NameId = $(this).attr('data-id-popup');
		OpenPopup(NameId);
		return false;
	});

	$('.close-popup, .popup, .link-close-popup').on( 'click', function() {
		$('.popup').removeClass('active');
		setTimeout(function() {
			$('body, #header.fixed').removeClass('hidden').removeAttr('style')
		}, 400);
		return false;
	});

	$('.popup-box').on( 'click', function(e){e.stopPropagation();});
	// конец попап

	$('.table-responsive').wrap("<div class='responsive'></div>");
	
	// картики в фон
	$(".imgBox img").each(function(i, elem) {
		var img = $(elem);
		var div = $(this).closest('.imgBox').css({
		background: "url(" + img.attr("src") + ") no-repeat 50% 0"
		}).addClass('active');
	});

	$('.CaruselCheck').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		draggable: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 576,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}
		]
	});

	$('.SliderFloor').slick({
		arrows: true,
		dots: false,
	});

	$('table').wrap("<div class='table-responsive'></div>");

	$('.plan-help').tooltipster({
		animation: 'fade',
		delay: 10,
		theme: ['tooltipster-color'],
		trigger: 'custom',
		contentAsHTML: true,
		triggerOpen: {
			click: true,
			tap: true
		},
		triggerClose: {
			click: true,
			scroll: true,
		},
		functionInit: function(instance, helper){
			var content = $(helper.origin).find('.plan-tooltip').html();
			instance.content(content);
		}
	});

	$('.floor-one').tooltipster({
		animation: 'fade',
		delay: 10,
		theme: ['tooltipster-color'],
		trigger: 'custom',
		contentAsHTML: true,
		triggerOpen: {
			click: true,
			tap: true
		},
		triggerClose: {
			click: true,
		},
		functionInit: function(instance, helper){
			var content = $(helper.origin).find('.floor-tooltip').html();
			instance.content(content);
			$(helper.origin).on( 'click', function() {
				if ($(this).hasClass('active')) {
					$('.floor-one').removeClass('active');
				}
				else {
					$('.floor-one').removeClass('active');
					$(this).addClass('active');
				}
			});
		},
		functionBefore: function(instance, helper) {
			let floor = Number($(helper.origin).find('.floor-help span').text());
			getFloorData(floor).then(info => {
				instance.content(`
					<div class="floor-tooltip-box">
						<div class="floor-info">Свободно ${info.freeAp} из ${info.totalAp} квартир</div>
						<ul class="list-floor-info">
							${info.apInfo}
						</ul>
						<a href="./etag.html" class="more"><i class="icon-arrow"></i></a>
					</div>`
				);
			});
		},
		functionReady: function(instance, helper) {

			$(document).mouseup(function (e){ // событие клика по веб-документу
				var div = $(".tooltipster-base"); // тут указываем ID элемента
				if (!div.is(e.target) // если клик был не по нашему блоку
				    && div.has(e.target).length === 0) { // и не по его дочерним элементам
					$('.floor-one').removeClass('active');
				}
			});
			$(".tooltipster-base").on( 'click', function() {
				$('.floor-one').removeClass('active');
			});
		},
		functionPosition: function(instance, helper, position){
			position.coord.top += 10;
			position.coord.left -= $(helper.origin).width()/4;
			$('.tooltipster-base').on( 'click', function() {
			});
			return position;
		}
	});

	$('.SliderPlan').slick({
		arrows: true,
		dots: false,
		draggable: false,
		responsive: [

			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				}
			}
		]
	});

	$("[data-fancybox]").fancybox({
		backFocus : false,
		buttons: [
			"close"
		],
		touch: {
			vertical: false,
			momentum: false
		},
		hash: false,
		transitionEffect: "slide",
		loop : true,
	});

	$('.DragSlider').each(function(i, elem) {
		var El = $(elem),
			ElSlider = El[0],
			ElValue = El.closest('.DragSliderSection').find('.DragSliderValue'),
			ElMuch = El.closest('.DragSliderSection').find('.DragSliderMuch'),
			DataMin = parseInt(El.attr('data-min')),
			DataStart = parseInt(El.attr('data-start')),
			DataEnd = parseInt(El.attr('data-end')),
			DataMax = parseInt(El.attr('data-max'));
			El.closest('.DragSliderSection').find('.SliderGridMin').html(DataMin);
			El.closest('.DragSliderSection').find('.SliderGridMax').html(DataMax);

			if(isNaN(DataMin)) {var DataMin = 0;}
			if(isNaN(DataMinStart)) {var DataMinStart = DataMin;}
			if(isNaN(DataMax)) {var DataMax = 1000;}
			if(isNaN(DataMaxStart)) {var DataMaxStart = DataMax;}

		noUiSlider.create(ElSlider , {
			start: [DataStart, DataEnd],
			connect: true,
			tooltips: true,
			step: 1,
			range: {
				'min': DataMin,
				'max': DataMax,
				
			},
			format: wNumb({
				decimals: 0,
				thousand: ' '
			})
		});

		
	});



	$('.SliderFloor').slick('slickGoTo', currFloor - 1);

});