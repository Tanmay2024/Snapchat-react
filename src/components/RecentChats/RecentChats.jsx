import "./RecentChats.css";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { listenFriends } from "../../services/friendService";
import { listenConversations } from "../../services/chatService";

import tanmayImg from "../../assets/images/tanmay.jpeg";
import rohithImg from "../../assets/images/rohith.jpeg";
import santoshImg from "../../assets/images/santosh.jpeg";
import pranavImg from "../../assets/images/pranav.jpeg";

const fallbackChats = [
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
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!currentUser) return undefined;
    const stopFriends = listenFriends(currentUser.uid, setFriends);
    const stopConversations = listenConversations(currentUser.uid, setConversations);
    return () => { stopFriends(); stopConversations(); };
  }, [currentUser]);

  const chats = useMemo(() => {
    if (!currentUser || friends.length === 0) return fallbackChats;
    return friends.map((friend) => {
      const chatId = [currentUser.uid, friend.uid].sort().join("_");
      const conversation = conversations.find((item) => item.id === chatId);
      return {
        name: friend.name || friend.username,
        uid: friend.uid,
        image:
          friend.profileImage ||
          fallbackChats.find(
            (item) =>
              item.name.toLowerCase() ===
              (friend.name || friend.username).toLowerCase()
          )?.image,
        color: friend.online ? "#52ff7a" : "#bfbfbf",
        status: conversation?.lastMessage || (friend.online ? "Online" : "No messages yet"),
      };
    });
  }, [currentUser, friends, conversations]);

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
