import "./Topbar.css";
import { FaSearch, FaBell, FaComments } from "react-icons/fa";

function Topbar() {
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

        <div className="icon notification">
          <FaBell />
          <span>5</span>
        </div>

        <div className="icon">
          <FaComments />
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