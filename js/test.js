/*$(document).ready(function(){
	$('ul').addClass('scroll');
	var navhtml = $("<nav>").attr('id', 'navigation');
	$('div').append(navhtml);
	$(navhtml).appendTo('<a href="https://cdn.syndication.twimg.com/widgets/timelines/502160051226681344"></a> ');
	$('#example5').infinitescroll({
		navSelector: "#navigation",
		nextSelector: "#navigation a",
		itemSelector: ".scroll",		
	
	});
});*/ 


/* */


$(document).ready(function(){
	function getElements()
	{
	//var x=document.getElementsByTagName(".user a>span")[0];
	alert($('div').attr('.tweet'));
	}
	getElements();
});



/*var tweet = $("p.tweet").text(),
		tw_name = $(".user span span")
	alert(tweet);*/




//});