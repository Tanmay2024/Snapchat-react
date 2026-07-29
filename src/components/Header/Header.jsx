import "./Header.css";
import {
  BsSearch,
  BsBell,
  BsChatDots
} from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import tanmayImg from "../../assets/images/tanmay.jpeg";
import rohithImg from "../../assets/images/rohith.jpeg";
import pranavImg from "../../assets/images/pranav.jpeg";
import santoshImg from "../../assets/images/santosh.jpeg";

const profileImages = {
  tanmay: tanmayImg,
  rohith: rohithImg,
  pranav: pranavImg,
  santhosh: santoshImg,
  santosh: santoshImg,
};

function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { profile } = useAuth();
  const image =
    profileImages[(profile?.name || "").trim().toLowerCase()] ||
    tanmayImg;

  return (
    <header className="header">

      <div className="searchBox">
        <BsSearch className="searchIcon" />

        <input
          type="text"
          placeholder="Search friends, stories, spotlight..."
        />
      </div>

      <div className="headerRight">

        {/* Notification */}
        <div className="notification">

          <button
            className="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BsBell />
            <span>5</span>
          </button>

          {showNotifications && (
            <div className="notificationBox">
              <p>📸 Rohith added a Story</p>
              <p>💬 Pranav sent you a message</p>
              <p>🔥 Santhosh is online</p>
            </div>
          )}

        </div>

        {/* Chats */}
        <button
          className="icon"
          onClick={() => navigate("/chats")}
        >
          <BsChatDots />
        </button>

        {/* Profile */}
        <div className="profile">

          <img
            src={image}
            alt={profile?.name || profile?.username}
          />

          <div>
            <h4>{profile?.name || profile?.username || "Loading..."}</h4>
            <p>{profile?.status || "Online"}</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;