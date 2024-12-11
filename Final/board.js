import Avatar from "./avatar";

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

export default function Board({ grid, width, updatePosition, avatars, myAvatar, myPosition }) {
    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"

    function cellClicked(e, x, y) {
        // console.log("clicked!");
        // // console.log(e.target.dataset.x, e.target.dataset.y);
        // console.log(x, y)
        updatePosition(x,y);
    }
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
                  {myPosition.x == x && myPosition.y == y
                      && <img src={baseUrl + myAvatar.id + '.gif'} alt="avatar"/>
                  }
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* console */}
    </div>
  );
}
