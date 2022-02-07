/*-------------------------------
	メインビジュアル
-------------------------------*/
//スライド（大）
var barDuration = 3000

const mv_swiper = new Swiper('.mainVisual__slide', {
	speed: 1400,
	slidesPerView: '1',
	loop: true,
	loopAdditionalSlides: 0,
	preventInteractionOnTransition: true,
	effect: 'fade',
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.mainVisual__swiper-pagination',
		clickable: true,
		type: 'bullets',
		renderBullet: function (index, className) {
			return '<span class="' + className + '">0' + (Number(index) + 1) + '<svg class="circle" width="48" height="48" viewBox="0 0 48 48"><circle class="circle1" cx="24" cy="24" r="23" stroke="#f08a4b" stroke-width="2" fill="none"/></svg></span>';
		},
	},
});


/*-------------------------------
	SPのみ画像順番入れ替え
-------------------------------*/
var mediaQueryList01 = window.matchMedia("(max-width:834px)");
var mediaQueryList02 = window.matchMedia("(min-width:835px)");

/* イベントリスナー */
var listener01 = function(event) {
  // リサイズ時に行う処理
	if (event.matches) {
		// 835px未満
		$('#Destination01').after($('#Target01'));
	}
};
var listener02 = function(event) {
  // リサイズ時に行う処理
	if (event.matches) {
		// 835px以上
		$('#BenchMark01').after($('#Target01'));
	}
};

/* リスナー登録 */
if (mediaQueryList01.addEventListener) {
	mediaQueryList01.addEventListener("change", listener01, false);
} else if (mediaQueryList01.attachEvent) {
	mediaQueryList01.attachEvent("change", listener01);
}

if (mediaQueryList02.addEventListener) {
	mediaQueryList02.addEventListener("change", listener02, false);
} else if (mediaQueryList02.attachEvent) {
	mediaQueryList02.attachEvent("change", listener02);
}

/* 初期化処理 */
listener01(mediaQueryList01);
listener02(mediaQueryList02);


/*-------------------------------
	ローディング
-------------------------------*/
var splash_text = $.cookie('accessdate'); //キーが入っていれば年月日を取得
var myD = new Date();//日付データを取得
var myYear = String(myD.getFullYear());//年
var myMonth = String(myD.getMonth() + 1);//月
var myDate = String(myD.getDate());//日

if (splash_text != myYear + myMonth + myDate) {//cookieデータとアクセスした日付を比較↓
        $("#splash").css("display", "block");//１回目はローディングを表示
        setTimeout(function () {
            $("#splash_logo").fadeIn(1000, function () {//1000ミリ秒（1秒）かけてロゴがフェードイン
                setTimeout(function () {
            $("#splash_logo").fadeOut(1000);//1000ミリ秒（1秒）かけてロゴがフェードアウト
                }, 1000);//1000ミリ秒（1秒）後に処理を実行
        setTimeout(function () {
            $("#splash").fadeOut(1000, function () {//1000ミリ秒（1秒）かけて画面がフェードアウト
            var myD = new Date();
            var myYear = String(myD.getFullYear());
            var myMonth = String(myD.getMonth() + 1);
            var myDate = String(myD.getDate());
			$.cookie('accessdate', myYear + myMonth + myDate); //accessdateキーで年月日を記録

			/* ここにローディングが終わった後に動かしたい処理を書く */
			// メインビジュアル アニメーション
			$('.mainVisual__slide').addClass('anime__mvImg');
			$('.mainVisual__copy').addClass('anime__mvCopy');
			$('.mainVisual__sub-text').addClass('anime__mvSub-text');
			/* ここにローディングが終わった後に動かしたい処理を書く */

        });
        }, 1700);//1700ミリ秒（1.7秒）後に処理を実行
    });
}, 1000);//1000ミリ秒（1秒）後に処理を実行
}else {
	$("#splash").css("display", "none");//同日2回目のアクセスでローディング画面非表示

	$(window).on('load', function () {
		/* ここに動かしたい処理を書く */
		$('.mainVisual__slide').addClass('anime__mvImg');
		$('.mainVisual__copy').addClass('anime__mvCopy');
		$('.mainVisual__sub-text').addClass('anime__mvSub-text');
		/* ここに動かしたい処理を書く */
	});
}
