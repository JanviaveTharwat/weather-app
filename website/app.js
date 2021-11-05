/* Global Variables */
const run = document.getElementById('generate');

// Personal API Key for OpenWeatherMap API
const key ='&appid=786dfc8a8887e08bb3a13f17864f63c3';
// url 
let siteUrl ='https://api.openweathermap.org/data/2.5/weather?zip=';
// to mak it metric:
const Um= '&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element

run.addEventListener('click',weatherData);
//weatherData function to call site and bring some weather data 
async function weatherData(){
    //function variables 
        // get zip code value 
    let place = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    
    try{

         // full url
         async function getDetails  () {
             console.log(place);
       
          let givenData = await  fetch (siteUrl+place+key+Um);
          const dataInJs = await givenData.json();
          return temprature = dataInJs.main.temp;
         }
          
await getDetails()
       
        

      //dealing with get rout
        const resivedData = await fetch('/getCurrentWeather');
        const details = await resivedData.json();

       //taking to post rout
       
        await (await fetch('/postCurrentWeather',{
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                 'Content-Type': 'application/json',
            },
   
        // body data type must match "Content-Type" header
            body: JSON.stringify({
                 date:newDate,
                 temp:temprature,
                 feelings:feel,
                }),         
            })).json();
            //calling update ui function to update user 
            await updateUI()
      
        
        
        }
        
    catch(error){
        console.log("error");
    }
    


};


const updateUI = async function (details) {
    const request = await fetch('http://localhost:9090/getCurrentWeather');
    try {
        const allData = await request.json();
        console.log(allData);
        // update new entry values
         
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp + ' degree C';
            document.getElementById('content').innerHTML = allData.feelings;
            
        
        } 
    catch (error) {
        console.log('error', error);
    }
} 


