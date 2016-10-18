/*
jQuery infiniteSlide Plugin
version: 1.1
Author: T.Morimoto

Copyright 2014, T.Morimoto
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php

https://github.com/woodroots/infiniteslide
http://wood-roots.com/?p=514
*/

(function($){

$.fn.infiniteslide = function(options) {

//option
var settings = $.extend( {
		'height': 400, //高さ
		'speed': 30, //速さ
		'direction' : 'left', //向き
		'pauseonhover': true //マウスオーバーでストップ
		}, options);

//開始時のフェードインとプリロード
var opening = function(obj){
	var d = new $.Deferred;

	var ul = obj.find('ul');
	var li = obj.find('li');

	
	//幅の総和を取得
	i = 0;
	obj.find('img').each(function(key,value){
		$('<img />').attr('src',$(this).attr('src'));
		i = i + parseInt($(this).width());
	});

	//CSS
	obj.css({
		overflow: 'hidden'
	});
	ul.css({
		width: i*2 + 'px',
		height: settings.height + 'px',
		position: 'relative',
		overflow: 'hidden'
	}).children('li').css({
		display: 'inline',
		float: 'left'
	});
	
	//順番にフェードイン
	li.hide().each(function(key,value){
		$(this).delay(key*200).fadeIn('slow',function(){
			$(this).clone().css('display','inline').appendTo(ul);
		});
	});
	
	d.resolve();

	return d.promise();
}


var slide = function(obj){
	var d = new $.Deferred;
	var ul = obj.children('ul');
	
	//leftかrightかで方向を変えてアニメーション
	//ロード時のみ必要
	if(settings.direction == 'right'){
		ul.css('left',-1*ul.width()/2 + 'px');
	}
	
	var anim = function(){
		if(settings.direction == 'left'){
			ul.animate({
				left: '-' + ul.width()/2 + 'px'
				},ul.width()/2*settings.speed,'linear',function(){
				ul.css('left',0);
				anim();
			});
		} else if(settings.direction == 'right'){
			ul.animate({
				left: '0px'
				},ul.width()/2*settings.speed,'linear',function(){
				ul.css('left',-1*ul.width()/2 + 'px');
				anim();
			});
		}
		
		//マウスオーバーで停止
		if(settings.pauseonhover){
			ul.on('mouseenter',function(){
				$(this).pause();
			}).on('mouseleave',function(){
				$(this).resume();
			});
		}
	}
	
	//すべての画像が読み込み終わってからアニメーションスタート
	var delay = ul.children().length * 1000;
	setTimeout(function(){anim();},delay);

	return d.promise();
}

	//処理の実行
	return this.each(function() {
		opening($(this)).then(slide($(this)));
	});

  };
})(jQuery);
