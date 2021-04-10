const cell = document.querySelectorAll('.cell');
const player = document.querySelector('.player');
const reload = document.querySelector('.reload');

let currentPlayer = "X";
let lock = true;

player.innerText = `Au tour de ${currentPlayer} de jouer.`;

const winnerMove = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let currentGame = ["","","","","","","","","",];

cell.forEach(item => {
    item.addEventListener('click', clickOnCell)
})

function clickOnCell(e){
    const cellClicked = e.target;
    const cellIndex = cellClicked.getAttribute('data-index');

    if(currentGame[cellIndex] !== "" || !lock){
        return;
    }

    currentGame[cellIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
    //console.log(currentGame);

    validResult();
    
}
function validResult(){

    let endGame = false;

    for (let i = 0; i < winnerMove.length; i++) {

        const checkWin = winnerMove[i];
        
        let a = currentGame[checkWin[0]];
        let b = currentGame[checkWin[1]];
        let c = currentGame[checkWin[2]];

        if( a === '' || b === '' || c === ''){
            continue;
        }
        if( a === b && b === c){
            endGame = true;
            break;
        }
    }

    if(endGame){
        player.innerHTML = `Les <span>${currentPlayer}</span> ont gagné !`;
        lock = false;
        endGameBtn();
        return;
    }

    //si il n'y a pas de chaine de caracteres vides dans la partie en cours
    let equality = !currentGame.includes('');
    if(equality){
        player.innerText = "Match nul !";
        lock = false;
        endGameBtn()
        return;
    }

    changePlayer();
}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    player.innerText = `Au tour de ${currentPlayer} de jouer.`;
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