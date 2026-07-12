import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

import logo from "../../assets/images/snapchat-logo.png";

function LoginForm() {

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!/^\S+@\S+\.\S+$/.test(username)){
            setError("Please enter a valid email address.");
            return;
        }

        navigate("/password");

    };

    return (

        <div className="login-container">

            <form className="login-card" onSubmit={handleSubmit}>

                <img
                    src={logo}
                    alt="Snapchat"
                    className="login-logo"
                />

                <h2>Welcome Back</h2>

                <input
                    type="text"
                    placeholder="admin@snapchat.com"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value);setError("")}}
                />

                {error && <p className="form-error">{error}</p>}

                <button>

                    Continue

                </button>

            </form>

        </div>

    );

}

export default LoginForm;
