const url = "https://api.openweathermap.org/data/2.5/weather?";
const api = "&appid=cc7294b368fa089de71eccdcee3e807b";

const button = document.getElementById('generate');
button.addEventListener('click', action);

function action(){
  const location = "zip=" + document.getElementById('zip').value + ",us";
  getWeather(url, location, api);
}

const getWeather = async (url, location, api)=>{

  const res = await fetch(url+location+api)
   try {

     const data = await res.json();
     console.log(data)
     // return data;
     postData('/weather', data);
   }  catch(error) {
     console.log("error", error);
   }
 }

// Post data to server object

 const postData = async ( url = '', data = {})=>{
     console.log(data);
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
         console.log(newData);
         return newData;
       }catch(error) {
       console.log("error", error);
       }
   }
