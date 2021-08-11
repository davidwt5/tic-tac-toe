const moveFactory = (x, y) => {
    return {x, y};
};

const aiController = (() => {
    // Returns an array of possible moves
    const _getPossibleMoves = board => {
        let moves = [];
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++){
                if(!board[x][y]) moves.push(moveFactory(x, y));
            }
        }
        return moves;
    };

    const _randomSelect = board => {
        const moves = _getPossibleMoves(board);
        const randIndex = Math.floor(Math.random() * moves.length);
        return moves[randIndex];
    };

    // Source: https://www.youtube.com/watch?v=l-hh51ncgDI&t=242s
    const _minimax = (position, maximisingPlayer) => {
        if(_gameIsOver(position))
            return _staticEvaluation(position)
    };

    const play = (board, difficulty) => {
        if(difficulty === RANDOM_SELECTION)
            return _randomSelect(board);
        else if(difficulty === MINIMAX)
            return _minimax(board);
    };
    
    return {play};
})();