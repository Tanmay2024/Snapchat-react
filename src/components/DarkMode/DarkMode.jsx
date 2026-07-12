import "./DarkMode.css";
import { useState } from "react";

function DarkMode() {

    const [dark, setDark] = useState(true);

    return (

        <div className="darkMode">

            <div>

                <h3>🌙 Dark Mode</h3>

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