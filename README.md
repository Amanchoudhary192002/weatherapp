Live :- https://weatherapp19in.netlify.app/

Most important thing cover API KEY/ hide Most  important thing 
Great question, Aman! Hiding an API key directly in JavaScript is not secure 
— because JavaScript runs in the browser, anyone can view your code and see the API key using 
browser developer tools.

I will explain step by step by step SRNO 41 


Prerequisites
Get a free API key from https://openweathermap.org/api

Replace YOUR_API_KEY in the code with your actual API key.

🌐 Step-by-Step Guide to Get a Free Weather API Key:
🔹 1. Go to OpenWeatherMap:
🔗 https://openweathermap.org/api

🔹 2. Create an Account:
Click Sign In (top-right corner), then Create an Account

Enter your email, username, and password

Verify your email via the confirmation link sent to your inbox

🔹 3. Log In to Your Account:
After email verification, go to the OpenWeather dashboard.

🔹 4. Get Your API Key:
In the dashboard, go to the "API keys" section

You will see a default key named Default

Copy that key — it’s your free API key

✅ You can also create a new API key if needed (e.g., name it "weather-app").



**Now your API key is hidden from the frontend, and users can’t steal it even if they inspect** 
✅ STEP-BY-STEP GUIDE (GitHub + Netlify Functions)
🟢 Prerequisites:
Your repo: https://github.com/Amanchoudhary192002/weatherapp

You need an API key (like WeatherAPI.com or OpenWeatherMap)

📌 STEP 1: Connect GitHub Repo to Netlify
Go to https://app.netlify.com/

Click “Add new site” > “Import an existing project”

Select GitHub

Authorize Netlify to access your GitHub

Choose your repo: weatherapp

Set build settings:

Build Command: npm run build (or leave empty if no build)

Publish Directory: / (or dist, depending on your project)

Click Deploy Site ✅

📁 STEP 2: Add Netlify Function to Your Repo
In your GitHub project folder, create:

bash
Copy
Edit
/netlify/functions/weather.js
Paste this code inside weather.js:

js
Copy
Edit
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const city = event.queryStringParameters.city || 'Delhi';
  const API_KEY = process.env.WEATHER_API_KEY;

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data.' }),
    };
  }
};
🛠️ STEP 3: Add Environment Variable in Netlify
Go to your Netlify Dashboard

Choose your weatherapp site

Go to Site Settings > Environment Variables

Add:

makefile
Copy
Edit
Key: WEATHER_API_KEY
Value: your_api_key_here
Click Save ✅

🔁 STEP 4: Update Your Frontend JS
In your script.js, replace your direct API call with this:

js
Copy
Edit
async function getWeather(city) {
  try {
    const res = await fetch(`/.netlify/functions/weather?city=${city}`);
    const data = await res.json();
    console.log(data); // You can update your UI here
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

getWeather('Mumbai');
🚀 STEP 5: Push All Changes to GitHub
In VS Code terminal:
bash
Copy
Edit
git add .
git commit -m "Added Netlify function to secure API key"
git push origin main
🧪 STEP 6: Re-Deploy on Netlify
Go to Netlify

Trigger a Manual Deploy from Deploys > "Trigger deploy" > "Deploy site"

✅ Now your site uses a hidden API key and safely fetches weather data.
