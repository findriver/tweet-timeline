var globalTweets = [],
    fetchCount = 0;

$(function() { 
    fetchTweet();
    $('#refresh').click(fetchTweet)
});

function fetchTweet() {
    twitterFetcher.fetch(tweetConfig);
    fetchCount += 1; 

    // Wait for globalTweets to populate
    // then check if need to refetch  
    setTimeout(refreshFeed, 400); 
}

function refreshFeed() {
    if (globalTweets.length === 0) {
        console.log('no tweet')
        // No tweet, keep fetching
        fetchCount = 0;
        setTimeout(fetchTweet, 1000);
    } else if (globalTweets.length < 3 && fetchCount < 3) {
        // Not many tweets as expected, fetch again
        // without reseting fetchCount
        fetchTweet(); 
    } else {
        console.log('refresh later')
        // Fetch again after 2 mins
        fetchCount = 0; 
        setTimeout(fetchTweet, 120000);   
    } 
}

var tweetConfig = {
  "id": '514055194921799680', //'427176145516130304', 
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

function handleTweets(tweets) {
  if (tweets.length > 3) {
    // Only build new tweetArray if globalTweets change
    globalTweets = tweets;
    var tweetArray = $('<ul>');           

    for (var i = 0; i < globalTweets.length; i++) {
      var tweetLi = $('<li>');          
      var user = $($(globalTweets[i])[0]);
      var tweet = $($(globalTweets[i])[1]);           
      
      var handle = user.find('span').last().html();
      var userSpan = $('<a>').attr('href', 'http://twitter.com/'+handle).html(handle);
      tweet.find('img').remove();      var tweetContent = tweet.html();          
      tweetLi.append(userSpan).append(': ').append(tweetContent);
      tweetArray.append(tweetLi);
    }             

    $('#tweet-wrapper').html(tweetArray);
    //$('#twitter-widget').html(tweetArray);
    marqueeEffect();
  }    
}    


function marqueeEffect() {    
  var $wrapperUl = $('#tweet-wrapper ul');
  var $wrapperLi = $wrapperUl.append($wrapperUl.html()).children();
  var _height = $('#tweet-wrapper').height()* -1;
  var scrollSpeed = 1000;
  var timer;
  var speed = 3000 + scrollSpeed;
      
  $wrapperLi.hover(function(){
      clearTimeout(timer);
  }, function(){
      timer = setTimeout(showbanner, speed); 
  });
  
  function showbanner() {
      var _now = $wrapperUl.position().top/_height;      
      _now = (_now + 1) % $wrapperLi.length;
      
      $wrapperUl.animate({
          top: _now * _height
      }, scrollSpeed, function(){
          if(_now == $wrapperLi.length/2){
              $wrapperUl.css('top', 0);
          }
      });
      
      timer = setTimeout(showbanner, speed);
  }
  timer = setTimeout(showbanner, speed);
}


