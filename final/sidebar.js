export default function Sidebar({ socket, name, myAvatar, myPosition, coinNum }) {
  const [messages, setMessages] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [timer, setTimer] = React.useState(0); // Timer state (stored in milliseconds)
  const [isRunning, setIsRunning] = React.useState(false); // Timer running state

  React.useEffect(() => {
    // Start the timer when `coinNum` increases (stop when it reaches 10)
    if (coinNum > 0 && coinNum < 10) {
      setIsRunning(true); // Start the timer
    } else if (coinNum >= 10) {
      setIsRunning(false); // Stop the timer
    }
  }, [coinNum]);

  React.useEffect(() => {
    let interval;
    if (isRunning) { // 10 seconds = 10000 milliseconds
      const startTime = Date.now(); // Store the timer start time
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime; // Calculate elapsed time
        setTimer((prevTimer) => Math.min(prevTimer + elapsed)); //
      }, 10); // Update every 10ms
    } 

    return () => clearInterval(interval); // Clear the timer
  }, [isRunning, timer]);

  // Convert milliseconds to `00:00:00.000` format
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  function sendEmoji(em) {
    const message = { name, em, avatarId: myAvatar.id };
    setMessages((old) => [message, ...old]);
    socket.emit("chat", message);
  }

  return (
    <div id="sidebar">
      <div id="leaderboard">
        <h3>Coins and Timer</h3>
        <table>
          <thead>
            <tr>
              <th>{coinNum}</th>
            </tr>
            <tr>
              <th>{formatTime(timer)}</th> {/* Display formatted timer value */}
            </tr>
          </thead>
        </table>
      </div>

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