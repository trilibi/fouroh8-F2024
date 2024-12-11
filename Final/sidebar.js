export default function Sidebar({ socket, name, myAvatar, myPosition }) {
    const [message, setMessage] = React.useState([])
    const emoji = [
        "😂",
        "❤️",
        "🤣",
        "👍",
        "😭",
        "🙏",
        "😘",
        "🥰",
        "😍",
        "😊",
        "🎉",
        "😁",
        "💕",
        "🥺",
        "😅",
        "🔥",
        "☺️",
        "🤦",
        "♥️",
        "🤷",
        "🙄",
        "😆",
        "🤗",
        "😉",
        "🎂",
        "🤔",
        "👏",
        "🙂",
        "😳",
        "🥳",
        "😎",
        "👌",
        "💜",
        "😔",
        "💪",
        "✨",
        "💖",
        "👀",
        "😋",
        "😏",
        "😢",
        "👉",
        "💗",
        "😩",
        "💯",
        "🌹",
        "💞",
        "🎈",
        "💙",
        "😃",
    ]

    React.useEffect(() => {
        socket.on("chat", (msg) => {
            console.log(msg)
            // place recent msg on the top
            setMessage((old) => [msg, ...old])
        })
    }, [])

    const sendEmoji = (em) => {
        // console.log(em)
        socket.emit("chat", { name: name, em: em, avatarId: myAvatar.id })
    }

    return (
        <div id="sidebar">
            {emoji.map((em) => (
                <span
                    onClick={() => {
                        sendEmoji(em)
                    }}
                    className="emoji"
                >
                    {em}
                </span>
            ))}
            <hr />
            {message.map((obj) => (
                <div>
                    {obj.name}
                    {obj.avatarId != 0 && (
                        <img
                            src={
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
                                obj.avatarId +
                                ".gif"
                            }
                            width="24px"
                        />
                    )}
                    : {obj.em}
                </div>
            ))}
        </div>
    )
}
