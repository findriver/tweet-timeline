## About Twitter Stream
This demo uses the <a href="http://www.jasonmayes.com/projects/twitterApi/">Twitter Post Fetcher Jason Mayes</a>.


## Specs
### Custom display effect
Twitter Post Fetch deconstructs the client-side Twitter widget and allows you to customize the display of tweets. In this case, we use a custom marquee ticker effect.

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

### Maintain sufficient number of tweets 

A global tweet array holds the tweets currently being displayed. `globalTweets` only refreshes if we successfully fetch more than 3 tweets. 

```javascript
var globalTweets = [];

function handleTweets(tweets) {
  if (tweets.length > 3) {
    globalTweets = tweets;

    // Build new tweet array
  } 
``` 

### Customization
The interval at which to refresh feed (default: 120000ms) and the minimum number of tweets in global array (default: 4) can be customized.