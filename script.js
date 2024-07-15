document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location-input');
    const weatherInfo = document.getElementById('weather-info');

    const apiKey = 'bd20611d56da42a8992203920241507'; // Replace with your own API key from WeatherAPI

    searchBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            getWeather(location);
        } else {
            alert('Please enter a city name');
        }
    });

    const getWeather = async (location) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            const data = await response.json();
            if (data.error) {
                weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
            } else {
                displayWeather(data);
            }
        } catch (error) {
            weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
        }
    };

    const displayWeather = (data) => {
        weatherInfo.innerHTML = `
            <p>Location: ${data.location.name}, ${data.location.country}</p>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Weather: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
        `;
    };
});
