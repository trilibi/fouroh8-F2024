import Board from "./board";
import Sidebar from "./sidebar";



const Pokedex = new window.Pokedex.Pokedex();
const pokemon = [];

const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
    if (data.name == 'anon') {
      console.log('Please set name');
      return;
    }
  console.log({data});
  socket.emit("avatar", data);
}


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

  const [avatars, setAvatars] = React.useState({});

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(function() {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setgrid(new_grid);

    socket.on('avatar', function(data) {
      console.log(data);
      setAvatars(function(previous) {
        previous[data.name] = data;
        console.log(previous)
        return Object.assign({}, previous);
      })
    })

    Pokedex.getPokemonsList()
    .then(function(response) {
      console.log(response);
      let allPokemon = response.results;
      allPokemon = allPokemon.map((item) => {
        item.id = item.url.slice(34, -1);
        return item;
      }) 
      setPokemonList(allPokemon);
});
  }, [])
  
  React.useEffect(() => {
    sendUpdate({
        name: name,
        avatar: myAvatar,
        x: myPosition.x,
        y: myPosition.y
    })
}, [myPosition]);

  function updatePosition(x,y) {
    console.log('CORE', x, y)
    setMyPosition({x, y})
  }

  return (
    <div id="app_root">
      <nav>
        Grid Game
        <input type="text" onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem('myName', e.target.value);
          }} value={name}/> 

          Your Position: ({myPosition.x}, {myPosition.y}) 
          (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
          <span id="clear_button" onClick={() => {
          setMyAvatar({name: '', id: 0});
          }}>Clear Avatar</span>
          (Available Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id === 0 && <div className="avatar-picker">NO AVATAR: 
        {pokemonList.map(function(item){
        var baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
        return (<img 
          onClick={()=> {
            console.log(item);
            setMyAvatar({name: item.name, id: item.id});
          }} 
          title={item.name} 
          src={baseUrl + '/' + item.id + '.gif'} />)
          
      })}</div>}
      <div id="main">
        <Sidebar 
          socket={socket}
          name={name}
          myAvatar={myAvatar}
          myPosition={myPosition}/>
        <Board 
        grid={grid} 
        width="90%" 
        myAvatar={myAvatar}
        myPosition={myPosition}
        avatars={avatars}
        updatePosition={updatePosition} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
