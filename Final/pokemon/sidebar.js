export default function Sidebar({
  pokemonList,
  setAvatarFunction,
  myAvatar,
  socket,
  name,
  setName,
  setMyPosition,
}) {
  const [messages, setMessages] = React.useState([]);
  const [userInput, setUserInput] = React.useState(""); // Input for text messages

  const emoji = [
    "😂", "❤️", "🤣", "👍", "😭", "🙏", "😘", "🥰", "😍", "😊",
    "🎉", "😁", "💕", "🥺", "😅", "🔥", "☺️", "🤦", "♥️", "🤷",
    "🙄", "😆", "🤗", "😉", "🎂", "🤔", "👏", "🙂", "😳", "🥳",
    "😎", "👌", "💜", "😔", "💪", "✨", "💖", "👀", "😋", "😏",
    "😢", "👉", "💗", "😩", "💯", "🌹", "💞", "🎈", "💙", "😃",
  ];

  React.useEffect(() => {
    socket.on("chat", (msg) => {
      setMessages((old) => [...old, msg]);
    });

    return () => {
      socket.off("chat");
    };
  }, [socket]);

  function sendMessage(content) {
    if (!name) {
      alert("Please set a name before sending messages.");
      return;
    }
    if (!content.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    const message = { name, content, avatarId: myAvatar };
    setMessages((old) => [...old, message]);
    socket.emit("chat", message);
  }

  return (
    <div id="sidebar">
      <div id="playerInfo">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            window.localStorage.setItem("name", e.target.value);
          }}
          placeholder="Please Enter a Name"
          title="Name Input"
        />
        <button
          onClick={() => {
            setAvatarFunction({ name: "", id: 0 });
            setMyPosition({ x: 0, y: 0 });
          }}
        >
          Clear Avatar
        </button>
      </div>
      <hr />

      {myAvatar === 0 ? (
        <div className="avatar-picker">
          {pokemonList.map((item) => {
            const baseUrl =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
            return (
              <img
                key={item.id}
                title={item.name}
                src={`${baseUrl}${item.id}.gif`}
                alt={item.name}
                onClick={() => {
                  setAvatarFunction({ name: item.name, id: item.id });
                }}
              />
            );
          })}
        </div>
      ) : (
        <div id="userInfo">
          <h1>Welcome {name}!!</h1>
          <h2>Current Avatar: </h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${myAvatar}.gif`}
            alt="Current Avatar"
          />
        </div>
      )}

      <div id="chat">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            {msg.name && <strong>{msg.name}: </strong>}
            {msg.content && msg.content.startsWith("http") ? (
              <img
                src={msg.content}
                alt={`${msg.name}'s Avatar`}
                style={{ maxWidth: "20px" }}
              />
            ) : (
              msg.content
            )}
          </div>
        ))}
      </div>

      <div id="chatOptions">
        {emoji.map((em, index) => (
          <span
            key={index}
            onClick={() => sendMessage(em)} // Send emoji
            className="emoji"
          >
            {em}
          </span>
        ))}
      </div>

      <div id="typing-chat">
        <input
          type="text"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)} // Update text input state
        />
        <button
          onClick={() => {
            sendMessage(userInput); // Send text message
            setUserInput(""); // Clear input field
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
