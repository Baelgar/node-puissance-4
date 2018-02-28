const readline = require('readline')

const CELL_EMPTY = 0
const PLAYER_A = 1
const PLAYER_B = 2

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
]

const winningCombo = []
const winningList = generateComboListWin()

// console.log(winningList)


function generateComboListWin(){
    for(k=0;k<=44;k++){
        const combinaison = generateCombo()
        // console.log(combinaison)
        winningCombo.push(combinaison)
    }

    return winningCombo
}


function generateCombo(){
    const comb = []
    //i = indice ligne
    //j = indice colonne
    for(i=5;i-3 >= 0;i--){
        for(j=0;j+3 <=6;j++){
            // console.log(i,j+3)
            comb.push(board[i][j])
            comb.push(board[i][j+1])
            comb.push(board[i][j+2])
            comb.push(board[i][j+3])
        }
    }
    console.log(comb)
    return comb
}


playGame()

function playGame() {
    const state = {
        board: board,
        turn: 0,
    }

    promptNextMove(state)

    function playNextMove(state) {
        promptNextMove(state)
        // isQuit
        // move = parseMove(cmd)
        // validation = validateMove(move)
        // if (validation.isValid) {
        //   applyMove(state, validation.move)
        // } else {
        //   display()
        //   promptNextMove(state)
        // }
    }

    function promptNextMove(state) {
        const player = getPlayerForState(state)
        const displayPlayer = getDisplayPlayer(player)
        const tokenPlayer = getPlayerToken(player)
        const question = `${displayPlayer}, prochain coup ? `
        prompt(question, answer => {
            console.log('commande : ' + answer)

        /**
         GESTION DE LAFFICHAGE DES COUPS DANS LE TABLEAU

         **/


        if(answer >= '1' && answer <= '7'){
            getTokenInBoard(tokenPlayer, answer)
            display(board)
            state.turn++
            promptNextMove(state)
        }
        else{
            promptNextMove(state)
        }

    })
    }

    function getPlayerForState(state) {
        const turn = state.turn
        if (turn % 2 === 0) {
            return PLAYER_A
        } else {
            return PLAYER_B
        }
    }

    function getDisplayPlayer(player) {
        switch (player) {
            case PLAYER_A: return 'Joueur A'
            case PLAYER_B: return 'Joueur B'
            default: throw new Error('Invalid player: ' + player)
        }
    }

    function getPlayerToken(player){
        switch(player){
            case PLAYER_A: return 'A'
            case PLAYER_B: return 'B'
            default: throw new Error('Invalid player: ' + player)
        }
    }

    function getTokenInBoard(tokenPlayer, answer){
        switch(answer){
            case '1':
                setTokenPosition(tokenPlayer, 0)
                break
            case '2':
                setTokenPosition(tokenPlayer, 1)
                break
            case '3':
                setTokenPosition(tokenPlayer, 2)
                break
            case '4':
                setTokenPosition(tokenPlayer, 3)
                break
            case '5':
                setTokenPosition(tokenPlayer, 4)
                break
            case '6':
                setTokenPosition(tokenPlayer, 5)
                break
            case '7':
                setTokenPosition(tokenPlayer, 6)
                break
        }
    }

    function setTokenPosition(tokenPlayer, ColPos){
        if(board[5][ColPos] != 'A' && board[5][ColPos] != 'B'){
            board[5][ColPos] = tokenPlayer
        }
        else if(board[4][ColPos] != 'A' && board[4][ColPos] != 'B'){
            board[4][ColPos] = tokenPlayer
        }
        else if(board[3][ColPos] != 'A' && board[3][ColPos] != 'B'){
            board[3][ColPos] = tokenPlayer
        }
        else if(board[2][ColPos] != 'A' && board[2][ColPos] != 'B'){
            board[2][ColPos] = tokenPlayer
        }
        else if(board[1][ColPos] != 'A' && board[1][ColPos] != 'B'){
            board[1][ColPos] = tokenPlayer
        }
        else if(board[0][ColPos] != 'A' && board[0][ColPos] != 'B'){
            board[0][ColPos] = tokenPlayer
        }
        else{
            otherColumn()
        }
    }

    function otherColumn(tokenPlayer){
        console.log("Colonne pleine. Choisissez une autre colonne")
        promptNextMove(state)
        state.turn++
    }
}

function prompt(question, callback) {
    rl.question(question, callback)
}

// display(board)

function display(board) {
    board.forEach(row => {
        row.forEach(cell => {
        // write('' + cell)
        write(String(cell))
})
    write(String("\n"))
})
}

function write(msg) {
    process.stdout.write(msg)
}

// run('> ')
//
// function run(question) {
//   ask()
//
//   function ask() {
//     rl.question(question, onAnswer)
//   }
//
//   function onAnswer(answer) {
//     console.log(answer)
//     ask()
//   }
// }
