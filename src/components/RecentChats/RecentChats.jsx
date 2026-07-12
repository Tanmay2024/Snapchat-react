import "./RecentChats.css";
import { FaCamera } from "react-icons/fa";

import tanmayImg from "../../assets/images/tanmay.jpeg";
import rohithImg from "../../assets/images/rohith.jpeg";
import santoshImg from "../../assets/images/santosh.jpeg";
import santhoshSnapImg from "../../assets/images/pranav.jpeg";

const chats = [
  {
    name: "Tanmay",
    status: "Typing...",
    color: "#52ff7a",
    image: tanmayImg
  },
  {
    name: "Rohith",
    status: "New Snap • 2m",
    color: "#ff4d8d",
    image: rohithImg
  },
  {
    name: "Pranav",
    status: "Delivered • 10m",
    color: "#33b5ff",
    image: santhoshSnapImg
  },
  {
    name: "Santhosh",
    status: "Seen • 1h",
    color: "#bfbfbf",
    image: santoshImg
  }
];

function RecentChats() {
  return (
    <div className="recentChats">
      <div className="chatHeader">
        <h2>Recent Chats</h2>
        <span>View All</span>
      </div>

      {chats.map((chat, index) => (
        <div className="chatRow" key={index}>
          <div className="chatLeft">
            <img src={chat.image} alt={chat.name} />

            <div>
              <h4>{chat.name}</h4>
              <p style={{ color: chat.color }}>
                {chat.status}
              </p>
            </div>
          </div>

          <button>
            <FaCamera />
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecentChats;