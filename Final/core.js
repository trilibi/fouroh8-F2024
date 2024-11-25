import Board from "./board"
import Sidebar from "./sidebar"

const App = () => {
    const [name, setName] = React.useState(
        window.localStorage.getItem("my_name") || "anon"
    )
    const [grid, setGrid] = React.useState([])

    // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

    React.useEffect(() => {
        const rows = 10
        const cols = 10
        const g = Array.from({ length: rows }, () => new Array(cols).fill([]))
        setGrid(g)
    }, [])

    return (
        <div id="app_root">
            <nav>
                Our Grid Game, this class is an easy A
                <input
                    type="text"
                    onInput={(e) => {
                        setName(e.target.value)
                        window.localStorage.setItem("my_name", e.target.value)
                    }}
                    value={name}
                />
            </nav>
            <div id="main">
                <Sidebar />
                <Board grid={grid} width="60%" />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
