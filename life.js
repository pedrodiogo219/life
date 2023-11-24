let state;
let table;
const ROWS = 10;
const COLS = 10;
const ALIVE = (i, j) => state[i][j];
const DEAD = (i, j) => !state[i][j];
let RUN = false;

function createInitialState() {
    return  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    const state = new Array();
    for(let i = 0; i < ROWS; i++){
        newRow = new Array();
        for (let j = 0; j < COLS; j++){
            newRow.push(false);
        }
        state.push(newRow);
    }
    return state;
}

function swapCell(i, j){
    state[i][j] = !state[i][j];
    state[i][j] ? 
        table[i][j].className = "cell cell-alive" :
        table[i][j].className = "cell cell-dead"
}

function createTable(){
    let tableElement = document.getElementById("board");
    let table = new Array();
    for (let i = 0; i < ROWS; i++){
        let newRowElement = document.createElement("tr");
        let newRow = new Array();
        for (let j = 0; j < COLS; j++){
            newCell = newRowElement.insertCell();
            newCell.className = "cell cell-dead"
            newCell.onclick = () => {
                if (RUN) stop();
                else swapCell(i, j);
            }
            newRow.push(newCell)
        }
        tableElement.appendChild(newRowElement);
        table.push(newRow);
    }
    return table;
}

function drawState(){
    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLS; j++){
            if(ALIVE(i,j)){
                table[i][j].classList.add("cell-alive");
                table[i][j].classList.remove("cell-dead");
            }
            else {
                table[i][j].classList.add("cell-dead");
                table[i][j].classList.remove("cell-alive");
            }
        }
    }
}

function outOfBounds(i, j){
    return i < 0 || i >= ROWS || j < 0 || j >= COLS;
}

function countNeighbours(i, j){
    let count = 0
    for (let dx of [-1, 0, 1]){
        for (let dy of [-1, 0, 1]){
            if (dx == 0 && dy == 0) continue;
            if (outOfBounds(i+dx, j+dy)) continue;
            count += ALIVE(i+dx, j+dy);
        }
    }
    return count;
}

function nextState(){
    let newState = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            let n = countNeighbours(i, j);
            if (ALIVE(i, j)){
                if (n < 2) newState[i][j] = false;
                if (n > 3) newState[i][j] = false;
            }
            else {
                if (n == 3) newState[i][j] = true;
            }
        }
    }
    return newState;
}

async function gameLoop(){
    if(RUN){
        state = nextState();
        drawState();
    }
    setTimeout(() => gameLoop(), 200);
}

function go(){
    RUN = true;
    for(let row of table){
        for (let cell of row){
            cell.classList.add("pointer")
        }
    }
}

function stop(){
    RUN = false;
    for(let row of table){
        for (let cell of row){
            cell.classList.remove("pointer")
        }
    }
}

function init(){
    state = createInitialState();
    table = createTable();
    drawState();
    gameLoop();
}

init();


