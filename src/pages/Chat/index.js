import React, { useState, useEffect, useRef } from "react";
import sendIcon from "~/assets/send.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { sendMessage, socket, login } from "~/service";

const Chat = (props) => {
  const messageEl = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
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
    login(window.sessionStorage.email, window.sessionStorage.password);
    setMessages(props.content);
    socket.on("message", (data) => {
      handleNewMessage(data.data);
    });
  }, [props.content]);

  return (
    <div className=" chat">
      {messages.length > 0 ? (
        <div className="chat-container">
          <div className="messages" ref={messageEl}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg${
                  m.sender === window.sessionStorage.email ? " dark" : ""
                }`}
              >
                {/* <p className="msg-content">
                  {m.sender === window.sessionStorage.email ? "You" : m.sender}
                </p> */}
                <p className="msg-content">{m.body}</p>
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
      ) : (
        <div className="chat-warning">
          <p>Please select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};
Chat.propTypes = {
  content: PropTypes.any,
};
export default Chat;
