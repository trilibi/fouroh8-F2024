import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();

const App = () => {
  // ?? null coalescing
  const defaultName = window.localStorage.getItem("name");
  const [name, setName] = React.useState(defaultName ? defaultName : "anon");
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({ x: 0, y: 0 });
  const [myAvatar, setMyAvatar] = React.useState({ name: "", id: 0 });

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    setGrid(Array.from({ length: rows }, () => new Array(cols).fill([])));

    Pokedex.getPokemonsList().then(function (response) {
      console.log(response);
      let list = response.results;
      list = list.map((item) => {
        item.id = item.url.slice(34, -1);
        return item;
      });
      setPokemonList(response.results);
    });
  }, []);

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
      {myAvatar.id == 0 && (
        <div className="avatar-picker">
          No Avatar:{" "}
          {pokemonList.map(function (item) {
            var baseUrl =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
            return (
              <img
                title={item.name}
                src={baseUrl + item.id + ".gif"}
                onClick={() => {
                  setMyAvatar({ name: item.name, id: item.id });
                }}
              ></img>
            );
          })}
        </div>
      )}
      <div id="main">
        <Sidebar />
        <Board
          grid={grid}
          width="90%"
          updatePosition={updatePosition}
          myAvatar={myAvatar}
          myPosition={myPosition}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
