import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex()
const pokemon = [];

Pokedex.getPokemonList()
.then(function(response) {
  console.log(response)
  setPokemonList(response.results)
})


const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [myPosition, setMyPosition] = React.userState({
    y: 0,
    y: 0
  });

  const [myAvatar, setMyAvatar] =React.userState({
    name: '',
    id: 0
  });

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  
  React.useEffect(function() {
  
  const rows = 10;
  const cols = 10;
  const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
  setGrid(new_grid);
  console.log(new_grid);
  },[]);

  function updatePosition(x,y) {
    console.log('CORE :: ', x, y);
    setMyPosition({x: x,y});
  }



  return (
    <div id="app_root">
      <nav myPosition={myPosition}>
        Our Grid Game, this class is an easy A
        <input type="text"  onInput={(e) => {
          setName(e.target.value);
          window.localStorage.setItem('my_name', e.target.value);
        }} value={name}/> ({myPosition.x})
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
