const user = {
    name: "Hedy Lamarr",
    img: 'https://i.imgur.com/yXOvdOSs.jpg',
    size: 90
};

function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar"
                src={user.img}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.size,
                    height: user.size
                }}
            />
        </>
    );
}

