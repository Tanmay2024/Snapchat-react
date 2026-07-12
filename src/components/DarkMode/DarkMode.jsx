import "./DarkMode.css";
import { useState, useEffect } from "react";

function DarkMode() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="darkModeCard">
      <div>
        <h3>{dark ? "🌙 Dark Mode" : "☀️ Light Mode"}</h3>
        <p>Theme Settings</p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default DarkMode;