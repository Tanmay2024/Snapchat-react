import "./ProfileCard.css";

function ProfileCard() {
  return (
    <div className="profileCard">

      <img
        src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg"
        alt="snapcode"
      />

      <h2>Admin</h2>

      <p>@admin</p>

      <div className="score">

        <h1>24,560</h1>

        <span>🏆 Snap Score</span>

      </div>

    </div>
  );
}

export default ProfileCard;
