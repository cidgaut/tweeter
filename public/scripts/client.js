/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
const $tweetsContainer = $(".tweet-new");

  //loop through the tweets and append each to render
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  }
};

const createTweetElement = function(tweet) {
let $tweet = $(`
<article class="tweet">
        <div class="tweet-top">
          <div class="user">
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>  
          <p>${tweet.user.handle}</p>
        </div>
        <p class="tweet-post">${tweet.content.text}</p>
        <hr></hr>
        <footer>
          <span class="time">${tweet.created_at}</span>
          <div class="tweet-actions">
            <i class="fa-regular fa-bell"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-regular fa-heart"></i>
          </div>
        </footer>
      </article>
`)
return $tweet;
}

//listen for submit
$("#tweet-form").submit(function (event) {
  //prevent default actions
  event.preventDefault();
  
  //serialize data
  const formData = $(this).serialize();

  //POST to server
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: formData,
    success: function (response) {
      //response for success
      console.log("post success:", response)

      loadTweets();
    },
    error: function (error) {
      console.log("post error:", error)
    },
  });
});

const loadTweets = function () {
  //retrieve tweets from server 
  $.ajax({
    method: "GET",
    url: "/tweets",
    success: function (response) {
      console.log("get success:", response);

      renderTweets(response);
    },
    error: function (error) {
      console.log("get error:", error);
    },
  });
};

loadTweets();

renderTweets(data);
});