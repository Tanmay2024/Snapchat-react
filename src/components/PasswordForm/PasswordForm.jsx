import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordForm.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/snapchat-logo.png";

function PasswordForm() {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        if(password.length < 6){
            alert("Password must contain at least 6 characters.");
            return;
        }

        navigate("/dashboard");
    };

    return (

        <div className="password-container">

            <form className="password-card" onSubmit={handleLogin}>

                <img
                    src={logo}
                    alt="Snapchat"
                    className="password-logo"
                />

                <h2>Welcome Back</h2>

                <div className="password-input">

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <span
                        className="eye-icon"
                        onClick={()=>setShowPassword(!showPassword)}
                    >

                        {showPassword ? <FaEyeSlash/> : <FaEye/>}

                    </span>

                </div>

                <button>

                    Log In

                </button>

                <a href="#" className="forgot-password">

                    Forgot Password?

                </a>

            </form>

        </div>

    );

}

export default PasswordForm;
