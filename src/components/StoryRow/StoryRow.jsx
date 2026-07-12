import "./StoryRow.css";

import myStory from "../../assets/images/santosh-snap.jpeg";
import tanmayImg from "../../assets/images/tanmay-snap.jpeg";
import rohithImg from "../../assets/images/rohith-snap.jpeg";
import pranavImg from "../../assets/images/pranav-snap.jpeg";
const stories = [
  { name: "My Story", image: myStory },
  { name: "Tanmay", image: tanmayImg },
  { name: "Rohith", image: rohithImg },
  { name: "Pranav", image: pranavImg },
];

function StoryRow() {
  return (
    <section className="storyRow">
      <div className="storyHeader">
        <h2>Stories</h2>
        <span>View All</span>
      </div>

      <div className="storyList">
        {stories.map((story, index) => (
          <div className="story" key={index}>
            <div className="storyImage">
              <img src={story.image} alt={story.name} />
            </div>
            <p>{story.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoryRow;