import "./Topbar.css";
import { FaSearch, FaBell, FaComments } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="topbar">

      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search friends, stories, spotlight..."
        />
      </div>

      <div className="topbar-right">

        <div className="notification">
          <button
            className="icon"
            onClick={() => {
              alert("Bell clicked");
              setShowNotifications(!showNotifications);
            }}
          >
            <FaBell />
            <span className="badge">5</span>
          </button>

          {showNotifications && (
            <div className="notificationBox">
              <p>📸 Rohith added a new Story</p>
              <p>💬 Pranav sent you a message</p>
              <p>🔥 Your Snap Streak is active!</p>
            </div>
          )}
        </div>

        <div className="icon">
          <button
            className="iconBtn"
            onClick={() => navigate("/chats")}
          >
            <FaComments />
          </button>
        </div>

        <div className="user-info">
          <img
            src="https://i.pravatar.cc/50"
            alt="profile"
          />

          <div>
            <h4>Tanmay</h4>
            <p>Online</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;