console.log('js loaded');
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

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

function appendRoundResults(winner, winnerMove, loserMove){
    currentRound++;
    switch(winner){
        case 'player':
            playerScore++;
            break;
        case 'computer':
            computerScore++;
            break;
        case 'draw':
            break;
    }
    let text;
    if(winner === 'draw'){
        text = `R${currentRound}: This one was a draw...`;
    } else {
        text = `R${currentRound} Winner is: ${winner}; ${winnerMove} beats ${loserMove}`;
    }
    const div = document.createElement('div');
    div.textContent = text;
    div.classList.add('game-log-item');
    const log = document.getElementById('game-log');
    log.appendChild(div);
    if(log.children.length > 10){
        log.removeChild(log.children[0]);
    }
    document.getElementById('player-score').textContent = playerScore.toString();
    document.getElementById('computer-score').textContent = computerScore.toString();
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;

    removeAllChildElements('game-log');
    document.getElementById(playerScore).textContent = '0';
    document.getElementById(computerScore).textContent = '0';
}

function removeAllChildElements(element){
    const myNode = document.getElementById(element);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function playRound(button, computerSelection) {
    let playerSelection = button.id;
    switch (playerSelection) {
        case 'rock':
            switch (computerSelection) {
                case 'rock':
                    appendRoundResults('draw', null, null);
                    break;
                case 'scissors':
                    appendRoundResults('player', 'rock', 'scissors');
                    break;
                case 'paper':
                    appendRoundResults('computer', 'paper', 'rock');
                    break
            }
            break;
        case 'scissors':
            switch (computerSelection) {
                case 'rock':
                    appendRoundResults('computer', 'scissors', 'rock');
                    break;
                case 'scissors':
                    appendRoundResults('draw', null, null);
                    break;
                case 'paper':
                    appendRoundResults('player', 'scissors', 'paper');
                    break
            }
            break;
        case 'paper':
            switch (computerSelection) {
                case 'rock':
                    appendRoundResults('player', 'paper', 'rock');
                    break;
                case 'scissors':
                    appendRoundResults('computer', 'scissors', 'paper');
                    break;
                case 'paper':
                    appendRoundResults('draw', null, null);
                    break
            }
            break;
    }

    function checkForWinner() {
        if(playerScore >= 5){
            prompt('Player Won!');
            reset();
        } else if (computerScore >= 5){
            prompt('Computer Won!');
            reset();
        }
    }

    checkForWinner();
}


//TODO: Stop checkForWinner() from preventing the scores resetting