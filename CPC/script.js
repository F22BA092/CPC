//現在見ているサイトを表す環境変数フラグ.
let g_site_flg = true;


// ページが読み込まれたときとウィンドウサイズが変更されたときに高さを調整
function adjust_header_height() {
  const header_height = document.querySelector(".regular_head").offsetHeight;
  const end_height = document.querySelector(".regular_end").offsetHeight;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // NodeListを取得
  regular_menu = document.querySelector(".regular_menu");
  regular_menu.style.marginTop = header_height + "px";
  regular_menu.style.height = `calc(100% - ${header_height + end_height}px)`;

  false_menu = document.querySelector(".false_menu");
  false_menu.style.marginTop = header_height + "px";
  false_menu.style.height = `calc(100% - ${header_height + end_height}px)`;


  document.querySelector(".regular_body").style.height = viewportHeight - header_height - end_height + "px";
  document.querySelector(".false_body").style.height = viewportHeight - header_height - end_height + "px";

  const siteClasses = [".regular_site", ".false_site"];
  siteClasses.forEach(siteClass => {
    const site = document.querySelector(siteClass);
    site.style.paddingTop = header_height + "px";
    site.style.paddingBottom = end_height + "px";
  });
}

//カートボタンがクリックされた時に発火.

$(document).ready(function () {
  $('.phone_title').click(function () {
    $('#mask, #modal').removeClass('modal_hidden');
  });

  $('#mask').click(function () {
    $('#mask, #modal').addClass('modal_hidden');
  });
});



// ページ読み込み時とウィンドウサイズ変更時に高さを調整
window.addEventListener("load", adjust_header_height);
window.addEventListener("resize", adjust_header_height);

//正規サイトのメニューがクリックされた時に発火.
$(function () {
  $('.regular_hamburger').click(function () {
    $('.regular_hamburger').toggleClass('active');
    $('.regular_menu').toggleClass('open');

    // class="regular_hamburger_text" のテキストを変更
    var hamburgerText = $('.regular_hamburger_text');
    if (hamburgerText.text() == "MENU") {
      // MENUのテキストの時、regularbodyにスクロール属性を排除
      $('.regular_body').css('overflow-y', 'hidden');
      hamburgerText.text("CLOSE");
      window.scrollTo({
        top: 0,
        behavior: "smooth" // スムーズなアニメーションつきでスクロールする（オプション）
      });
    } else {
      // CLOSEのテキストの時にbodyのスクロール属性を追加
      $('.regular_body').css('overflow-y', 'auto');
      hamburgerText.text("MENU");
    }
  });
});

//偽サイトのメニューがクリックされた時に発火.
$(function () {
  $('.false_hamburger').click(function () {
    $('.false_hamburger').toggleClass('active');
    $('.false_menu').toggleClass('open');

    // class="regular_hamburger_text" のテキストを変更
    var hamburgerText = $('.false_hamburger_text');
    if (hamburgerText.text() == "MENU") {
      // MENUのテキストの時にbodyにスクロール属性を削除
      $('.false_body').css('overflow-y', 'hidden');
      hamburgerText.text("CLOSE");
      window.scrollTo({
        top: 0,
        behavior: "smooth" // スムーズなアニメーションつきでスクロールする（オプション）
      });
    } else {
      // CLOSEのテキストの時にbodyのスクロール属性を追加
      $('.false_body').css('overflow-y', 'auto');
      hamburgerText.text("MENU");
    }
  });
});

//サイト切り替えボタンが押された場合に発火.
$(document).ready(function () {
  $(".switch_btn").click(function () {
    // 正規サイトとFalseサイトの表示を切り替える
    $(".regular_site, .false_site").toggle();
    var toggle_text = $('.switch_btn_txt');
    var header_text = $('.regular_titile_highlight');
    if (toggle_text.text() === "正規サイトに切り替える") {
      toggle_text.text("偽サイトに切り替える");
      header_text.text("正規サイト");
      g_site_flg = true;
    } else {
      toggle_text.text("正規サイトに切り替える");
      header_text.text("偽サイト");
      g_site_flg = false;
    }
    $('#mask, #modal').addClass('modal_hidden');

    if (!g_site_flg) {
      $('.regular_hamburger').each(function () {
        if ($(this).hasClass('active') || $(this).hasClass('open')) {
          $(this).removeClass('active');
          var hamburgerText = $('.regular_hamburger_text');
          $('.regular_body').css('overflow-y', 'auto');
          hamburgerText.text("MENU");
        }
      });
      $('.regular_menu').each(function () {
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        }
      });
    } else {
      $('.false_hamburger').each(function () {
        if ($(this).hasClass('active') || $(this).hasClass('open')) {
          $(this).removeClass('active');
          var hamburgerText = $('.false_hamburger_text');
          $('.false_body').css('overflow-y', 'auto');
          hamburgerText.text("MENU");
        }
      });
      $('.false_menu').each(function () {
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        }
      });
    }
  });
});


$(document).on('click', '[data-special]', function(event) {
  var clickedElement = $(event.currentTarget);

  // 既にテキストが配置されている場合は何もしない
  if (clickedElement.find('.correct_text').length === 0) {
      // クリックされた位置の座標を取得
      var clickX = event.pageX - clickedElement.offset().left -21;
      var clickY = event.pageY - clickedElement.offset().top  -32;

      var resultText = $('<p class="correct_text">〇</p>');

      // テキストをクリックされた位置に配置
      resultText.css({
          fontWeight: '100',
          color: '#f95a04',
          position: 'absolute',
          top: clickY,
          left: clickX,
          fontSize: '45px',
      });

      clickedElement.append(resultText);
  }
});
