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
            if(_board[0][0]) return _board[0][0];
        if(_board[0][2] === _board[1][1] && _board[0][2] === _board[2][0])
            if(_board[0][2]) return _board[0][2];
        return null;
    };

    const checkVictory = () => {
        return _checkVictorRows() || _checkVictorColumns() || _checkVictorDiagonals();
    };

    const checkDraw = () => {
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(!_board[i][j]) return false;
            }
        }
        return true;
    }

    // Used for debugging
    const printTiles = () => console.table(_board);

    return Object.assign({getBoard, setTile, initialise, checkVictory, checkDraw, reset}, {printTiles});
})();