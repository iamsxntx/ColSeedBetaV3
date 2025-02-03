const apiKey = "YOUR_ACTUAL_API_KEY"; // Replace with your OpenWeatherMap API key

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const temperatura = data.main.temp;
            const humedad = data.main.humidity;
            const viento = data.wind.speed;
            const descripcion = data.weather[0].description;
            const icono = data.weather[0].icon;

            document.getElementById("temperatura").textContent = temperatura;
            document.getElementById("humedad").textContent = humedad;
            document.getElementById("viento").textContent = viento;
            document.getElementById("descripcion").textContent = descripcion;

            const iconoClima = document.getElementById("icono-clima");
            iconoClima.src = `https://openweathermap.org/img/w/${icono}.png`;
            iconoClima.alt = descripcion;
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
            const mensajeError = document.getElementById("mensaje-error");
            if (mensajeError) {
                mensajeError.textContent = "Error al obtener datos. Inténtalo de nuevo más tarde.";
            }
        });
}

navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        obtenerClima(`${lat},${lon}`);
    },
    (error) => {
        console.error("Error al obtener la ubicación:", error);
        obtenerClima("Bogota");
    }
);

setInterval(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            obtenerClima(`${lat},${lon}`);
        },
        (error) => {
            console.error("Error al obtener la ubicación:", error);
            obtenerClima("Bogota");
        }
    );
}, 600000);
