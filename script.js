const gameBoard = (() => {
    let _board = [];

    // Initialises the board to an empty 3x3
    const initialise = () => {
        for(let i=0; i<COLUMN_LENGTH; i++) {
            let row = [];
            for(let j=0; j<ROW_LENGTH; j++) {
                row.push(tileFactory());
            }
            _board.push(row);
        }
    };

    return {initialise};
})();

const tileFactory = (player = null) => {
    const getPlayer = () => player;

    // Doesn't allow assignment if player is not null
    const setPlayer = newPlayer => {
        if(!player) player = newPlayer;
        else console.log("ERR: Attempting to assign to an occupied tile");
    };

    return {getPlayer, setPlayer};
};

const playerFactory = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

const gameMaster = (() => {
    // check victory, controls flow of game
    return {};
})();