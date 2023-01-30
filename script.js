let fetchBtn = document.getElementById('btn');
let latLongSection = document.getElementById('lat-long-section');
let iFrame = document.getElementById('i-frame');
let weatherdata = document.getElementById('weather-data');

let latitude = "";
let longitude = "";

async function fetchGeoLoaction() {
    this.style.display = 'none';
    
    let response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${geolocationKey}`);
    let data = await response.json();
    console.log(data);

    latitude = data.latitude;
    longitude = data.longitude;
    // console.log(latitude);
    // console.log(longitude);

    latLongSection.innerHTML =
        `
        <tr>
            <td>Lat : ${latitude}</td>
            <td>Long : ${longitude}</td>
        </tr>
    `


    iFrame.innerHTML =
        `
            <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" frameborder="0"
            style="border:0">
            </iframe>
        `
    
    let weatherReports = await weatherReport();
    console.log(weatherReports);
    

    weatherdata.innerHTML =
        `
        <h1>Weather Data</h1>
        <div>
            <h3> Location : <span>${weatherReports.name}</span></h3>

            <h3> Lat : <span>${weatherReports.coord.lat}</span></h3>

            <h3>Long : <span>${weatherReports.coord.lon}</span></h3>

            <h3>TimeZone : <span>${weatherReports.timezone}</span></h3>

            <h3>Wind Speed : <span>${weatherReports.wind.speed}</span></h3>

            <h3>Pressure : <span>${weatherReports.main.pressure}</span></h3>

            <h3>Humidity : <span>${weatherReports.main.humidity}</span></h3>

            <h3>Flees Like : <span>${weatherReports.main.feels_like}</span></h3>
        </div>
        `
}

async function weatherReport() {
    let response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`);
    let data1 = await response1.json();
    return data1;
}

fetchBtn.addEventListener('click', fetchGeoLoaction)