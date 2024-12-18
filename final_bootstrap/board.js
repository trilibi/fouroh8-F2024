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

  function cellClicked(e, x, y) {
    console.log('clicked');
    console.log(e.target.dataset)
    console.log(e.target.dataset.x, e.target.dataset.y);
    console.log(x,y);
    updatePosition(x,y);
  }

  // console
  return (
    <div id="board">
      <pre>JSON.stringify(avatars)</pre>
      <div style={{ width: width }}>
        {grid.map((row, x) => (
          <div className="row" key={"row_" + x}>
            {row.map((col, y) => (
              <div
                className={getCellClass(x, y)}
                title={x + "," + y}
                key={"col_" + y}
                onClick-={(e) => cellClicked(x,y)}
                data-x= {x}
                daya-y= {y}
              >
                {myPosition.x ==x && myPosition.y == y
                && <image
                src ={'https://raw.githubusercontent.com/PokeAPI/sprites/mast'}
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
