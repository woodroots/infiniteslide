# jQuery infiniteSlide Plugin

横方向に無限にスクロールするプラグインです。極めてシンプル。

## デモ
<http://wood-roots.com/sample/infiniteslide/>

## 使い方

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="infiniteslide.js"></script>

	<script type="text/javascript">
		$(function(){
			$('.infiniteslide1').infiniteslide({
				'height': 400, //高さ
				'speed': 30, //速さ
				'direction' : 'left', //向き
				'pauseonhover': true //マウスオーバーでストップ
			});
		});
	</script>

	<!-- 途中略 -->

	<div class="infiniteslide1">
		<ul>
			<li><img src="common/img/1.jpg" alt="" /></li>
			<li><img src="common/img/2.jpg" alt="" /></li>
			<li><img src="common/img/3.jpg" alt="" /></li>
			<li><img src="common/img/4.jpg" alt="" /></li>
		</ul>
	</div>


## オプション
オプションは4種類のみです。

+   `height` : 高さ
+   `speed` : 速さ
+   `direction` : 向き（'left'か'right'のみ可能）
+   `pauseonhover` : マウスオーバーでアニメーションをストップする（true/false)


## 更新情報
2013.09.09　jQuery pauseプラグインを使ったマウスオーバーによるストップを追加
<http://tobia.github.io/Pause/>