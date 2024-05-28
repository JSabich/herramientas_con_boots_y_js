
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        validarCampos();
    });

    document.querySelectorAll(".form-control").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                validarCampos();
            }
        });
    });
});

const validarCampos = () => {
    resetErrorMessages();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let isValid = true;

    if (username === "") {
        displayErrorMessage("usernameError", "Por favor ingrese un usuario.");
        document.getElementById("username").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("username").classList.remove("is-invalid");
    }

    if (!isValidEmail(email)) {
        displayErrorMessage("emailError", "Por favor ingrese un correo electrónico válido.");
        document.getElementById("email").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("email").classList.remove("is-invalid");
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("is-invalid");
    }

    if (isValid) {
        alert("¡Formulario enviado correctamente!");
    }
};

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const displayErrorMessage = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
};

const resetErrorMessages = () => {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.innerText = "";
    });
};

async function fetchWeather(city) {
    // Definir la URL de la API del clima
    const url = "https://api.openweathermap.org/data/2.5/weather";

    const apiKey = "21e3195e9bfeb6879e788ec605b09ab0";

    const units = "metric";

    const lang = "es";

    const response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`);

    const data = await response.json();

    return data;
}
async function updateWeatherCard(city) {

    const weatherData = await fetchWeather(city);
    console.log(weatherData);
    document.getElementById("city").textContent = weatherData.name;
    document.getElementById("temperature").textContent = weatherData.main.temp;
    document.getElementById("weather").textContent = weatherData.weather[0].description;
    document.getElementById("humidity").textContent = weatherData.main.humidity;
    document.getElementById("windSpeed").textContent = weatherData.wind.speed;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById("weatherIcon").src = iconUrl;
    document.getElementById("weatherIcon").alt = weatherData.weather[0].description;
}

updateWeatherCard("Buenos Aires");





const oferta = [
    { nombre: "Oferta 1", imagen: "oferta1.jpg" },
    { nombre: "Oferta 2", imagen: "oferta2.jpg" },
    { nombre: "Oferta 3", imagen: "oferta3.jpg" }

]
const sectionOfertas = document.getElementById("oferta");// a la constante sectionProyecto le asigno el id proyectos
const cargarOfertas = document.getElementById('button');
button.classList.add("container", "p-2")
function crearTarjetaOfertas(oferta) {
    const card = document.createElement("div");//creo un elemento div
    card.classList.add("col-md-2", "oferta-card");


    const cardImg = document.createElement("img");//creo una imagen
    cardImg.classList.add("card-img-top", "rounded", "container");
    cardImg.src = `./assets/img/Ofertas/${oferta.imagen}`;
    cardImg.alt = oferta.nombre;

    const cardBody = document.createElement("div");//creo un elemento body
    cardBody.classList.add("card-body");

    const cardNombre = document.createElement("h5");//creo un elemento h4 que será e título
    cardNombre.classList.add("card-title");//le agrego la clase card-title
    cardNombre.textContent = oferta.nombre;// le agrego un texto

    cardBody.appendChild(cardNombre);
    cardBody.appendChild(cardImg);
    card.appendChild(cardBody)
    console.log(card)
    return card;
}

function agregarTarjetaOfertas() {
    oferta.forEach(function (oferta) {

        const ofertaCard = crearTarjetaOfertas(oferta);
        sectionOfertas.appendChild(ofertaCard);
    });

}

//document.addEventListener("DOMContentLoaded", agregarTarjetaOfertas);
cargarOfertas.addEventListener('click', agregarTarjetaOfertas);


