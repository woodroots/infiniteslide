(function($){

$.fn.infiniteslide = function(options) {

//option
var settings = $.extend( {
		'height': 400, //高さ
		'speed': 30, //速さ
		'direction' : 'left' //向き
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
	var anim = function(){
		if(settings.direction == 'left'){
			ul.animate({
				left: '-' + ul.width()/2 + 'px'
				},ul.width()/2*settings.speed,'linear',function(){
				ul.css('left',0);
				anim();
			});
		} else if(settings.direction == 'right'){
			ul.css('left',-1*ul.width()/2 + 'px').animate({
				left: '0px'
				},ul.width()/2*settings.speed,'linear',function(){
				ul.css('left',-1*ul.width()/2 + 'px');
				anim();
			});
		}
	}
	
	//すべての画像が読み込み終わってからアニメーションスタート（いらないかも・・・）
	var delay = ul.children().size() * 210;
	setTimeout(function(){anim();},delay);
	
	return d.promise();
}

	//処理の実行
	return this.each(function() {
		opening($(this)).then(slide($(this)));
	});

  };
})(jQuery);