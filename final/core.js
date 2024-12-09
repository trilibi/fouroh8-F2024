import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex()



const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
    if (data.name == 'anon') {
      console.log("Please enter name");
      return;
    }
  console.log({data});
  socket.emit('avatar', data);
}

const App = () => {
  const defaultName = window.localStorage.getItem('my_name')
  const [name, setName] = React.useState(defaultName ? defaultName : 'big man');
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

  const[avatars, setAvatars] = React.useState({});


  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(function() {
    const rows = 8;
    const cols = 8;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);

    socket.on('avatar', function(data) {
      console.log()
      setAvatars(function(previous) {
        previous[data.name] = data;
        return Object.assign({}, previous);
      })
    })

    Pokedex.getPokemonsList()
    .then(function(response) {
      console.log(response)
      let list = response.results
      list = list.map((item) => {
        item.id = item.url.slice(34, -1)
        return item
      })
      setPokemonList(list)
    })

}, []);

React.useEffect(() => {
  sendUpdate({
      name: name,
      avatar: myAvatar,
      x: myPosition.x,
      y: myPosition.y
  })
}, [myPosition]);

  function updatePosition(x, y) {
    console.log('CORE :: ', x, y)
    setMyPosition({x, y})
  }

  return (
    <div id="app_root">
      <nav>
        Pokemon but like on a grid haha
        <input type="text" onInput={(e) => {
          setName(e.target.value)
          window.localStorage.setItem('my_name', e.target.value)
          value={name}}}/> 
          ({myPosition.x}, {myPosition.y}) 
          (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
          <span onClick={() => setMyAvatar({name: '', id: 0})}>Clear Avatar</span>
          (Available Pokemon: {pokemonList.length})
      </nav>

      {myAvatar.id == 0 && <div className="Avatar-Selection">No Avatar: 
        {pokemonList.map(function(item){
          var baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
          return (<img 
            onClick={() => {
          console.log(item)
          setMyAvatar({name: item.name, id: item.id})}}
         title={item.name} src={baseURL + '/' + item.id + '.gif'} />)})}
         </div>}

      <div id="main">
        <Sidebar />
        <Board grid={grid} 
        width="70%" 
        myAvatar={myAvatar}
        avatars = {avatars}
        myPosition={myPosition}
        updatePosition={updatePosition} />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
