import Avatar from "./avatars"

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
    )
}

export default function Board({
    grid,
    myAvatar,
    myPosition,
    width,
    updatePosition,
    avatars,
}) {
    const cellClicked = (e, x, y) => {
        updatePosition(x, y)
    }
    console.log(myAvatar)

    const baseURL =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
    // console
    return (
        <div id="board">
            <pre>{JSON.stringify(avatars)}</pre>
            <div style={{ width: width }}>
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
                                {/* {x},{y} */}
                                {myPosition.x == x &&
                                    myPosition.y == y &&
                                    myAvatar.id != 0 && (
                                        <img
                                            src={baseURL + myAvatar.id + ".gif"}
                                        />
                                    )}
                                {Object.values(avatars).map((a) => {
                                    if (
                                        a.x === x &&
                                        a.y === y &&
                                        a.avatar.id != myAvatar.id &&
                                        a.avatar.id != 0
                                    ) {
                                        return (
                                            <div>
                                                <img
                                                    src={
                                                        baseURL +
                                                        a.avatar.id +
                                                        ".gif"
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* console */}
        </div>
    )
}
