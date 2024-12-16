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

function cellClicked(e) {
  // console.log('clicked');
  // console.log(e.target.dataset);
  // console.log(e.target.dataset.x, e.target.dataset.y);
  updatePosition(e.target.dataset.x, e.target.dataset.y);

}


  return (
    <div id="board">
    {/* <pre>{JSON.stringify(avatars)}</pre> */}
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
                <img 
                className={getCellClass(x, y)}
                title={x + "," + y}
                key={"col_" + y}
                onClick={cellClicked}
                data-x={x}
                data-y={y}
                src={"grass_tile.png"} />
                {myPosition.x == x && myPosition.y == y &&  myAvatar.id != 0 && 
                <img 
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
                  +myAvatar.id+'.gif'} 
                  />}
                  
                {Object.values(avatars).map((a) => {
                  if(a.x === x && a.y === y) {
                    return (<div><img 
                      src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
                        +a.avatar.id+'.gif'} 
                      alt='' /> </div>)
                  }
                })}

                  </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
