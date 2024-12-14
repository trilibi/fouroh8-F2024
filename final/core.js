import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();
const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
  if (data.name === 'anon') {
    console.log('Please set name');
    return;
  }
  console.log({ data });
  socket.emit('avatar', data);
}

const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [myAvatar, setMyAvatar] = React.useState({
    name: '',
    id: 0,
  });
  const [avatars, setAvatars] = React.useState({});

  React.useEffect(() => {
    const rows = 8;
    const cols = 8;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);

    socket.on('avatar', (data) => {
      setAvatars((previous) => {
        previous[data.name] = data;
        return Object.assign({}, previous);
      });
    });

    Pokedex.getPokemonsList()
      .then((response) => {
        console.log(response);
        let list = response.results;
        list = list.map((item) => {
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
      y: myPosition.y,
    });
  }, [myPosition]);

  function updatePosition(x, y) {
    console.log('CORE :: ', x, y);
    setMyPosition({ x, y });
  }

  return (
    <div id="app_root">
      <nav>
        Our Grid Game
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
        <span
          onClick={() => {
            setMyAvatar({ name: '', id: 0 });
          }}
        >
          Clear Avatar
        </span>
        (Available Pokemon: {pokemonList.length})
      </nav>
      {myAvatar.id === 0 && (
        <div className="avatar-picker">
          No Avatar:
          {pokemonList.map((item) => {
            const baseUrl =
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated';
            return (
              <img
                key={item.id}
                onClick={() => {
                  setMyAvatar({ name: item.name, id: item.id });
                }}
                title={item.name}
                src={`${baseUrl}/${item.id}.gif`}
              />
            );
          })}
        </div>
      )}

      <div id="main">
        <Sidebar
          socket={socket}
          name={name}
          myAvatar={myAvatar}
          myPosition={myPosition}
        />
        <Board
          grid={grid}
          width="70%"
          myAvatar={myAvatar}
          myPosition={myPosition}
          avatars={avatars}
          updatePosition={updatePosition}
          socket={socket} // Pass the socket instance
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
