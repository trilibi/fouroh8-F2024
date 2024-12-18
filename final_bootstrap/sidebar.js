export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
      '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
      '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
      '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
      '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
      '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃', '🍆'];

  const [custom_chat, setCustom_chat] = React.useState("");  
      
  React.useEffect(() => {
      socket.on('chat', (msg) => {
          setMessages(old => [...old, msg]);
      });
  }, []);

  function sendEmoji(em) {
      console.log(em);
      setMessages(old => [...old, {name, em}]);
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
      <div className="chat_input">
        <input value={custom_chat} className="message_input" type="text" onInput={(e) => {
            setCustom_chat(e.target.value);
        }}/>
        <button onClick={ () => {
            sendEmoji(custom_chat);
            setCustom_chat("");
        }}>Send!</button>
      </div>
      <hr />
      {messages.reverse().map(obj => <div>
          {obj.name}
          <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
              +obj.avatarId+'.gif'}/>
          : {obj.em}</div>)}
  </div>;
}
