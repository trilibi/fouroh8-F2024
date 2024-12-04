import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();



const App = () => {
  const defaultName = window.localStorage.getItem('my_name', 'anon');
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({
    x:0,
    y:0
  });
  const [myAvatar, setMyAvatar] = React.useState({
    name: '',
    id: 0
  });

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  
  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);

    Pokedex.getPokemonsList()
    .then(function(response) {
      let list = response.results;
      list = list.map((item) => {
        item.id = item.url.slice(34, -1);
        return item;
      });
      setPokemonList(list);
    })
  }, []);
  
  function updatePosition(x, y) {
    console.log('CORE :: ', x, y);
    setMyPosition({x: x, y: y});
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game, Something Something <br></br>
        <input type="text" onInput={(e) => {
          setName(e.target.value)
          window.localStorage.setItem('my_name', name)
          }} value={name}/> 
          ({myPosition.x}, {myPosition.y}) 
          (Avatar Name: {myAvatar.name}, id: {myAvatar.id})
          <span onClick={() => {setMyAvatar({name: '', id: 0})}}> Clear Avatar </span>
          (Avalable Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id === 0 && <div className="avatar-picker">No Avatar: {pokemonList.map(function(item){
        var baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
        return <img 
        title={item.name} 
        src={baseUrl + item.id + '.gif'} 
        onClick={() => {
          console.log(item);
          setMyAvatar({name: item.name, id: item.id});
        }}/>
      })}</div>}
      <div id="main">
        <Sidebar />
        <Board 
        grid={grid} 
        width="70%" 
        myAvatar={myAvatar}
        myPosition={myPosition}
        updatePosition={updatePosition}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
