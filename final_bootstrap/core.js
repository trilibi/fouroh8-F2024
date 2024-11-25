import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const [name, setName] = React.useState("anon");

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  const rows = 10;
  const cols = 10;
  const grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
  console.log(grid);

  return (
    <div id="app_root">
      <nav>
        <h1>{name}</h1>
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));