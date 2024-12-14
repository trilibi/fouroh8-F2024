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

export default function Board({ grid, myAvatar, myPosition, width, updatePosition, avatars, pokeballPosition }) {

  function cellClicked(e, x, y){
    //console.log('clicked')
    //console.log(e.target.dataset)
    //console.log(e.target.dataset.x, e.target.dataset.y)
    //console.log(x,y);
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
                {myPosition.x == x && myPosition.y == y && (
                  <div className="my-avatar-cell">
                  <img className="my-avatar"  
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' 
                          + myAvatar.id + '.gif'} 
                    /></div>
                )}
                
                {Object.values(avatars).map((a) => {
                  if (a.x === x && a.y === y) {
                    return (<div>
                      <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' 
                        + a.avatar.id + '.gif'} />
                    </div>);
                  }
                })}

                {pokeballPosition && pokeballPosition.x === x && pokeballPosition.y === y && (
                  <div>
                    <img
                      src="https://fc03.deviantart.net/fs70/f/2013/019/b/6/pokeball_by_zel_duh-d5s04qj.gif"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* console */}
    </div>
  );
}
