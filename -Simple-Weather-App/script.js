document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchbutton");
    const weatherResult = document.getElementById("weatherResult");
    const body = document.body; // Select body for background change

    const API_KEY = "enter_ur_own_api_key"; // Add your OpenWeather API key here

    searchBtn.addEventListener("click", function () {
        fetchWeather();
    });

    // Allow search on pressing "Enter"
    cityInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            fetchWeather();
        }
    });

    function fetchWeather() {
        const cityName = cityInput.value.trim();

        if (cityName === "") {
            alert("Please enter a city name.");
            return;
        }

        weatherResult.innerHTML = `<p>Loading weather data...</p>`;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    weatherResult.innerHTML = `<p style="color: red;">City not found. Try again.</p>`;
                    return;
                }

                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const weatherIcon = data.weather[0].icon;
                const weatherMain = data.weather[0].main; // This will be used for background change
                const city = data.name;
                const country = data.sys.country;
                const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

                weatherResult.innerHTML = `
                    <h2>${city}, ${country}</h2>
                    <img src="${iconUrl}" alt="${weatherDescription}" />
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weatherDescription}</p>
                `;

                changeBackground(weatherMain); // Call function to change background
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherResult.innerHTML = `<p style="color: red;">Unable to fetch weather data.</p>`;
            });
    }

    function changeBackground(weatherCondition) {
        switch (weatherCondition.toLowerCase()) {
            case "clear":
                body.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)"; // Warm sunny gradient
                break;
            case "clouds":
                body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)"; // Gray cloudy gradient
                break;
            case "rain":
                body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)"; // Blue rainy gradient
                break;
            case "thunderstorm":
                body.style.background = "linear-gradient(to right, #141e30, #243b55)"; // Dark stormy gradient
                break;
            case "snow":
                body.style.background = "linear-gradient(to right, #e6e9f0, #eef1f5)"; // White snowy gradient
                break;
            default:
                body.style.background = "linear-gradient(to right, #4CA1AF, #C4E0E5)"; // Default neutral gradient
                break;
        }
        body.style.transition = "background 0.5s ease-in-out";
    }
    
});
