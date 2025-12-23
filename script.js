// IMPORTANT:
// Paste your OpenWeather API key below.
// Do NOT hardcode keys in real projects.

const API_KEY = "8ce7cf30b53ea93348138c85ec9110fd";
const btn = document.getElementById("btn");
const input = document.getElementById("cityInput");
const weather = document.getElementById("weather");
const msg = document.getElementById("msg");

btn.addEventListener("click", getWeather);
input.addEventListener("keydown", e => { if(e.key === "Enter") getWeather(); });

function getWeather(){
  const city = input.value.trim();
  msg.textContent = "";
  weather.classList.add("hidden");

  if(!city){
    msg.textContent = "Please enter a city name.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      if(Number(data.cod) !== 200){
        msg.textContent = data.message || "City not found.";
        return;
      }

      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temp").textContent = Math.round(data.main.temp);
      document.getElementById("desc").textContent = data.weather[0].description;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = data.wind.speed;

      const iconCode = data.weather[0].icon;
      document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weather.classList.remove("hidden");
    })
    .catch(() => {
      msg.textContent = "Network error. Please try again.";
    });
}
