"use strict";

var affichageT = document.querySelector('.affichageT');
var affichageR = document.querySelector('.affichageR');
var btnStart = document.querySelector('#start');
var btnPause = document.querySelector('#pause');
var btnReset = document.querySelector('#reset');
var cycles = document.querySelector('h3');
var onglet = document.querySelector('title');
var checkInterval = false;
var tempsInitial = 1800; //30min

var tempsDeRepos = 300; //5min

var pause = false;
var nbCycle = 0;
cycles.innerText = "Nombre de cycles : ".concat(nbCycle); //utilisation du modulo et d'une expression ternaire pour affichage des secondes inférieures a 10s

affichageT.innerText = "".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
affichageR.innerText = "".concat(Math.trunc(tempsDeRepos / 60), " : ").concat(tempsDeRepos % 60 < 10 ? "0".concat(tempsDeRepos % 60) : tempsDeRepos % 60); // demarrer le compteur

btnStart.addEventListener('click', function () {
  if (checkInterval === false) {
    //on passe a true pour eviter a l'utilisateur de spamer les boutons et de générer des erreurs
    checkInterval = true;
    tempsInitial--;
    affichageT.innerText = "".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
    onglet.innerText = "Travail : ".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
    var timer = setInterval(function () {
      //decrementation du temps de travail
      if (pause === false && tempsInitial > 0) {
        tempsInitial--;
        affichageT.innerText = "".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
        onglet.innerText = "Travail : ".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
      } //si les deux temps sont terminés, ont incremente le compteur de nombre de cycles, et on reprend au début
      else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
          tempsInitial = 1800;
          tempsDeRepos = 300;
          nbCycle++;
          cycles.innerText = "Nombre de cycles : ".concat(nbCycle);
          affichageT.innerText = "".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
          affichageR.innerText = "".concat(Math.trunc(tempsDeRepos / 60), " : ").concat(tempsDeRepos % 60 < 10 ? "0".concat(tempsDeRepos % 60) : tempsDeRepos % 60);
        } //decrementation du temps de repos
        else if (pause === false && tempsInitial === 0) {
            tempsDeRepos--;
            affichageR.innerText = "".concat(Math.trunc(tempsDeRepos / 60), " : ").concat(tempsDeRepos % 60 < 10 ? "0".concat(tempsDeRepos % 60) : tempsDeRepos % 60);
            onglet.innerText = "Repos : ".concat(Math.trunc(tempsDeRepos / 60), " : ").concat(tempsDeRepos % 60 < 10 ? "0".concat(tempsDeRepos % 60) : tempsDeRepos % 60);
          }
    }, 1000); //bouton reset

    btnReset.addEventListener('click', function () {
      clearInterval(timer);
      checkInterval = false;
      tempsInitial = 1800;
      tempsDeRepos = 300;
      affichageT.innerText = "".concat(Math.trunc(tempsInitial / 60), " : ").concat(tempsInitial % 60 < 10 ? "0".concat(tempsInitial % 60) : tempsInitial % 60);
      affichageR.innerText = "".concat(Math.trunc(tempsDeRepos / 60), " : ").concat(tempsDeRepos % 60 < 10 ? "0".concat(tempsDeRepos % 60) : tempsDeRepos % 60);
      onglet.innerText = 'Pomodoro';
    });
  } else {
    return;
  }
}); //bouton pause

btnPause.addEventListener('click', function () {
  if (pause === false) {
    btnPause.innerText = "Play";
  } else if (pause === true) {
    btnPause.innerText = "Pause";
  } //toggle du booleen (a chaque clic il devient soit true soit false)


  pause = !pause;
});