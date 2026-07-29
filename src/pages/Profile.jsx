import { useState, useEffect } from "react";
import { FaMedal, FaPen, FaTrophy } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { profile } = useAuth();
  const [editing, setEditing] = useState(false);

  const [draft, setDraft] = useState("");
  const [draftBio, setDraftBio] = useState("");

  useEffect(() => {
    if (profile) {
      setDraft(profile.name || profile.username || "");
      setDraftBio(profile.bio || "");
    }
  }, [profile]);

  const uploadPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
      localStorage.setItem("profilePhoto", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = (e) => {
    e.preventDefault();

    const newBio = draftBio.trim() || "Keep snapping 📸";


    setEditing(false);
  };

  return (
    <main className="profilePage">
      <header>
        <p>YOUR SNAPSPACE</p>
        <h1>Profile</h1>
      </header>

      <section className="profileLayout">
        <div>
          <section className="profileHero">
            <label className="profileAvatar">
              {profile?.profileImage ? (
                <img src={profile.profileImage} alt="Profile" />
              ) : (
                <span>
                  {(profile?.name || profile?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={uploadPhoto}
              />
            </label>

            <div className="profileInfo">
              <h2>{profile?.name || profile?.username}</h2>

              <p>{profile?.bio || "Keep snapping 📸"}</p>

              <small>
                @{profile?.username} • {profile?.email}
              </small>
            </div>

            <button onClick={() => setEditing(true)}>
              <FaPen />
              Edit Profile
            </button>
          </section>

          <section className="profileStats">
            {[
              ["24,560", "Snap Score"],
              ["12", "Day Streak"],
              ["48", "Friends"],
            ].map(([value, label]) => (
              <div key={label}>
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </section>

          <section className="profileSection">
            <h2>Team Activity</h2>

            {[
              "Tanmay Guruvugari shared a story",
              "Reached a 12 day streak with Rohith",
              "Pranav saved a Spotlight moment",
              "Santhosh joined a group chat",
            ].map((item, index) => (
              <div className="activityLine" key={item}>
                <b>{item}</b>
                <small>
                  {index + 1} day{index ? "s" : ""} ago
                </small>
              </div>
            ))}
          </section>
        </div>

        <aside className="profileSection">
          <h2>Achievements</h2>

          <div className="achievement">
            <FaTrophy />

            <span>
              <b>Snap Starter</b>
              <small>Shared 10 moments</small>
            </span>
          </div>

          <div className="achievement">
            <FaMedal />

            <span>
              <b>Streak Keeper</b>
              <small>12 days in a row</small>
            </span>
          </div>
        </aside>
      </section>

      {editing && (
        <div className="editOverlay">
          <form onSubmit={saveProfile}>
            <h2>Edit Profile</h2>

            <label>
              Display Name

              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </label>

            <label>
              Bio

              <textarea
                value={draftBio}
                onChange={(e) => setDraftBio(e.target.value)}
                placeholder="Tell everyone about yourself..."
              />
            </label>

            <div className="editButtons">
              <button
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default Profile;