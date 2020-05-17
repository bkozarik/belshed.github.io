$(document).ready(function () {
  let quiz_step = 0;
  let chosen_zone = '';
  let prevBg;
  
  $('a.steps-nav__link').on('click', function (event) {
    event.preventDefault();
    chosen_zone = $(this)[0].innerText;
    $('a#next_step').css('display', 'block');
    console.log(chosen_zone);
    $('.steps-list__item').each((element, value) => {
      value.style.display = 'none';
    });
    console.log('all turned off');
    $('a.steps-nav__link').toggleClass('active', false);
    $(this).toggleClass('active');
    $(".steps__image_3").attr('class', 'steps__image_3');

    let arr = [];
    console.log('arr generated');
    if(chosen_zone == 'ГОСТИННАЯ'){
      arr = [1, 3, 4, 7, 10, 11];
      $('.steps__image_3').toggleClass('steps__guest');
      $('.steps__image').css('background','url(img/zones/1.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/1.jpg');
    }
    else if(chosen_zone == 'КУХНЯ'){
      arr = [0, 1, 2, 6, 15];
      $('.steps__image_3').toggleClass('steps__kitchen');
      $('.steps__image').css('background','url(img/zones/2.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/2.jpg');
    }
    else if(chosen_zone == 'САН УЗЕЛ'){
      arr = [0, 1, 2, 6, 15];
      $('.steps__image_3').toggleClass('steps__wc');
      $('.steps__image').css('background','url(img/zones/3.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/3.jpg');
    }
    else if(chosen_zone == 'СПАЛЬНЯ'){
      arr = [0, 1, 2, 6, 15];
      $('.steps__image_3').toggleClass('steps__bedroom');
      $('.steps__image').css('background','url(img/zones/4.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/4.jpg');
    }
    else if(chosen_zone == 'ДЕТСКАЯ'){
      arr = [0, 1, 2, 6, 15];
      $('.steps__image_3').toggleClass('steps__child');
      $('.steps__image').css('background','url(img/zones/5.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/5.jpg');
    }
    else if(chosen_zone == 'ПРИХОЖАЯ'){
      arr = [0, 1, 2, 6, 15];
      $('.steps__image_3').toggleClass('steps__hall');
      $('.steps__image').css('background','url(img/zones/6.jpg) center top/cover no-repeat');
      $('.steps__image_3>img').attr('src','img/zones/6.jpg');
    }
    // switch(chosen_zone){
    //   case 'ГОСТИННАЯ':
        
    //   break

    //   case 'КУХНЯ':
    //     arr = [0, 1, 2, 6, 15];
    //     $('.steps__image_3').toggleClass('steps__kitchen');
    //     $('.steps__image').css('background','url(img/zones/2.jpg) center top/cover no-repeat');
    //     $('.steps__image_3>img').attr('src','img/zones/2.jpg');
    //   break

    //   case 'САН УЗЕЛ':
    //     arr = [0, 4, 9, 19];
    //     $('.steps__image_3').toggleClass('steps__wc');
    //     $('.steps__image').css('background','url(img/zones/3.jpg) center top/cover no-repeat');
    //     $('.steps__image_3>img').attr('src','img/zones/3.jpg');
    //   break

    //   case 'СПАЛЬНЯ': 
    //     arr = [4, 8, 9, 10, 12, 14];
    //     $('.steps__image_3').toggleClass('steps__bedroom');
    //     $('.steps__image').css('background','url(img/zones/4.jpg) center top/cover no-repeat');
    //     $('.steps__image_3>img').attr('src','img/zones/4.jpg');
    //   break

    //   case 'ДЕТСКАЯ':
    //     arr = [9, 17, 18, 20];
    //     $('.steps__image_3').toggleClass('steps__child');
    //     $('.steps__image').css('background','url(img/zones/5.jpg) center top/cover no-repeat');
    //     $('.steps__image_3>img').attr('src','img/zones/5.jpg');
    //   break

    //   case 'ПРИХОЖАЯ':
    //     arr = [4, 5, 8, 9, 13];
    //     $('.steps__image_3').toggleClass('steps__hall');
    //     $('.steps__image').css('background','url(img/zones/6.jpg) center top/cover no-repeat');
    //     $('.steps__image_3>img').attr('src','img/zones/6.jpg');
    //   break
    // }
    console.log(arr);
    console.log(chosen_zone);
    arr.forEach((element) => {
      $('.steps-list__item')[element].style.display = 'block';
    });
    
  });

  $('a.sw__link').on('click', function (event) {
    event.preventDefault();

    $('a.sw__link').each(function(value, element){
      $(element).find('.sw__txt').removeAttr('style');
    });
    $(this).find('.sw__txt').css('background-color', '#b6b6b6');
    chosen_zone = $(this).find('p')[0].innerText;
    $('a#next_step').css('display', 'block');
    $('.steps-list__item').each((element, value) => {
      value.style.display = 'none';
    });
    let arr = [];
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        arr = [1, 3, 4, 7, 10, 11];
        $('.tabs__img').css('background','url(img/zones/1.jpg) center top/cover no-repeat');
      break

      case 'КУХНЯ':
        arr = [0, 1, 2, 6, 15];
        $('.tabs__img').css('background','url(img/zones/2.jpg) center top/cover no-repeat');
      break

      case 'САН УЗЕЛ':
        arr = [0, 4, 9, 19];
        $('.tabs__img').css('background','url(img/zones/3.jpg) center top/cover no-repeat');
      break

      case 'СПАЛЬНЯ':
        arr = [4, 8, 9, 10, 12, 14];
        $('.tabs__img').css('background','url(img/zones/4.jpg) center top/cover no-repeat');
      break

      case 'ДЕТСКАЯ':
        arr = [9, 17, 18, 20];
        $('.tabs__img').css('background','url(img/zones/5.jpg) center top/cover no-repeat');
      break

      case 'ПРИХОЖАЯ':
        arr = [4, 5, 8, 9, 13];
        $('.tabs__img').css('background','url(img/zones/6.jpg) center top/cover no-repeat');
      break
    }
    arr.forEach((element) => {
      $('.steps-list__item')[element].style.display = 'block';
    })
  });

  $('.steps__dot').on('click', function(event) {
    let pos;
    $('a#next_step').css('display', 'block');
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        switch($(this)[0].id){
          case 'partitions':
            pos = 11;
          break
    
          case 'tv':
            pos = 7;
          break
    
          case 'wall':
            pos = 4;
          break
    
          case 'servant':
            pos = 3;
          break
    
          case 'glass-table':
            pos = 1;
          break
          case 'glass-furniture':
            pos = 10;
          break
        }
      break
      case 'САН УЗЕЛ':
        switch($(this)[0].id){
          case 'mirror':
            pos = 9;
          break
    
          case 'fasade':
            pos = 0;
          break
    
          case 'shower-screen':
            pos = 19;
          break
    
          case 'wall':
            pos = 4;
          break
        }
      break
      case 'СПАЛЬНЯ':
        switch($(this)[0].id){
          case 'wall':
            pos = 4;
          break
    
          case 'closet':
            pos = 8;
          break

          case 'glass-furniture':
            pos = 10;
          break
    
          case 'mirror':
            pos = 9;
          break
    
          case 'pedestal':
            pos = 12;
          break
    
          case 'glass':
            pos = 14;
          break
        }
      break
      case 'ДЕТСКАЯ':
        switch($(this)[0].id){
          case 'cupboard':
            pos = 21;
          break
    
          case 'mirror':
            pos = 9;
          break
    
          case 'marker-desk':
            pos = 17;
          break

          case 'child-furniture':
            pos = 18;
          break
        }
      break
      case 'ПРИХОЖАЯ':
        switch($(this)[0].id){
          case 'wall':
            pos = 4;
          break
    
          case 'furniture':
            pos = 5;
          break
    
          case 'closet':
            pos = 8;
          break
    
          case 'mirror':
            pos = 9;
          break
    
          case 'doors':
            pos = 13;
          break
        }
      break
      case 'КУХНЯ':
        switch($(this)[0].id){
          case 'fasade':
            pos = 0;
          break
    
          case 'glass-table':
            pos = 1;
          break
    
          case 'apron':
            pos = 2;
          break
    
          case 'shelf':
            pos = 6;
          break
    
          case 'shield':
            pos = 15;
          break
        }
      break
    }
    $($('.steps-list__link')[pos]).toggleClass('active');
    if($($('.steps-list__link')[pos]).hasClass('active')){
      $($('.steps-list__link')[pos]).find('i').css('background', 'url(/solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
    }
    else{
      $($('.steps-list__link')[pos]).find('i').css('background', 'url(/solution/img/icons/i-plus.png) center no-repeat #fff');
    }

    if($(this).hasClass('active')){
      $(this).toggleClass('active', false);
    }
    else if(!($(this).hasClass('active'))){
      $(this).toggleClass('active', true);
    }
    

    choozeGlass(chosen_zone, $(this)[0]);
  });

  $('.steps__dot').on('mouseover', function (event) {
    if(!$($('.steps-list__link.' + $(this).attr('id'))[0]).hasClass('active')){
      $($('.steps-list__link.' + $(this).attr('id'))[0]).css('font-weight', '600');
      $($('.steps-list__link.' + $(this).attr('id'))[0]).find('i').css('background-color', '#f4f4f4');
    }
  });

  $('.steps__dot').on('mouseout', function (event) {
    if(!$($('.steps-list__link.' + $(this).attr('id'))[0]).hasClass('active')){
      $($('.steps-list__link.' + $(this).attr('id'))[0]).css('font-weight', '400');
      $($('.steps-list__link.' + $(this).attr('id'))[0]).find('i').css('background-color', '#fff');
      $($('.steps-list__link.' + $(this).attr('id'))[0]).removeAttr('style');
      $($('.steps-list__link.' + $(this).attr('id'))[0]).find('i').removeAttr('style');
    }
  });

  $('.privacy').on('click', function (event) {
    event.preventDefault();

    $('.modal-pp').fadeIn();
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
    $($('.indicators__item')[quiz_step]).addClass('indicators__item active');
    $('.indicators__item.ready').find('span').addClass('available');
    $('span.number__item.active')[0].innerText = quiz_step + 1;

    $('.steps__item')[quiz_step].attributes[1].value = 'display: block;';

    
    if(quiz_step == 1){
      $('form.steps__form').find('input[type="hidden"]')[0].value = chosen_zone;
    }
    else if(quiz_step == 2){
      $('a.steps-list__link.active').each(function(){
        $('form.steps__form').find('input[type="hidden"]')[1].value += ($(this)[0].text + ';\n');
      });
      window.prevBg = $('.steps__image').css('background');
    }
    else if(quiz_step == 3){
      $('.bloom__link.active').each(function(){ 
        $('form.steps__form').find('input[type="hidden"]')[2].value += ($(this)[0].firstChild.title + ';\n');
      });
      if ($(window).width() > '992'){
        $('.accordion.accordion_indent').find('li.active').each(function(value, element){
          $('form.steps__form').find('input[type="hidden"]')[3].value += ($(element).find('.steps-list__txt')[0].innerText + ';\n');
        });
      }
      else{
        $('.tabs__name.active').each(function(value, element){
          $('form.steps__form').find('input[type="hidden"]')[3].value += $(element)[0].innerText + ';\n';
        });
      }
      $(".steps__image").attr('class', 'steps__image steps__image__small');
      $('.steps__image.steps__image__small').css('background', window.prevBg);
      $('.steps__image.steps__image__small').css('object-fit', 'cover !important');
    }
    $(this).css('display', 'none');
    mySwiper2.update();
  });
  
  function choozeGlass(chosen_zone, obj){
    let glass_arr = [];
    switch(chosen_zone){
      case 'ГОСТИННАЯ':
        switch(obj.classList[1]){
          case 'partitions':
            glass_arr = [1, 3, 6, 7, 8, 9];
          break
          case 'tv':
            glass_arr = [6];
          break
          case 'wall':
            glass_arr = [0, 2, 6];
          break
          case 'servant':
            glass_arr = [1, 3, 6, 8, 9];
          break
          case 'glass-table':
            glass_arr = [1, 3, 6, 8];
          break
          case 'glass-furniture':
            glass_arr = [0, 1, 2, 3, 6, 7];
          break
        }
      break

      case 'КУХНЯ':
        switch(obj.classList[1]){
          case 'apron':
            glass_arr = [0];
          break
          case 'fasade':
            glass_arr = [0, 2, 5];
          break
          case 'glass-table':
            glass_arr = [1, 3, 7];
          break
          case 'shelf':
            glass_arr = [1, 3, 6];
          break
          case 'shield':
            glass_arr = [0, 1, 2, 3, 5, 7];
          break
        }
      break

      case 'САН УЗЕЛ':
        switch(obj.classList[1]){
          case 'mirror':
            glass_arr = [4];
          break
          case 'wall':
            glass_arr = [0, 2];
          break
          case 'shower-screen':
            glass_arr = [1, 3, 5, 6, 9];
          break
          case 'fasade':
            glass_arr = [0, 1, 2, 3, 5];
          break
        }
      break

      case 'СПАЛЬНЯ':
        switch(obj.classList[1]){
          case 'wall':
            glass_arr = [0, 2];
          break
          case 'closet':
            glass_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          break
          case 'glass-furniture':
            glass_arr = [0, 1, 2, 3, 5, 6];
          break
          case 'mirror':
            glass_arr = [4];
          break
          case 'pedestal':
            glass_arr = [1, 3];
          break
          case 'glass':
            glass_arr = [1, 6, 8];
          break
        }
      break

      case 'ДЕТСКАЯ':
        switch(obj.classList[1]){
          case 'cupboard':
            glass_arr = [0, 1, 2, 3, 4, 5, 6, 7];
          break
          case 'marker-desk':
            glass_arr = [0, 2, 4];
          break
          case 'mirror':
            glass_arr = [4];
          break
          case 'child-furniture':
            glass_arr = [0, 2];
          break
        }
      break

      case 'ПРИХОЖАЯ':
        switch(obj.classList[1]){
          case 'furniture':
            glass_arr = [0, 1, 2, 3, 4, 5, 6];
          break
          case 'closet':
            glass_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          break
          case 'door':
            glass_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          break
          case 'mirror':
            glass_arr = [4];
          break
          case 'wall':
            glass_arr = [0, 2];
          break
        }
      break
    }
    glass_arr.forEach((element) => {
      $($('ul.accordion.accordion_indent>li')[element]).css('display', 'block');
      $($('.tabs__name')[element]).css('display', 'block');
    });
  }
  
  $('.steps-list__link').on('click', function (event) {
    event.preventDefault();
    $('a#next_step').css('display', 'block');
    $(this).toggleClass('active');

    if($(this).hasClass('active')){
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active', true);
      $($(this)[0]).css('font-weight', '600');
      $(this).find('i').css('background', 'url(/solution/img/icons/i-minus.png) center no-repeat #f4f4f4');
    }
    else{
      $($(this)[0]).css('font-weight', '400');
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active');
      $(this).find('i').css('background', 'url(/solution/img/icons/i-plus.png) center no-repeat #fff');
    }
    
    choozeGlass(chosen_zone, $(this)[0]);
  });

  $('.steps-list__link').on('mouseover', function (event) {
    if(!$($(this)[0]).hasClass('active')){
      $($(this)[0]).css('font-weight', '600');
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active', true);
    }
  }); 

  $('.steps-list__link').on('mouseout', function (event) {
    if(!$($(this)[0]).hasClass('active')){
      $($(this)[0]).css('font-weight', '400');
      $('.steps__dot.' + $(this)[0].classList[1]).toggleClass('active', false);
    }
  });

  $('.bloom__link').on('click', function (event){
    event.preventDefault();
    
    $(this).toggleClass('active');
    let color = $(this).find('img').attr('title');
    switch(color){
      case 'красный':
        $('.steps__image').css('background', 'url(img/zones/red.jpg) center top / cover no-repeat #fff');
        $('.tabs__img').css('background', 'url(img/zones/red.jpg) center top / cover no-repeat #fff');
      break
      case 'зеленый':
        $('.steps__image').css('background', 'url(img/zones/green.jpg) center top / cover no-repeat #fff');
        $('.tabs__img').css('background', 'url(img/zones/green.jpg) center top / cover no-repeat #fff');
      break
      case 'синий':
        $('.steps__image').css('background', 'url(img/zones/blue.jpg) center top / cover no-repeat #fff');
        $('.tabs__img').css('background', 'url(img/zones/blue.jpg) center top / cover no-repeat #fff');
      break
    }
    $('a#next_step').css('display', 'block');
  });
  
  $('.indicators__item').on('click', function(){
    // $('a#next_step').css('display', 'block');
    if($(this).hasClass('ready')){
      let curr_quiz_step = quiz_step;
      switch($(this).find('.indicators__txt')[0].innerText){
        case 'ВЫБОР ЗОНЫ':
          quiz_step = 0;
          $('.steps-list__link').each(function(){
            $(this).removeAttr('style');
            $(this).find('i').removeAttr('style');
          });
        break
        case 'ВЫБОР ПРЕДМЕТА':
          quiz_step = 1;
          $('.steps-list__link').each(function(){
            $(this).removeAttr('style');
            $(this).find('i').removeAttr('style');
          });
        break
        case 'ВЫБОР СТЕКЛА':
          quiz_step = 2;
        break
        case 'АНКЕТА':
          quiz_step = 3;
        break
      }
      $('a.active').removeClass('active');
      $('.steps__image__small').removeClass('steps__image__small');
      let next_steps = Array.from(Array(4).keys());
      next_steps.forEach((element) => {
        if(element > quiz_step){
          $($('.indicators__item')[element]).removeClass('ready');
          $('form.steps__form').find('input[type="hidden"]')[element].value = '';
        }
      });
      if(quiz_step <= curr_quiz_step){
        $('.indicators__item').each((element, value) => {
          $(value).removeClass('active');
        });
        $(this).removeClass('ready');
        $(this).addClass('active');
    
        $('.steps__item').each((element, value) => {
          $(value).css('display', 'none');
        });

        $('form.steps__form').find('input[type="hidden"]')[quiz_step].value = '';
        if(quiz_step == 2){
          $('form.steps__form').find('input[type="hidden"]')[quiz_step].value = '';
          $('form.steps__form').find('input[type="hidden"]')[quiz_step + 1].value = '';
        }
        $('span.number__item.active')[0].innerText = quiz_step + 1;
        $($('.steps__item')[quiz_step]).css('display', 'block');
      }
    
    }
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

  $('.tabs__name').on('click', function(){
    $(this).toggleClass('active');
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
      $('body,html').animate({scrollTop: top}, 800);
  });

  // Modal
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

  // Swiper
  var mySwiper = new Swiper ('.swiper-container', {
    spaceBetween: 15,
    slidesPerView: 'auto',
    updateOnWindowResize: true,
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
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
    }
  })

  var mySwiper1 = new Swiper ('.swiper-container1', {
    spaceBetween: 10,
    slidesPerView: 2,
    updateOnWindowResize: true,
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
  var mySwiper2 = document.querySelector('.swiper-container1').swiper;
  mySwiper2.update();
});