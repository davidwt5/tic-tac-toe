const gameMaster = (() => {
    // Keeps track of players
    let player = {
        one: playerFactory('Player', SYMBOL.O),
        two: playerFactory('AI', SYMBOL.X)
    }

    let turn = player.one;
    let gameIsOver = false;

    const playRound = (x, y) => {
        let legalMoveMade // Boolean: true if a legal move was made, false otherwise

        // Try to make a move if the game is not over
        if(!gameIsOver)
            legalMoveMade = (turn === player.one) ? _playerRound(x, y) : _aiRound();

        // If a legal move was made, check draw, victory, and pass the turn
        if(legalMoveMade) {
            if(gameBoard.checkDraw()) {
                gameIsOver = true;
                return "draw";
            }
    
            let victorSymbol = gameBoard.checkVictory();
            if(victorSymbol) {
                gameIsOver = true;
                return turn.getName();
            }
    
            // Pass the turn, play round again if its AI's turn
            turn = (turn === player.one) ? player.two : player.one;
            if(turn === player.two) playRound();
        }
    }

    // Returns true on success
    const _playerRound = (x, y) => gameBoard.setTile(x, y, turn.getSymbol());

    // Returns true on success
    const _aiRound = () => {
        alert("AI Round");
    }

    const resetGame = () => {
        gameBoard.reset();
        turn = player.one;
        gameIsOver = false;
    }


    // Args: TURN_1 or TURN_2
    const setPlayerTurn = (turnNumber) => {
        if(turnNumber === TURN_1) {
            player.one.setSymbol(SYMBOL.O);
            player.two.setSymbol(SYMBOL.X);
            turn = player.one;
        } 
        // Plays a round when set to AI's turn
        else if (turnNumber === TURN_2) {
            player.one.setSymbol(SYMBOL.X);
            player.two.setSymbol(SYMBOL.O);
            turn = player.two;
            playRound();
        }
    };

    gameBoard.initialise();

    return {playRound, resetGame, setPlayerTurn};
})();