import { useState, useEffect } from "react";

function FetchPokemon() {
  const defaultPokemon = "lilligant";
  const [userInput, setInput] = useState(defaultPokemon);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("N/A");
  const [abilities, setAbilities] = useState([]);
  const [image, setImage] = useState(null);
  const [shiny, setShiny] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const url = "https://pokeapi.co/api/v2/pokemon/" + userInput;

  useEffect(() => {
    getData();
  }, [userInput]);

  const getData = () => {
    fetch(url).then((result) => {
      result
        .json()
        .then((data) => {
          setName(data.name);
          setAbilities(data.abilities);
          setImage(data.sprites.front_default);
          setShiny(data.sprites.front_shiny);
        })
        .catch((e) => {})
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getInput = () => {
    var input = document.getElementById("pokemonName").value;
    if (input == "" || input == null) {
      input = defaultPokemon;
    }

    setInput(input);
    getData();
  };

  const ShinyArray = () => {
    const images = [];

    for (var i = 0; i < 10; i++) {
      var randomNum = Math.round(Math.random() * 1000);
      images.push(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${randomNum}.png`
      );
    }
    const mainImage = images.pop();

    return (
      <>
        <img
          src={mainImage}
          style={{ width: "200px", height: "200px", border: "5px solid" }}
        ></img>
        {images.map((url, index) => (
          <img
            src={url}
            title={index}
            style={{ width: index % 2 ? 32 : 64 }}
          ></img>
        ))}
      </>
    );
  };

  const PokemonTextBox = () => {
    return (
      <>
        <div className="center-align">
          <div className="row">
            <input
              className="validate"
              id="pokemonName"
              placeholder="Enter a Pokemon name: "
            ></input>
            <button onClick={() => getInput()}>Search</button>
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <>
        <PokemonTextBox />
        <div>Loading ....</div>
      </>
    );
  } else {
    return (
      <div className="card">
        <PokemonTextBox />
        <img
          alt="{name}"
          src={isShiny ? shiny : image}
          onClick={() => {
            setIsShiny(!isShiny);
          }}
        />
        <div>
          Pokemon Name: {name}
          {abilities.map((poke) => {
            return (
              <>
                <div>{poke.ability.name}</div>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FetchPokemon;
