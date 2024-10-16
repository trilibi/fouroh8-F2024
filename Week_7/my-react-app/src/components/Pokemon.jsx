import { useState, useEffect } from "react";

function FetchPokemon() {
  const [userInput, setInput] = useState("lilligant");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("N/A");
  const [abilities, setAbilities] = useState([]);
  const [image, setImage] = useState(null);
  const [shiny, setShiny] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const url = "https://pokeapi.co/api/v2/pokemon/" + userInput;

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
  useEffect(() => {
    fetch(url).then((result) => {
      console.log(result);
      result
        .json()
        .then((data) => {
          setName(data.name);
          setAbilities(data.abilities);
          setImage(data.sprites.front_default);
          setShiny(data.sprites.front_shiny);
          console.log(name);
          console.log(abilities[0].ability.name);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return (
      <>
        <input id="pokemonName" placeholder="Enter a pokemon name: "></input>
        <div>Loading ....</div>
      </>
    );
  } else {
    return (
      <>
        <input id="pokemonName" placeholder="Enter a pokemon name: "></input>
        <img
          alt="{name}"
          src={isShiny ? shiny : image}
          onClick={() => {
            setIsShiny(!isShiny);
          }}
        />
        <div>
          Pokemon Name: {name}
          {abilities.map((item) => {
            return (
              <>
                <div>{item.ability.name}</div>
              </>
            );
          })}
          <ShinyArray />
        </div>
      </>
    );
  }
}

export default FetchPokemon;
