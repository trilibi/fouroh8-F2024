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


    // things in useEffect only happens once!
    React.useEffect(function(){
        const rows = 10;
        const cols = 10;
        const gridTemp = Array.from({ length: rows }, () => new Array(cols).fill([]));
        setGrid(gridTemp);

        Poke.getPokemonsList()
            .then(function(response) {
                console.log(response);
                let pokeList = response.results;
                pokeList = pokeList.map((item) => {
                    item.id = item.url.slice(34, -1);
                    return item;
                })


                setPokemonList(pokeList);
            })
    }, []);


    function updatePosition(x, y) {
        setMyPosition({x: x, y: y})
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

                    {/*TODO: this doesnt work!!!!!!! this borked something!*/}
                    (Avatar Name: {myAvatar.name}, id# {myAvatar.id})
                    <span onClick={() => {
                        setMyAvatar({name: '', id: 0});
                    }}>Clear Avatar</span>

                    (Available Pokémon: {pokemonList.length})
                </label>
        </nav>
            {myAvatar.id == 0 &&
                <div className='avatar-picker'>No Avatar:
                    {pokemonList.map(function(item) {
                        let baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
                        return <img
                            onClick={() => {
                                console.log(item);
                                setMyAvatar({name: item.name, id: item.id});
                            }}
                            title={item.name}
                            alt={item.name + " "}
                            src={baseUrl + item.id + '.gif'}
                            id={'avatarSelectorIcon'} />
                            })}
                </div>}
            <div id="main">
                <Sidebar/>
                <Board
                    grid={grid}
                    width="90%"
                    updatePosition={updatePosition}
                    myAvatar={myAvatar}
                    myPosition={myPosition} />
            </div>
    </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
