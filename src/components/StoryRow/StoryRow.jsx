import "./StoryRow.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";

import defaultStory from "../../assets/images/santosh-snap.jpeg";

function StoryRow() {
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "stories"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStories(list);
    });

    return () => unsubscribe();
  }, []);

  const handleStoryClick = (story) => {
    if (story.mine) {
      navigate("/stories");
    } else {
      navigate("/stories");
    }
  };

  return (
    <section className="storyRow">
      <div className="storyHeader">
        <h2>Stories</h2>

        <span onClick={() => navigate("/stories")}>
          View All
        </span>
      </div>

      <div className="storyList">

        <div
          className="story"
          onClick={() => navigate("/camera")}
        >
          <div className="storyImage">
            <img src={defaultStory} alt="My Story" />
          </div>

          <p>My Story</p>
        </div>

        {stories.map((story) => (
          <div
            className="story"
            key={story.id}
            onClick={() => handleStoryClick(story)}
          >
            <div className="storyImage">
              <img src={story.imageUrl} alt={story.username} />
            </div>

            <p>{story.username}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoryRow;