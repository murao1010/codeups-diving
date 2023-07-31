jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // 要素の取得とスピードの設定
  var box = $('.js-image-effect');
  var speed = 700;

  // .js-image-effectの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="js-color"></div>');
    var color = $(this).find('.js-color');
    var image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');

    // inviewを使って背景色が画面に現れたら処理をする
    color.one('inview', function () {
      if (counter === 0) {
        $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
          image.css('opacity', '1');
          $(this).css({ 'left': '0', 'right': 'auto' });
          $(this).animate({ 'width': '0%' }, speed);
        });
        counter = 1;
      }
    });
  });
  //Swiper
  let swiper = new Swiper(".js-campaign-swiper", {
    // loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    breakpoints: {
      // スライドの表示枚数：500px以上の場合
      768: {
        slidesPerView: 3.5,
        spaceBetween: 40,
      }
    },
    // autoplay: {
    //   delay: 3000,
    // },
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});