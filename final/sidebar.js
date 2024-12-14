export default function Sidebar({ socket, name, myAvatar, myPosition }) {
  const [messages, setMessages] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);

  React.useEffect(() => {
    // Listen for chat messages
    socket.on("chat", (msg) => {
      setMessages((old) => [msg, ...old]);
    });

    // Listen for leaderboard updates
    socket.on("leaderboardUpdate", (updatedLeaderboard) => {
      console.log("Leaderboard updated:", updatedLeaderboard); // Debugging line
      setLeaderboard(updatedLeaderboard);
    });
    

    return () => {
      // Cleanup listeners on unmount
      socket.off("chat");
      socket.off("leaderboardUpdate");
    };
  }, [socket]);

  function sendEmoji(em) {
    const message = { name, em, avatarId: myAvatar.id };
    setMessages((old) => [message, ...old]);
    socket.emit("chat", message);
  }

  return (
    <div id="sidebar">
      <div id="leaderboard">
        <h3>Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Coins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard
              .sort((a, b) => b.coins - a.coins)
              .map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.coins}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div id="chat">
        <h3>Chat</h3>
        <div id="emoji-bar">
          {["😊", "😂", "😍", "😒", "😭", "😡", "👍", "👎", "💪", "🙏", "🎉", "❤️", "🔥", "🌟", "⭐", "💔", "🤔", "🙄", "🎶", "🐱", "🐶", "🐻", "🐼", "🐤", "🌈"].map((em) => (
            <span
              key={em}
              onClick={() => {
                sendEmoji(em);
              }}
              style={{ cursor: "pointer", marginRight: "5px" }}
            >
              {em}
            </span>
          ))}
        </div>

        <div id="chat-messages">
          {messages.map((obj, index) => (
            <div key={index}>
              {obj.name}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${obj.avatarId}.gif`}
                alt={obj.name}
                style={{ width: "20px", marginLeft: "5px" }}
              />
              : {obj.em}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
