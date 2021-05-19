import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

//console.log("depuis main.js : " + tabJoursEnOrdre);
const KEYAPI = 'cb96b2cde237bc4305ffb858009e892d';
let resultAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJourDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        appelAPI(long,lat);

    }, () => {
        alert('Vous avez refusé la géolocalisation, l\'application ne peut pas fonctionner, veuillez l\'activer !');
    })
}

function appelAPI(long,lat){
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${KEYAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        //console.log(data);
        resultAPI = data;
        temps.innerText = resultAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`;
        localisation.innerText = resultAPI.timezone;

        //les heures par tranches de 3 avec leurs temperatures

        let heureActuelle = new Date().getHours();
        for (let i = 0; i < heure.length; i++) {
            let heureIncrement = heureActuelle + i *3;

            if(heureIncrement > 24){
                heure[i].innerText = `${heureIncrement -24} h`;
            } else if(heureIncrement === 24){
                heure[i].innerText = `00 h`;
            }else{
                heure[i].innerText = `${heureIncrement} h`;
            }
            
        }

        //temps pour 3h
        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultAPI.hourly[j * 3].temp)}°`
        }

        //trois premieres lettres des jours
        for (let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
            
        }

        //temperature par jour
        for (let m = 0; m < 7; m++) {
           tempJourDiv[m].innerText = `${Math.trunc(resultAPI.daily[m+1].temp.day)}°`
            
        }

        //icone dynamique
        if(heureActuelle >= 6 && heureActuelle < 21){
            imgIcone.src = `ressources/jour/${resultAPI.current.weather[0].icon}.svg`
        }else{
            imgIcone.src = `ressources/nuit/${resultAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
        
    })
}