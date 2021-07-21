/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let myTemp;
let zipCode;
let countryCode;
let feeling;
let myError;

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey='&appid=926a260bdc7f95e26316b8f9881bb6ec';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction);

/* Function called by event listener */
function performAction(e){
  zipCode = document.getElementById("zip").value;
  feeling = document.getElementById('feelings').value;
  countryCode = document.getElementById('country').value;
  getWeather(baseURL,zipCode,apiKey)
 .then(function(data){
    postData('/add', {zipCode:zipCode,
    feeling:feeling,
    date:newDate,
    temp:myTemp,error:myError})})
}

/* Function to GET Web API Data*/
const getWeather = async(baseURL,zipCode,apiKey)=>{
  const res = await fetch(baseURL+zipCode+','+countryCode+apiKey);
  try{
    const data = await res.json();
    myTemp = (data.main.temp-273.15).toFixed(2);
    myError="No errors found";
  }
  catch(error){
    myError="invalid zipcode or country code";
    console.log('error',error);
    //myError=error;
    alert("invalid zipcode or country code");
  }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },

     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        updateUI();
        return newData;

      }
      catch(error) {
      console.log("error", error);
      }
  }

/*Function to update UI*/
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    /* Function to GET Project Data */
    const x = allData.zipCode.length - 1 ;
    document.getElementById('date').textContent = allData.date[x];
    document.getElementById('temp').textContent = allData.temp[x] +' °C';
    document.getElementById('content').textContent = allData.feeling[x];
  }
  catch(error){
    console.log("error", error);
  }
}



