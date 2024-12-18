import Board from "./board";
import Sidebar from "./sidebar";


const Pokedex = new window.Pokedex.Pokedex()
console.log(window.Pokedex);

const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {

  if(data.name == 'anon'){
    console.error('Please set name');
    return;
  }
  
  console.log({data});
  socket.emit('avatar', data);
}


const App = () => {
  const defaultName = window.localStorage.getItem('my_name')
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setpokemonList] = React.useState([]);
  const [myPosition, setmyPosition] = React.useState({
    x: 0,
    y: 0
  });
  const [myAvatar, setMyAvatar] = React.useState({
    name: '',
    id:0
  });

  const [avatars, setAvatars] = React.useState({});

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  let gid = [];
  React.useEffect(() => {  
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);

    socket.on('avatar', function(data){
      console.log(data);
      setAvatars(function(previous){
        previous[data.name] = data;
        console.log(previous);
        return Object.assign({}, previous)

      })
    })


    Pokedex.getPokemonsList()
    .then(function(response) {
      console.log(response)
      let list = response.results;
      list = list.map((item) => {
        console.log("https://pokeapi.co/api/v2/pokemon/".length)
        console.log(item.url.slice(34, -1))
        item.id = item.url.slice(34, -1)
        return item;

      })
      setpokemonList(response.results);
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

  function updatePosition(x, y){
    console.log('CORE ::', x, y);
    setmyPosition({x: x, y});
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game<br></br>
        <input type="text" onInput={(e) => {
          setName(e.target.value)
          window.localStorage.setItem('my_name', e.target.value);
         } } 
        
          value = {name}/> 
          ({myPosition.x}, {myPosition.y}) 
          (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
          (Available pokemon: {pokemonList.length})
          <span onClick={() => {
            setMyAvatar({name: '', id:0});
          }}><br></br>Clear Avatar</span>

      </nav>
      {myAvatar.id == 0 && <div className="avatar-picker">No Avatar: 
        {pokemonList.map(function(item){
          var baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
          return <img 
            onClick ={() => {console.log(item); 
              setMyAvatar({name: item.name, id: item.id});
            }} 
            title = {item.name} 
            src= {baseURL + '/' + item.id + '.gif'}/>

        
      })}
      <br></br>
      </div>}
      <div id="main">
        <Sidebar 
        socket={socket}
        name={name}
        myAvatar={myAvatar}
        myPosition={myPosition}/>
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
