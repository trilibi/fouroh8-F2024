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

export default function Board({ grid, myAvatar, myPosition, width, updatePosition }) {

  function cellClick(e, x, y) {
    // console.log('clicked');
    // console.log(e.target.dataset);
    // console.log(e.target.dataset.x, e.target.dataset.y);
    // console.log(x, y);
    updatePosition(x, y);   
  }

  // console
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
                onClick={(e) => cellClick(e, x,y)}
                data-x={x}
                data-y={y}
              >

                {myPosition.x == x && myPosition.y == y
                && <img
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
                  +myAvatar.id+'.gif'}
                />}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* console */}
    </div>
  );
}
