$(document).ready(function () {
  let quiz_step = 0;
  let chosen_zone = '';

  $('a.steps-nav__link').on('click', function (event) {
    event.preventDefault();
    chosen_zone = $(this)[0].innerText;
    $('a#next_step').css('display', 'block');
    $('.steps-list__item').each((element, value) => {
      value.style.display = 'none'
    });
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        arr = [1, 3, 4, 7, 10, 11];
      break

      case 'КУХНЯ':
        arr = [0, 1, 2, 6, 15];
      break

      case 'САН УЗЕЛ':
        arr = [0, 4, 9, 19];
      break

      case 'СПАЛЬНЯ':
        arr = [4, 8, 9, 10, 12, 14];
      break

      case 'ДЕТСКАЯ':
        arr = [9, 18, 19, 21];
      break

      case 'ПРИХОЖАЯ':
        arr = [4, 5, 8, 9, 13];
      break
    }

    arr.forEach((element) => {
      $('.steps-list__item')[element].style.display = 'block';
    })
  });

  $('a.sw__link').on('click', function (event) {
    event.preventDefault();
    chosen_zone = $(this).find('p')[0].innerText;
    $('a#next_step').css('display', 'block');
    $('.steps-list__item').each((element, value) => {
      value.style.display = 'none';
    });
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        arr = [1, 3, 4, 7, 10, 11];
      break

      case 'КУХНЯ':
        arr = [0, 1, 2, 6, 15];
      break

      case 'САН УЗЕЛ':
        arr = [0, 4, 9, 19];
      break

      case 'СПАЛЬНЯ':
        arr = [4, 8, 9, 10, 12, 14];
      break

      case 'ДЕТСКАЯ':
        arr = [9, 18, 19, 21];
      break

      case 'ПРИХОЖАЯ':
        arr = [4, 5, 8, 9, 13];
      break
    }

    arr.forEach((element) => {
      $('.steps-list__item')[element].style.display = 'block';
    })
  });

  $('.steps__dot').on('click', function(event) {
    switch(chosen_zone){
      case 'ГОСТИННАЯ':

      break
      case 'САН УЗЕЛ':

      break
      case 'СПАЛЬНЯ':

      break
      case 'ДЕТСКАЯ':

      break
      case 'ПРИХОЖАЯ':

      break
      case 'КУХНЯ':
        switch($(this)[0].id){
          case 'fasade':
            $($('.steps-list__link')[0]).toggleClass('active');
            if($($('.steps-list__link')[0]).hasClass('active')){
              $($('.steps-list__link')[0]).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
            }
            else{
              $($('.steps-list__link')[0]).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
            }
          break
    
          case 'glass-table':
            $($('.steps-list__link')[1]).toggleClass('active');
            if($($('.steps-list__link')[1]).hasClass('active')){
              $($('.steps-list__link')[1]).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
            }
            else{
              $($('.steps-list__link')[1]).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
            }
          break
    
          case 'apron':
            $($('.steps-list__link')[2]).toggleClass('active');
            if($($('.steps-list__link')[2]).hasClass('active')){
              $($('.steps-list__link')[2]).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
            }
            else{
              $($('.steps-list__link')[2]).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
            }
          break
    
          case 'shelf':
            $($('.steps-list__link')[6]).toggleClass('active');
            if($($('.steps-list__link')[6]).hasClass('active')){
              $($('.steps-list__link')[6]).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
            }
            else{
              $($('.steps-list__link')[6]).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
            }
          break
    
          case 'shield':
            $($('.steps-list__link')[15]).toggleClass('active');
            if($($('.steps-list__link')[15]).hasClass('active')){
              $($('.steps-list__link')[15]).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
            }
            else{
              $($('.steps-list__link')[15]).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
            }
          break
        }
      break
    }
  });

  $('.steps__dot').on('click', function (event) {
    $(this).toggleClass('active');
  });

  $('.privacy').on('click', function (event) {
    event.preventDefault();

    $('.modal-pp').css('display', 'block');
  });

  $('.modal-pp__close').on('click', function (event) {
    event.preventDefault();
    $('#agreement').css('display', 'none');
    $('.modal-pp').css('display', 'none');
  });

  $('span.number__item')[1].innerText = '/ ' + $('.indicators__item').length;

  $('a#next_step').on('click', function (event) {
    event.preventDefault();
    quiz_step++;
    if(quiz_step == $('.indicators__item').length - 1){
      $(this).css('display', 'none');
    }

    $('.steps__item').each((element, value) => {
      value.attributes[1].value = 'display: none;';
    });
    $('.indicators__item')[quiz_step - 1].classList.value = 'indicators__item ready';
    $('.indicators__item')[quiz_step].classList.value = 'indicators__item active';
    $('span.number__item.active')[0].innerText = quiz_step + 1;

    $('.steps__item')[quiz_step].attributes[1].value = 'display: block;';

    
    if(quiz_step == 1){
      $('form.steps__form').find('input[type="hidden"]')[0].value = chosen_zone;
    }
    else if(quiz_step == 2){
      $('a.steps-list__link.active').each(function(){
        $('form.steps__form').find('input[type="hidden"]')[1].value += ($(this)[0].text + ';\n');
      });
    }
    else if(quiz_step == 3){
      $('.bloom__item>a.active').each(function(){
        console.log($(this)[0].firstChild.title);
        $('form.steps__form').find('input[type="hidden"]')[2].value += ($(this)[0].firstChild.title + ';\n');
      });
    }
  });
  
  $('.steps-list__link').on('click', function (event) {
    event.preventDefault();

    $(this).toggleClass('active');

    if($(this).hasClass('active')){
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active');
      $(this).find('i').css('background', 'url(../solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
    }
    else{
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active');
      $(this).find('i').css('background', 'url(../solution/img/icons/i-plus.png) center no-repeat #fff');
    }
    
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        switch($(this)[0].classList[1]){
          case 'partitions':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[9]).css('display', 'block');
          break
          case 'tv':
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
          break
          case 'wall':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
          break
          case 'servant':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[9]).css('display', 'block');
          break
          case 'glass-table':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
          break
          case 'glass-furniture':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
          break
        }
      break

      case 'КУХНЯ':
        switch($(this)[0].classList[1]){
          case 'apron':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
          break
          case 'fasade':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
          break
          case 'glass-table':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
          break
          case 'shelf':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
          break
          case 'shield':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
          break
        }
      break

      case 'САН УЗЕЛ':
        switch($(this)[0].classList[1]){
          case 'mirror':
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'wall':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
          break
          case 'shower-screen':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[10]).css('display', 'block');
          break
          case 'fasade':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
          break
        }
      break

      case 'СПАЛЬНЯ':
        switch($(this)[0].classList[1]){
          case 'wall':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
          break
          case 'closet':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
          break
          case 'glass-furniture':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
            
          break
          case 'mirror':
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'pedestal':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
          break
          case 'glass':
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
          break
        }
      break

      case 'ДЕТСКАЯ':
        switch($(this)[0].classList[1]){
          case 'cupboard':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[7]).css('display', 'block');
          break
          case 'marker-desk':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'mirror':
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'child-furniture':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
          break
        }
      break

      case 'ПРИХОЖАЯ':
        switch($(this)[0].classList[1]){
          case 'furniture':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
          break
          case 'closet':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[9]).css('display', 'block');
          break
          case 'door':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[1]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[3]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[5]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[6]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[8]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[9]).css('display', 'block');
          break
          case 'marker-desk':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'mirror':
            $($('ul.accordion.accordion_indent>li')[4]).css('display', 'block');
          break
          case 'wall':
            $($('ul.accordion.accordion_indent>li')[0]).css('display', 'block');
            $($('ul.accordion.accordion_indent>li')[2]).css('display', 'block');
          break
        }
      break
    }
  });

  $('.steps-list__link').on('mouseover', function (event) {
    $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active');
  });

  $('.steps-list__link').on('mouseout', function (event) {
    $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active');
  });

  $('.bloom__item>a').on('click', function (event){
    event.preventDefault();
    
    $(this).toggleClass('active');
  });

  $($('form.modal__form')[0]).find('input').on('change', function (event){
    $($('form.modal__form')[0]).find('input').each(function(){
      if($(this)[0].attributes[0].value == 'checkbox'){
        if(!$(this)[0].validity.valid){
          $($($('form.modal__form')[0]).find('.check')).css('border', '1px solid red');
          $($($('form.modal__form')[0]).find('.check')).css('border-radius', '7px');
          $($($('form.modal__form')[0]).find('.agreement-check>p')).css('color', 'red');
        }
        else{
          $($($('form.modal__form')[0]).find('.agreement-check>p')).css('color', '#fff');
          $($($('form.modal__form')[0]).find('.check')).css('border', 'none');
        }
      }
      else{
        if(!$(this)[0].validity.valid){
          $($(this)[0]).css('border', '1px solid red');
          $($(this)[0]).css('border-radius', '10px');
          $($(this)[0].labels[0]).css('color', 'red');
        }
        else{
          $($(this)[0].labels[0]).css('color', '#fff');
          $($(this)[0]).css('border', 'none');
          $($(this)[0]).css('border-radius', '0px');
          $($(this)[0]).css('border-bottom', '1px solid #dbdbdb');
        }
      }
    });
  });

  $($('form.steps__form')[0]).find('input').on('change', function (event){
    $($('form.steps__form')[0]).find('input').each(function(){
      if($(this)[0].attributes[0].value == 'checkbox'){
        if(!$(this)[0].validity.valid){
          $($($('form.steps__form')[0]).find('.check')).css('border', '1px solid red');
          $($($('form.steps__form')[0]).find('.check')).css('border-radius', '7px');
          $($($('form.steps__form')[0]).find('.agreement-check>p')).css('color', 'red');
        }
        else{
          $($($('form.steps__form')[0]).find('.agreement-check>p')).css('color', '#fff');
          $($($('form.steps__form')[0]).find('.check')).css('border', 'none');
        }
      }
      else{
        if(!$(this)[0].validity.valid){
          console.log($($(this)[0].labels[0]));
          $($(this)[0]).css('border', '1px solid red');
          $($(this)[0]).css('border-radius', '10px');
          $($(this)[0].labels[0]).css('color', 'red');
        }
        else{
          $($(this)[0].labels).css('color', '#fff');
          $($(this)[0]).css('border', 'none');
          $($(this)[0]).css('border-radius', '0px');
          $($(this)[0]).css('border-bottom', '1px solid #dbdbdb');
        }
      }
    });
  });

  // Show menu
  $('.navbar-toggle').click(function() {
    $(this).toggleClass('active');
    $('.panel').slideToggle( "slow", function() {});
  });

  // Scroll spee
  $('.nav__list, .intro, .start__btn').on('click','a', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
      console.log($(this));
      $('body,html').animate({scrollTop: top}, 800);
  });

  // Modal
  $('a#agreement-btn').click(function(event) {
    event.preventDefault();
    $('#agreement').css('display', 'block');
  });

  $('.open-modal').click(function(e) {
    e.preventDefault();
    $('.modal_request').fadeIn();
  });

  $('.modal__close').click(function() {
    $('.modal').fadeOut();
  });

  $(document).click(function(event) {
    if ($(event.target).closest('.open-modal').length 
      || $(event.target).closest('.modal__box').length ) return;
      $('.modal').fadeOut();
      event.stopPropagation();
  });

  // Maskedinput
  $(function($){
    $('.phone-mask').mask(('+7 ') + '(999) 999-99-99');
  });

  // Accardion
  var accordion = function() {
    var data = $('.accordion').attr('data-accordion');
    $('.accordion-header').on('click', function(){
      $(this).next('.accordion-body').not(':animated').slideToggle()
    })
    $('.accordion-header').click(function () {
      $(this).parent('.accordion li').toggleClass('active');
    });
  }
  accordion();

  // Material
  $('.details__link a').click(function(e) {
    e.preventDefault();
    $('.material').fadeIn();
    var ts = $(this).parents('.details__link').next('.material__text');
    var text = ts.html();
    $('.material__box').html(text);
  })

  $('.material__close, .back__link').click(function(e) {
    e.preventDefault();
    $('.material').fadeOut();
  });

  // Tabs
  $('.tabs__item').not(':first').hide();
  $('.tabs__name').click(function() {
    $('.tabs__name').removeClass('active').eq($(this).index()).addClass('active');
    $('.tabs__item').hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass('active');

  // Swiper
  var mySwiper = new Swiper ('.swiper-container', {
    spaceBetween: 15,
    slidesPerView: 'auto',
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      slidesPerView: 1,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
    }
  })

  var mySwiper1 = new Swiper ('.swiper-container1', {
    spaceBetween: 10,
    slidesPerView: '3',
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      slidesPerView: 3,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      480: {
        slidesPerView: 4,
        spaceBetween: 15,
      }
    }
  })

});
