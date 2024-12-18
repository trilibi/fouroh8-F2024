function getCellClass(x, y) {
    return (
        "cell " +
        (x % 2 === 0
            ? y % 2 === 0
                ? "even"
                : "odd"
            : y % 2 !== 0
                ? "even"
                : "odd")
    );
}

export default function Board({grid, myAvatar, myPosition, width, updatePosition, avatars}) {

    function cellClicked(e, x, y) {
        console.log('clicked');
        console.log(x, y);
        updatePosition(x, y);
    }

    // console
    return (
        <div id="board">
            <pre>{JSON.stringify(avatars)}</pre>
            <div style={{width: width}}>
                {grid.map((row, x) => (
                    <div className="row" key={"row_" + x}>
                        {row.map((col, y) => (
                            <div
                                className={getCellClass(x, y)}
                                title={x + "," + y}
                                key={"col_" + y}
                                onClick={(e) => cellClicked(e, x, y)}
                                data-x={x}
                                data-y={y}
                            >
                                {myPosition.x == x && myPosition.y == y
                                    && <img
                                        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + myAvatar.id + '.gif'}
                                    />}
                                {Object.values(avatars).map((a) => {
                                    if (a.x === x && a.y === y) {
                                        return (<div>{a.avatar.id}</div>);
                                    }
                                })}

                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* console */}
        </div>
    );
}
