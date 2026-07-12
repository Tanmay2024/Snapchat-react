import "./Sidebar.css";
import { FaCamera, FaComments, FaHome, FaPlayCircle, FaPowerOff, FaUser, FaCog } from "react-icons/fa";
import logo from "../../assets/images/snapchat-logo.png";
import { Link, useNavigate } from "react-router-dom";
import DemoAvatar from "../DemoAvatar";

const menu = [["/dashboard", "Home", FaHome], ["/chats", "Chats", FaComments], ["/stories", "Stories", FaPlayCircle], ["/spotlight", "Spotlight", FaPlayCircle], ["/camera", "Camera", FaCamera], ["/profile", "Profile", FaUser], ["/settings", "Settings", FaCog]];

function Sidebar() { const navigate = useNavigate(); return <aside className="sidebar"><div className="logo"><img src={logo} alt="Snapchat" /><h2>Snapchat</h2></div><ul className="menu">{menu.map(([to,label,Icon]) => <Link to={to} className="menu-link" key={to}><li><Icon /><span>{label}</span></li></Link>)}</ul><div className="camera-card"><div className="ghost">👻</div><h3>Snap more, worry less.</h3><p>Capture life’s moments and share them with your team.</p><button onClick={() => navigate("/camera")}><FaCamera /> Open Camera</button></div><button className="profile sidebarProfile" onClick={() => navigate("/profile")}><DemoAvatar name="Admin" size={42}/><div><h4>Admin</h4><p>View Profile</p></div></button><button className="logoutButton" onClick={() => navigate("/login")}><FaPowerOff /> Log Out</button></aside>; }
export default Sidebar;
