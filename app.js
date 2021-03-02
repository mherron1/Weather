
let forecast = {};

function newForecast(){
    let place = document.getElementById("myText").value;
    const getWeather =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)

    getWeather
       .then((result)=>{
         result.json(result)
        .then((result)=>{    
        forecast = {
            "location": result.name,
            "temperature": result.main.temp,
            "description" : result.weather[0].description,
            "windSpeed" : result.wind.speed
                }
        displayForecast()    
       })
       .catch((err)=> console.log("Oops, something went wrong. " +  err ))   
})
}



function displayForecast(){
    let weather = document.querySelector("#weather");
    while (weather.firstChild) {
        weather.removeChild(weather.firstChild);
    }

    console.log(forecast)
     
     let location = document.createElement("p")
     location.textContent = `Forecast for ${forecast.location}`;
     weather.appendChild(location);
     let disc = document.createElement("p")
     disc.textContent = `Summary: ${forecast.description}`;
     weather.appendChild(disc);
     let temp = document.createElement("p")
     temp.textContent = `Temperature: ${forecast.temperature}`;
     weather.appendChild(temp);

     let wind = document.createElement("p")
     wind.textContent = `Wind Speed: ${forecast.windSpeed}`;
     weather.appendChild(wind);
}
