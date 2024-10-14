import { useState, useEffect } from "react";

function FetchPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon/lilligant";

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('N/A');
    const [abilities, setAbilities] = useState([]);
    const [image, setImage] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [isShiny, setIsShiny] = useState(false);

    useEffect(() => {
    fetch(url).then((result) => 
        {
            console.log(result);
            result.json()
            .then((data) => {
                setName(data.name);
                setAbilities(data.abilities);
                setImage(data.sprites.front_default)
                setShiny(data.sprites.front_shiny)
                console.log(name);
                console.log(abilities[0].ability.name);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
        })
    }, []);

    if(loading) {
        return (<div>Loading ....</div>);
    } else {
        return (
            <>
            <img alt="{name}" src={isShiny ? shiny : image} onClick={() => {setIsShiny(!isShiny)}} />
        <div>Pokemon Name: {name}
        {abilities.map((item) => {
            return (<>
            <div>{item.ability.name}</div>
            </>
            )
        })}
        </div></>) ;
    }
}

export default FetchPokemon;