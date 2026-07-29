import "./Chats.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    FiSearch,
    FiPhone,
    FiVideo,
    FiCamera,
    FiMoreVertical,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import DemoAvatar from "../components/DemoAvatar";
import tanmayImg from "../assets/images/tanmay.jpeg";
import rohithImg from "../assets/images/rohith.jpeg";
import santoshImg from "../assets/images/santosh.jpeg";
import pranavImg from "../assets/images/pranav.jpeg";

import {
    searchUsers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    cancelFriendRequest,
    listenIncomingRequests,
    listenSentRequests,
    listenFriends,
} from "../services/friendService";

import {
    getChatId,
    sendMessage,
    listenMessages,
    markMessagesSeen,
    editMessage,
    deleteMessage,
    setTypingStatus,
    listenTyping,
} from "../services/chatService";

function Chats() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // ---------- Friends / Requests / Search state ----------
    const [activeTab, setActiveTab] = useState("friends"); // friends | requests | find
    const [friends, setFriends] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const [selectedFriend, setSelectedFriend] = useState(null);

    // ---------- Messaging state ----------
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [otherTyping, setOtherTyping] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [callStatus, setCallStatus] = useState("");

    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // ---------- Live: friends, incoming requests, sent requests ----------
    useEffect(() => {
        if (!currentUser) return;

        const unsubFriends = listenFriends(currentUser.uid, setFriends);
        const unsubIncoming = listenIncomingRequests(currentUser.uid, setIncomingRequests);
        const unsubSent = listenSentRequests(currentUser.uid, setSentRequests);

        return () => {
            unsubFriends();
            unsubIncoming();
            unsubSent();
        };
    }, [currentUser]);

    // Keep the selected friend pointed at a friend that still exists / is selected.
    useEffect(() => {
        const requestedUid = location.state?.friendUid;
        const requestedName = location.state?.friendName?.trim().toLowerCase();
        const requestedFriend = requestedUid
            ? friends.find((friend) => friend.uid === requestedUid)
            : requestedName
                ? friends.find((friend) => friend.username?.trim().toLowerCase() === requestedName)
                : null;

        if (requestedFriend && selectedFriend?.uid !== requestedFriend.uid) {
            setSelectedFriend(requestedFriend);
        } else if (!selectedFriend && friends.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: auto-select the first friend once the realtime friends list arrives
            setSelectedFriend(friends[0]);
        }
    }, [friends, selectedFriend, location.state]);

    // ---------- Live: messages + typing for the open conversation ----------
    useEffect(() => {
        if (!currentUser || !selectedFriend) {
            return;
        }

        const chatId = getChatId(currentUser.uid, selectedFriend.uid);

        const unsubMessages = listenMessages(chatId, (msgs) => {
            setMessages(msgs);
            markMessagesSeen(chatId, currentUser.uid);
        });

        const unsubTyping = listenTyping(chatId, selectedFriend.uid, setOtherTyping);

        return () => {
            unsubMessages();
            unsubTyping();
        };
    }, [currentUser, selectedFriend]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ---------- Search users ----------
    useEffect(() => {
        if (activeTab !== "find" || !currentUser) return;

        let cancelled = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show a loading state immediately while the search request is in flight
        setSearching(true);

        searchUsers(search, currentUser.uid).then((results) => {
            if (!cancelled) {
                setSearchResults(results);
                setSearching(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [search, activeTab, currentUser]);

    const friendUidSet = useMemo(
        () => new Set(friends.map((f) => f.uid)),
        [friends]
    );
    const sentUidSet = useMemo(
        () => new Set(sentRequests.map((r) => r.receiverId)),
        [sentRequests]
    );

    const filteredFriends = friends.filter((f) =>
        (f.username || "").toLowerCase().includes(search.toLowerCase())
    );
    const chatImages = {
        tanmay: tanmayImg,
        rohith: rohithImg,
        santosh: santoshImg,
        santhosh: santoshImg,
        pranav: pranavImg,
    };
    const Avatar = ({ user, size }) => {

        const key = (user?.name || "").trim().toLowerCase();

        const fallback =
            chatImages[key] ||
            chatImages[(user?.username || "").trim().toLowerCase()];

        return (
            <img
                src={fallback}
                alt={user?.name || user?.username}
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
            />
        );
    };
    const formatTime = (value) => value?.toDate ? value.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Sending...";

    // ---------- Handlers ----------
    const handleSendFriendRequest = async (receiverId) => {
        const result = await sendFriendRequest(currentUser.uid, receiverId);
        if (!result.ok && result.reason === "already-sent") {
            alert("Friend request already sent.");
        } else if (!result.ok && result.reason === "already-friends") {
            alert("You are already friends.");
        }
    };

    const handleAccept = async (req) => {
        await acceptFriendRequest(req.id, req.senderId, currentUser.uid);
    };

    const handleReject = async (req) => {
        await rejectFriendRequest(req.id);
    };

    const handleCancelSent = async (req) => {
        await cancelFriendRequest(req.id);
    };

    const handleTypingChange = (value) => {
        setMessage(value);

        if (!currentUser || !selectedFriend) return;
        const chatId = getChatId(currentUser.uid, selectedFriend.uid);

        setTypingStatus(chatId, currentUser.uid, true);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setTypingStatus(chatId, currentUser.uid, false);
        }, 1500);
    };

    const handleSend = async () => {
        if (message.trim() === "" || !selectedFriend) return;

        const chatId = getChatId(currentUser.uid, selectedFriend.uid);
        try {
            await sendMessage(chatId, currentUser.uid, selectedFriend.uid, message);
            setMessage("");
        } finally {
            setTypingStatus(chatId, currentUser.uid, false);
        }
    };

    const startEdit = (msg) => {
        setEditingId(msg.id);
        setEditText(msg.text);
    };

    const saveEdit = async () => {
        if (!editingId) return;
        await editMessage(editingId, editText);
        setEditingId(null);
        setEditText("");
    };

    const removeMessage = async (msg) => {
        await deleteMessage(msg.id);
    };

    return (
        <div className="chatsPage">

            <div className="chatSidebar">

                <div className="chatTabs">
                    <button
                        className={`chatTabBtn ${activeTab === "friends" ? "activeTab" : ""}`}
                        onClick={() => setActiveTab("friends")}
                    >
                        Friends
                    </button>

                    <button
                        className={`chatTabBtn ${activeTab === "requests" ? "activeTab" : ""}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests
                        {incomingRequests.length > 0 && (
                            <span className="tabBadge">{incomingRequests.length}</span>
                        )}
                    </button>

                    <button
                        className={`chatTabBtn ${activeTab === "find" ? "activeTab" : ""}`}
                        onClick={() => setActiveTab("find")}
                    >
                        Find
                    </button>
                </div>

                <div className="searchBox">
                    <FiSearch className="searchIcon" />

                    <input
                        type="text"
                        placeholder={
                            activeTab === "find"
                                ? "Search by username..."
                                : "Search team members..."
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {activeTab === "friends" && (
                    <>
                        {filteredFriends.length === 0 && (
                            <p className="emptyHint">
                                No friends yet. Use the Find tab to add people.
                            </p>
                        )}

                        {filteredFriends.map((friend) => {
                            return (
                                <motion.div
                                    key={friend.friendshipId}
                                    className={`friend ${selectedFriend?.uid === friend.uid ? "active" : ""}`}
                                    onClick={() => setSelectedFriend(friend)}
                                    whileHover={{ x: 6, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    layout
                                >
                                    <div className="avatarWrapper">
                                        <Avatar user={friend} size={55} />
                                        {friend.online && <span className="onlineDot"></span>}
                                    </div>

                                    <div className="friendInfo">
                                        <div className="friendTop">
                                            <h4>{friend.name || friend.username}</h4>
                                            <span className="friendTime">Now</span>
                                        </div>

                                        <p className="friendStatus">
                                            {friend.online ? "🟢 Online" : "Tap to chat"}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </>
                )}

                {activeTab === "requests" && (
                    <div className="requestsPanel">
                        <h4 className="panelHeading">Incoming</h4>

                        {incomingRequests.length === 0 && (
                            <p className="emptyHint">No incoming requests</p>
                        )}

                        {incomingRequests.map((req) => (
                            <div key={req.id} className="requestRow">
                                <Avatar user={req.sender} size={42} />
                                <div className="requestInfo">
                                    <h4>{req.sender?.name || req.sender?.username || "Unknown"}</h4>
                                </div>
                                <div className="requestActions">
                                    <button
                                        className="acceptBtn"
                                        onClick={() => handleAccept(req)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="rejectBtn"
                                        onClick={() => handleReject(req)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}

                        <h4 className="panelHeading">Sent</h4>

                        {sentRequests.length === 0 && (
                            <p className="emptyHint">No sent requests</p>
                        )}

                        {sentRequests.map((req) => (
                            <div key={req.id} className="requestRow">
                                <Avatar user={req.receiver} size={42} />
                                <div className="requestInfo">
                                    <h4>{req.receiver?.name || req.receiver?.username || "Unknown"}</h4>
                                    <p>Pending</p>
                                </div>
                                <div className="requestActions">
                                    <button
                                        className="rejectBtn"
                                        onClick={() => handleCancelSent(req)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "find" && (
                    <div className="findPanel">
                        {searching && <p className="emptyHint">Searching...</p>}

                        {!searching && searchResults.length === 0 && (
                            <p className="emptyHint">No users found</p>
                        )}

                        {searchResults.map((user) => {
                            const isFriend = friendUidSet.has(user.id);
                            const alreadySent = sentUidSet.has(user.id);

                            return (
                                <div key={user.id} className="requestRow">
                                    <Avatar user={user} size={42} />
                                    <div className="requestInfo">
                                        <h4>{user.name || user.username}</h4>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="requestActions">
                                        {isFriend ? (
                                            <span className="statusPill">Friends</span>
                                        ) : alreadySent ? (
                                            <span className="statusPill">Sent</span>
                                        ) : (
                                            <button
                                                className="acceptBtn"
                                                onClick={() => handleSendFriendRequest(user.id)}
                                            >
                                                Add Friend
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="chatArea">

                {!selectedFriend ? (
                    <div className="noChatSelected">
                        <p>Add a friend and select them to start chatting.</p>
                    </div>
                ) : (
                    <>
                        <div className="chatHeader">

                            <div className="user">

                                <div className="avatarWrapper">
                                    <Avatar user={selectedFriend} size={60} />
                                    {selectedFriend.online && <span className="onlineDot"></span>}
                                </div>

                                <div>
                                    <h3>{selectedFriend.name || selectedFriend.username}</h3>
                                    <span>{otherTyping ? "Typing..." : selectedFriend.online ? "Online" : selectedFriend.lastSeen?.toDate ? `Last seen ${selectedFriend.lastSeen.toDate().toLocaleString()}` : selectedFriend.email}</span>
                                </div>

                            </div>

                            <div className="chatActions">

                                <button
                                    className="actionBtn"
                                    onClick={() => {
                                        setCallStatus(`📞 Ringing ${selectedFriend.name || selectedFriend.username}...`);

                                        setTimeout(() => {
                                            setCallStatus(`❌ ${selectedFriend.name || selectedFriend.username} didn't answer`);
                                        }, 3000);

                                        setTimeout(() => {
                                            setCallStatus("");
                                        }, 5000);
                                    }}
                                >
                                    <FiPhone />
                                </button>

                                <button
                                    className="actionBtn"
                                    onClick={() => {
                                        setCallStatus(`📹 Connecting video call with ${selectedFriend.name || selectedFriend.username}...`);

                                        setTimeout(() => {
                                            setCallStatus(`❌ Video call unavailable`);
                                        }, 3000);

                                        setTimeout(() => {
                                            setCallStatus("");
                                        }, 5000);
                                    }}
                                >
                                    <FiVideo />
                                </button>

                                <button
                                    className="actionBtn"
                                    onClick={() => navigate("/camera")}
                                >
                                    <FiCamera />
                                </button>

                                <button className="actionBtn">
                                    <FiMoreVertical />
                                </button>

                            </div>

                        </div>

                        {callStatus && (
                            <div className="callStatus">
                                {callStatus}
                            </div>
                        )}

                        <div className="messages">

                            {messages.length === 0 && <p className="emptyHint">No messages yet</p>}

                            {messages.map((msg) => {
                                const isMe = msg.senderId === currentUser.uid;

                                return (
                                    <motion.div
                                        key={msg.id}
                                        className={`msg ${isMe ? "right" : "left"}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {editingId === msg.id ? (
                                            <div className="editRow">
                                                <input
                                                    className="editInput"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                />
                                                <button className="msgActionBtn" onClick={saveEdit}>✔</button>
                                                <button
                                                    className="msgActionBtn"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bubbleContent">
                                                    {msg.deleted ? (
                                                        <em>Message deleted</em>
                                                    ) : (
                                                        <p className="messageText">{msg.text}</p>
                                                    )}

                                                    {msg.edited && !msg.deleted && (
                                                        <span className="editedTag">Edited</span>
                                                    )}

                                                    <div className="bubbleFooter">
                                                        <span className="messageTime">
                                                            {formatTime(msg.createdAt)}
                                                        </span>

                                                        {isMe && (
                                                            <span className="seenTag">
                                                                {msg.seen ? "✓✓" : "✓"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {isMe && !msg.deleted && (
                                                    <div className="msgActions">
                                                        <button
                                                            className="msgIconBtn"
                                                            onClick={() => startEdit(msg)}
                                                        >
                                                            ✏️
                                                        </button>

                                                        <button
                                                            className="msgIconBtn"
                                                            onClick={() => removeMessage(msg)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}

                            <div ref={messagesEndRef} />

                        </div>

                        <div className="chatInput">

                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => handleTypingChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSend();
                                }}
                            />

                            <button onClick={handleSend}>
                                Send
                            </button>

                        </div>
                    </>
                )}

            </div>

        </div>
    );
}

export default Chats;
