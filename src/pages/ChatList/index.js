import moment from "moment";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ChatItem from "~/components/ChatItem";
import { getChats, deleteChatHistory, getMessages } from "~/service";
const ChatList = (props) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const results = chats.filter(
      (chat) =>
        chat.otherUser.displayName.toLowerCase().includes(searchTerm) ||
        chat.lastMessage.body.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm]);

  const handleChatDelete = (contact) => {
    deleteChatHistory(contact, (res) => {
      if (String(res.status).startsWith("2")) getChatList();
    });
  };

  const getChatContent = (id) => {
    getMessages(id, (content) => {
      if (String(content.status).startsWith("2"))
        props.onChatChange(content.data.messages, id);
    });
  };
  const getChatList = () => {
    getChats((data) => {
      if (String(data.status).startsWith("2")) {
        setChats(data.data);
        setSearchResult(data.data);
      }
    });
  };
  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="chat">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResult.length > 0 ? (
        <div>
          {searchResult.map((chat) => (
            <div
              key={chat.lastMessage.id}
              onClick={() => getChatContent(chat.otherUser.email)}
            >
              <ChatItem
                id={chat.lastMessage.id}
                receiver={chat.lastMessage.receiver}
                sender={chat.lastMessage.sender}
                to={chat.otherUser.displayName}
                sendDate={moment(chat.lastMessage.sendDate).format("h:mm")}
                status={chat.lastMessage.status}
                content={chat.lastMessage.body}
                onOption={handleChatDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-warning">
          {chats.length === 0
            ? "You dont have any chats"
            : searchTerm === ""
            ? "Loading"
            : "Chat not found"}
        </div>
      )}
    </div>
  );
};

ChatList.propTypes = {
  onChatChange: PropTypes.any,
  onChatDelete: PropTypes.func,
};
export default ChatList;
