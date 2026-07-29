import "./Stories.css";
import { useState } from "react";

const stories = [
  {
    id: 1,
    name: "Your Story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },
  {
    id: 2,
    name: "Pranav",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Rohith",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Santosh",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState(null);
  return (
    <>
      <div className="stories">
        {stories.map((story) => (
          <div
            className="story"
            key={story.id}
            onClick={() => setSelectedStory(story)}
          >
            <div className={`storyAvatar ${story.own ? "own" : ""}`}>
              <img src={story.image} alt="" />
              {story.own && <span className="plus">+</span>}
            </div>

            <p>{story.name}</p>
          </div>
        ))}
      </div>

      {selectedStory && (
        <div
          className="storyViewer"
          onClick={() => setSelectedStory(null)}
        >
          <img src={selectedStory.image} alt="" />
          <h2>{selectedStory.name}</h2>
        </div>
      )}
    </>
  );
}