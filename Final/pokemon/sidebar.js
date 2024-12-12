export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃',
  ];

  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages((old) => [...old, msg]);
    });

    // Cleanup to avoid memory leaks
    return () => {
      socket.off('chat');
    };
  }, [socket]);

  function sendEmoji(em) {
    console.log(em);
    socket.emit('chat', { name: name, em: em, avatarId: myAvatar.id });
  }

  return (
    <div id="sidebar">
      {/* Emoji Picker */}
      {emoji.map((em, index) => (
        <span
          key={index}
          onClick={() => {
            sendEmoji(em);
          }}
          className="emoji"
        >
          {em}
        </span>
      ))}
      <hr />
      {/* Messages */}
      {messages.map((obj, idx) => (
        <div key={idx}>
          {obj.name}
          <img
            src={
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
              obj.avatarId +
              '.gif'
            }
            alt="Avatar"
          />
          : {obj.em}
        </div>
      ))}
    </div>
  );
}
