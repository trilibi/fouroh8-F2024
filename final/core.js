import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex()

const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  //console.log(defaultName);
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({
    x: 0,
    y: 0
  });
  const [myAvatar, setMyAvatar] = React.useState({
    name: '',
    id: 0
  });

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  React.useEffect(function() {    
    const rows = 8;
    const cols = 8;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);
    //console.log(grid);

    Pokedex.getPokemonsList()
    .then(function(response) {
      console.log(response);
      setPokemonList(response.results);
    })
  }, []);
  
  function updatePosition(x, y){
    console.log('CORE :: ', x, y);
    setMyPosition({x, y})
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game 
        <input type="text" onInput={(e) => {
          console.log(e);
          setName(e.target.value);
          window.localStorage.setItem('my_name', e.target.value);
        }} value = {name} /> ({myPosition.x}, {myPosition.y}) 
        (Avatar Name: {myAvatar.name} id#{myAvatar.id})
        (Available Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id == 0 && <div className="avatar-picker">No Avatar: 
        {pokemonList.map(function(item){
        return <div onClick={() => {
          console.log(item);
        }}>{item.name}</div>
      })}</div>}
      
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" updatePosition={updatePosition}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
