import "./FriendActivity.css";

import rohithImg from "../../assets/images/rohith.jpeg";
import santoshImg from "../../assets/images/santosh.jpeg";
import tanmayImg from "../../assets/images/tanmay.jpeg";
import santhoshSnapImg from "../../assets/images/santosh-snap.jpeg";

const friends = [
  {
    name: "Rohith",
    activity: "Added to Story",
    time: "1h",
    image: rohithImg,
    color: "#22c55e"
  },
  {
    name: "Pranav",
    activity: "Added to Story",
    time: "2h",
    image: santhoshSnapImg,
    color: "#a855f7"
  },
  {
    name: "Santhosh",
    activity: "Opened",
    time: "3h",
    image: santoshImg,
    color: "#ef4444"
  },
  {
    name: "Tanmay",
    activity: "Added to Story",
    time: "5h",
    image: tanmayImg,
    color: "#eab308"
  }
];

function FriendActivity() {
  return (
    <div className="friendActivity">

      <h2>Friend Activity</h2>

      {friends.map((friend, index) => (

        <div className="friendRow" key={index}>

          <img src={friend.image} alt={friend.name} />

          <div className="friendInfo">

            <h4>{friend.name}</h4>

            <p>
              <span style={{ color: friend.color }}>
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