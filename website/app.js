/* Global Variables */
const serverUrl="http://localhost:3000/";
const apiKey="2de159b3a814d9269fc7f264577d1de1&units=imperial";
const weatherStatusUrl="http://api.openweathermap.org/data/2.5/weather?zip=";

const generateElement = document.getElementById('generate');
const zipElement=document.getElementById('zip');
const feelingElement=document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateElement.addEventListener("click", onClick);


/* Function called by event listener */
function onClick(){
    const zipCode=zipElement.value;
    const feeling=feelingElement.value;
    getWeatherStatus(weatherStatusUrl,zipCode,apiKey)
    .then(tempData=>{
        console.log(tempData)
        const  data={
            "date":newDate,
            "feeling":feeling,
            "temperature":tempData.main.temp
        }
        return data;
    },
    err=>{
        alert("Something went wrong");
    }
    )
    .then(data=>addData(serverUrl,JSON.stringify(data)))
    .then(
        result=>{
            console.log(result);
            getProjectData()
            .then(
                data=>{
                    document.getElementById('date').innerHTML=data.date;
                    document.getElementById('temp').innerHTML=data.temperature;
                    document.getElementById('content').innerHTML=data.feeling;
                }
            )
        }
    )
}

/* Function to GET Web API Data*/

async function getWeatherStatus(baseUrl,zip,key){
   return  fetch(baseUrl+zip.trim()+"&appid="+key)
        .then(response => {
            if(response.status==404)
                alert("Please enter a valid us zip code!!")
            else
                return response.json();
        }
        );
}


/* Function to POST data */

async function addData(url,data){
   return fetch(url+"addData", {
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'post',
        body: data
      })
}

/* Function to GET Project Data */
async function getProjectData(){
    return fetch(serverUrl+"getAllData")
        .then(response => response.json())
}