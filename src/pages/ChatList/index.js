import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ChatItem from "~/components/ChatItem";
import { sendMessage, getChats, getMessages, login } from "~/service";
const ChatList = (props) => {
  const messageEl = useRef(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const handleNewMessage = (msg) => {
    console.log("Message received:", msg);
    if (msg.sender == "javid@mail.com" || msg.receiver == "javid@mail.com")
      setMessages((prevMsg) => [...prevMsg, msg]);
    else {
      // TODO: add notification
    }
  };
  const getChatContent = (id) => {
    console.log(id);
    getMessages(id, (content) => {
      props.onChatChange(content);
    });
  };
  useEffect(() => {
    login(window.sessionStorage.email, window.sessionStorage.password);
    getChats((data) => {
      setChats(data.messages);
    });
  }, []);

  return (
    <div className="chats">
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => getChatContent(chat.receiver)}>
          <ChatItem
            id={chat.id}
            receiver={chat.receiver}
            sender={chat.sender}
            sendDate={moment(chat.sendDate).format("h:mm")}
            status={chat.status}
            content={chat.body}
            onOption={props.onChatDelete}
          />
        </div>
      ))}
    </div>
  );
};

ChatList.propTypes = {
  onChatChange: PropTypes.any,
  onChatDelete: PropTypes.func,
};
export default ChatList;
