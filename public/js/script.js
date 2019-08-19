window.onload = (function () {
  /*********************** my code ***********************/
  console.log("my code")
  
  const arrowSlider = '<svg class="header-main__btn-icon"><use xlink:href="#arrow-small"></use></svg>';
  const arrowSliderBigger = '<svg class="slider__btn-icon"><use xlink:href="#arrow-small"></use></svg>';
  
  /*********************** слайдер верхний сдвоенный ***********************/
  
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

