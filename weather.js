var baseUrl = "https://api.weatherbit.io/v2.0/current"; 
var appKey = "2f44351d92264d93bdae8135ffaf6ab1";
var degree;

let lat
let lon

function setIcon(imageName) {
    if(String(imageName).indexOf("r")){
        imageName = "r01d"
        document.getElementById("icon").src =`png/${imageName}.png`
    }
    if(String(imageName).indexOf("t") && String(imageName).indexOf("d")){
        imageName = "t01d"
        document.getElementById("icon").src =`png/${imageName}.png`
    }
    if(String(imageName).indexOf("t") && String(imageName).indexOf("n")){
        imageName = "t01n"
        document.getElementById("icon").src =`png/${imageName}.png`
    }
    //Add more checks
    document.getElementById("icon").src =`png/${imageName}.png`
}

function setUnits(){
    let currentUnit = document.getElementById("temperature").innerHTML.slice(-1);

    if(currentUnit === 'C'){
        const F = Number(degree) * 1.8 + 32;
        document.getElementById("temperature").innerHTML = F.toFixed(2) + '°F';
        currentUnit = 'F';
    }
    else{
        const F = Number(degree) * 1.8 + 32;
        const C = Number((F) - 32) / 1.8;
        document.getElementById("temperature").innerHTML = C.toFixed(1) + '°C';
        currentUnit = 'C';
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}${baseUrl}?lat=${lat}&lon=${lon}&key=${appKey}`;
    
    fetch(api)
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);
        document.getElementById("timezone").innerHTML = data.data[0].timezone;
        document.getElementById("temperature").innerHTML = data.data[0].app_temp + "°C";
        degree = data.data[0].app_temp;
        document.getElementById("description").innerHTML = data.data[0].weather.description;

        let today = new Date();
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const month = date.toLocaleString('default', { month: 'long' });
        const currentDate = month + " " + today.getDate() + " / " + today.getFullYear();
        document.getElementById("date").innerHTML = currentDate;

        let imageName = data.data[0].weather.icon;
        document.getElementById("icon").src =`png/${imageName}.png`
        
    });
    });
}
else{
    document.getElementsByClassName("heading-4").textContent = "Cant find weather info for your location.";
}

