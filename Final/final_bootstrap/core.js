import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();
const pokemon = [];



const App = () => {
  const defaultName = (window.localStorage.getItem('myName'));
  const [name, setName] = React.useState(defaultName ? defaultName : 'anonymoose');
  const [grid, setgrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({
    x:0,
    y:0
  });
  const [ myAvatar, setMyAvatar] = React.useState({
    name:'',
    id:0
  });

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(function() {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setgrid(new_grid);

    Pokedex.getPokemonsList()
    .then(function(response) {
      console.log(response);
      setPokemonList(response.results);
});
  }, [])
  
  function updatePosition(x,y) {
    console.log('CORE', x, y)
    setMyPosition({x, y})
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game Is An Easi A
        <input type="text" onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem('myName', e.target.value);
          }} value={name}/> 
          ({myPosition.x}, {myPosition.y}) 
          (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
          (Available Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id === 0 && <div className="avatar-picker">NO AVATAR: {pokemonList.map(function(item){
        return <div onClick={()=> {
          console.log(item);
        }}>{item.name}</div>
      })}</div>}
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" updatePosition={updatePosition} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
