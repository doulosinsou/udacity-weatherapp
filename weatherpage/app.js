const url = "https://api.openweathermap.org/data/2.5/weather?";
const api = "&appid=cc7294b368fa089de71eccdcee3e807b";
// const api = "testing";

window.addEventListener('load', ()=>{
const button = document.getElementById('generate');
button.addEventListener('click', action);
})

function action(){
  const location = "zip=" + document.getElementById('zip').value + ",us";
  const setUnit = document.querySelector('input[name="unit"]:checked').value;
  console.log(setUnit);
  const unit = "&units="+ setUnit;
  getWeather(url, location, unit, api)
  .then (
    changePage(1)
  );
  // findWeather('/weather');

};

const getWeather = async (url, location, unit, api)=>{

  const res = await fetch(url+location+unit+api)
   try {

     const data = await res.json();
     console.log("getWeather function Try successful");
     postData('/weather', data);
     return data;
   }  catch(error) {
     console.log("error", error);
   }

 };

// Post data to server object

 const postData = async ( url = '', data = {})=>{
      // console.log("postData const called successfully");
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
         // changePage(newData);
         // return newData;

         console.log("postData TRY called");
       }catch(error) {
       console.log("error", error);
     }
   };


const findWeather = async (url='')=>{
  const request = await fetch(url);
  try {
    const projectData = await request.json();
    console.log(projectData.name);
    return projectData;
  }
  catch(error){
    console.log("error", error);
  }
}


function changePage(iteration){
  // find most recent projectData object

let datacall = findWeather("/weather");
// if (datacall.length=0){
//   iteration = 0;
// }
datacall = datacall[(datacall.length - iteration)];
console.log(datacall.length);

for (data in datacall){
  console.log("another object");

  const weather = datacall[data];

  // get and post Time
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

  const content = document.getElementById('entryHolder');
  const blockFrag = document.createDocumentFragment();
  const contentFrag = document.createDocumentFragment();

// create date and time blocks

  const dateBlock = document.createElement('p');
  dateBlock.innerHTML = today.toDateString();

  const nowBlock = document.createElement('p');
  nowBlock.innerHTML= now;

// create temperature block

  const temp = document.createElement('p');
  temp.innerHTML = weather.main.temp;
  // temp.innerHTML = "86";

// create degrees block

  let degrees
  if ( document.querySelector('input[name="unit"]:checked').value= "imperial"){
    degrees = "F";
  } else {
    degrees = "C"
  }

  const un = document.createElement('p');
  un.innerHTML = degrees;

  // create a feels like block

  const feelstemp = document.createElement('p');
  feelstemp.innerText = "But it feels like " + weather.main.feels_like;
  // feelstemp.innerText = "But it feels like " + "96";

//create weather logo block
const logo = document.createElement('img');
logo.src = "http://openweathermap.org/img/wn/"+weather.weather[0].icon+".png";
logo.alt = "weather logo";


//create location block
const locBlock = document.createElement('p');
locBlock.innerHTML= weather.name;

  // create feelings block
  const feelings = document.createElement('p');
  // feelings.innerHTML = weather.feels;
  feelings.innerHTML = document.getElementById('feelings').value;

// Create HTML elements


  const entryholder = document.createElement('div');
  entryholder.classList.add('entryholder');
  const datediv = document.createElement('div');
  datediv.classList.add('date');
  const timediv = document.createElement('div');
  timediv.classList.add('time');
  const contentdiv = document.createElement('div');
  contentdiv.classList.add('content');

// Append all blocks
  datediv.appendChild(dateBlock);
  timediv.appendChild(nowBlock);

  contentFrag.appendChild(temp);
  contentFrag.appendChild(un);
  contentFrag.appendChild(feelstemp);
  contentFrag.appendChild(logo);
  contentFrag.appendChild(locBlock);
  contentFrag.appendChild(feelings);

  entryholder.appendChild(datediv);
  entryholder.appendChild(timediv);
  entryholder.appendChild(contentdiv);
  entryholder.appendChild(contentFrag);

  blockFrag.appendChild(entryholder);

  content.parentElement.prepend(blockFrag);

};
}
