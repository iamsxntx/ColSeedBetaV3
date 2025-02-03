const requisitosCultivos = {
    mora: { luminosidad: [6, 8], precipitacion: [800, 1200], humedad: [60, 70], temperatura: [15, 25] },
    lulo: { luminosidad: [8, 10], precipitacion: [1000, 1500], humedad: [70, 80], temperatura: [15, 20] },
    frijol: { luminosidad: [6, 8], precipitacion: [500, 800], humedad: [50, 60], temperatura: [20, 30] },
    cafe: { luminosidad: [5, 7], precipitacion: [1000, 1500], humedad: [70, 80], temperatura: [18, 24] },
    maiz: { luminosidad: [10, 12], precipitacion: [600, 800], humedad: [55, 75], temperatura: [20, 30] },
    arveja: { luminosidad: [6, 8], precipitacion: [500, 600], humedad: [50, 70], temperatura: [15, 20] },
    yuca: { luminosidad: [8, 10], precipitacion: [1000, 1200], humedad: [60, 70], temperatura: [25, 30] },
    auyama: { luminosidad: [6, 8], precipitacion: [800, 1000], humedad: [60, 70], temperatura: [20, 25] },
    papa: { luminosidad: [8, 10], precipitacion: [600, 800], humedad: [70, 80], temperatura: [15, 20] },
    cebolla: { luminosidad: [10, 12], precipitacion: [500, 600], humedad: [60, 70], temperatura: [15, 20] },
    tomate: { luminosidad: [8, 10], precipitacion: [600, 800], humedad: [60, 70], temperatura: [20, 25] },
    naranjas: { luminosidad: [8, 10], precipitacion: [600, 800], humedad: [50, 60], temperatura: [25, 30] },
};

let chart;

function analizarCultivo() {
    const cultivo = document.getElementById("cultivo").value;
    const resultadosDiv = document.getElementById("resultados");

    const requisitos = requisitosCultivos[cultivo];

    if (requisitos) {
        resultadosDiv.innerHTML = `
            <h3>Requisitos para cultivar ${cultivo.charAt(0).toUpperCase() + cultivo.slice(1)}:</h3>
            <ul>
                <li><strong>Luminosidad:</strong> ${requisitos.luminosidad[0]} - ${requisitos.luminosidad[1]} horas</li>
                <li><strong>Precipitación:</strong> ${requisitos.precipitacion[0]} - ${requisitos.precipitacion[1]} mm</li>
                <li><strong>Humedad:</strong> ${requisitos.humedad[0]} - ${requisitos.humedad[1]} %</li>
                <li><strong>Temperatura:</strong> ${requisitos.temperatura[0]} - ${requisitos.temperatura[1]} °C</li>
            </ul>
            <p>¡Verifica si las condiciones de tu suelo son adecuadas!</p>
        `;

        mostrarGrafico(requisitos);
    } else {
        resultadosDiv.innerHTML = "<p>No se encontraron requisitos para este cultivo.</p>";
        mostrarGrafico(null);
    }
}

function mostrarGrafico(requisitos) {
    const container = document.getElementById('graficoContainer');

    const oldCanvas = document.getElementById('graficoCondiciones');
    if (oldCanvas) {
        oldCanvas.remove();
    }

    const nuevoCanvas = document.createElement('canvas');
    nuevoCanvas.id = 'graficoCondiciones';
    nuevoCanvas.width = 500;
    nuevoCanvas.height = 300;
    container.appendChild(nuevoCanvas);

    const ctx = nuevoCanvas.getContext('2d');

    if (chart) {
        chart.destroy();
    }

    if (requisitos) {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Luminosidad (h)', 'Precipitación (mm)', 'Humedad (%)', 'Temperatura (°C)'],
                datasets: [
                    {
                        label: 'Requisitos óptimos',
                        data: [
                            requisitos.luminosidad[0],
                            requisitos.precipitacion[0],
                            requisitos.humedad[0],
                            requisitos.temperatura[0]
                        ],
                        backgroundColor: 'rgba(76, 175, 80, 0.8)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Condiciones actuales',
                        data: [9, 650, 62, 21], // Simulación de datos actuales
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "#000",
                            font: { size: 14 }
                        }
                    },
                    x: {
                        ticks: {
                            color: "#000",
                            font: { size: 14 }
                        }
                    }
                }
            }
        });
    } else {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("No hay datos disponibles para mostrar.", nuevoCanvas.width / 2, nuevoCanvas.height / 2);
    }
}

function monitorearCultivo() {
    document.getElementById("monitoreoResultados").innerHTML = "<p>Monitoreo en proceso...</p>";
}
