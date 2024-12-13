export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃', 
    '🏆','🕺','💃','🦸‍♂️','🦸‍♀️','🦄','🖖','🤘','👉','👈','🖕','👊'];

  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages(old => [msg, ...old]);
    });
  }, []);

  function sendEmoji(em){
    //console.log(em);
    const message = { name, em, avatarId: myAvatar.id };
    setMessages((old) => [message, ...old]);
    socket.emit('chat', message); 
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
          <strong>{obj.name}</strong>:
          {obj.avatarId && (
            <img className="avatar-chat"
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
                obj.avatarId +
                '.gif'
              }
              />
              )}
            :<span className="message-emoji">{obj.em}</span>
          </div>)}
      </div>
}
