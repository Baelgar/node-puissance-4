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

playGame()

function playGame(){
     game()

    if(game() == true){
         prompt("Voulez-vous lancer une nouvelle partie ?\n yes/y/oui/o  pour lancer une nouvelle partie.\n no/n/non pour stopper le jeu.", answer => {
             if(answer == "yes" || answer == "y" || answer == "oui" || answer == "o"){
                console.log("Nouvelle partie")
                game()
             }
             else if(answer == "no" || answer == "n" || answer == "non"){
                console.log("Fin de la partie")
                process.exit()
             }
         })
    }

}

function game() {
    const state = {
        board: board,
        turn: 0,
    }

    promptNextMove(state)

    function playNextMove(state) {
        promptNextMove(state)
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
                winningComboVerification()
                if(winningComboVerification() != true){
                    state.turn++
                    promptNextMove(state)
                }
                else{
                    console.log(displayPlayer + " a gagné la partie")
                    return true
                }

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

    function winningComboVerification(){
        for(i=5;i >= 0;i--){

            //Vérifie si on peut faire un combo gagnant vertical
            if(i+3 <= 5){
                // A gagne la partie
                if(board[i+3][0] == "A" && board[i+2][0] == "A" && board[i+1][0] == "A" && board[i][0] == "A"){

                    return true
                }
                //B gagne la partie
                else if(board[i+3][0] == "B" && board[i+2][0] == "B" && board[i+1][0] == "B" && board[i][0] == "B"){

                    return true
                }
                else{
                    state.turn++
                }
            }

            for(j=0;j <= 6;j++){

                //Vérifie si on peut faire un combo horizontal vers la gauche
                if(j-3 >= 0){
                    //A gagne la partie
                    if(board[i][j] == "A" && board[i][j-1] == "A" && board[i][j-2] == "A" && board[i][j-3] == "A"){

                        return true
                    }
                    //B gagne la partie
                    if(board[i][j] == "B" && board[i][j-1] == "B" && board[i][j-2] == "B" && board[i][j-3] == "B"){

                        return true
                    }
                    else{
                        state.turn++
                    }
                }
                //Vérifie si on peut faire un combo horizontal vers la droite
                else if(j+3 <= 6){
                    //A gagne la partie
                    if(board[i][j] == "A" && board[i][j+1] == "A" && board[i][j+2] == "A" && board[i][j+3] == "A"){

                        return true
                    }
                    //B gagne la partie
                    if(board[i][j] == "B" && board[i][j+1] == "B" && board[i][j+2] == "B" && board[i][j+3] == "B"){
                     1
                        return true
                    }
                    else{
                        state.turn++
                    }
                }


            }
        }

        state.turn++

    }

    }

function prompt(question, callback) {
    rl.question(question, callback)
}


function display(board) {
    board.forEach(row => {
        row.forEach(cell => {
        write('['+String(cell)+']')
})
    write(String("\n"))
})
}

function write(msg) {
    process.stdout.write(msg)
}
