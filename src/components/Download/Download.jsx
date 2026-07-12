import "./Download.css";

import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";

function Download() {
  return (
    <section className="download" id="download">

      <h2>Download Snapchat</h2>

      <p>
        Chat, capture, and share your moments with friends anywhere in the world.
      </p>

      <div className="download-buttons">
        <img src={googlePlay} alt="Google Play" />
        <img src={appStore} alt="App Store" />
      </div>

    </section>
  );
}

export default Download;