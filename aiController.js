const aiController = (() => {
    const _randomSelect = (board) => {
        console.table(board);
    };

    const _minimax = () => {

    };

    const play = (board, difficulty) => {
        if(difficulty === RANDOM_SELECTION)
            _randomSelect(board);
        else if(difficulty === MINIMAX)
            _minimax(board);
    };
    
    return {play};
})();