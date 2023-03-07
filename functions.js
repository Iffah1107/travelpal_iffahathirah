const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async (city) => {

    //fetch data api 
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let div = document.createElement("div");
            div.setAttribute("id", "conditions");


            let temp = document.createElement("h4");                   //change kelvin to celsius
            let tempNode = document.createTextNode("Temperature : " + [(data.main.temp - 273.15).toFixed(2)] + " °C ");
            temp.appendChild(tempNode);


            let desc1 = document.createElement("h4");            //weather
            let desc1Node = document.createTextNode(" Weather : " + data.weather[0].main);
            desc1.appendChild(desc1Node);

            let desc = document.createElement("h4");                      //weather description
            let descNode = document.createTextNode("Weather description :  " + data.weather[0].description);
            desc.appendChild(descNode);

            let humid = document.createElement("h4");         //humidity
            let humidNode = document.createTextNode("Humidity: " + data.main.humidity + " %");
            humid.appendChild(humidNode);

            let wind = document.createElement("h4");            // wind speed
            let windNode = document.createTextNode("Wind speed : " + data.wind.speed + " m/s");
            wind.appendChild(windNode);

            div.appendChild(temp);
            div.appendChild(desc1);
            div.appendChild(desc);
            div.appendChild(wind);
            div.appendChild(humid);

            document.querySelector("main").appendChild(div);
        }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (document.querySelector("#city").value != "") {
            let conditionsDiv = document.querySelector("#conditions");
            if (conditionsDiv) {
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        } else {
            console.log("You must provide a city");
        }
    })
})