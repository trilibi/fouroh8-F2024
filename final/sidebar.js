export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃', '🖕'];

  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages(old => [msg, ...old]);
    });
  }, []);

  function sendEmoji(em){
    //console.log(em);
    setMessages(old => [{name, em}, ...old]);
    socket.emit('chat', {name: name, em: em})
  }

  return <div id="sidebar">
      {emoji.map(em =>
        <span onClick={() => {
          sendEmoji(em);
          }}
          className='emoji'>
          {em}
          </span>)}
      <hr />
        {messages.map(obj => <div>
            {obj.name}:
            <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + obj.avatarId + '.gif'}
            />:{obj.em}
          </div>)}
      </div>
}
