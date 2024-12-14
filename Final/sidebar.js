export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '💀', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃'];

  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages(old => [...old, msg]);
    });
  }, []);

  function sendEmoji(em) {
    setMessages(old => [...old, {name, em, avatarId: myAvatar.id}]);
    console.log(messages)
    socket.emit('chat', {name: name, em: em, avatarId: myAvatar.id});
  }

  return <div id="sidebar">
    {emoji.map(em => <span
      onClick={() => {
        sendEmoji(em);
      }}
      className="emoji">{em}</span>)}
    <hr />
    {messages.reverse().map(obj => <div className="chat">{obj.name} 
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+obj.avatarId+".gif"}/>
      : {obj.em}</div>)}
  </div>;
}

