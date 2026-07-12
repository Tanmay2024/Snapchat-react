import "./QuickActions.css";
import {
  FaUserPlus,
  FaBook,
  FaImages,
  FaMapMarkerAlt,
  FaChevronRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <FaUserPlus />,
      title: "Add Friends",
      action: () => navigate("/chats"),
    },
    {
      icon: <FaBook />,
      title: "My Story",
      action: () => navigate("/stories"),
    },
    {
      icon: <FaImages />,
      title: "Memories",
      action: () => alert("📸 Memories feature coming soon!"),
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Snap Map",
      action: () => alert("🗺️ Snap Map feature coming soon!"),
    },
  ];

  return (
    <div className="quickActions">
      <h2>Quick Actions</h2>

      {actions.map((action) => (
        <button
          className="actionRow"
          key={action.title}
          onClick={action.action}
        >
          <span className="actionLeft">
            <span className="actionIcon">{action.icon}</span>
            <p>{action.title}</p>
          </span>

          <FaChevronRight className="arrow" />
        </button>
      ))}
    </div>
  );
}

export default QuickActions;