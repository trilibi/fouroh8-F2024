export default function Sidebar({socket, name, myAvatar, myPosition}) {
  const [messages, setMesseages] = React.useState([]);
    const emoji = [
      '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
      '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
      '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
      '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
      '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃'];
  
      React.useEffect(() => {
        socket.on('chat', (msg) => {
          setMesseages(old => [...old, msg]);
        });
      }, []);

      function sendEmoji(em) {
        console.log(em);
      } 

  return <div id="sidebar">
    {emoji.map(em => <span onClick={() => {
      sendEmoji(em);
    }}
    className="emoji">
      {em}
    </span>)}
  </div>;
}
