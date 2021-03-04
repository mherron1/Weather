
function Forecast(location, temp, description, wind){
    this.location = location,
    this.temperature = temp,
    this.description = description,
    this.wind = wind
}

function DailyForecast(location, weekday, temp, description, wind){
    this.location = location,
    this.weekday = weekday,
    this.temperature = temp,
    this.description = description,
    this.wind = wind
}


let place = "";
let daily = [];

let forecastDays = 3;

let forecastLength = forecastDays * 8;



let button1 = document.querySelector("#getCurrentWeather");
button1.addEventListener("click", getCurrentWeather)

let button2 = document.querySelector("#threeDays");
button2.textContent = `${forecastDays} Day Forecast`
button2.addEventListener("click", getThreeDayForecast)


function getCurrentWeather(){
    place = document.getElementById("myText").value;
    if(place === ""){ place ="New York"}
    const getWeather =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)

    getWeather
       .then(data =>{
         return data.json(data)

       }).then(data =>{    
        
         let forecast = new Forecast(data.name, data.main.temp, data.weather[0].description, data.wind.speed)
         displayForecast(forecast)

       })
}



function getThreeDayForecast(){
    
    daily = [];

    place = document.getElementById("myText").value;
    if(place === ""){ place ="New York"}
    const getFourDay =  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&cnt=${forecastLength}&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)

    getFourDay
       .then(data =>{
         return data.json(data)

       }).then(data =>{    

           let location = data.city.name;

           data.list.forEach(item =>{
           

            
            let timestamp = item.dt;
            let a = new Date(timestamp*1000);
            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let weekday = days[a.getDay()];
            
           

           let dayForecast = new DailyForecast(location, weekday, item.main.temp, item.weather[0].description, item.wind.speed)
           daily.push(dayForecast)

           })

           displayThreeDays(location)
            
    
       })
}





function displayForecast(forecast){
    
    document.querySelector("#threeDayContainer").style.display = "none";
    document.querySelector("#weather").style.display = "block";
    document.querySelector("#forecastHeading").style.display = "none";

    let weather = document.querySelector("#weather");
    while (weather.firstChild) {
        weather.removeChild(weather.firstChild);
    }

     
     let location = document.createElement("p")
     location.textContent = `Forecast for ${forecast.location}`;
     weather.appendChild(location);

     let discr = document.createElement("p")
     discr.textContent = `Summary: ${forecast.description}`;
     weather.appendChild(discr);

     let temp = document.createElement("p")
     temp.textContent = `Temperature: ${forecast.temperature} °C`;
     weather.appendChild(temp);

     let wind = document.createElement("p")
     wind.textContent = `Wind Speed: ${forecast.wind} kph`;
     weather.appendChild(wind);
}



function displayThreeDays(location){
    
    document.querySelector("#weather").style.display = "none";
    document.querySelector("#threeDayContainer").style.display = "grid";
    document.querySelector("#forecastHeading").style.display = "block";

    let container = document.querySelector("#threeDayContainer")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let forecastHeading = document.querySelector("#forecastHeading")
    while (forecastHeading.firstChild) {
        forecastHeading.removeChild(forecastHeading.firstChild);
    }
 
    let forecastLocation = document.createElement("h2")
    forecastLocation.textContent = `${location} ${forecastDays} day forecast`;
    forecastLocation.classList = "forecastHeading"
    forecastHeading.appendChild(forecastLocation)

    for (let i=0; i< daily.length; i+=8 ){

        console.log(daily[i])

    

 
    let day = document.createElement("div")
    day.classList = "dailyForecast"
    container.appendChild(day)

    let weekday = document.createElement("p")
    weekday.textContent = `Day: ${daily[i].weekday}`;
    day.appendChild(weekday)

    let descr = document.createElement("p")
    descr.textContent = `Summary: ${daily[i].description}.`;
    day.appendChild(descr)


    let temp = document.createElement("p")
    temp.textContent = `Temperature: ${daily[i].temperature}  °C`;
    day.appendChild(temp)

    let wind = document.createElement("p")
    wind.textContent = `Wind Speed: ${daily[i].wind} kph`;
    day.appendChild(wind)



    }
}