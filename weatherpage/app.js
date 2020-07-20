//set listener to button to make api call
window.addEventListener('load', () => {
  document.getElementById('generate').addEventListener('click', validate);
})

function zipcheck() {

}

function validate(e) {
  const zip = document.getElementById('zip');
  const validate = document.getElementById('validate');
  if (zip.value === "" || e === "invalid zip code") {
    console.log('please add zip');
    zip.classList.add("highlight");
    validate.classList.add("show");
  } else {
    zip.classList.remove("highlight");
    validate.classList.remove("show");
    action()
  }
}

async function action() {
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  const api = "API_GOES_HERE";
  const location = "zip=" + document.getElementById('zip').value + ",us";
  const setUnit = document.querySelector('input[name="unit"]:checked').value;
  const unit = "&units=" + setUnit;

  const data = await getWeather(url, location, unit, api);
  if (data.main != null) {
    postData('/weather', data)
      .then(function() {
        updateStagnant()
      })
    postData('/journal', data)
      .then(function() {
        changePage()
      })
  } else {
    console.log("city not found");
    validate("invalid zip code");
  }
}

//calls api data
const getWeather = async (url, location, unit, api) => {
  const feelings = document.getElementById('feelings').value;
  const res = await fetch(url + location + unit + api);
  try {
    let data = await res.json();
    data.feels = feelings;
    if (document.querySelector('input[name="unit"]:checked').value === "imperial") {
      data.units = "imperial";
    } else {
      data.units = "metric";
    }

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//posts weather data to server object
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//calls server object
const findWeather = async (url = '') => {
  const request = await fetch(url);
  try {
    const newData = await request.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// changes the ids of stagnant portion (Rubric requiremnt)
async function updateStagnant(){
  let weather = await findWeather('/weather');
  console.log("stagnant data below: ");
  console.log(weather);
  weather = weather.data;
  // get Time of API request
  const today = new Date(weather.dt * 1000);
  const hours = ((today.getHours() + 11) % 12 + 1);
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let suffix = "AM";
  if (hours <= 12) {
    suffix = "PM";
  }
  const now = hours + ':' + minutes + suffix;

  document.getElementById('date').innerHTML = "Date: "+today.toDateString();
  document.getElementById('time').innerHTML = "Time: "+hours+":"+minutes+suffix;
  document.getElementById('content').innerHTML = "Temp: "+weather.main.temp+" | "+"Clouds: "+weather.weather[0].description+" | "+ "Humidity: "+weather.main.humidity+"%";
}

//runs the page building
async function changePage() {
  const datacall = await findWeather('/journal');
  console.log("Journal data below: ");
  console.log(datacall);

  document.getElementById('entryWrapper').innerHTML = "";

  backgroundImg(datacall);

  for (data in datacall) {
    const weather = datacall[data];

    // get Time of API request
    const today = new Date(weather.dt * 1000);
    const hours = ((today.getHours() + 11) % 12 + 1);
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let suffix = "AM";
    if (hours <= 12) {
      suffix = "PM";
    }
    const now = hours + ':' + minutes + suffix;

    // get and post content data

    const blockFrag = document.createDocumentFragment();
    const contentFrag = document.createDocumentFragment();

    // create date and time blocks

    const dateBlock = document.createElement('p');
    dateBlock.innerHTML = today.toDateString();

    const nowBlock = document.createElement('p');
    nowBlock.innerHTML = now;

    // create temperature block

    const temp = document.createElement('p');
    temp.classList.add('temp');
    const roundTemp = Math.round(weather.main.temp);
    temp.innerHTML = roundTemp;

    // create degrees block

    let degrees
    if (weather.units === "imperial") {
      degrees = "F"
    } else {
      degrees = "C"
    }
    const un = document.createElement('p');
    un.classList.add('units');
    un.innerHTML = degrees;

    // create a feels like block

    const feelstemp = document.createElement('p');
    feelstemp.classList.add('feels-like');
    const roundFeel = Math.round(weather.main.feels_like);
    feelstemp.innerText = "But it feels like " + roundFeel;

    //create location block
    const locBlock = document.createElement('p');
    locBlock.classList.add('location');
    locBlock.innerHTML = weather.name;

    //create weather logo block
    const logo = document.createElement('img');
    logo.src = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@4x.png";
    logo.alt = "weather logo";

    // create feelings block
    const feelings = document.createElement('p');
    feelings.classList.add('feelings');
    feelings.innerHTML = '"' + weather.feels + '"';

    // Create HTML elements


    const entryholder = document.createElement('div');
    entryholder.classList.add('entryHolder');
    const datediv = document.createElement('div');
    datediv.classList.add('date');
    const timediv = document.createElement('div');
    timediv.classList.add('time');
    const tempshell = document.createElement('div');
    tempshell.classList.add('tempshell');
    const contentdiv = document.createElement('div');
    contentdiv.classList.add('content');

    // Append all blocks
    datediv.appendChild(dateBlock);
    timediv.appendChild(nowBlock);

    tempshell.appendChild(temp);
    tempshell.appendChild(un);
    tempshell.appendChild(feelstemp);
    tempshell.appendChild(locBlock);

    contentdiv.appendChild(tempshell);
    contentdiv.appendChild(logo);
    contentdiv.appendChild(feelings);

    entryholder.appendChild(datediv);
    entryholder.appendChild(timediv);
    entryholder.appendChild(contentdiv);

    blockFrag.appendChild(entryholder);

    const wrapper = document.getElementById('entryWrapper');
    wrapper.prepend(blockFrag);
  };

}

async function backgroundImg(datacall) {
  const recWeather = datacall[datacall.length - 1];
  const icon = recWeather.weather[0].icon;
  const img = document.getElementById('background-img');

  if (icon === "01d" || icon === "02d") {
    img.setAttribute("class", "sun")
  } else
  if (icon === "01n" || icon === "02n") {
    img.setAttribute("class", "moon")
  } else
  if (icon === "03d" || icon === "04d") {
    img.setAttribute("class", "cloudday")
  } else
  if (icon === "03n" || icon === "04n") {
    img.setAttribute("class", "cloudnight")
  } else
  if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n" || icon === "11d" || icon === "11n") {
    img.setAttribute("class", "rain")
  } else
  if (icon === "13d" || icon === "13n") {
    img.setAttribute("class", "snow")
  } else
  if (icon === "50d" || icon === "50n") {
    img.setAttribute("class", "fog")
  }


}
