export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
      '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
      '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
      '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
      '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
      '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃', 
      '                ', 'Hi', ' Good Game!', ' GG', ' Bye', ' Let\'s Play '];
       
      
  React.useEffect(() => {
      socket.on('chat', (msg) => {
          setMessages(old => [...old, msg]);
      });
  }, []);

  function sendEmoji(em) {
      console.log(em);

      setMessages(old => [...old, {name, em, avatarId: myAvatar.id}]);
      socket.emit('chat', {name: name, em: em, avatarId: myAvatar.id})
  }

  return <div id="sidebar">
      {emoji.map(em => <span onClick={() => {
        const data = {
          msg: em,
          name: name,
          avatar: myAvatar,
          x: myPosition.x,
          y: myPosition.y
        };
        socket.emit('chat', data);
        socket.emit('avatar', data);
        sendEmoji(em);
          }}
          className="emoji">
          {em}
      </span>)}
      <hr />
      {messages.reverse().map(obj => <div>{obj.name}
        <img
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' 
        +obj.avatarId+'.gif'}
        /> 
        : {obj.em} 
        </div>)}
  </div>;
}
