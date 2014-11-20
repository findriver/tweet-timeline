var globalTweets = [],
    refreshCount = 0;

$(function() { 
    fetchTweet();
});

function fetchTweet() {
    twitterFetcher.fetch(tweetConfig);
    setTimeout(refreshFeed, 400); 
    // Wait for globalTweets to populate
}

function refreshFeed() {
    refreshCount += 1;
        console.log('how many tweets there are', globalTweets.length)
        console.log('number of refreshes', refreshCount)    
    if (globalTweets.length < 2 && refreshCount < 3) {
        fetchTweet();
        console.log('fetch again')
    } else {
        console.log('fetch at interval') 
        setInterval(function() {
            fetchTweet();
            refreshCount = 0;
        }, 120000); 
    } 
}

var tweetConfig = {
  "id": '427176145516130304', 
  "domId": '',
  "maxTweets": 10,
  "enableLinks": true,
  "showUser": true,
  "showTime": true,
  "dateFunction": '',
  "showRetweet": false,
  "customCallback": handleTweets,
  "showInteraction": false
};

// Twitter widget IDs
// Vogue fashion '495312900106383360' 
// JB '427176145516130304'

function handleTweets(tweets) {
    if (tweets.length > 3) {
        globalTweets = tweets;
    }    
    console.log('global tweets after being assigned', globalTweets.length)
    var tweetArray = $('<ul>');

    for (var i = 0; i < globalTweets.length; i++) {
      var tweetLi = $('<li>');
      var tweetRaw = $(globalTweets[i]);

      var user = $(tweetRaw[0]);
      var tweet = $(tweetRaw[1]);

      var handle = user.find('span').last().html();
      var userSpan = $('<a>').attr('href', 'http://twitter.com/'+handle).html(handle);
      tweet.find('img').remove();
      var tweetContent = tweet.html();

      tweetLi.append(userSpan).append(': ').append(tweetContent);
      tweetArray.append(tweetLi);
    }

    $('#tweet-wrapper').html(tweetArray);
    //$('#twitter-widget').html(tweetArray);
    marqueeEffect();
}    

function marqueeEffect() {    
    var $wrapperul = $('#tweet-wrapper ul');
    var $wrapperli = $wrapperul.append($wrapperul.html()).children();
    var _height = $('#tweet-wrapper').height()* -1;
    var scrollSpeed = 1000;
    var timer;
    var speed = 3000 + scrollSpeed;
        
    $wrapperli.hover(function(){
        clearTimeout(timer);
    }, function(){
        timer = setTimeout(showbanner, speed); 
    });
    
    function showbanner(){
        var _now = $wrapperul.position().top/_height;       
        _now = (_now + 1)% $wrapperli.length;
        
        
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
}


