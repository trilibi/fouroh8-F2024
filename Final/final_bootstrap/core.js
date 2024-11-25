import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const defaultName = (window.localStorage.getItem('myName'));
  const [name, setName] = React.useState(defaultName ? defaultName : 'anonymoose');
  const [grid, setgrid] = React.useState([]);

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

  React.useEffect(function() {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([]));
    setgrid(new_grid);
  }, [])
  

  return (
    <div id="app_root">
      <nav>
        Our Grid Game Is An Easi A
        <input type="text" onInput={(e) => {
            setName(e.target.value);
            window.localStorage.setItem('myName', e.target.value);
          }} value={name}/>
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="90%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
