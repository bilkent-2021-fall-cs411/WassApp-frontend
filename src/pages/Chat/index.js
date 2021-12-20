import React, { useState, useEffect, useRef } from "react";
import sendIcon from "~/assets/send.svg";
import PropTypes from "prop-types";
import moment from "moment";
import {
  sendMessage,
  deleteMessage,
  getMessages,
  socket,
  login,
} from "~/service";
import { IoChevronDownOutline } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Chat = (props) => {
  const messageEl = useRef(null);
  const [messages, setMessages] = useState(props.content);
  const [newMsg, setNewMsg] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        receiver: "javid@mail.com",
        message: newMsg,
      };
      sendMessage(msgObject, (msg) => {
        handleNewMessage(msg);
      });
      setNewMsg("");
    }
  };
  const handleMessageDelete = (id, contact) => {
    deleteMessage(id, (res) => {
      console.log(res);
      if (res.message === "OK") {
        console.log(contact);
        getMessages(contact, (res) => {
          //console.log(res);
          setMessages(res.data.messages);
        });
      }
    });
  };

  const handleNewMessage = (msg) => {
    if (msg.sender == "javid@mail.com" || msg.receiver == "javid@mail.com")
      setMessages((prevMsg) => [...prevMsg, msg]);
    else {
      // TODO: add notification
    }
  };

  useEffect(() => {
    console.log(props.content);
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
                <div>
                  <IoChevronDownOutline
                    className="chat-dropdown"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(e);
                    }}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMessageDelete(m.id, m.receiver);
                        handleClose(e);
                      }}
                    >
                      Delete Chat
                    </MenuItem>
                  </Menu>
                </div>
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
