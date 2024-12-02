import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
  const defaultName = window.localStorage.getItem('My_name'); 
  const [name, setName] = React.useState(defaultName ? defaultName : 'anon');
  const [grid, setGrid] = React.useState([]); 

  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
  // Be careful with syntax error
  React.useEffect(function() {
    const rows = 10;
    const cols = 10;
    const new_grid = Array.from({ length: rows }, () => new Array(cols).fill([])); 
    setGrid(new_grid); 
  }, []);
  
  
  return (
    <div id="app_root">
      <nav>
        Our Grid Game, this class is an easy A 
        <input type="text" onInput={(e) => {
          console.log(e)
          setName(e.target.value)
          window.localStorage.setItem('my_name', e.target.value); 
        }} value={name} />
      </nav>
      <div id="main">
        <Sidebar />
        <Board grid={grid} width="70%" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
