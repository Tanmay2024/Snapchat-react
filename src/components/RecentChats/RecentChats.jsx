import "./RecentChats.css";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import tanmayImg from "../../assets/images/tanmay.jpeg";
import rohithImg from "../../assets/images/rohith.jpeg";
import santoshImg from "../../assets/images/santosh.jpeg";
import pranavImg from "../../assets/images/pranav.jpeg";

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
    image: pranavImg
  },
  {
    name: "Santhosh",
    status: "Seen • 1h",
    color: "#bfbfbf",
    image: santoshImg
  }
];

function RecentChats() {
  const navigate = useNavigate();

  return (
    <div className="recentChats">

      <div className="chatHeader">
        <h2>Recent Chats</h2>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/chats")}
        >
          View All
        </span>
      </div>

      {chats.map((chat, index) => (
        <div
          className="chatRow"
          key={index}
          onClick={() => navigate("/chats")}
          style={{ cursor: "pointer" }}
        >
          <div className="chatLeft">
            <img src={chat.image} alt={chat.name} />

            <div>
              <h4>{chat.name}</h4>
              <p style={{ color: chat.color }}>
                {chat.status}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/camera");
            }}
          >
            <FaCamera />
          </button>
        </div>
      ))}

    </div>
  );
}

export default RecentChats;