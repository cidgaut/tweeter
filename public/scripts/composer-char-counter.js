$(document).ready(function() {
  // --- our code goes here ---
  //using # to grab specific tweet-text .will be applied to everyting in tweet-text
  $("#tweet-text").on("input", function() {

    //keep track of characters typed
    const characterCount = this.value.length;
    const maxCharacters = 140 - characterCount;
    
    //counter for maxcharacters add invalid class if over max
    $(".counter").text(maxCharacters);

    if(maxCharacters < 0) {
      $(".counter").addClass("invalid");
      console.log("invalid class added");
    } else {
      $(".counter").removeClass("invalid");
      console.log("invalid class removed");
    }
  });
});