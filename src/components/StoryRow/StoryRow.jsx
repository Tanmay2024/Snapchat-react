import "./StoryRow.css";

const stories = [
 {name:"My Story"},
 {name:"Tanmay"},
 {name:"Rohith"},
 {name:"Pranav"},
 {name:"Santhosh"}
]

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