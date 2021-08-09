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
    const setTile = (x, y, symbol) => {
        if(!_board[x][y]) _board[x][y] = symbol;
        else console.error("ERR: Assignment to an occupied tile");
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
            return board[0][0];
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
        one: null,
        two: null
    }

    // Prevent two players from sharing the same symbol
    const setPlayerOne = p1 => {
        if(!player.two || player.two.getSymbol() != p1.getSymbol())
            player.one = p1;
        else {
            console.error("ERR: Bad player 1 symbol");
        }
    }

    const setPlayerTwo = p2 => {
        if(!player.one || player.one.getSymbol() != p2.getSymbol())
            player.two = p2;
        else {
            console.error("ERR: Bad player 2 symbol");
        }
    }
    
    // Controls flow of game
    

    return {setPlayerOne, setPlayerTwo};
})();

let playerDavid = playerFactory('David', SYMBOL.O);
let playerWinston = playerFactory('Winston', SYMBOL.X);

gameBoard.initialise();

gameBoard.setTile(1,1,playerDavid.getSymbol());
gameBoard.setTile(0,0,playerWinston.getSymbol());
gameBoard.setTile(2,0,playerDavid.getSymbol());
gameBoard.setTile(0,1,playerWinston.getSymbol());
gameBoard.setTile(0,2,playerDavid.getSymbol());

gameBoard.printTiles();


