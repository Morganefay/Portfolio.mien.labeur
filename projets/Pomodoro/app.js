const affichageT = document.querySelector('.affichageT');
const affichageR = document.querySelector('.affichageR');
const btnStart = document.querySelector('#start');
const btnPause = document.querySelector('#pause');
const btnReset = document.querySelector('#reset');
const cycles = document.querySelector('h3');
const onglet = document.querySelector('title');

let checkInterval = false;
let tempsInitial = 1800;//30min
let tempsDeRepos = 300;//5min
let pause = false;
let nbCycle = 0;

cycles.innerText = `Nombre de cycles : ${nbCycle}`;

//utilisation du modulo et d'une expression ternaire pour affichage des secondes inférieures a 10s
affichageT.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
affichageR.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;


// demarrer le compteur
btnStart.addEventListener('click', () => {
   
    if(checkInterval === false){
        
        //on passe a true pour eviter a l'utilisateur de spamer les boutons et de générer des erreurs
        checkInterval=true;
        
        tempsInitial--;

        affichageT.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        onglet.innerText = `Travail : ${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        let timer = setInterval(() => {
            
            //decrementation du temps de travail
            if( pause === false && tempsInitial > 0){
                tempsInitial--;
                affichageT.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

                onglet.innerText = `Travail : ${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            }
            //si les deux temps sont terminés, ont incremente le compteur de nombre de cycles, et on reprend au début
            else if(pause === false && tempsDeRepos === 0 && tempsInitial === 0){
                tempsInitial = 1800;
                tempsDeRepos = 300;
                nbCycle++;
                cycles.innerText = `Nombre de cycles : ${nbCycle}`;

                affichageT.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
                affichageR.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            }
            //decrementation du temps de repos
            else if(pause === false && tempsInitial === 0){
                tempsDeRepos--;
                affichageR.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

                onglet.innerText = `Repos : ${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            }
        }, 1000);

        //bouton reset
        btnReset.addEventListener('click', () => {
            clearInterval(timer);
            checkInterval = false;
            tempsInitial = 1800;
            tempsDeRepos = 300;
            affichageT.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            affichageR.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            onglet.innerText = 'Pomodoro';
        })

    }else{
        return;
    }

})

//bouton pause
btnPause.addEventListener('click', () => {
    if(pause === false){
        btnPause.innerText = "Play";
    }else if (pause === true){
        btnPause.innerText = "Pause";
    }
    //toggle du booleen (a chaque clic il devient soit true soit false)
    pause = !pause;
})

