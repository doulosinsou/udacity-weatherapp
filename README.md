# udacity-weatherapp
Udacity project for Node with Express

My plan of action:
1- set click event listener to button to call for functions
2- call for weathermap API with the user provided zip code and unit preference.
3- validate the zip before API request
4- validate the API returned object
5- add user input to the API object BEFORE posting to server.js projectdata
6- cycle through iterations of stored API calls and write individual cards with the time, weather, and user input.
7- update index page background to mirror the most recent weather mood.   

Some variances from Rubric:
1- I understand the rubric asked for a separate openweathermap API storage post AND a user input post. I decided to merge them so that the data would never separate and could all be called by the same GET request.
2- I understand the rubric asked for HTML elements using ID's. Because I wanted to display every instance of the users click, I have the javascript creating classes instead.

Extra notes:
1- The timelog for the journal uses the openweathermap API dt object item. This means that the time is not based on when the user clicks the button, but when the weather data was posted by openweathermap. This is important because if openweathermap server doesn't update their api for a time, the weather data will not incorrectly attach the past weather information to the current time.
2- The validators are weak. Their only purpose is to ensure that the API does not send back an object or error which causes a collapse of the client side js. To that end I am not FETCHing a blank or null value on ZIP. On the returned data I am not POSTing objects which do not have the .main weather data.

I hope the project is acceptable with my changes. 
