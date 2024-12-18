export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
      '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
      '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
      '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
      '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
      '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃'];
      
  React.useEffect(() => {
      socket.on('chat', (msg) => {
          setMessages(old => [...old, msg]);
      });
  }, []);

  function sendEmoji(em) {
      console.log(em);
      socket.emit('chat', {name: name, em: em, avatarId: myAvatar.id})
  }

  return <div id="sidebar">
      {emoji.map(em => <span 
          onClick={() => {
              sendEmoji(em);
          }}
          className="emoji">
          {em}
      </span>)}
      <hr />
      {messages.map(obj => <div>{obj.name}
        <image
              src ={'https://raw.githubusercontent.com/PokeAPI/sprites/mast'
                +obj.avatarId+' .gif'}
                />
                : {obj.em || obj.msg}
                </div>)}
              
  </div>;
}
