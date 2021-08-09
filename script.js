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
                return _board[x][0];
        }
        return null;
    };
    const _checkVictorColumns = () => {
        for(let y=0; y<3; y++) {
            if(_board[0][y] === _board[1][y] && _board[0][y] === _board[2][y])
                return _board[0][y];
        }
        return null;
    };
    const _checkVictorDiagonals = () => {
        if(_board[0][0] === _board[1][1] && _board[0][0] === _board[2][2])
            return _board[0][0];
        else if(_board[0][2] === _board[1][1] && _board[0][2] === _board[2][0])
            return _board[0][2];
        return null;
    };

    const checkVictory = () => {
        return _checkVictorRows() || _checkVictorColumns() || _checkVictorDiagonals();
    };

    // Used for debugging
    const printTiles = () => console.table(_board);

    return Object.assign({setTile, initialise, checkVictory}, {printTiles});
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

    const getUpcomingSymbol = () => turn.getSymbol();

    const playRound = (x, y) => {
        // If setTile is not successful, exit
        if(gameBoard.setTile(x, y, turn.getSymbol())) {
            turn = (turn === player.one) ? player.two : player.one;
            let victor = gameBoard.checkVictory();
            if(victor) console.log("The winner is " + victor);
        }
    };

    // Always starts with player one
    gameBoard.initialise();

    return {playRound, getUpcomingSymbol};
})();

const displayController = (() => {
    // Only display the symbol in the tile if its empty
    const _displaySymbol = (tile, symbol) => {
        if(!tile.innerText) tile.innerText = symbol;
    };

    const _generateGrid = () => {
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                let tile = document.createElement('div');
                tile.classList.add('tile');
                tile.dataset.x = x;
                tile.dataset.y = y;
                tile.addEventListener('click', () => {
                    _displaySymbol(tile, gameMaster.getUpcomingSymbol());
                    gameMaster.playRound(tile.dataset.x, tile.dataset.y);
                });
                document.querySelector('.grid').appendChild(tile);
            }
        }
    };
    
    _generateGrid();

    return {};
})();

// let playerDavid = playerFactory('David', SYMBOL.O);
// let playerWinston = playerFactory('Winston', SYMBOL.X);

// gameBoard.initialise();

// gameBoard.setTile(1,1,playerDavid.getSymbol());
// gameBoard.setTile(0,0,playerWinston.getSymbol());
// gameBoard.setTile(2,0,playerDavid.getSymbol());
// gameBoard.setTile(0,1,playerWinston.getSymbol());
// gameBoard.setTile(0,2,playerDavid.getSymbol());

// gameBoard.printTiles();


