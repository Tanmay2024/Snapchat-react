import { useState } from "react";
import "./SignupForm.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username,
                email,
                createdAt: serverTimestamp(),
                status: "online",
            });

            alert("Account created successfully!");

            navigate("/dashboard");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">

            <form className="signup-card" onSubmit={handleSignup}>

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Sign Up
                </button>

            </form>

        </div>
    );
}

export default SignupForm;