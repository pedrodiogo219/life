const ROWS = 10;
const COLS = 10;

function createInitialState() {
    const state = new Array();
    for(let i = 0; i < ROWS; i++){
        newRow = new Array();
        for (let j = 0; j < COLS; j++){
            newRow.push(0);
        }
        state.push(newRow);
    }
    return state;
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
            newRow.push(newCell)
        }
        tableElement.appendChild(newRowElement);
        table.push(newRow);
    }
    return table;
}

function drawState(state, table){
    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLS; j++){
            state[i][j] ? 
                table[i][j].className = "cell cell-alive" :
                table[i][j].className = "cell cell-dead"
        }
    }
}

function go() {
    let state = createInitialState();
    let table = createTable();
    
    state = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

    drawState(state, table)
}

go()