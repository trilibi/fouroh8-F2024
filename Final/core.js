import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();
const socket = io("http://54.234.88.206:3405");

function sendUpdate(data) {
  if (data.name === "anon") {
    alert("Please set a name");
    return;
  }
  socket.emit("avatar", data);
}

const App = () => {
  const defaultName = window.localStorage.getItem("name");
  const [name, setName] = React.useState(defaultName ? defaultName : "anon");
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({ x: 0, y: 0 });
  const [myAvatar, setMyAvatar] = React.useState({ name: "", id: 0 });
  const [avatars, setAvatars] = React.useState({});

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    setGrid(Array.from({ length: rows }, () => new Array(cols).fill([])));

    socket.on("avatar", function (data) {
      console.log(data);
      setAvatars((prevState) => {
        prevState[data.name] = data;
        return Object.assign({}, prevState);
      });
    });

    Pokedex.getPokemonsList().then(function (response) {
      let list = response.results;
      list = list.map((item) => {
        item.id = item.url.slice(34, -1);
        return item;
      });
      setPokemonList(response.results);
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

  const updatePosition = (x, y) => {
    setMyPosition({ x: x, y: y });
  };

  return (
    <div id="app_root">
      <nav>
        <input
          type="text"
          onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem("name", e.target.value);
          }}
          placeholder="Please Enter a Name"
          title="Name Input"
        />
        ({myPosition.x}, {myPosition.y}) (Avatar Name: {myAvatar.name}, Id:,
        {myAvatar.id}) (Available Pokemon: {pokemonList.length});
        <button
          onClick={() => {
            setMyAvatar({ name: "", id: 0 });
            setMyPosition({ x: 0, y: 0 });
          }}
        >
          Clear Avatar
        </button>
      </nav>

      <div id="main">
        <Sidebar pokemonList={pokemonList} setAvatarFunction={setMyAvatar} myAvatar={myAvatar.id}/>
        <Board
          grid={grid}
          width="90%"
          updatePosition={updatePosition}
          myAvatar={myAvatar}
          myPosition={myPosition}
          avatars={avatars}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
