import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const [name, setName] = React.useState(window.localStorage.getItem('my_name') || 'anon');
  const [grid, setGrid] = React.useState([]);

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(function() {
    const rows = 8;
    const cols = 8;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setGrid(new_grid);
  }, []);
  

  return (
    <div id="app_root">
      <nav>
        <h1>{name}</h1>
        <input type="text" onInput={(e) => {
          console.log(e);
          setName(e.target.value); 
          window.localStorage.setItem('my_name', e.target.value);}}/>
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
