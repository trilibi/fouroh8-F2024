import Board from "./board";
import Sidebar from "./sidebar";


const Pokedex = new window.Pokedex.Pokedex()
const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
  if (data.name == 'anon') {
    console.log('Please set a name'); 
    return; 
  }
  console.log(data);
  socket.emit('avatar', data); 
}

const App = () => {
  const defaultName = window.localStorage.getItem('my_name'); 
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]); 
  const [pokemonList, setPokemonList] = React.useState([]); 
  const [myPosition, setMyPosition] = React.useState({x : 0, y : 0}); 
  const [myAvatar, setMyAvatar] = React.useState({name : '', id : 0}); 
  const [avatars, setAvatars] = React.useState({}); 

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  // Be careful with syntax error
  React.useEffect(function() {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([])); 
    setGrid(new_grid); 

    socket.on('avatar', function (data) {
      console.log(data);
      setAvatars((prevState) => {
        prevState[data.name] = data; 
        //console.log(previous)
        return Object.assign({}, prevState); 
      });
    });
  

  Pokedex.getPokemonsList().then(function (response) {
    console.log(response)
    let list = response.results; 
    list = list.map((item) => {
      item.id = item.url.slice(34, -1); 
      return item; 
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

  const updatePosition = (x, y) => {
      console.log('CORE ::',  x, y); 
      setMyPosition({x: x, y: y});
  }
  
  return (
    <div id="app_root">
      <nav className="nav-bar">
  <div className="nav-content">
    <h1 className="nav-title">Welcome to our Grid Game!</h1>
    <div className="nav-input">
      <input
        type="text"
        value={name}
        onInput={(e) => {
          console.log(e);
          setName(e.target.value);
          window.localStorage.setItem("name", e.target.value);
        }}
        placeholder="Enter your name"
        title="Name Input"
        className="name-input"
      />
    </div>
  </div>
  <div className="nav-info">
    ({myPosition.x}, {myPosition.y}) (Avatar Name: {myAvatar.name || "None"}, ID: {myAvatar.id || "N/A"}) 
    <button
      className="clear-avatar-btn"
      onClick={() => {
        setMyAvatar({ name: "", id: 0 });
        setMyPosition({ x: 0, y: 0 });
      }}
    >
      Clear Avatar
    </button>
  </div>
</nav>


      {myAvatar.id === 0 && 
      <div className='avatar-picker'>No Avatar: 
        {pokemonList.map(function(item) {
          var baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif'
          return (<img 
            onClick={() => {
              console.log(item);
              setMyAvatar({name: item.name, id: item.id});
            }}
            title={item.name} 
            src={baseUrl + '/' + item.id + '.gif'}/>); 
        })}</div>}

      <div id="main">
        <Sidebar 
          pokemonList={pokemonList}
          setAvatarFunction={setMyAvatar}
          myAvatar={myAvatar.id}
          socket={socket}
          name={name}/>
        <Board 
          grid={grid} 
          width="70%"
          myAvatar={myAvatar}
          myPosition={myPosition}
          avatars={avatars}
          updatePosition={updatePosition}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));