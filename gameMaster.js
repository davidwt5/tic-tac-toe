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
            legalMoveMade = (turn === player.one) ? _playerRound(x, y) : _playerRound(x, y);

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
    
            // Pass the turn
            turn = (turn === player.one) ? player.two : player.one;
        }
    }

    const _playerRound = (x, y) => gameBoard.setTile(x, y, turn.getSymbol());

    const _aiRound = () => {
        const selectedTile = aiController.minimax();
        gameBoard.setTile(selectedTile.x, selectedTile.y, player.two.getSymbol());
        let victor = checkGameEnd();
        if(victor) {
            gameIsOver = true;
            return;
        }
    }

    const resetGame = () => {
        gameBoard.reset();
        turn = player.one;
        gameIsOver = false;
    }

    gameBoard.initialise();

    return {playRound, resetGame};
})();