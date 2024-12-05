import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();

const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({
    x: 0,
    y: 0
  });
  const [myAvatar, setMyAvatar] = React.useState({
    name: '',
    id: 0
  });
  const [pokemonList, setPokemonList] = React.useState([]);

  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);

    Pokedex.getPokemonsList().then(function(p) {
      let pList = p.results;
      pList = pList.map((item) => {
        item.id = item.url.slice(34, -1);
        return item;
      })
      setPokemonList(pList);
    });
  }, []);
  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  function updatePosition(x, y) {
    //console.log('CORE:: ', x, y);
    setMyPosition({x: x, y: y});
  }

  return (
    <div id="app_root">
      COD Modern Poofare
      <nav>
        <h1>{name}</h1>
        <input type="text" onInput={(e) => {
          setName(e.target.value);
          window.localStorage.setItem('my_name', e.target.value);
        }} value={name}/> ({myPosition.x}, {myPosition.y}) ({myAvatar.name}, id#{myAvatar.id})
        <span onClick={() => {setMyAvatar({name: '', id: 0})}}> Clear Avatar  </span>
        (Available Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id === 0 && 
      <div className="avatar-picker">No Avatar: 
      {pokemonList.map(function(item) {
        let baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
        return <img title={item.name} src={baseURL + '/' + item.id + '.gif'} onClick={() => {
          console.log(item);
          setMyAvatar({name: item.name, id: item.id})
        }}/>
      })}
      </div>}
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="50%" avatar={myAvatar} myPosition={myPosition} updatePosition={updatePosition}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
