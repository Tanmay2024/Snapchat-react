import "./Dashboard.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Welcome from "../components/Welcome/Welcome";
import StoryRow from "../components/StoryRow/StoryRow";
import FeatureCards from "../components/FeatureCards/FeatureCards";
import RecentChats from "../components/RecentChats/RecentChats";
import SpotlightTrending from "../components/SpotlightTrending/SpotlightTrending";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import QuickActions from "../components/QuickActions/QuickActions";
import FriendActivity from "../components/FriendActivity/FriendActivity";
import DarkMode from "../components/DarkMode/DarkMode";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* LEFT */}
      <aside className="left-panel">
        <Sidebar />
      </aside>

      {/* CENTER */}
      <main className="center-panel">

        <Header />

        <Welcome />

        <StoryRow />

        <FeatureCards/>

        <section className="bottom-section">

          <RecentChats />

          <SpotlightTrending />

        </section>

      </main>

      {/* RIGHT */}

      <aside className="right-panel">

        <ProfileCard />

        <QuickActions />

        <FriendActivity />

        <DarkMode />

      </aside>

    </div>
  );
}

export default Dashboard;