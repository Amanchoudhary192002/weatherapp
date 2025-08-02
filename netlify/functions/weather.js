const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { city, unit = 'metric' } = event.queryStringParameters;
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const weatherUrl = `${baseUrl}/weather?q=${city}&units=${unit}&appid=${API_KEY}`;

  try {
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("City not found");

    const weatherData = await weatherRes.json();
    const { lat, lon } = weatherData.coord;

    const [forecastRes, pollutionRes] = await Promise.all([
      fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
      fetch(`${baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    ]);

    const forecastData = await forecastRes.json();
    const pollutionData = await pollutionRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        weather: weatherData,
        forecast: forecastData,
        pollution: pollutionData
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
