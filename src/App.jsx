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
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password" element={<Password />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/camera"
        element={
          <ProtectedRoute>
            <Camera />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chats"
        element={
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stories"
        element={
          <ProtectedRoute>
            <Stories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/spotlight"
        element={
          <ProtectedRoute>
            <Spotlight />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;