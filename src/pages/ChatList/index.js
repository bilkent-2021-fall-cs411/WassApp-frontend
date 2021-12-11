import React, { useState, useEffect, useRef } from "react";
import sendIcon from "~/assets/send.svg";
import moment from "moment";
import ChatItem from "~/components/ChatItem";
import { sendMessage, socket } from "~/service";

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
        receiver: "javid@mail.com",
        message: newMsg,
      };
      sendMessage(msgObject, (msg) => {
        handleNewMessage(msg);
      });
      setNewMsg("");
    }
  };

  const handleNewMessage = (msg) => {
    console.log("Message received:", msg);
    if (msg.sender == "javid@mail.com" || msg.receiver == "javid@mail.com")
      setMessages((prevMsg) => [...prevMsg, msg]);
    else {
      // TODO: add notification
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      handleNewMessage(data.data);
    });
  }, []);

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
                  className={`msg${
                    m.sender === "ziya@mail.com" ? " dark" : ""
                  }`}
                >
                  <p className="msg-content">{m.message}</p>
                  <p className="msg-timestamp">
                    {moment(new Date(m.sendDate)).format("h:mm")}
                  </p>
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
