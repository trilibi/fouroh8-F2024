import Board from "./board";
import Sidebar from "./sidebar";

const Poke = new window.Pokedex.Pokedex();

const socket = io('http://54.234.88.206:3405');

function sendUpdate(data) {
    if (data.name == 'anon') {
        console.log('Please set name');
    }
    console.log({data});
    socket.emit('avatar', data);
}

const App = () => {
    const localName = window.localStorage.getItem('UserName');
    const [name, setName] = React.useState(localName ? localName : 'test');
    const [grid, setGrid] = React.useState([]);
    const [myPosition, setMyPosition] = React.useState({x: 0, y: 0});
    const [myAvatar, setMyAvatar] = React.useState({name: '', id: 0});
    const [pokemonList, setPokemonList] = React.useState([]);
    const [avatars, setAvatars] = React.useState({});

    // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/


    // things in useEffect only happens once!
    React.useEffect(function(){
        const rows = 10;
        const cols = 10;
        const gridTemp = Array.from({ length: rows }, () => new Array(cols).fill([]));
        setGrid(gridTemp);

        socket.on('avatar', function(data) {
            setAvatars(function(previous) {
                previous[data.name] = data;
                return previous; /*Object.assign({}, previous);*/
            });

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

    React.useEffect(() => {
        sendUpdate({
            name: name,
            avatar: myAvatar,
            x: myPosition.x,
            y: myPosition.y
        })
    }, [myPosition]); // runs when myPosition changes

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
                        return (<img
                            onClick={() => {
                                console.log(item);
                                setMyAvatar({name: item.name, id: item.id});
                            }}
                            title={item.name}
                            alt={item.name + " "}
                            src={baseUrl + item.id + '.gif'}
                            id={'avatarSelectorIcon'} />);
                        })}
                </div>}
            <div id="main">
                <Sidebar
                    socket={socket}
                    name={name}
                    myAvatar={myAvatar}
                    myPosition={myPosition} />
                <Board
                    grid={grid}
                    width="90%"
                    updatePosition={updatePosition}
                    avatars={avatars}
                    myAvatar={myAvatar}
                    myPosition={myPosition} />
            </div>
    </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
