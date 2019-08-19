window.onload = (function () {
  /*********************** my code ***********************/
  console.log("my code")
  
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
  
  
})();
