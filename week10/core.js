import Board from "./board";
import Sidebar from "./sidebar";

const Pokedex = new window.Pokedex.Pokedex();

const App = () => {
  const defaultName = window.localStorage.getItem("name");
  const [name, setName] = React.useState(defaultName ? defaultName : "anon");
  const [grid, setGrid] = React.useState([]);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [myPosition, setMyPosition] = React.useState({ x: 0, y: 0 });
  const [myAvatar, setMyAvatar] = React.useState({ name: "", id: 0 });

  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    setGrid(Array.from({ length: rows }, () => new Array(cols).fill([])));

    // Fetch Pokémon list with sprites
    Pokedex.getPokemonsList({ limit: 25 }).then(function (response) {
      const avatars = response.results.map((pokemon) => {
        const id = pokemon.url.match(/\/(\d+)\//)[1]; // Extract ID from URL
        return {
          name: pokemon.name,
          id: parseInt(id),
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
        };
      });
      setPokemonList(avatars);
    });
  }, []);

  const updatePosition = (x, y) => {
    setMyPosition({ x, y });
  };

  const selectAvatar = (avatar) => {
    setMyAvatar(avatar);
    console.log("Selected Avatar:", avatar);
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
        ({myPosition.x}, {myPosition.y}) (Avatar Name: {myAvatar.name}, Id:
        {myAvatar.id}) (Available Pokemon: {pokemonList.length});
      </nav>
      {myAvatar.id === 0 && (
        <div className="avatar-picker">
          <h3>No Avatar Selected</h3>
          {pokemonList.map((item) => (
            <div
              key={item.id}
              className="avatar-card"
              onClick={() => selectAvatar(item)}
              style={{ display: "inline-block", margin: "10px", textAlign: "center", cursor: "pointer" }}
            >
              <img
                src={item.sprite}
                alt={item.name}
                style={{ width: "50px", height: "50px" }}
              />
              <p>{item.name}</p>
            </div>
          ))}
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
