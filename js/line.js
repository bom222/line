$(function () {
  // =================언어상자 노출 스크립트====================
  var $input = $("input#lang");
  var $arrow = $(".opt sapn.arrow");
  var $langlist = $(".langlist");

  $langlist.find("a").on("click", function () {
    $input.val($(this).text());
    $(this).parent().addClass("on").siblings().removeClass("on");
    $langlist.toggle();
  });

  $input.add($arrow).on("click", function () {
    $langlist.toggle();
    $arrow.toggleClass("arrow-up");
  });

  $(".opt").on("mouseleave", function () {
    $langlist.hide();
    $arrow.removeClass("arrow-up");
  });

  // =================토글버튼 클릭 시 메뉴 나타남====================
  var $btnGnb = $(".container>.btn-gnb");
  var $nav = $(".container>nav");

  $btnGnb.on("click", function () {
    $(this).toggleClass("close");
    $nav.toggle();
  });

  // =================모바일버전의 내용을 다른내용으로 변경====================

  // 컨텐츠 영역의 각 제목 변수 지정
  var $msgH3 = $(".line_msg>div>.explain>h3");
  var $telH3 = $(".line_tel>div>.explain>h3");
  var $stickerH3 = $(".line_sticker>div>.explain>h3");
  var $shareH3 = $(".line_share>div>.explain>h3");
  var $couponH3 = $(".line_coupon>div>.explain>h3");

  // .html(); - 선택한 요소에 포함되는 하위 요소를 불러오거나 하위 요소를 새요소로 변경
  // pc버전의 메인서비스 제목
  var msgH3_PC = $msgH3.html();
  var telH3_PC = $telH3.html();
  var stickerH3_PC = $stickerH3.html();
  var shareH3_PC = $shareH3.html();
  var couponH3_PC = $couponH3.html();

  // mobile 버전의 h3 동생인 p요소들
  var msgText_PC = $msgH3.next().html();
  var telText_PC = $telH3.next().html();
  var stickerText_PC = $stickerH3.next().html();
  var shareText_PC = $shareH3.next().html();
  var couponText_PC = $couponH3.next().html();

  // 변경될 내용 변수지정 -h3
  var msgH3_MO = "무료 메세지";
  var telH3_MO = "LIVE VOOM";
  var stickerH3_MO = "스티커로 더 즐거운 대화";
  var shareH3_MO = "무엇이든 공유";
  var couponH3_MO = "인기브랜드 쿠폰";

  // 변경될 내용 변수지정 -p
  var msgText_MO =
    "1:1 대화는 물론, 그룹대화까지 <br /> 무제한 무료로 즐겨보세요.";
  var telText_MO =
    "듣고싶은 목소리, 보고싶은 얼굴이 있다면 <br /> 망설이지 마세요!";
  var stickerText_MO =
    "10,000개가 넘는 스티커와 이모티콘으로 <br /> 미묘한 감정까지 전달해보세요!";
  var shareText_MO =
    "사진, 동영상은 물론 <br /> 음성메시지와 연락처, 위치정보까지 <br /> 손쉽게 보낼 수 있습니다.";
  var couponText_MO =
    "인기 아티스트, 브랜드의 최신 소식과 <br />쿠폰이 기다리고 있습니다.";

  var gapH = 0; // 가로 폭에 따른 높이값 변수 지정(초기화) -pc(70px), mobile(50px)
  $(window).on("load resize", function () {
    if ($(this).width() > 640) {
      //pc
      gapH = 70;
      $nav.show();

      // h3
      $msgH3.html(msgH3_PC);
      $telH3.html(telH3_PC);
      $stickerH3.html(stickerH3_PC);
      $shareH3.html(shareH3_PC);
      $couponH3.html(couponH3_PC);

      // p
      $msgH3.next().html(msgText_PC);
      $telH3.next().html(telText_PC);
      $stickerH3.next().html(stickerText_PC);
      $shareH3.next().html(shareText_PC);
      $couponH3.next().html(couponText_PC);
    } else {
      //mobile
      gapH = 50;
      $btnGnb.removeClass("close").next().hide();

      // h3
      $msgH3.html(msgH3_MO);
      $telH3.html(telH3_MO);
      $stickerH3.html(stickerH3_MO);
      $shareH3.html(shareH3_MO);
      $couponH3.html(couponH3_MO);

      // p
      $msgH3.next().html(msgText_MO);
      $telH3.next().html(telText_MO);
      $stickerH3.next().html(stickerText_MO);
      $shareH3.next().html(shareText_MO);
      $couponH3.next().html(couponText_MO);
    }
  });

  // =================메뉴 클릭 시 색 변경되며, 위치 이동====================
  var $topmenu = $(".gnb>li>a");
  var gapH = 0;
  var arrContH = new Array();
  
  // 스크롤 높이값에 따른 메뉴의 색상 변화
  $(window).on("scroll", function () {
    var scrollH = $(this).scrollTop();
    for (var i = 0; i < $topmenu.size(); i++) {
      if (scrollH >= arrContH[i + 1] - gapH) {
        $topmenu.eq(i).parent().addClass("on").siblings().removeClass("on");
      } else if (scrollH < arrContH[1] - gapH) {
        $topmenu.parent().removeClass("on");
      }
    }
  });

  // 메인 배너와 article의 top값을 배열에 저장
  function setPosArticle() {
    arrContH = []; // 배열 비움
    arrContH.push($("header+hr+section").offset().top); // 메인 배너의 높이값 추가
    $("#mainsrv>article").each(function () {
      arrContH.push($(this).offset().top);
    });
  }

  setPosArticle();

  // 메뉴 클릭 시 각 article영역으로 애니메이션되면서 이동

  $topmenu.on("click", function (evt) {
    var nowIdx = $topmenu.index($(this));
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: arrContH[nowIdx + 1] - gapH + 1,
        },
        400,
        "easeInOutCubic"
      );
    if ($(window).width() <= 640) {
      $btnGnb.trigger("click");
    }

    evt.preventDefault(); // 링크차단메서드
  });

  // 로고클릭시 최상단으로 이동
  $(".logo").on("click", function (evt) {
    $("html, body").stop().animate({scrollTop: 0,},400,"easeInOutCubic");
    evt.preventDefault(); // 링크차단메서드
  });

  // =================슬라이드, 인디케이터====================

  var $mainbanrSwipe = document.getElementById("mainbanner-swipe");
  var $indicator = $("#mainbanner-swipe~.mainbanner-pagination>li>a");
  var nowIdx = 0;
  var oldIdx = nowIdx;
  var intervalID = null;
  var noEventTime = 0; // 이벤트가 없는 시간(초)을 체크하는 변수
  var $btnAuto = $("#mainbanner-swipe~.btn-auto"); // 시작, 정지버튼
  $btnAuto.data("state", "on"); // 버튼에 내부데이터 설정 - 재생 : on / 정지 : off

  // Swipe 플러그인 사용 문법
  window.swipeArea = Swipe($mainbanrSwipe, {
    callback: function (idx) {
      setIndicator(idx);
    },
  });

  //슬라이드 애니메이션
  function move() {
    swipeArea.slide(nowIdx, 400); // 슬라이드를 활용하여 배너 이동
    setIndicator(nowIdx); // 인디케이터 활성화 함수 호출
    oldIdx = nowIdx;
  }

  // 재생-정지 함수
  function autoStop() {
    clearInterval(intervalID);
    $btnAuto.removeClass("pause").text("재생시작").data("state", "off");
  }

  // 자동재생 상태변환 함수
  function autoStateChange() {
    noEventTime = 0;
    autoStop(); // 자동재생 정지 함수 호출
  }

  // 인디케이터 활성화 표시
  function setIndicator(idx) {
    $indicator.eq(idx).parent().addClass("on").siblings().removeClass("on");
  }

  //인디케이터 클릭이벤트 설정
  $indicator.on("click", function () {
    nowIdx = $indicator.index($(this));
    if (oldIdx != nowIdx) {
      move(); // 슬라이드 함수 호출
    }
    autoStateChange();
    evt.preventDefault();
  });

  // 자동재생함수
  function autoPlay() {
    intervalID = setInterval(function () {
      swipeArea.slide(nextIdx(), 400);
    }, 3000);
  }

  // 시간체크함수
  function timeCheck() {
    setInterval(function () {
      noEventTime++;
      if (noEventTime > 4 && $btnAuto.data("state") == "off") {
        $btnAuto.trigger("click");
      }
    }, 1000);
  }

  $(window).on("load", function () {
    setIndicator(nowIdx); // 인디케이터 활성화 표시함수 호출
    swipeArea.slide(nowIdx, 400);
    autoPlay();
    timeCheck();
  });

  // 일체형 재생, 정지 버튼에 대한 클릭 이벤트 설정
  $btnAuto.on("click", function (evt) {
    var stateVal = null;
    if ($(this).data("state") == "on") {
      $(this).removeClass("pause").text("재생시작");
      stateVal = "off";
      autoStop();
      noEventTime = 0;
    } else {
      $(this).addClass("pause").text("일시정지");
      stateVal = "on";
      autoPlay();
    }
    $(this).data("state", stateVal);
    evt.preventDefault();
  });

  // 이전-다음 버튼
  function prevIdx() {
    if (nowIdx < 1) {
      nowIdx = $indicator.size() - 1;
    } else {
      nowIdx--;
    }
  }

  function nextIdx() {
    if (nowIdx >= $indicator.size() - 1) {
      nowIdx = 0;
    } else {
      nowIdx++;
    }
    return nowIdx;
  }

  // 이전버튼 클릭 이벤트 설정
  $(".mainbanner-prev").on("click", function (evt) {
    autoStateChange();
    prevIdx();
    move();
    autoStop();
    $btnAuto.data("state", "on").trigger("click");
    evt.preventDefault();
  });
  // 다음버튼 클릭 이벤트 설정
  $(".mainbanner-next").on("click", function (evt) {
    autoStateChange();
    nextIdx();
    move();
    autoStop();
    $btnAuto.data("state", "on").trigger("click");
    evt.preventDefault();
  });
}); //끝
