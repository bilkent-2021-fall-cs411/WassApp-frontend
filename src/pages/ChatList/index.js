import React, { useState, useEffect, useRef } from "react";
import sendIcon from "~/assets/send.svg";
import moment from "moment";
import ChatItem from "~/components/ChatItem";
const ChatList = (props) => {
  const messageEl = useRef(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    //delete after api
    const obj = {
      title: "Senior Project",
      content: "I hate this life...",
      time: moment(new Date()).format("h:mm"),
    };
    setChats((prevMsg) => [...prevMsg, obj]);
  }, []);
  const handleSubmit = (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMsg !== "") {
      const msgObject = {
        text: newMsg,
        sender: "user",
        time: moment(new Date()).format("h:mm"),
      };
      setMessages((prevMsg) => [...prevMsg, msgObject]);
      setNewMsg("");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="root-container ">
      <div className="inner-content row">
        <div className="row chatList-main-container">
          <div className="col-4 chat-list">
            <div className="header">Header</div>
            <div className="chats">
              {chats.map((chat, index) => (
                <ChatItem
                  key={index}
                  title={chat.title}
                  time={chat.time}
                  content={chat.content}
                />
              ))}
            </div>
          </div>
          <div className="col chat">
            <div className="messages" ref={messageEl}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`msg${m.sender === "user" ? " dark" : ""}`}
                >
                  <p className="msg-content">{m.text}</p>
                  <p className="msg-timestamp">{m.time}</p>
                </div>
              ))}
            </div>
            <div className="footer">
              <input
                className="msg-input"
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyUp={(e) => {
                  handleSubmit(e);
                }}
                placeholder="Type here..."
              />
              <img onClick={(e) => handleSubmit(e)} src={sendIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatList;
