$(document).ready(function() {
  // --- our code goes here ---
  $(".tweet-text").on("input", function() {
    console.log(this.value);
  });
});