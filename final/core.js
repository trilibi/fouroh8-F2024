import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex()
const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
  if (data.name == 'anon'){
    console.log('Please set name');
    return
  }
  console.log({data});
  socket.emit('avatar', data);
}



const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  //console.log(defaultName);
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
  
  const[avatars, setAvatars] = React.useState({});
  const [pokeballPosition, setPokeballPosition] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [highscore, setHighscore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [gameActive, setGameActive] = React.useState(true);

  let timer;

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  React.useEffect(() => {    
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);
    //console.log(grid);
  
    const randomX = Math.floor(Math.random() * cols);
    const randomY = Math.floor(Math.random() * rows);
    setPokeballPosition({ x: randomX, y: randomY });
    console.log("Pokeball Position:", { x: randomX, y: randomY });
    const timer = setTimeout(() => {
      setPokeballPosition(null);
    }, 30000);
  
    return () => clearTimeout(timer);
  }, []);

  
  React.useEffect(() => {
    socket.on('avatar', function(data) {
      //console.log(data)
      setAvatars(function(previous) {
        previous[data.name] = data;
        return Object.assign({}, previous);
      });
    });
  
    Pokedex.getPokemonsList()
      .then(function(response) {
        console.log(response);
        let list = response.results;
        list = list.map((item) => {
          console.log("https://pokeapi.co/api/v2/pokemon/".length)
          console.log(item.url.slice(34, -1))
          item.id = item.url.slice(34, -1);
          return item;
        });
        setPokemonList(list);
      });
  }, []);

  React.useEffect(() => {
    sendUpdate({
        name: name,
        avatar: myAvatar,
        x: myPosition.x,
        y: myPosition.y
    })
  }, [myPosition]);

  React.useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }

    if (timeLeft === 0) {
      setGameActive(false);
    }

  }, [gameActive, timeLeft]);

  function updatePosition(x, y){
    //console.log('CORE :: ', x, y);
    setMyPosition({x, y})
    if (pokeballPosition && x === pokeballPosition.x && y === pokeballPosition.y) {
      setScore(prevScore => prevScore + 1);
      const rows = 10;
      const cols = 10;
      const randomX = Math.floor(Math.random() * cols);
      const randomY = Math.floor(Math.random() * rows);
      setPokeballPosition({ x: randomX, y: randomY });
      if (score + 1 > highscore) setHighscore(score + 1);
    }
  }

  function restartGame() {
    const rows = 10;
    const cols = 10;
    clearTimeout(timer);
    setScore(0);
    setTimeLeft(30); 
    setGameActive(true); 
    setMyPosition({ x: 0, y: 0 }); 
    setPokeballPosition({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });

    timer = setTimeout(() => {
      setPokeballPosition(null);
    }, 30000);
  }

  return (
    <div id="app_root">
      <nav>
        Reverse Pokemon Game
        <input 
          type="text" 
          onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem('my_name', e.target.value);
          }} 
          value={name} 
        /> 
        ({myPosition.x}, {myPosition.y}) 
        (Avatar Name: {myAvatar.name} id# {myAvatar.id})

        (Available Pokemon: {pokemonList.length})

        {myAvatar.id && (
          <div className="button-container">
            <div className="clear-avatar-button" 
              onClick={() => {
                setMyAvatar({ name: '', id: 0 });
              }}
            >
              Clear Avatar
            </div>
          </div>
        )}
        <div>
          <button className="restart-button" onClick={restartGame}>Restart</button>
          Score: {score} --- Highscore: {highscore} --- Time Left: {timeLeft} s
        </div>
      </nav>

      {myAvatar.id == 0 && 
      <div className="avatar-picker">No Avatar: 
        {pokemonList.map(function(item){
          var baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated'
        return (<img 
        onClick={() => {console.log(item);
          setMyAvatar({name: item.name, id: item.id});
         }}
        title ={item.name}
        src={baseUrl + '/' + item.id + '.gif'}/>);
      })}
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
          updatePosition={updatePosition}
          pokeballPosition={pokeballPosition}
          />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
