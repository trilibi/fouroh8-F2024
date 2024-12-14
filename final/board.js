

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
export default function Board({ grid, myAvatar, myPosition, width, updatePosition, avatars, socket }) {
  const [coinPosition, setCoinPosition] = React.useState({ coinx: 0, coiny: 0 });

  function cellClicked(e, x, y) {
    updatePosition(x, y);

    if (x === coinPosition.coinx && y === coinPosition.coiny) {
      // Emit a coin collection event to the server
      socket.emit('coinCollected', { name: myAvatar.name, id: myAvatar.id });

      // Regenerate the coin's position
      const newCoinx = Math.floor(Math.random() * grid.length);
      const newCoiny = Math.floor(Math.random() * grid[0].length);
      setCoinPosition({ coinx: newCoinx, coiny: newCoiny });
    }
  }

  return (
    <div id="board">
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
                {myPosition.x === x && myPosition.y === y && (
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${myAvatar.id}.gif`} />
                )}
                {Object.values(avatars).map((a) =>
                  a.x === x && a.y === y ? (
                    <div>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${a.avatar.id}.gif`}
                      />
                    </div>
                  ) : null
                )}
                {coinPosition.coinx === x && coinPosition.coiny === y && (
                  <div className="coin">💰</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
