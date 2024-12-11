export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃'];
  let baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"


  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages(old => [...old, msg]);
    });
  }, []);

  function sendEmoji(em) {
    console.log(em);
    socket.emit('chat', {name, em, avatarId: myAvatar.id})
  }

  return <div id="sidebar">
    {emoji.map(em => <span
      onClick={() => {
        sendEmoji(em);
      }}
      className={"emoji"}>
      {em}
    </span>)}
    <hr />
    {messages.map(obj => <div>
      {obj.name}
      <img src={baseUrl + obj.avatarId + '.gif'} />
      : {obj.em}
    </div>)}
  </div>;
}
