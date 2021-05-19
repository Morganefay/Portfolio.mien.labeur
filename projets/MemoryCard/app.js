const cartes =document.querySelectorAll('.carte');
const reload = document.querySelector('.reload');
const coups = document.querySelector('.coups');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;
let nbClick = 0;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function retourneCarte(){

    if(verouillage) return;

    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee){
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    //console.log(premiereCarte , secondeCarte);
    correspondance();
}

function correspondance(){

    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {
        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
    }else{
        verouillage = true;
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;
        }, 1000);
    }
    
    nbClick++;
    //console.log(nbClick);
    coups.innerHTML = `Score : ${nbClick}`;
}

function aleatoire(){
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}


function endGameBtn(){
    //ajout d'un boutton de rechargement
    const btn = document.createElement('button');
    btn.addEventListener('click', reloadOnClick);
    btn.innerText = "Rejouer";
    reload.appendChild(btn);
}

function reloadOnClick(){
    window.location.reload();
}

aleatoire();
endGameBtn();