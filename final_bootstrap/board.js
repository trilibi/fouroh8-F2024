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

export default function Board({ grid, width, updatePosition}) {
  // console
  function cellClicked(e) {
    let data = e.target.dataset;
    //console.log('clicked', e.target.dataset);
    updatePosition(data.x, data.y);
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
                onClick={cellClicked}
                data-x={x}
                data-y={y}
              >
                {x},{y}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* console */}
    </div>
  );
}
