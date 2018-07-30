console.log('js loaded');
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
reset();


function playRound(button, computerSelection) {
    let playerSelection = button.id;
    switch (playerSelection) {
        case 'rock':
            switch (computerSelection) {
                case 'rock':
                    handleRoundResults('Draw', null, null);
                    break;
                case 'scissors':
                    handleRoundResults('Player', 'rock', 'scissors');
                    break;
                case 'paper':
                    handleRoundResults('Computer', 'paper', 'rock');
                    break
            }
            break;
        case 'scissors':
            switch (computerSelection) {
                case 'rock':
                    handleRoundResults('Computer', 'scissors', 'rock');
                    break;
                case 'scissors':
                    handleRoundResults('Draw', null, null);
                    break;
                case 'paper':
                    handleRoundResults('Player', 'scissors', 'paper');
                    break
            }
            break;
        case 'paper':
            switch (computerSelection) {
                case 'rock':
                    handleRoundResults('Player', 'paper', 'rock');
                    break;
                case 'scissors':
                    handleRoundResults('Computer', 'scissors', 'paper');
                    break;
                case 'paper':
                    handleRoundResults('Draw', null, null);
                    break
            }
            break;
    }
}

function handleRoundResults(winner, winnerMove, loserMove){
    currentRound++;
    switch(winner){
        case 'Player':
            playerScore++;
            break;
        case 'Computer':
            computerScore++;
            break;
        case 'Draw':
            break;
    }
    let text;
    if(winner === 'Draw'){
        text = `R ${currentRound}: Draw`;
    } else {
        text = `R ${currentRound}: ${winner} wins; ${winnerMove} beats ${loserMove}`;
    }
    postTextToLog(text);
    updatePlayer1Score();
    updatePlayer2Score();
    checkForWinner();
}

function updatePlayer1Score(){
    document.getElementById('player-score').textContent = playerScore.toString();
}
function updatePlayer2Score(){
    document.getElementById('computer-score').textContent = computerScore.toString();
}

function checkForWinner() {
    if(playerScore >= 5){
        postTextToLog('Player Won!');
        document.getElementById('winner').textContent = 'Player Won!';
        pop('popDiv');

    } else if (computerScore >= 5){
        postTextToLog('Computer Won!');
        document.getElementById('winner').textContent = 'Computer Won!';
        pop('popDiv');
    }
}

function postTextToLog(text){
    const div = document.createElement('div');
    div.textContent = text;
    div.classList.add('game-log-item');
    const log = document.getElementById('game-log');
    log.appendChild(div);
    if(log.children.length > 10){
        log.removeChild(log.children[0]);
    }
}

function createEventListeners(){
    let rock = document.getElementById('rock');
    let scissors = document.getElementById('scissors');
    let paper = document.getElementById('paper');
    rock.addEventListener('click', () => {
        playRound(rock, computerPlay())
    });
    scissors.addEventListener('click', () => {
        playRound(scissors, computerPlay())
    });
    paper.addEventListener('click', () => {
        playRound(rock, computerPlay())
    });

}

function computerPlay() {
    let roll = Math.floor(Math.random() * 3);
    if(roll === 0){
        return 'rock'
    } else if (roll === 1){
        return 'paper'
    } else {
        return 'scissors'
    }
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;

    if(document.getElementById('game-log').hasChildNodes()){
        removeAllChildElements('game-log');
    }
    document.getElementById('player-score').textContent = '0';
    document.getElementById('computer-score').textContent = '0';
}

function removeAllChildElements(element){
    const myNode = document.getElementById(element);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function pop(div) {
    document.getElementById(div).style.display = 'block';
}
function hide(div) {
    document.getElementById(div).style.display = 'none';
}