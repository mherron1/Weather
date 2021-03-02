


function newForecast(){

let place = document.getElementById("myText").value;
console.log(place)

const getWeather =  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=845d119a7ee8a96fc71e301e1235b7be`)


getWeather
.then((result)=>{
    result.json(result)
    .then((result)=>{
        
        let forecast = document.querySelector('#weather');
        forecast.innerHTML = " ";
        forecast.innerHTML += `<li>Location = ${result.name}</li>`
        forecast.innerHTML += `<li>Temperature = ${result.main.temp}</li>`
        forecast.innerHTML += `<li>Description = ${result.weather[0].description}</li>`
        forecast.innerHTML += `<li>Wind Speed = ${result.wind.speed}</li>`
        
    })
})


}

