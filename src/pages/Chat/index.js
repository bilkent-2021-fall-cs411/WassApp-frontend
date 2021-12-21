import React, { useState, useEffect, useRef, useCallback } from "react";
import sendIcon from "~/assets/send.svg";
import PropTypes from "prop-types";
import moment from "moment";
import {
  sendMessage,
  deleteMessage,
  replaceListener,
  readMessage,
} from "~/service";
import { IoChevronDownOutline } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Chat = (props) => {
  const messagesEndRef = useRef(null);

  const [selectedMsg, setSelectedMsg] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMsg !== "") {
      const msgObject = {
        receiver: props.receiver.email,
        body: newMsg,
      };
      sendMessage(msgObject, (msg) => {
        handleNewMessage(msg);
      });
      setNewMsg("");
    }
  };

  const handleMessageDelete = (id) => {
    deleteMessage(id, (res) => {
      if (res.status === 200) {
        setMessages((oldMessages) =>
          oldMessages.filter((message) => message.id !== id)
        );
      }
    });
  };

  console.log("CHAT RERENDER:", props.receiver);
  const handleNewMessage = useCallback(
    (msg) => {
      if (
        props.receiver &&
        (msg.sender == props.receiver.email ||
          msg.receiver == props.receiver.email)
      ) {
        setMessages((prevMsg) => [...prevMsg, msg]);
        if (msg.sender == props.receiver.email)
          readMessage({ messageId: msg.id });
      }
    },
    [props.receiver]
  );

  useEffect(() => {
    const reversedMessages = props.content
      ? props.content.slice().reverse()
      : props.content;
    setMessages(reversedMessages);
  }, [props.content]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const chatMessageListener = (data) => {
      handleNewMessage(data);
    };
    replaceListener("message", chatMessageListener);
  }, [handleNewMessage]);

  return (
    <div className=" chat">
      {messages !== null ? (
        <div className="chat-container">
          <div className="header" style={{ padding: "2% 4%" }}>
            <div className="chat-header">
              <p style={{ wordBreak: "break-all", fontWeight: 0 }}>
                {props.receiver.displayName}
              </p>
            </div>
          </div>
          <div className="messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg${
                  m.sender === window.sessionStorage.email ? " dark" : ""
                }`}
              >
                <div className="msg-content">
                  <p>{m.body}</p>
                  <IoChevronDownOutline
                    className="chat-dropdown"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMsg(m);
                      handleClick(e);
                    }}
                  />
                </div>

                <p className="msg-timestamp">
                  {moment(new Date(m.sendDate)).format("h:mm")}
                </p>
              </div>
            ))}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleMessageDelete(selectedMsg.id);
                  handleClose(e);
                }}
              >
                Delete Chat
              </MenuItem>
            </Menu>
            <div
              ref={messagesEndRef}
              className="msg"
              style={{ width: 0, padding: 0 }}
            />
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
  receiver: PropTypes.any,
};
export default Chat;
