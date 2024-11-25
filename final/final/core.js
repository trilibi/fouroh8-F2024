import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const defaultName = window.localStorage.getItem('my_name, anon')
  console.log(defaultName);
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);
}, []);

  return (
    <div id="app_root">
      <nav>
        COD Zombies
        <h1>{name}</h1>
        <input type="text" onInput={(e) => setName(e.target.value)}
        value={name}/>
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="70%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
