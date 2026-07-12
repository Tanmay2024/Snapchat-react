import "./Chats.css";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Chats() {
    const friends = [
        {
            name: "Tanmay",
            status: "Online",
            image: "https://api.dicebear.com/9.x/personas/svg?seed=Tanmay",
            messages: [
                { text: "Hey 👋", sender: "them" },
                { text: "Hi Tanmay!", sender: "me" },
                { text: "How's the project going?", sender: "them" },
                { text: "Almost finished 🚀", sender: "me" }
            ]
        },

        {
            name: "Rohith",
            status: "Online",
            image: "https://i.pravatar.cc/60?img=1",
            messages: [
                { text: "Hi 👋", sender: "them" },
                { text: "Hello Rohith!", sender: "me" },
                { text: "Ready for tomorrow?", sender: "them" },
                { text: "Yes 👍", sender: "me" },
            ],
        },

        {
            name: "Pranav",
            status: "Typing...",
            image: "https://i.pravatar.cc/60?img=2",
            messages: [
                { text: "Hey 😊", sender: "them" },
                { text: "Hi Pranav!", sender: "me" },
                { text: "Did you finish the React assignment?", sender: "them" },
                { text: "Almost done 😅", sender: "me" },
            ],
        },

        {
            name: "Santhosh",
            status: "2 min ago",
            image: "https://i.pravatar.cc/60?img=3",
            messages: [
                { text: "Bro!", sender: "them" },
                { text: "What's up?", sender: "me" },
                { text: "Cricket tomorrow at 5?", sender: "them" },
                { text: "Sure 🏏", sender: "me" },
            ],
        },
    ];

    const [selectedFriend, setSelectedFriend] = useState(friends[0]);
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState(friends);
    const [search, setSearch] = useState("");
    const filteredFriends = chatData.filter((friend) =>
        friend.name.toLowerCase().includes(search.toLowerCase())
    );
    const [callStatus, setCallStatus] = useState("");
    const navigate = useNavigate();

    return (
        <div className="chatsPage">

            {/* Sidebar */}
            <div className="chatSidebar">

                <div className="searchBox">
                    <FiSearch className="searchIcon" />

                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {filteredFriends.map((friend) => (
                    <div
                        key={friend.name}
                        className={`friend ${selectedFriend.name === friend.name ? "active" : ""
                            }`}
                        onClick={() => setSelectedFriend(friend)}
                    >
                        <img src={friend.image} alt={friend.name} />

                        <div>
                            <h4>{friend.name}</h4>
                            <p>{friend.status}</p>
                        </div>
                    </div>
                ))}

            </div>

            {/* Chat Area */}

            <div className="chatArea">

                <div className="chatHeader">

                    <div className="user">

                        <img
                            src={selectedFriend.image}
                            alt={selectedFriend.name}
                        />

                        <div>

                            <h3>{selectedFriend.name}</h3>

                            <span>{selectedFriend.status}</span>

                        </div>

                    </div>

                    <div className="chatActions">

                        <button
                            className="actionBtn"
                            onClick={() => {
                                setCallStatus(`📞 Ringing ${selectedFriend.name}...`);

                                setTimeout(() => {
                                    setCallStatus(`❌ ${selectedFriend.name} didn't answer`);
                                }, 3000);

                                setTimeout(() => {
                                    setCallStatus("");
                                }, 5000);
                            }}
                        >
                            📞
                        </button>

                        <button
                            className="actionBtn"
                            onClick={() => {
                                setCallStatus(`📹 Connecting video call with ${selectedFriend.name}...`);

                                setTimeout(() => {
                                    setCallStatus(`❌ Video call unavailable`);
                                }, 3000);

                                setTimeout(() => {
                                    setCallStatus("");
                                }, 5000);
                            }}
                        >
                            📹
                        </button>

                        <button
                            className="actionBtn"
                            onClick={() => navigate("/camera")}
                        >
                            📷
                        </button>

                    </div>

                </div>

                {callStatus && (
                    <div className="callStatus">
                        {callStatus}
                    </div>
                )}

                <div className="messages">

                    {chatData
                        .find(friend => friend.name === selectedFriend.name)
                        .messages
                        .map((msg, index) => (
                            <div
                                key={index}
                                className={`msg ${msg.sender === "me" ? "right" : "left"}`}
                            >
                                {msg.text}
                            </div>
                        ))}

                </div>

                <div className="chatInput">

                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        onClick={() => {

                            if (message.trim() === "") return;

                            const currentMessage = message;

                            const updatedChats = chatData.map(friend => {

                                if (friend.name === selectedFriend.name) {

                                    return {

                                        ...friend,

                                        messages: [
                                            ...friend.messages,
                                            {
                                                text: currentMessage,
                                                sender: "me"
                                            }
                                        ]

                                    }

                                }

                                return friend;

                            });

                            setChatData(updatedChats);

                            setMessage("");

                            setTimeout(() => {

                                setChatData(prev => {

                                    return prev.map(friend => {

                                        if (friend.name === selectedFriend.name) {

                                            return {

                                                ...friend,

                                                messages: [
                                                    ...friend.messages,
                                                    {
                                                        text: "Got it 👍",
                                                        sender: "them"
                                                    }
                                                ]

                                            }

                                        }

                                        return friend;

                                    })

                                })

                            }, 1000);

                        }}
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Chats;
