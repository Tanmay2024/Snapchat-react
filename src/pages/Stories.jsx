import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Stories.css";
const stories = [
    {
        name: "Tanmay",
        text: "Project almost completed! 🚀",
        color: "#ff006e"
    },
    {
        name: "Rohith",
        text: "Late afternoon drives and the best playlist.",
        color: "#9b5de5"
    },
    {
        name: "Pranav",
        text: "One more task crossed off the list.",
        color: "#00bbf9"
    },
    {
        name: "Santhosh",
        text: "Golden hour was worth the wait.",
        color: "#f77f00"
    }
];
function Stories() { const [active, setActive] = useState(0); const navigate = useNavigate(); const story = stories[active]; const move = (step) => setActive((index) => (index + step + stories.length) % stories.length); return <main className="storiesPage"><header><div><p>FRIENDS' MOMENTS</p><h1>Stories</h1></div><button onClick={() => navigate("/camera")}><FaPlus /> Add to My Story</button></header><section className="storyViewer" style={{ "--story-color": story.color }}><div className="storyProgress">{stories.map((_, index) => <i className={index <= active ? "done" : ""} key={index} />)}</div><div className="storyAuthor"><span style={{ background: story.color }}>{story.name[0]}</span><div><b>{story.name}</b><small>2 hours ago</small></div></div><div className="storyText"><h2>{story.text}</h2><p>Tap either side to move through today’s stories.</p></div><button className="storyPrev" onClick={() => move(-1)} aria-label="Previous story"><FaChevronLeft /></button><button className="storyNext" onClick={() => move(1)} aria-label="Next story"><FaChevronRight /></button></section><section className="storyCards"><button className="storyCard mine" onClick={() => navigate("/camera")}><span><FaPlus /></span><b>My Story</b><small>Add a moment</small></button>{stories.map((item, index) => <button className="storyCard" onClick={() => setActive(index)} key={item.name}><span style={{ background: item.color }}>{item.name[0]}</span><b>{item.name}</b><small>{index === active ? "Viewing now" : "Updated today"}</small></button>)}</section></main> }; export default Stories;
