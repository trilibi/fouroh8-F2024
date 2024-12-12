export default function Sidebar({
  pokemonList,
  setAvatarFunction,
  myAvatar,
  socket,
  name,
}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    "😂",
    "❤️",
    "🤣",
    "👍",
    "😭",
    "🙏",
    "😘",
    "🥰",
    "😍",
    "😊",
    "🎉",
    "😁",
    "💕",
    "🥺",
    "😅",
    "🔥",
    "☺️",
    "🤦",
    "♥️",
    "🤷",
    "🙄",
    "😆",
    "🤗",
    "😉",
    "🎂",
    "🤔",
    "👏",
    "🙂",
    "😳",
    "🥳",
    "😎",
    "👌",
    "💜",
    "😔",
    "💪",
    "✨",
    "💖",
    "👀",
    "😋",
    "😏",
    "😢",
    "👉",
    "💗",
    "😩",
    "💯",
    "🌹",
    "💞",
    "🎈",
    "💙",
    "😃",
  ];

  React.useEffect(() => {
    socket.on("chat", (msg) => {
      setMessages((old) => [...old, msg]);
    });
  }, []);

  function sendEmoji(em) {
    console.log(em);
    setMessages((old) => [...old, { name, em, avatarId: myAvatar }]);
    socket.emit("chat", { name: name, em: em, avatarId: myAvatar });
  }

  return (
    <div id="sidebar">
      {emoji.map((em) => (
        <span
          onClick={() => {
            sendEmoji(em);
          }}
          className="emoji"
        >
          {em}
        </span>
      ))}
      <hr />

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
                  setAvatarFunction({ name: item.name, id: item.id });
                }}
              ></img>
            );
          })}
        </div>
      )}
      <div id="chat">
        {messages.map((obj) => (
          <div className="message">
            {obj.name}
            <img
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
                obj.avatarId +
                ".gif"
              }
            ></img>
            {obj.em}
          </div>
        ))}
      </div>
    </div>
  );
}
