const gameBoard = (() => {
    let _board = [];

    // Initialises the board to an empty 3x3
    const initialise = () => {
        for(let x=0; x<COLUMN_LENGTH; x++) {
            let row = [];
            for(let y=0; y<ROW_LENGTH; y++) {
                row.push(null);
            }
            _board.push(row);
        }
    };

    const reset = () => {
        _board = [];
        initialise();
    }

    const getBoard = () => _board;

    // Disallows setting a symbol on an occupied tile
    // Returns 1 on success and -1 on fail
    const setTile = (x, y, symbol) => {
        if(!_board[x][y]) {
            _board[x][y] = symbol;
            return 1;
        }
        else {
            console.error("ERR: Assignment to an occupied tile");
            return -1;
        }
    }

    const _checkVictorRows = () => {
        for(let x=0; x<3; x++) {
            if(_board[x][0] === _board[x][1] && _board[x][0] === _board[x][2])
                if(_board[x][0]) return _board[x][0];
        }
        return null;
    };
    const _checkVictorColumns = () => {
        for(let y=0; y<3; y++) {
            if(_board[0][y] === _board[1][y] && _board[0][y] === _board[2][y])
            if(_board[0][y]) return _board[0][y];
        }
        return null;
    };
    const _checkVictorDiagonals = () => {
        if(_board[0][0] === _board[1][1] && _board[0][0] === _board[2][2])
            if(_board[0][0])return _board[0][0];
        else if(_board[0][2] === _board[1][1] && _board[0][2] === _board[2][0])
            if(_board[0][2])return _board[0][2];
        return null;
    };

    const checkVictory = () => {
        return _checkVictorRows() || _checkVictorColumns() || _checkVictorDiagonals();
    };

    // Used for debugging
    const printTiles = () => console.table(_board);

    return Object.assign({getBoard, setTile, initialise, checkVictory, reset}, {printTiles});
})();

const playerFactory = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

const gameMaster = (() => {
    // Keeps track of players
    let player = {
        one: playerFactory('Player 1', SYMBOL.O),
        two: playerFactory('Player 2', SYMBOL.X)
    }

    let turn = player.one;
    let gameIsOver = false;

    const getUpcomingSymbol = () => turn.getSymbol();

    // Stop when there is a winner, declare a tie

    const playRound = (x, y) => {
        // Only execute if the game is not over and setTile is successful
        if(!gameIsOver && gameBoard.setTile(x, y, turn.getSymbol())) {
            turn = (turn === player.one) ? player.two : player.one;
            let victor = gameBoard.checkVictory();
            if(victor) {
                gameIsOver = true;
                console.log(`The winner is ${victor}`);
            }
        }
    };

    const resetGame = () => {
        gameBoard.reset();
        turn = player.one;
        gameIsOver = false;
    }

    gameBoard.initialise();

    return {playRound, getUpcomingSymbol, resetGame};
})();

const displayController = (() => {
    // redners the board based on internal board
    const _renderBoard = () => {
        const board = gameBoard.getBoard();
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                // Find a tile whose data-x == x and data-y == y
                let tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`)
                tile.innerText = board[x][y];
            }
        }
    };

    const _generateGrid = () => {
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                let tile = document.createElement('div');
                tile.classList.add('tile');
                tile.dataset.x = x;
                tile.dataset.y = y;
                tile.addEventListener('click', () => {
                    gameMaster.playRound(tile.dataset.x, tile.dataset.y);
                    _renderBoard();
                });
                document.querySelector('.board').appendChild(tile);
            }
        }
    };

    document.querySelector('.reset')
        .addEventListener('click', e => {
        gameMaster.resetGame();
        _renderBoard();
    });
    
    _generateGrid();

    return {};
})();