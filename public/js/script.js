window.onload = (function () {
  /************** плавный скролл до якоря ****************/
  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 1500);
    return false;
  });
  
  /************** подсветка активных пунктов меню при скроле ****************/
  
  function activeSectionMenuScroll(scroll) {
    var sections = $('section, header, footer')
      , nav = $('.header-menu__list')
      , scroll = scroll || $(document).scrollTop()
      , navHeight = nav.outerHeight();
    
    sections.each(function () {
      var topSection = $(this).offset().top - navHeight
        , bottomSection = topSection + $(this).outerHeight();
      
      if (scroll >= topSection && scroll <= bottomSection) {
        nav.find('li').removeClass('header-menu__item--active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('header-menu__item--active');
      }
    });
  }
  
  activeSectionMenuScroll();
  
  /************** фиксированное мини-меню при скроле ****************/
  
  function toggleShowMenu() {
    var widthScreen = $(window).width()
      , menuSelector = ".header-menu"
      , topHeight = 200 //высота от верха страницы для показа меню в начале страницы
      , bufferScroll = 0
      , menuOpen = false
      , menuClose = false;
    
    if (widthScreen <= 768) {
      menuSelector = ".header-main"
    }
    
    function showMenu() {
      $(menuSelector).removeClass('header-menu--hide');
      menuClose = false;
    }
    
    function hideMenu() {
      $(menuSelector).addClass('header-menu--hide');
      menuOpen = false;
    }
    
    
    return function (scroll) {
        var currentScroll = scroll || $(document).scrollTop();
        
        //начали крутить вверх или вниз.
        if (currentScroll > bufferScroll) { menuOpen = true; }
        if (currentScroll < bufferScroll) { menuClose = true; }
  
        //первый раз крутим вверх/вниз. Остальные блокируем
        if (menuOpen && currentScroll < bufferScroll) { hideMenu(); }
        if (menuClose && currentScroll > bufferScroll) { showMenu(); }
        
        //показываем когда дошли до верха страницы
        if (currentScroll < topHeight) { showMenu(); }
        
        bufferScroll = currentScroll //обновляем данные для прошлого скрола
    };
  }
  
  var hideMenu = toggleShowMenu();
  
  /************** скролл события ****************/
  
  var counter = 0;
  
  $(window).scroll(function() {
    var scroll = $(document).scrollTop();
  
    var interval = setTimeout(function () { //нужно для сокращения количества запросов (экономия памяти)
      hideMenu(scroll);
      activeSectionMenuScroll(scroll);
      
      counter = 0;
    }, 120);
    
    counter++;
    
    if (counter > 1) {
      clearInterval(interval);
    }
  });
  
  /************** hamburger mobile menu ****************/
    //hamburger toggle click
  var $body = $('body'),
    $hamburger = $("#js-hamburger");
  
  $hamburger.on("click", function () {
    $(this).addClass("is-active")
  });
  
  function closeHamburger () {
    return $hamburger.removeClass("is-active");
  }
  
  $(".site-overlay").on("click", function () {
    closeHamburger();
  });
  
  $(".header-menu__list").clone().appendTo("#mobile-menu"); //клонируем меню с шапки в мобильное меню
  $("#mobile-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
  
  //open close mobile menu if you click a link
  $(".header-menu__item").on('click touchstart', function() {
    if ($('.pushy').hasClass('pushy-left')) {
      $body.removeClass('pushy-open-left');
    }
    
    closeHamburger();
  });
  
  /*********************** модальное окно ***********************/
  
  var $modalWindow = $(".js-modal");
  var $modalBack = $("#js-modal-background");
  var $modalClose = $("#js-modal-close");
  var $modalShow = $(".js-modal-show");
  
  function hideModalWindow() {
    $modalBack.fadeOut(500);
    $modalWindow.fadeOut(500);
  }
  
  function showModalWindow(elem) {
    $modalBack.fadeIn(500);
    $(elem).fadeIn(500);
  }
  
  function getAttributePosition(block) {
    try {
      var attr = block.attributes;
      var attrLength = attr.length;
      
      for (var i = 0; i < attrLength; i++) {
        if (attr[i].nodeName === "data-position") {
          return attr[i].value;
        }
      }
      
      return "";
    } catch (e) {
      console.error("Don't find attribute position");
      return "";
    }
  }
  
  $modalShow.on("click", function() {
    var getButtonAttribute = getAttributePosition(this);
    // console.dir(this.attributes[1].nodeName)
    // console.dir(this.attributes[1].value)
    $modalWindow.each(function (index, elem) {
      if (getAttributePosition(elem) === getButtonAttribute) {
        showModalWindow(elem);
      }
    });
  });
  
  $modalBack.on("click", function() {
    hideModalWindow();
  });
  
  $modalClose.on("click", function(){
    hideModalWindow();
  });
  
  /*********************** слайдер верхний сдвоенный ***********************/
  
  var arrowSlider = '<svg class="header-main__btn-icon"><use xlink:href="#arrow-small"></use></svg>';
  
  $('#production-slider-js').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '#production-mini-slider-js',
    arrows: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          prevArrow: '<button class="production-slider__arrow-prev">' + arrowSlider + '</button>',
          nextArrow: '<button class="production-slider__arrow-next">' + arrowSlider + '</button>',
        }
      },
    ]
  });
  
  $('#production-mini-slider-js').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button class="production-mini-slider__arrow-prev">' + arrowSlider + '</button>',
    nextArrow: '<button class="production-mini-slider__arrow-next">' + arrowSlider + '</button>',
    asNavFor: '#production-slider-js',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        }
      },
    ]
  });
  
  /*********************** слайдер нижний ***********************/
  
  $('#feedback-slider-js').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button class="feedback__arrow-prev">' + arrowSlider + '</button>',
    nextArrow: '<button class="feedback__arrow-next">' + arrowSlider + '</button>',
    arrows: true,
    focusOnSelect: true,
    centerPadding: '1%',
    centerMode: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          prevArrow: '<button class="production-slider__arrow-prev">' + arrowSlider + '</button>',
          nextArrow: '<button class="production-slider__arrow-next">' + arrowSlider + '</button>',
        }
      },
    ]
  });
  
  /*********************** яндекс карта ***********************/
  
  function init() {
    var map = new ymaps.Map("map-yandex-js", {
      center: [ 54.75265557, 56.00205250 ],
      zoom: 17,
      controls: [ "zoomControl" ],
      behaviors: [ "drag" ]
    });
    
    var placemark = new ymaps.Placemark([ 54.75267419, 56.00203641 ], { //ставим метку на карте
        balloonContent: "Добрый картон",
        iconCaption: "Проспект октября, 46"
      },
      {
        preset: 'islands#blueCircleDotIcon'
      });
    
    map.geoObjects.add(placemark);
  }
  
  ymaps.ready(init);
  
  /*********************** маски для ввода ***********************/
  
  $(".input").mask("+7(999) 999-99-99");
  
  /*********************** увеличение фото при клике ***********************/
  // <div id="feedback-slider-js">
  // <img class="feedback__image" data-bp="./image/feedback/1big.jpg" src="./image/feedback/1.jpg" alt="отзыв">
  // <img class="feedback__image" data-bp="./image/feedback/2big.jpg" src="./image/feedback/2.jpg" alt="отзыв">
  
  var imageLinks = document.querySelectorAll('#feedback-slider-js .feedback__image');
  
  for (var i = 0, countBlocks = imageLinks.length; i < countBlocks; i++) {
    imageLinks[i].addEventListener('dblclick', function (e) {
      e.preventDefault();
      
      BigPicture({
        el: e.target,
        gallery: '#feedback-slider-js'
      });
    })
  }
  
  /*********************** hide preloader ***********************/
  $("#js-preloader").fadeOut(500);
  
})();

