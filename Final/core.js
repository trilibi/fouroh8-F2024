import Board from "./board";
import Sidebar from "./sidebar";

const App = () => {
    const localName = window.localStorage.getItem('UserName');
    const [name, setName] = React.useState(localName ? localName : 'test');
    const [grid, setGrid] = React.useState([]);

    // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

    React.useEffect(function(){
        const rows = 10;
        const cols = 10;
        const gridTemp = Array.from({ length: rows }, () => new Array(cols).fill([]));
        setGrid(gridTemp);
    }, []);

    return (<div id="app_root">
        <nav>
                <label>
                    <span style={{paddingRight: "10px"}}>Name :</span>
                    <input type="text" onInput={(e) => {
                        setName(e.target.value)
                        window.localStorage.setItem("UserName", e.target.value);
                    }} value={name} placeholder={"enter a name!"} />
                </label>
        </nav>
        <div id="main">
            <Sidebar/>
            <Board grid={grid} width="90%" />
        </div>
    </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
