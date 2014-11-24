## About Twitter Stream
This demo uses the <a href="http://www.jasonmayes.com/projects/twitterApi/">Twitter Post Fetcher Jason Mayes</a>. Download <a href="https://twitter-custom-widget.herokuapp.com/js/twitter-post-fetcher.js">source code</a>.


## Specs
### Using Twitter post fetcher
You simply need to customize the tweetConfig object and pass it to `twitterFetcher.fetch()` function. `handleTweets` is the custom callback that lets you decide how to display your tweets.

```
var tweetConfig = {
  "id": '514055194921799680', 
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

twitterFetcher.fetch(tweetConfig);
```

### Custom display effect
In this case, I use a custom <a href="https://twitter-custom-widget.herokuapp.com/js/script.js">marquee ticker effect</a>. It is called with one parammeter - the array of tweets: `marqueeEffect('#tweet-wrapper ul')`.


### Maintain number of tweets
A global tweet array holds the tweets currently being displayed. `globalTweets` only refreshes if we successfully fetch more than 3 tweets.

```javascript
var globalTweets = [];

function handleTweets(tweets) {
  if (tweets.length > 3) {
    globalTweets = tweets;

    // Build new tweet array
  } 
```

### Check for updates 

```javascript
var fetchCount = 0;

function refreshFeed() {
    if (globalTweets.length === 0) {
        fetchCount = 0;
        fetchTweet();
    } else if (globalTweets.length < 3 && fetchCount < 3) {
        fetchTweet(); 
    } else {
        fetchCount = 0; 
        setTimeout(fetchTweet, 120000);   
    } 
}
```
The `refreshFeed` function is called each time `fetchTweets` executes and checks whether more tweets need to be fetched. If a satisfactory amount of tweets are available, `fetchTweets` will be called every 2 minutes.

 

### Customization
The interval at which to refresh feed (default: 120000ms) and the minimum number of tweets in global array (default: 4) can be customized.