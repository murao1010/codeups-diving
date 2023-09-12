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
  let swiper = new Swiper('.js-mv-swiper', {
    loop: true,
    effect: 'fade',
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
    },
    speed: 2000,
  });


  let swiper2 = new Swiper(".js-campaign-swiper", {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        slidesPerView: 3.5,
        spaceBetween: 26,
      },
      // スライドの表示枚数：1200px以上の場合
      1200: {
        slidesPerView: 3.8,
        spaceBetween: 40,
      },
    },
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //ドロワーメニュー
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      $("body").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-hamburger").addClass("is-active");
      $("body").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
    }
  });

  //トップに戻るボタン
  $(".top-button").hide();
  $(window).on("scroll resize", function () { // ウィンドウサイズの変更も監視するように追加
    if ($(this).scrollTop() > 100) {
      $(".top-button").fadeIn("fast");
    } else {
      $(".top-button").fadeOut("fast");
    }

    let scrollHeight = $(document).height();
    let scrollPosition = $(window).height() + $(window).scrollTop();
    let footHeight = $(".footer").innerHeight();
    let bottomOffset;

    if ($(window).width() <= 767) { // ウィンドウ幅が767以下の場合
      bottomOffset = footHeight + 16;
    } else { // ウィンドウ幅が768以上の場合
      bottomOffset = footHeight + 20;
    }

    if (scrollHeight - scrollPosition <= footHeight) {
      $(".top-button").css({
        "position": "absolute",
        "bottom": bottomOffset + "px" // 変数を使用して位置を設定
      });
    } else {
      $(".top-button").css({
        "position": "fixed",
        "bottom": "20px"
      });
    }
  });

  $('.top-button').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });

  // ヘッダークラス名付与 MV以下で色付け
  let header = $('.header')
  let headerHeight = $('.header').height();
  let height = $('.mv').height();
  $(window).scroll(function () {
    if ($(this).scrollTop() > (height - headerHeight)) {
      // 指定px以上のスクロールでヘッダーに色付け
      header.addClass('is-color');
    } else {
      // 画面が指定pxより上なら色なし
      header.removeClass('is-color');
    }
  });
});