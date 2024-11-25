import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  // ?? null coalescing
  const defaultName = window.localStorage.getItem("name");
  const [name, setName] = React.useState(defaultName ? defaultName : "anon");
  const [grid, setGrid] = React.useState([]);

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  React.useEffect(() => {
    const rows = 10;
    const cols = 10;
    setGrid(Array.from({ length: rows }, () => new Array(cols).fill([])));
  }, []);

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
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
