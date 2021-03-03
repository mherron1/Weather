
function Forecast(location, temp, description, wind){
    this.location = location,
    this.temperature = temp,
    this.description = description,
    this.wind = wind
}

function DailyForecast(temp, description, wind){
    this.temperature = temp,
    this.description = description,
    this.wind = wind
}


let place = "";
let daily = [];

let button1 = document.querySelector("#getCurrentWeather");
button1.addEventListener("click", getCurrentWeather)

let button2 = document.querySelector("#fourDay");
button2.addEventListener("click", getFourDayForecast)


function getCurrentWeather(){
    place = document.getElementById("myText").value;
    if(place === ""){ place = "ireland"}
    const getWeather =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)

    getWeather
       .then(data =>{
         return data.json(data)

       }).then(data =>{    
        
         let forecast = new Forecast(data.name, data.main.temp, data.weather[0].description, data.wind.speed)
         displayForecast(forecast)

       })
}



function getFourDayForecast(){
    
    daily = [];

    place = document.getElementById("myText").value;
    if(place === ""){ place = "ireland"}
    const getFourDay =  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&cnt=4&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)

    getFourDay
       .then(data =>{
         return data.json(data)

       }).then(data =>{    

           data.list.forEach(item =>{
           let dayForecast = new DailyForecast(item.main.temp, item.weather[0].description, item.wind.speed)
           daily.push(dayForecast)

           })

           console.log(daily)
           displayThreeDays()
            
    
       })
}





function displayForecast(forecast){
    document.querySelector("#weather").style.display = "block";
    let weather = document.querySelector("#weather");
    while (weather.firstChild) {
        weather.removeChild(weather.firstChild);
    }

    console.log(forecast)
     
     let location = document.createElement("p")
     location.textContent = `Forecast for ${forecast.location}`;
     weather.appendChild(location);

     let discr = document.createElement("p")
     discr.textContent = `Summary: ${forecast.description}`;
     weather.appendChild(discr);

     let temp = document.createElement("p")
     temp.textContent = `Temperature: ${forecast.temperature}`;
     weather.appendChild(temp);

     let wind = document.createElement("p")
     wind.textContent = `Wind Speed: ${forecast.wind}`;
     weather.appendChild(wind);
}



function displayThreeDays(){
    let container = document.querySelector("#threeDayContainer")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }


    for (let i=0; i< daily.length; i++ ){

 
    let day = document.createElement("div")
    day.classList = "dailyForecast"
    container.appendChild(day)

    let descr = document.createElement("p")
    descr.textContent = daily[i].description;
    day.appendChild(descr)


    let temp = document.createElement("p")
    temp.textContent = daily[i].temperature;
    day.appendChild(temp)

    let wind = document.createElement("p")
    wind.textContent = daily[i].wind;
    day.appendChild(wind)



    }
}