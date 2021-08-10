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

    const _displayVictor = (victorName) => {
        let victorDisplay = document.querySelector('.victor-display')
        if(victorName === "draw") victorDisplay.innerText = "Draw!"
        else victorDisplay.innerText = `${victorName} Wins!`;
    }

    _resetVictorDisplay = () => {
        document.querySelector('.victor-display')
            .innerText = "";
    }

    const _generateGrid = () => {
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                let tile = document.createElement('div');
                tile.classList.add('tile');
                tile.dataset.x = x;
                tile.dataset.y = y;
                tile.addEventListener('click', () => {
                    let opponent = document.querySelector('.opponent');
                    let victorName = gameMaster.playRound(x, y, opponent.value);
                    _renderBoard();
                    opponent.setAttribute("disabled", "true");
                    if(victorName) _displayVictor(victorName);
                });
                document.querySelector('.board').appendChild(tile);
            }
        }
    };

    document.querySelector('.reset')
        .addEventListener('click', e => {
        gameMaster.resetGame();
        _renderBoard();
        _resetVictorDisplay();
        document.querySelector('.opponent').removeAttribute("disabled");
    });
    
    _generateGrid();

    return {};
})();