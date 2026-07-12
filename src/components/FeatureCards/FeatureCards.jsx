import "./FeatureCards.css";
import { FaCamera, FaComments, FaBookOpen, FaPlay, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const cards=[{icon:<FaCamera/>,title:"Camera",desc:"Capture and share your moments",color:"yellow",to:"/camera"},{icon:<FaComments/>,title:"Chats",desc:"Connect with your team",color:"purple",to:"/chats"},{icon:<FaBookOpen/>,title:"Stories",desc:"See team updates",color:"orange",to:"/stories"},{icon:<FaPlay/>,title:"Spotlight",desc:"Watch the best Snaps",color:"pink",to:"/spotlight"}];
function FeatureCards(){const navigate=useNavigate();return <section className="featureCards">{cards.map((card)=><div className={`card ${card.color}`} key={card.title}><div className="cardIcon">{card.icon}</div><h2>{card.title}</h2><p>{card.desc}</p><button onClick={()=>navigate(card.to)} aria-label={`Open ${card.title}`}><FaArrowRight/></button></div>)}</section>};export default FeatureCards;
