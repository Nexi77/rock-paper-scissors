const selectionButtons = document.querySelectorAll('[data-selection]');
const SELECTIONS = [
    {
        name: 'rock',
        img: '/images/icon-rock.svg',
        beats: 'scissors'
    },
    {
        name: 'paper',
        img: '/images/icon-paper.svg',
        beats: 'rock'
    },
    {
        name: 'scissors',
        img: '/images/icon-scissors.svg',
        beats: 'paper'
    }
]
const score = document.querySelector('.score__points');
const choicesDiv = document.querySelector('.selected');
const resultDiv = document.querySelector('.buttons');
const controlsDiv = document.querySelector('.controls');
const againButton = document.querySelector('.selected__result_btn');
const whoWon = document.querySelector('.selected__result_info');
let template = ``;

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
});

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}


function makeSelection(selection){
    const computerSelection = randomSelection();
    const youWon = isWinner(selection,computerSelection);
    const computerWon = isWinner(computerSelection, selection);
    addSelectionResult(selection, youWon, 'you');
    addSelectionResult(computerSelection, computerWon, 'the house');

    if(youWon){
        incrementScore(score);
        whoWon.innerText = "You win"
    }
    else if(computerWon){
        whoWon.innerText = "The house win"
        resetScore();
    }
    else{
        whoWon.innerText = "It's a draw"
    }
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function addSelectionResult(selection, winner, player){
    controlsDiv.classList.toggle('translate');
    controlsDiv.style.visibility = "hidden";  
    choicesDiv.style.visibility = "visible";
    template += 
    `
    <div class="selected__choice">
        <div class="controls__btn-circle ${selection.name} selected__circle ${winner ? 'selected__winner' : 'selected__loser'}">
            <span class="controls__wrapper"><img src=${selection.img} alt="${selection.name} icon"></span>
        </div>
        <h4 class="selected__text">${player} picked</h4>
    </div>
    `
    if(player === 'the house'){
        resultDiv.innerHTML = template;
    }
}

againButton.addEventListener('click', () => {
    template = ``;
    resultDiv.innerHTML = template;
    controlsDiv.style.visibility = "visible";  
    choicesDiv.style.visibility = "hidden";
})

function incrementScore(score){
    score.innerText = parseInt(score.innerText) + 1;
}

function resetScore(){
    score.innerText = 0;
}

const rulesButton = document.querySelector('.rules');
const modal = document.querySelector('.rules-modal');
const close = document.querySelector('.rules-modal__close');

rulesButton.addEventListener('click', () => {
    modal.classList.add('opened-rules');
})

close.addEventListener('click', () => {
    console.log('ran')
    modal.classList.remove('opened-rules');
    modal.classList.add('rules-modal');
})
