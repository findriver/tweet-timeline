
$(function(){
	var $wrapperul = $('div #wrapper ul'),
		$wrapperli = $wrapperul.append($wrapperul.html()).children(),
		
		_height = $('div #wrapper').height()* -1,
		scrollSpeed = 600,
		timer,
		speed = 1000 + scrollSpeed;
		
		
	$wrapperli.hover(function(){
		clearTimeout(timer);
	}, function(){
		timer = setTimeout(showbanner, speed); 
	});
	
	function showbanner(){
		var _now = $wrapperul.position().top/_height;
		alert (_now);
		_now = (_now + 1)% $warpperli.length;
		alert($warpperli.length);
		
		$wrapperul.animate({
			top: _now * _height
		}, scrollSpeed, function(){
			if(_now == $wrapperli.length/2){
				$wrapperul.css('top', 0);
			}
		});
		
		timer = setTimeout(showbanner, speed);
	}
	timer = setTimeout(showbanner, speed);
	
});

