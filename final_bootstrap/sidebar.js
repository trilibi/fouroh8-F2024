export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState(0);
  const emoji = [
    '😂', '❤️', '🤣', '👍', '😭', '🙏', '😘', '🥰', '😍', '😊',
    '🎉', '😁', '💕', '🥺', '😅', '🔥', '☺️', '🤦', '♥️', '🤷',
    '🙄', '😆', '🤗', '😉', '🎂', '🤔', '👏', '🙂', '😳', '🥳',
    '😎', '👌', '💜', '😔', '💪', '✨', '💖', '👀', '😋', '😏',
    '😢', '👉', '💗', '😩', '💯', '🌹', '💞', '🎈', '💙', '😃',
  ];

  const videoOptions = [
    { id: 1, title: "Minecraft Parkour", iframe: (<iframe src="https://www.youtube.com/embed/_-2ZUciZgls?si=M2YKLRppgypECOSz&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />) },
    { id: 2, title: "Subway Surfers", iframe: (<iframe src="https://www.youtube.com/embed/7ghSziUQnhs?si=Ye4iY94SfXZ-L3kw&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />) },
    { id: 3, title: "Family Guy Funny Moments", iframe: (<iframe width="560" height="315" src="https://www.youtube.com/embed/sZN5yJqDaYI?si=8lO9BX-kGaNG4UKj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />) },
  ];

  React.useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages((old) => [...old, msg]);
    });
  }, [socket])
  function sendEmoji(em) {
    console.log(em);
    socket.emit("chat", { name: name, em: em, avatarId: myAvatar.id });
  }

  return (
    <div id="sidebar">
      {emoji.map(em => <span
        onClick={() => {
          sendEmoji(em);
        }}
        className="emoji">
        {em}
      </span>)}
      <hr />
      {messages.map(obj => <div>
        {obj.name}
        <img
          src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
            + myAvatar.id + '.gif'}/>
        : {obj.em}</div>
      )}
      <div id="videoContainer">
        <h3>Select a brainrot video to hold your attention</h3>
        <select
          id="brainrotSelector"
          onChange={(e) => setSelectedVideo(parseInt(e.target.value))}
          value={selectedVideo}>
          <option value="0">Minecraft Parkour</option>
          <option value="1">Subway Surfers</option>
          <option value="2">Family Guy Funny Moments</option>
        </select>
        {videoOptions[selectedVideo] ? videoOptions[selectedVideo].iframe : null}
      </div>
    </div>
  );
}