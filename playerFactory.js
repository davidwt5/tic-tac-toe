const playerFactory = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const setName = newName => name = newName;
    const setSymbol = newSymbol => symbol = newSymbol;

    return {getName, getSymbol, setName, setSymbol};
};