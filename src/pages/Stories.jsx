import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Stories.css";

const stories = [
    {
        name: "Tanmay",
        text: "Project almost completed! 🚀",
        color: "#ff006e",
    },
    {
        name: "Rohith",
        text: "Late afternoon drives and the best playlist.",
        color: "#9b5de5",
    },
    {
        name: "Pranav",
        text: "One more task crossed off the list.",
        color: "#00bbf9",
    },
    {
        name: "Santhosh",
        text: "Golden hour was worth the wait.",
        color: "#f77f00",
    },
];

function Stories() {
    const navigate = useNavigate();
    const myStory = localStorage.getItem("myStory");
    const [showMyStory, setShowMyStory] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const handleMyStory = () => {
        if (myStory) {
            setShowOptions(true);
        } else {
            navigate("/camera");
        }
    };

    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (active === stories.length - 1) {
                navigate("/dashboard");
            } else {
                setActive((prev) => prev + 1);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [active, navigate]);

    const story = stories[active];

    const move = (step) => {
        setActive((prev) => {
            const next = prev + step;

            if (next < 0) return 0;
            if (next >= stories.length) return stories.length - 1;

            return next;
        });
    };

    return (
        <main className="storiesPage">
            <header>
                <div>
                    <p>FRIENDS' MOMENTS</p>
                    <h1>Stories</h1>
                </div>

                <button
                    className="storyCard mine"
                    onClick={handleMyStory}
                >
                    <FaPlus /> Add to My Story
                </button>
            </header>

            <section
                className="storyViewer"
                style={{ "--story-color": story.color }}
            >

                <div className="storyProgress">
                    {stories.map((_, index) => (
                        <i
                            key={index}
                            className={
                                index < active
                                    ? "done"
                                    : index === active
                                        ? "active"
                                        : ""
                            }
                        />
                    ))}
                </div>

                <div className="storyAuthor">
                    <span style={{ background: story.color }}>
                        {story.name[0]}
                    </span>

                    <div>
                        <b>{story.name}</b>
                        <small>2 hours ago</small>
                    </div>
                </div>

                <div className="storyText">
                    <h2>{story.text}</h2>
                    <p>Tap either side to move through today's stories.</p>
                </div>

                <button
                    className="storyPrev"
                    onClick={() => move(-1)}
                    aria-label="Previous Story"
                >
                    <FaChevronLeft />
                </button>

                <button
                    className="storyNext"
                    onClick={() => move(1)}
                    aria-label="Next Story"
                >
                    <FaChevronRight />
                </button>
            </section>

            <section className="storyCards">
                <button
                    className="storyCard mine"
                    onClick={() => {
                        if (myStory) {
                            setShowMyStory(true);
                        } else {
                            navigate("/camera");
                        }
                    }}
                >
                    {myStory ? (
                        <img
                            src={myStory}
                            alt="My Story"
                            className="myStoryImage"
                        />
                    ) : (
                        <span>
                            <FaPlus />
                        </span>
                    )}

                    <b>My Story</b>
                    <small>
                        {myStory ? "Tap to update" : "Add a moment"}
                    </small>
                </button>

                {stories.map((item, index) => (
                    <button
                        className="storyCard"
                        key={item.name}
                        onClick={() => setActive(index)}
                    >
                        <span style={{ background: item.color }}>
                            {item.name[0]}
                        </span>

                        <b>{item.name}</b>

                        <small>
                            {index === active
                                ? "Viewing now"
                                : "Updated today"}
                        </small>
                    </button>
                ))}
            </section>

            {showMyStory && (
                <div className="storyModal">
                    <div className="storyViewer myStoryViewer">
                        <button
                            className="closeStory"
                            onClick={() => setShowMyStory(false)}
                        >
                            ✕
                        </button>

                        <img
                            src={myStory}
                            alt="My Story"
                            className="storyImage"
                        />
                    </div>
                </div>
            )}

            {showOptions && (
                <div className="storyModal">
                    <div className="storyMenu">
                        <h3>My Story</h3>

                        <button
                            onClick={() => {
                                setShowOptions(false);
                                setShowMyStory(true);
                            }}
                        >
                            👁 View Story
                        </button>

                        <button
                            onClick={() => {
                                setShowOptions(false);
                                navigate("/camera");
                            }}
                        >
                            📷 Add Another Story
                        </button>

                        <button
                            onClick={() => {
                                localStorage.removeItem("myStory");
                                setShowOptions(false);
                                window.location.reload();
                            }}
                        >
                            🗑 Delete Story
                        </button>

                        <button
                            onClick={() => setShowOptions(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </main>
    );
}

export default Stories;