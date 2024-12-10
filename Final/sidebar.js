export default function Sidebar({pokemonList, setAvatarFunction, myAvatar}) {
  return <div id="sidebar">
    {myAvatar === 0 && (
    <div className="avatar-picker">
      {pokemonList.map(function (item) {
        var baseUrl =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
        return (
            <img
                title={item.name}
                src={baseUrl + item.id + ".gif"}
                onClick={() => {
                  setAvatarFunction({name: item.name, id: item.id});
                }}
            ></img>
        );
      })}
    </div>
        )}
  </div>;
}
