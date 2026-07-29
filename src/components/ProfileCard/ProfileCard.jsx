import "./ProfileCard.css";
import { useAuth } from "../../context/AuthContext";

function ProfileCard() {

  const { profile } = useAuth();

  return (
    <div className="profileCard">

      <img
        src={profile?.profileImage || "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg"}
        alt="snapcode"
      />

      <h2>{profile?.name || profile?.username || "Loading..."}</h2>

      <p>{profile?.email || ""}</p>

      <div className="score">

        <h1>24,560</h1>

        <span>🏆 Snap Score</span>

      </div>

    </div>
  );
}

export default ProfileCard;
