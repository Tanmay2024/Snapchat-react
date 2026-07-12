import "./Welcome.css";
import { FaFire } from "react-icons/fa";

function Welcome() {
  return (
    <section className="welcome">

      <div className="welcome-left">

        <h1>
         Welcome Back, Admin! 👋
        </h1>

        <p>
          Let's capture some amazing moments today.
        </p>

      </div>

      <div className="streak-card">

        <FaFire className="fire"/>

        <div>

          <h2>12</h2>

          <h4>Snap Streak</h4>

          <p>Keep it going!</p>

        </div>

      </div>

    </section>
  );
}

export default Welcome;