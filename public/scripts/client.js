/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {

const renderTweets = function(tweets) {
const $tweetsContainer = $(".all-posts");

  //clear posts due to duplicates. changed tweetscontainer to an added section class in html
  $tweetsContainer.empty();

  //loop through the tweets and append each to render
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    //prepend will add tweets to the front
    $tweetsContainer.prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
  //protection from users to submit html file type attacks through message submission post
  const escapedText =$("<div>").text(tweet.content.text);
  const timeAgoString = timeago.format(tweet.created_at);
let $tweet = $(`
<article class="tweet">
        <div class="tweet-top">
          <div class="user">
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>  
          <p>${tweet.user.handle}</p>
        </div>
        <p class="tweet-post">${escapedText}</p>
        <hr></hr>
        <footer>
          <span class="time">${timeAgoString}</span>
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

  //prevent actions by verifying content
  const formContent = $("#tweet-text").val();

  //
  if (!formContent) {
    alert("I think you forgot to put eggs in your basket! (Metaphorically speaking)");
    return;
  }

  if(formContent.length > 140) {
    alert("Less is more. Tweet cannot be surpass 140 characters!");
    return;
  }
  
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