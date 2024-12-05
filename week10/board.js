export default function Board({ grid, width }) {
  return (
    <div id="board" style={{ width }}>
      {grid.map((row, x) => (
        <div className="row" key={`row_${x}`}>
          {row.map((_, y) => (
            <div className={`cell ${x % 2 === y % 2 ? "even" : "odd"}`} key={`cell_${x}_${y}`}>
              {x},{y}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
