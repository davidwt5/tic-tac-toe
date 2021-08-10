const gameMaster = (() => {
    // Keeps track of players
    let player = {
        one: playerFactory('Player 1', SYMBOL.O),
        two: playerFactory('Player 2', SYMBOL.X)
    }

    let turn = player.one;
    let gameIsOver = false;

    const getUpcomingSymbol = () => turn.getSymbol();

    const playRound = (x, y, opponent) => {
        if(opponent === "ai" && turn === player.two)
            return _aiRound(x, y);
        else return _playerRound(x, y);
    }

    const _playerRound = (x, y) => {
        // Only execute if the game is not over and setTile is successful
        if(!gameIsOver && gameBoard.setTile(x, y, turn.getSymbol())) {
            if(gameBoard.checkDraw()) {
                gameIsOver = true;
                return "draw";
            }

            let victorSymbol = gameBoard.checkVictory();
            if(victorSymbol) {
                gameIsOver = true;
                return turn.getName();
            }
            turn = (turn === player.one) ? player.two : player.one;
        }
    };

    const _aiRound = (x, y) => {
        alert("WIP");
    }

    const resetGame = () => {
        gameBoard.reset();
        turn = player.one;
        gameIsOver = false;
    }

    gameBoard.initialise();

    return {playRound, getUpcomingSymbol, resetGame};
})();