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
      <div className="navbar-container">
    <div className="navbar-title">
      <h1>Pokemon Game Final</h1>
    </div>

    <div className="navbar-input">
      <label htmlFor="player-name">Enter your name:</label>
      <input
        id="player-name"
        type="text"
        value={name}
        onInput={(e) => {
          setName(e.target.value);
          window.localStorage.setItem('my_name', e.target.value);
        }}
      />
    </div>

    <div className="navbar-info">
      <p>Position: ({myPosition.x}, {myPosition.y})</p>
      <p>Avatar Name: {myAvatar.name || "None"}</p>
      <p>Avatar ID: {myAvatar.id}</p>
      <button onClick={() => setMyAvatar({ name: '', id: 0 })}>
        Clear Avatar
      </button>
    </div>
  </div>
      </nav>

      {myAvatar.id === 0 && (
  <div className="Avatar-Selection">
    <h3 className="avatar-selection-title">Select Your Avatar:</h3> 
    {pokemonList.slice(0, 9).map((item) => {
      const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
      return (
        <img 
          key={item.id} 
          onClick={() => {
            console.log(item);
            setMyAvatar({ name: item.name, id: item.id });
          }}
          title={item.name} 
          src={`${baseURL}${item.id}.gif`} 
        />
      );
    })}
  </div>
)}



    <div id="main">
      <Sidebar 
        socket = {socket}
        name = {name}
        myAvatar = {myAvatar}
        myPosition = {myPosition}/>

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
