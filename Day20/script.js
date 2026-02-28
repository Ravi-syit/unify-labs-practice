let chart;
const loading = document.getElementById("loading");

async function fetchWeather(lat, lon, label="Location") {
  try {
    loading.classList.remove("hidden");

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,uv_index&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
    );

    const data = await response.json();

    updateCurrent(data, label);
    updateChart(data);
    updateForecast(data);
    updateCompass(data.current_weather.winddirection);

  } catch (err) {
    alert("Error fetching data");
  } finally {
    loading.classList.add("hidden");
  }
}

function updateCurrent(data, label) {
  document.getElementById("locationName").textContent = label;
  document.getElementById("currentTemp").textContent =
    data.current_weather.temperature + "°C";
  document.getElementById("weatherDesc").textContent =
    "Wind Speed: " + data.current_weather.windspeed + " km/h";

  document.getElementById("humidity").textContent =
    data.hourly.relative_humidity_2m[0];
  document.getElementById("windSpeed").textContent =
    data.current_weather.windspeed;
  document.getElementById("uvIndex").textContent =
    data.hourly.uv_index[0];
  document.getElementById("airQuality").textContent = "Good";
}

function updateChart(data) {
  const ctx = document.getElementById("weatherChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type:"line",
    data:{
      labels:data.hourly.time.slice(0,24).map(t=>t.split("T")[1]),
      datasets:[
        {
          label:"Temp °C",
          data:data.hourly.temperature_2m.slice(0,24),
          borderWidth:2
        },
        {
          label:"Humidity %",
          data:data.hourly.relative_humidity_2m.slice(0,24),
          borderWidth:2
        },
        {
          label:"Wind km/h",
          data:data.hourly.windspeed_10m.slice(0,24),
          borderWidth:2
        }
      ]
    }
  });
}

function updateForecast(data){
  const container=document.getElementById("forecastContainer");
  container.innerHTML="";
  for(let i=0;i<7;i++){
    const div=document.createElement("div");
    div.className="day-card";
    div.innerHTML=`
      <h4>Day ${i+1}</h4>
      <p>${data.daily.temperature_2m_max[i]}° / 
      ${data.daily.temperature_2m_min[i]}°</p>
    `;
    container.appendChild(div);
  }
}

function updateCompass(deg){
  const needle=document.getElementById("needle");
  needle.style.transform=`rotate(${deg}deg)`;
  document.getElementById("windDirText").textContent=
    "Direction: "+deg+"°";
}

async function searchCity(){
  const city=document.getElementById("cityInput").value;
  if(!city) return;

  const geo=await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const geoData=await geo.json();
  if(!geoData.results){ alert("City not found"); return; }

  const {latitude,longitude,name,country}=geoData.results[0];
  fetchWeather(latitude,longitude,`${name}, ${country}`);
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(pos=>{
    fetchWeather(pos.coords.latitude,pos.coords.longitude,"My Location");
  });
}

function toggleTheme(){
  document.body.classList.toggle("light");
}

fetchWeather(19.0760,72.8777,"Mumbai, India");