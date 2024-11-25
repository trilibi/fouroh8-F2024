import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const defaultName = window.localStorage.getItem('my_name');
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]);

  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);
  }, []);
  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  return (
    <div id="app_root">
      <nav>
        <h1>{name}</h1>
        <input type="text" onInput={(e) => {
          setName(e.target.value);
          window.localStorage.setItem('my_name', e.target.value);
        }} value={name}/>
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="50%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
