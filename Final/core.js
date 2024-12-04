import Board from "./board"
import Sidebar from "./sidebar"

const Pokedex = new window.Pokedex.Pokedex()

const App = () => {
    const [name, setName] = React.useState(
        window.localStorage.getItem("my_name") || "anon"
    )
    const [grid, setGrid] = React.useState([])
    const [pokemonList, setPokemonList] = React.useState([])
    const [myPosition, setMyPosition] = React.useState({
        x: 0,
        y: 0,
    })
    const [myAvatar, setMyAvatar] = React.useState({
        name: "",
        id: 0,
    })
    // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

    React.useEffect(() => {
        const rows = 10
        const cols = 10
        const g = Array.from({ length: rows }, () => new Array(cols).fill([]))
        setGrid(g)
        Pokedex.getPokemonsList().then(function (response) {
            let list = response.results
            list = list.map((item) => {
                console.log("https://pokeapi.co/api.v2.pokemon/".length)
                item.id = item.url.slice(34, -1)
                return item
            })
            setPokemonList(list)
        })
    }, [])

    function updatePosition(x, y) {
        console.log("CORE :: ", x, y)
        setMyPosition({ x: x, y: y })
    }

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
                ({myPosition.x}, {myPosition.y}) (Avatar Name: {myAvatar.name},
                id# {myAvatar.id})
                <span
                    onClick={() => {
                        setMyAvatar({
                            name: undefined,
                            id: 0,
                        })
                    }}
                >
                    Clear Avatar
                </span>
                (Available pokemon: {pokemonList.length})
            </nav>
            {myAvatar.id === 0 && (
                <div className="avatar-picker">
                    No Avatar:{" "}
                    {pokemonList.map(function (item) {
                        var baseURL =
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
                        return (
                            <img
                                onClick={() => {
                                    setMyAvatar({
                                        name: item.name,
                                        id: item.id,
                                    })
                                }}
                                title={item.name}
                                src={baseURL + item.id + ".gif"}
                            />
                        )
                    })}
                </div>
            )}
            <div id="main">
                <Sidebar />
                <Board
                    grid={grid}
                    width="60%"
                    myAvatar={myAvatar}
                    myPosition={myPosition}
                    updatePosition={updatePosition}
                />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
