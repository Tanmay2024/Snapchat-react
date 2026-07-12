import "./Features.css";
import {
  FaComments,
  FaCamera,
  FaBookOpen,
  FaPlayCircle,
} from "react-icons/fa";

const features = [
  {
    icon: <FaComments />,
    title: "Chat",
    desc: "Stay connected with friends through instant messaging.",
  },
  {
    icon: <FaCamera />,
    title: "Camera",
    desc: "Capture life's best moments with the Snapchat Camera.",
  },
  {
    icon: <FaBookOpen />,
    title: "Stories",
    desc: "Share your daily moments with your friends.",
  },
  {
    icon: <FaPlayCircle />,
    title: "Spotlight",
    desc: "Watch trending videos from creators worldwide.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <h2>Everything you need.</h2>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;