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

export default function Board({ grid, width, avatar, myPosition, avatars, updatePosition}) {
  // console
  function cellClicked(e) {
    let data = e.target.dataset;
    //console.log('clicked', e.target.dataset);
    updatePosition(data.x, data.y);
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
                title={x + "," + y}
                key={"col_" + y}
                onClick={cellClicked}
                data-x={x}
                data-y={y}
              >
                {myPosition.x == x && myPosition.y == y && <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + avatar.id + '.gif'}/>}
                {Object.values(avatars).map((a) => {
                  if (a.x == x && a.y == y) {
                    return (<div><img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + a.avatar.id + '.gif'}/></div>)
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
