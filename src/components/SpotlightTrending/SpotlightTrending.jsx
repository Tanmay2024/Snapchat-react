import "./SpotlightTrending.css";
import { FaBookmark, FaEllipsisV, FaPlay } from "react-icons/fa";

const videos = [
  {
    title: "Best of Summer",
    views: "2.5M",
    image: "https://picsum.photos/120/70?random=21"
  },
  {
    title: "Dance Challenge",
    views: "1.8M",
    image: "https://picsum.photos/120/70?random=22"
  },
  {
    title: "Amazing Views",
    views: "1.2M",
    image: "https://picsum.photos/120/70?random=23"
  }
];

function SpotlightTrending() {
  return (
    <div className="spotlightTrending">

      <div className="spotlightHeader">
        <h2>Spotlight Trending</h2>
        <span>View All</span>
      </div>

      {videos.map((video, index) => (

        <div className="videoRow" key={index}>

          <img src={video.image} alt="" />

          <div className="videoInfo">

            <h4>{video.title}</h4>

            <p>
              <FaPlay />
              {video.views}
            </p>

          </div>

          <div className="videoIcons">
            <FaBookmark />
            <FaEllipsisV />
          </div>

        </div>

      ))}

    </div>
  );
}

export default SpotlightTrending;