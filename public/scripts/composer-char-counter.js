$(document).ready(function() {
  // --- our code goes here ---
  //using # to grab specific tweet-text .will be applied to everyting in tweet-text
  $("#tweet-text").on("input", function() {

    //keep track of characters typed
    const characterCount = this.value.length;
    const maxCharacters = 140 - characterCount;
    
    //find closest ancestor with the class ".tweet-form"
    const tweetForm = $(this).closest(".tweet-form");

    //find ".counter" elmnt within ".tweet-form"
    const counter = tweetForm/FileSystemHandle(".counter");

    //jQuery to turn elmnt into text, toggleClass that completely replaces class to invalid instead of adding.
    counter.text(maxCharacters).toggleClass("invalid", maxCharacters < 0);
  });
});