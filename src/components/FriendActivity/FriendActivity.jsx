import "./FriendActivity.css";

const friends = [
  {
    name: "Rohith",
    activity: "Added to Story",
    time: "1h",
    image: "https://i.pravatar.cc/100?img=12",
    color: "#22c55e"
  },
  {
    name: "Pranav",
    activity: "Added to Story",
    time: "2h",
    image: "https://i.pravatar.cc/100?img=5",
    color: "#a855f7"
  },
  {
    name: "Santhosh",
    activity: "Opened",
    time: "3h",
    image: "https://i.pravatar.cc/100?img=18",
    color: "#ef4444"
  },
  {
    name: "Tanmay",
    activity: "Added to Story",
    time: "5h",
    image: "https://i.pravatar.cc/100?img=32",
    color: "#eab308"
  }
];

function FriendActivity() {
  return (
    <div className="friendActivity">

      <h2>Friend Activity</h2>

      {friends.map((friend, index) => (

        <div className="friendRow" key={index}>

          <img src={friend.image} alt="" />

          <div className="friendInfo">

            <h4>{friend.name}</h4>

            <p>
              <span
                style={{ color: friend.color }}
              >
                ●
              </span>

              {friend.activity}

              {" • "}

              {friend.time}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}

export default FriendActivity;
