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
      </nav>
      {myAvatar.id == 0 && (
        <div className="avatar-picker">
          No Avatar:{" "}
          {pokemonList.map(function (item) {
            return (
              <div
                onClick={() => {
                  console.log(item);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" updatePosition={updatePosition} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
