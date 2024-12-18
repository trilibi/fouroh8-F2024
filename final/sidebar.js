export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMessages] = React.useState([]);
  const emoji = [
      '🌟', '🥺', '🤣', '🤖', '🍕', '🎨', '💀', '👑', '💥', '😎',
      '🍀', '🍩', '🎃', '💥', '🎯', '🦄', '👻', '🎸', '🍔', '🎅',
      '💎', '🍎', '🔥', '🎮', '🦊', '🌵', '🥑', '🎁', '💝', '💀',
      '🕺', '👩‍🍳', '🌍', '🪐', '🧸', '🤯', '🍓', '🎀', '🐶', '🧙‍♂️',
      '👌', '🚑', '🍍', '🎲', '🚀', '🍦', '🌻', '🛸', '😁', '🧳'
  ];
  
      
  React.useEffect(() => {
      socket.on('chat', (msg) => {
          setMessages(old => [...old, msg]);
      });
  }, []);

  function sendEmoji(em) {
      console.log(em);
      setMessages(old => [...old, {name, em}]);
      socket.emit('chat', {name: name, em: em, avatarID: myAvatar.id});
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
      {messages.reverse().map(obj => <div>
          {obj.name}
          {(() => {
              if (obj.avatarID !== undefined && obj.avatarID !== 0) {
                  return (
                      <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${obj.avatarID}.gif`}
                          alt={`Avatar ${obj.avatarID}`}
                      />
                  );
              } else {
                  return (
                      <span role="img" aria-label="smile">😁</span>
                  );
              }
          })()}
          : {obj.em}
      </div>)}
  </div>;
}