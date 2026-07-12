import "./RecentChats.css";
import { FaCamera } from "react-icons/fa";

const chats = [
  {
    name: "Tanmay",
    status: "Typing...",
    color: "#52ff7a",
    image: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Rohith",
    status: "New Snap • 2m",
    color: "#ff4d8d",
    image: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Pranav",
    status: "Delivered • 10m",
    color: "#33b5ff",
    image: "https://i.pravatar.cc/100?img=18"
  },
  {
    name: "Santhosh",
    status: "Seen • 1h",
    color: "#bfbfbf",
    image: "https://i.pravatar.cc/100?img=32"
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