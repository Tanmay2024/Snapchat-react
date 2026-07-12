import "./Header.css";
import {
  BsSearch,
  BsBell,
  BsChatDots
} from "react-icons/bs";

function Header() {
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

        <div className="icon">
          <BsBell />
          <span>5</span>
        </div>

        <div className="icon">
          <BsChatDots />
        </div>

        <div className="profile">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt=""
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
