
// Testing Rename of Folder

// wrapping all code that interacts with the DOM in a call to jQuery.
$(document).ready(function() {
  // A call to day.js to show the current day at the top of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));

  // Function to update time-blocks based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id').split('-') [1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past"); 
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

    //Add a click event listener to the save button
    $('.saveBtn').on('click', function() {
     //Get the user input from the corresponding textarea
    var userInput = $(this).siblings('.description').val();

    //Get the id of the containing time-block
    var timeBlockID = $(this).closest('.time-block').attr('id');

    //Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockID, userInput);
});

    // Set the values of the textarea elements from localStorage
    $('.time-block').each(function() {
      var timeBlockID = $(this).attr('id');
      var userInput = localStorage.getItem(timeBlockID);
      $(this).find('.description').val(userInput);
    });

    // Update time-blocks initially
    updateTimeBlocks();

    // Update time-blocks every minute
    setInterval(updateTimeBlocks, 60000);
});


