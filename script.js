async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "bf8035a7185410f3434d88ac48073cdd"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p>City not found. Try again!</p>`;
      return;
    }

    const weatherHtml = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
    resultDiv.innerHTML = weatherHtml;
  } catch (error) {
    console.error("Error fetching weather:", error);
    resultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
