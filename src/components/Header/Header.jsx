import "./Header.css";
import {
  BsSearch,
  BsBell,
  BsChatDots
} from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

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
            src="https://api.dicebear.com/9.x/personas/svg?seed=Admin"
            alt="Admin"
          />

          <div>
            <h4>Admin</h4>
            <p>Online</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;