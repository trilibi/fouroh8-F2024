import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex()



const App = () => {
  const defaultName = window.localStorage.getItem('my_name')
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
  
    React.useEffect(() => {
        const rows = 10;
        const cols = 10;
        const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
        setGrid(new_grid);

        Pokedex.getPokemonsList()
        .then(function(response){
        console.log(response)
        let list = response.results;
        list = list.map((item) => {
          item.id = item.url.slice(34, -1);
          return item;
        })
        setPokemonList(response.results);
        })

    }, []);

  function updatePosition(x, y) {
    console.log('CORE::', x, y);
    setMyPosition({x: x, y: y});
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game, this class is an easy A
        <input type="text" onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem('my_name', e.target.value);
        }} value={name}/> 
        ({myPosition.x}, {myPosition.y}) 
        (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
        <span onClick={() => {
          setMyAvatar({name: '', id: 0})
        }}> Clear Avatar </span>
        (Avaliable Pokemon: {pokemonList.length})
      </nav>

      {myAvatar.id == 0 && 
      <div className="avatar-picker">No Avatar: 
      {pokemonList.map(function(item){
        var baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated'
        return (<img
          onClick={() => {console.log(item); 
          setMyAvatar({name: item.name, id: item.id});
          }}
          title={item.name} 
          scr={baseUrl + '/' + item.id + '.gif'}/>);
          
      })}
      </div>}

      <div id="main">
        <Sidebar />
        <Board 
        grid={grid} 
        width="90%"
        myAvatar= {myAvatar} 
        myPosition= {myPosition}
        updatePosition={updatePosition}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));