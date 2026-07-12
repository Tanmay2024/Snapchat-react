import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Password from "./pages/Password";
import Dashboard from "./pages/Dashboard";
import Camera from "./pages/Camera";
import Chats from "./pages/Chats";
import Stories from "./pages/Stories";
import Spotlight from "./pages/Spotlight";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password" element={<Password />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/spotlight" element={<Spotlight />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;