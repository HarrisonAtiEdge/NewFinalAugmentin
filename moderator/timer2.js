
  var secondsLeft = 45; // 30 in seconds
  var timerInterval;

  function updateTimer() {
      var minutes = Math.floor(secondsLeft / 60);
      var seconds = secondsLeft % 60;

      var M1 = Math.floor(minutes / 10);
      var M2 = minutes % 10;
      var S1 = Math.floor(seconds / 10);
      var S2 = seconds % 10;

      $(".M1").removeClass().addClass("NumberHolder M1 show" + M1);
      $(".M2").removeClass().addClass("NumberHolder M2 show" + M2);
      $(".S1").removeClass().addClass("NumberHolder S1 show" + S1);
      $(".S2").removeClass().addClass("NumberHolder S2 show" + S2);

      secondsLeft--;

      if (secondsLeft < 0) {
          clearInterval(timerInterval);
          // Timer reached zero, handle here
          console.log("Timer reached zero!");
      }
  }

  let audio = new Audio('../sound/Timer40-Sec.mp3'); 

  function pauseTimer() {
      clearInterval(timerInterval);
      audio.pause(); // Pause the audio
      $(".play-timer").prop("disabled", false); // Enable the "Play" button
      $(".pause-timer").hide();
      $(".play-timer").show();
  }

  function playTimer() {
      timerInterval = setInterval(updateTimer, 1000);
      audio.play(); // Play the audio
      $(".play-timer").prop("disabled", true); // Disable the "Play" button
      $(".play-timer").hide();
      $(".pause-timer").show();
      
  }

  function resetTimer() {
      clearInterval(timerInterval);
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
      secondsLeft = 45; // Reset the timer to 2 minutes
      updateTimer(); // Update the timer display
      $(".play-timer").prop("disabled", false); // Enable the "Play" button
  }

  $(".pause-timer").click(pauseTimer);
  $(".play-timer").click(playTimer);
  $(".reset-timer").click(resetTimer);

  // Add an event listener for the window load event
window.addEventListener('load', function() {
  // Call the resetTimer function when the window loads
  resetTimer();
});

  // Start the timer initially
  // This will start the timer after the page has loaded
  $(document).ready(function() {
      playTimer();
      pauseTimer(); // Pause immediately after starting to simulate a stopped timer initially
  });  

  




// ********************   Function to toggle visibility of the football animation ********************




var footballAnim = document.getElementById('football_anim_object');

// Function to move the div to the right and hide it
function moveAndHide() {
  footballAnim.style.transform = 'translate(250%, -50%)'; // Move the div to the right
  setTimeout(function() {
    footballAnim.style.display = 'none'; // Hide the div after 1 second
    showAndMoveBack(); // Call showAndMoveBack after hiding
  }, 5000);
}

// Function to show the div and move it back to its original position
function showAndMoveBack() {
  footballAnim.style.display = 'block'; // Show the div
  footballAnim.style.transform = 'translate(-20%, -50%)'; // Move the div back to its original position
}

// Call the moveAndHide function initially
moveAndHide();

// Set up a loop to repeat the animation
setInterval(moveAndHide, 10000); // Repeat every 20 seconds (10 seconds hiding + 10 seconds showing)



document.addEventListener('DOMContentLoaded', function() {
    // Get the audio element
    var audio = document.getElementById('clickSound');

    // Get all elements with the class 'btnBackground'
    var startButtons = document.querySelectorAll('.btnBackground');

    // Add click event listener to each button with the 'btnBackground' class
    startButtons.forEach(function(startButton) {
        startButton.addEventListener('click', function(event) {
            // Prevent the default action to avoid immediate navigation
            event.preventDefault();

            // Play the sound
            audio.play();

            // Delay the navigation to allow the sound to play
            // setTimeout(function() {
            //     window.location.href = startButton.href;
            // }, 500); // Adjust the delay time as needed
        });
    });
});

