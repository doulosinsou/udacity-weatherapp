//set listener to button to make api call
window.addEventListener('load', ()=>{
document.getElementById('generate').addEventListener('click',action);
})

async function action(){
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  const api = "&appid=cc7294b368fa089de71eccdcee3e807b";
  const location = "zip=" + document.getElementById('zip').value + ",us";
  const setUnit = document.querySelector('input[name="unit"]:checked').value;
  const unit = "&units="+ setUnit;

  const data = await getWeather(url, location, unit, api);
  postData('/weather', data)
  .then(function(){
    // findWeather('/weather')
    changePage()
  })
}

//calls api data
const getWeather = async (url, location, unit, api)=>{
  const feelings = document.getElementById('feelings').value;
  const res = await fetch(url+location+unit+api);
  // res.new = "my new info";
   try {
     let data = await res.json();
     data.feels = feelings;
     if (document.querySelector('input[name="unit"]:checked').value ==="imperial"){
       data.units = "imperial";
     }else {
       data.units= "metric";
     }

     return data;
   }  catch(error) {
     console.log("error", error);
   }
 };

//posts weather data to server object
const postData = async (url='', data={})=>{
  const response = await fetch(url,{
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
  }
  catch(error){
    console.log("error", error);
  }
};

//calls server object
const findWeather = async (url='')=>{
  const request = await fetch(url);
  try {
    const newData = await request.json();
    // console.log(newData);
    return newData;
  }
  catch(error){
    console.log("error", error);
  }
};

//runs the page building
async function changePage(){
  const datacall = await findWeather('/weather');
  console.log(datacall);

  document.getElementById('entryWrapper').innerHTML= "";

  backgroundImg(datacall);

  for (data in datacall){
    const weather = datacall[data];

    // get Time of API request
        const today = new Date(weather.dt * 1000);
        const hours = ((today.getHours() + 11) % 12+1);
        let minutes = today.getMinutes();
        if (minutes<10){
          minutes = "0"+minutes;
        }
        let suffix = "AM";
        if (hours<=12){
          suffix = "PM";
        }
    const now = hours+':'+minutes+suffix;

    // get and post content data

    const blockFrag = document.createDocumentFragment();
    const contentFrag = document.createDocumentFragment();

  // create date and time blocks

    const dateBlock = document.createElement('p');
    dateBlock.innerHTML = today.toDateString();

    const nowBlock = document.createElement('p');
    nowBlock.innerHTML= now;

  // create temperature block

    const temp = document.createElement('p');
    temp.classList.add('temp');
    const roundTemp = Math.round(weather.main.temp);
    temp.innerHTML = roundTemp;

  // create degrees block

    let degrees
    if (weather.units === "imperial"){
      degrees="F"
    }else {
      degrees="C"
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
    locBlock.innerHTML= weather.name;

    //create weather logo block
    const logo = document.createElement('img');
    logo.src = "http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@4x.png";
    logo.alt = "weather logo";

    // create feelings block
    const feelings = document.createElement('p');
    feelings.classList.add('feelings');
    feelings.innerHTML = weather.feels;
    // feelings.innerHTML = document.getElementById('feelings').value;

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

async function backgroundImg(datacall){
  const recWeather = datacall[datacall.length - 1];
  const icon = recWeather.weather[0].icon;
  const img = document.getElementById('background-img');

  if (icon === "01d" || icon ==="02d"){
    img.setAttribute("class", "sun")
  }else
  if (icon === "01n" || icon === "02n"){
    img.setAttribute("class", "moon")
  }else
  if (icon === "03d" || icon === "04d.png"){
    img.setAttribute("class", "cloudday")
  }else
  if (icon === "03n" || icon === "04n"){
    img.setAttribute("class", "cloudnight")
  }else
  if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n" || icon === "11d" || icon === "11n"){
    img.setAttribute("class", "rain")
  }else
  if (icon === "13d" || icon === "13n"){
    img.setAttribute("class", "snow")
  }else
  if (icon === "50d" || icon === "50n"){
    img.setAttribute("class", "fog")
  }


}
