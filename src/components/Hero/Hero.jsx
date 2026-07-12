import "./Hero.css";
import phone from "../../assets/images/hero-phone.png";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-left">

                <span className="hero-tag">
                    👻 Welcome to Snapchat
                </span>

                <h1>
                    Less social media.
                    <br />
                    More Snapchat.
                </h1>

                <p>
                    Stay connected with friends, capture unforgettable moments, explore amazing Stories, and express yourself with the camera built for friendship.
                </p>

                <div className="hero-buttons">

                    <Link to="/login" className="btn-primary">
                        Log In
                    </Link>

                    <a href="#download" className="btn-secondary">
                        Download App
                    </a>

                </div>

            </div>

            <div className="hero-right">
                <img src={phone} alt="Snapchat" />
            </div>

        </section>
    );
}

export default Hero;