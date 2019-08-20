window.onload = (function () {
  /*********************** my code ***********************/
  console.log("my code");
  
  /************** плавный скролл до якоря ****************/
  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 1500);
    return false;
  });
  
  /************** подсветка активных пунктов меню при скроле ****************/
  
  function activeSectionMenuScroll(scroll) {
    var sections = $('section, header, footer')
      , nav = $('nav')
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
      , topHeight = 200 //высота от верха страницы для показа меню в начале страницы
      , bufferScroll = 0
      , menuOpen = false
      , menuClose = false;
    
    function showMenu() {
      $('.header-menu').removeClass('header-menu--hide');
      menuClose = false;
    }
    
    function hideMenu() {
      $('.header-menu').addClass('header-menu--hide');
      menuOpen = false;
    }
    
    return function (scroll) {
      if (widthScreen >= 1024) {
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
      }
    };
  }
  
  var hideMenu = toggleShowMenu();
  
  /************** скролл события ****************/
  
  var counter = 0;
  
  $(window).scroll(function() {
    var scroll = $(document).scrollTop();
    
    const interval = setTimeout(function () { //нужно для сокращения количества запросов (экономия памяти)
      hideMenu(scroll);
      activeSectionMenuScroll(scroll);
      
      counter = 0;
    }, 120);
    
    counter++;
    
    if (counter > 1) {
      clearInterval(interval);
    }
  });
  
  /*********************** слайдер верхний сдвоенный ***********************/
  
  const arrowSlider = '<svg class="header-main__btn-icon"><use xlink:href="#arrow-small"></use></svg>';
  
  $('#production-slider-js').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '#production-mini-slider-js',
    arrows: false,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
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
          slidesToShow: 2,
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
  
    // ymaps.ready(init);
    
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
  
  
})();

