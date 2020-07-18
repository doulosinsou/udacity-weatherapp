# udacity-weatherapp
Udacity project for Node with Express

My plan of action:
1- set click event listener to button to call for functions
2- call for openweathermap API with the user provided zip code and unit preference.
3- validate the zip before API request
4- validate the API returned object
5- add user input to the API object BEFORE posting to server.js
7- add the API called object to an object called projectData, AND to a separate array called journalData
8- update the ID of stagnant HTML items with data from the projectData object
9- cycle through iterations of journalData Array and write individual cards with the time, weather, and user input.
10- update index page background to mirror the most recent weather mood.   

Extra notes:
1- The timelog for the journal uses the openweathermap API dt object item. This means that the time is not based on when the user clicks the button, but when the weather data was posted by openweathermap. This is important because if openweathermap server doesn't update their api for a time, the weather data will not incorrectly attach the past weather information to the current time.
2- The validators are weak. Their only purpose is to ensure that the API does not send back an object or error which causes a collapse of the client side js. To that end I am not FETCHing a blank or null value on ZIP. On the returned data I am not POSTing objects which do not have the .main weather data.
