jQuery(function ($) {

  // この中であればWordpressでも「$」が使用可能になる

  /* --------------------------------------------
  /* ローディングアニメーション
  /* -------------------------------------------- */
  $(window).on("load", function () {
    var loadCount = sessionStorage.getItem("loadCount");

    // 初回のロード時の処理
    if (loadCount === null) {
      $(".js-loading").delay(0).fadeIn(900);
      $(".js-loading-title").delay(300).fadeIn(800);
      $(".js-loading").delay(2500).fadeOut(900);
      $("body").delay(2500) // ローディング画面を表示した時間に合わせて適切な時間を設定
      .queue(function (next) {
        $("body").removeClass("js-fixed");
        next();
      });
      sessionStorage.setItem("loadCount", 1);
    } else {
      // 2回目以降のロード時の処理
      $(".js-loading").hide();
      $(".js-loading-title").hide();
      $("body").removeClass("js-fixed");
      $(window).scrollTop(0); // スクロール位置をトップに戻す
    }
  });

  /* --------------------------------------------
  /* 背景色のあとに画像が表示されるエフェクト
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* ファーストビューのスワイパー
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* キャンペーンカードのスワイパー
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* ハンバーガーメニュー
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* トップに戻るボタン
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* ヘッダーの背景色
  /* -------------------------------------------- */
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

  /* --------------------------------------------
  /* モーダル
  /* -------------------------------------------- */
  $(".js-gallery img").click(function () {
    // まず、クリックした画像の HTML(<img>タグ全体)を#gallery__gray-display内にコピー
    $("#gallery__gray-display").html($(this).prop("outerHTML"));
    //そして、fadeInで表示する。
    $("#gallery__gray-display").fadeIn(200);
    $('html, body').css('overflow', 'hidden');
    return false;
  });

  // コース画像モーダル非表示イベント
  // モーダル画像背景 または 拡大画像そのものをクリックで発火
  $("#gallery__gray-display").click(function () {
    // 非表示にする
    $("#gallery__gray-display").fadeOut(200);
    $('html, body').removeAttr('style');
    return false;
  });

  /* --------------------------------------------
  /* QAのアコーディオン
  /* -------------------------------------------- */
  jQuery('.qa__head').on('click', function () {
    jQuery(this).next().slideToggle();
    jQuery(this).children('.qa__head').toggleClass('is-open');
  });

  /* --------------------------------------------
  /* サイドバーのトグルリスト
  /* -------------------------------------------- */
  $(function () {
    // 最初のアコーディオン以外を閉じる
    $(".archive__year + .archive__lists").not(":first").slideUp(0);

    // 最初のアコーディオンにクラスを追加して開く
    $(".archive__year:first").addClass("open");

    $(".archive__year").on("click", function () {
      // クリックされたアコーディオンをトグル
      $(this).toggleClass("open");
      $(this).next(".archive__lists").slideToggle(300);
    });
  });

  /* --------------------------------------------
  /* コンタクトフォームの必須項目入力を確認
  /* -------------------------------------------- */
  $(document).ready(function () {
    $('#js-form').submit(function (event) {
      // フォームの必須項目を確認
      var nameInput = $('#name');
      var emailInput = $('#email');
      var telInput = $('#tel');
      var checkboxInput = $('[name="checkboxGroup"]');
      var textareaInput = $('#textarea');

      var inputs = [nameInput, emailInput, telInput, checkboxInput, textareaInput];

      // エラーメッセージを表示にする
      $('.contact-main__text').css('display', 'block');

      // 必須項目が空の場合、背景と枠を赤くする
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var value = input.val();
        var isCheckbox = input.is(':checkbox');

        if (value === '' || (isCheckbox && !input.prop('checked'))) {
          input.css({
            "background": "rgba(201, 72, 0, 0.20)",
            "border": "1px solid #C94800",
          });
          if (isCheckbox) {
            input.parent().css({
              "background": "rgba(201, 72, 0, 0.20)",
              "border": "1px solid #C94800",
            });
          }
          event.preventDefault(); // フォームの送信を防ぐ
        } else {
          input.css({
            "background": "#FFF",
            "border": "1px solid #408F95",
          });
        }
      }
    });
  });
  /* --------------------------------------------
  /* ダイビング情報のタブ切り替え
  /* -------------------------------------------- */
  $(function() {
    // パラメータ取得
    function getParam(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    // ページ読み込み時のタブ切り替え
    let tabPram = ['tab-1', 'tab-2', 'tab-3'];
    let pram = getParam('active-tab');
    if (pram && $.inArray(pram, tabPram) !== -1) {
      $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
      $('[data-tab="' + pram + '"]').addClass('is-active');
    }

    // ロード後のタブ切り替え
    $('.js-tab-switch').on('click', function() {
      let dataPram = $(this).data('tab');
      $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
      $('[data-tab="' + dataPram + '"]').addClass('is-active');
    });
  });
});