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
  
  export default function Board({ grid, myAvatar, myPosition, width, updatePosition, avatars }) {
  
    function cellClick(e, x, y) {
      updatePosition(x, y);
    }
  
    return (
      <div id="board">
        <pre>{JSON.stringify(avatars)}</pre>
        <div style={{ width: width }}>
          {grid.map((row, x) => (
            <div className="row" key={"row_" + x}>
              {row.map((col, y) => (
                <div
                  className={getCellClass(x, y)}
                  title={`${x},${y}`}
                  key={`col_${x}_${y}`}
                  onClick={(e) => cellClick(e, x, y)}
                  data-x={x}
                  data-y={y}
                >
                  {/* Render my avatar */}
                  {myPosition.x === x && myPosition.y === y && (
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${myAvatar.id}.gif`}
                      alt="My Avatar"
                    />
                  )}
  
                  {/* Render other avatars */}
                  {Object.values(avatars).map((a, idx) => {
                    if (a.x === x && a.y === y) {
                      return (
                        <div key={idx}>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${a.avatar.id}.gif`}
                            alt={`Avatar ${a.avatar.id}`}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }