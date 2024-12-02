import Board from "./board";
import Sidebar from "./sidebar";

const Poke = new window.Pokedex.Pokedex()

const App = () => {
    const localName = window.localStorage.getItem('UserName');
    const [name, setName] = React.useState(localName ? localName : 'test');
    const [grid, setGrid] = React.useState([]);
    const [myPosition, setMyPosition] = React.useState({x: 0, y: 0});
    const [myAvatar, setMyAvatar] = React.useState({name: '', id: 0});
    const [pokemonList, setPokemonList] = React.useState([]);

    // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/

    React.useEffect(function(){
        const rows = 10;
        const cols = 10;
        const gridTemp = Array.from({ length: rows }, () => new Array(cols).fill([]));
        setGrid(gridTemp);

        Poke.getPokemonsList()
            .then(function(response) {
                console.log(response)
                setPokemonList(response.results)
            })
    }, []);


    function updatePosition(x, y) {
        console.log('CORE :: ', x, y)
        setMyPosition({x: x, y: y})
        console.log('GREEEE ', Poke.getPokemonsList())
    }


    return (<div id="app_root">
        <nav>
            Þe Game
                <label>
                    <span style={{paddingRight: "10px"}}>Name :</span>
                    <input type="text" onInput={(e) => {
                        setName(e.target.value)
                        window.localStorage.setItem("UserName", e.target.value);
                    }} value={name} placeholder={"enter a name!"} />
                    ({myPosition.x}, {myPosition.y})
                    (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
                    (Available Pokémon: {pokemonList.length})
                </label>
        </nav>
            {myAvatar.id == 0 && <div className='avatar-picker'>No Avatar: {pokemonList.map(function(item) {
                return <div onClick={() => {
                    console.log(item);
                }}>{item.name}</div>
            })}</div>} {/*move this into a separate module*/}
        <div id="main">
            <Sidebar/>
            <Board grid={grid} width="90%" updatePosition={updatePosition} />
        </div>
    </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
