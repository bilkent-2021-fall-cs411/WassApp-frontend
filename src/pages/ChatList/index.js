import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ChatItem from "~/components/ChatItem";
import {
  getChats,
  deleteChatHistory,
  getMessages,
  replaceListener,
} from "~/service";

const ChatList = (props) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const results = chats
      .filter(
        (chat) =>
          chat.otherUser.displayName.toLowerCase().includes(searchTerm) ||
          chat.lastMessage.body.toLowerCase().includes(searchTerm)
      )
      .sort(
        (a, b) =>
          new Date(b.lastMessage.sendDate) - new Date(a.lastMessage.sendDate)
      );
    console.log("Results:", results);
    setSearchResult(results);
  }, [searchTerm, chats]);

  const handleChatDelete = (contact) => {
    deleteChatHistory(contact, (res) => {
      if (String(res.status).startsWith("2")) {
        console.log("CHAT F***ING DELETED?!?!?!?");
        getChatList();
      }
    });
  };

  const getChatContent = (chat) => {
    setNotifications((oldNotifications) => {
      return {
        ...oldNotifications,
        [chat.otherUser.email]: 0,
      };
    });
    setSelectedChat(chat);
    getMessages(chat.otherUser.email, (content) => {
      if (String(content.status).startsWith("2"))
        props.onChatChange(content.data.messages, chat.otherUser);
    });
  };

  const getChatList = () => {
    console.log("START WHAT THE F***?");
    getChats((data) => {
      if (String(data.status).startsWith("2")) {
        setChats(data.data);
        console.log("WHAT THE F***?");
        setNotifications(
          data.data.reduce((map, chat) => {
            map[chat.otherUser.email] = chat.unreadMessages;
            return map;
          }, {})
        );
      }
    });
  };

  useEffect(() => {
    const chatListMessageListener = (message) => {
      setChats((oldChats) => {
        const oldChatIndex = oldChats.findIndex(
          (chat) =>
            chat.otherUser.email === message.sender ||
            chat.otherUser.email === message.receiver
        );
        console.log("OldChatIndex:", oldChatIndex);
        if (oldChatIndex === -1) {
          console.log("OldChatIndex:", oldChatIndex);
          console.log("I DON'T KNOW WHAT THE FUCK IS HAPPENING");
          getChatList();
          return [];
        }
        const oldChat = oldChats[oldChatIndex];
        oldChat.lastMessage = message;

        oldChats.splice(oldChatIndex, 1);
        return [...oldChats, oldChat];
      });

      console.log("TESTING", selectedChat.otherUser, message);
      if (
        selectedChat &&
        (selectedChat.otherUser.email === message.sender ||
          selectedChat.otherUser.email === message.receiver)
      ) {
        return;
      }

      setNotifications((oldNotifications) => ({
        ...oldNotifications,
        [message.sender]: (oldNotifications[message.sender] || 0) + 1,
      }));
    };
    replaceListener("message", chatListMessageListener);
  }, [selectedChat]);

  useEffect(() => {
    console.log("INITIAL F*** CALL");
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
            <div key={chat.lastMessage.id} onClick={() => getChatContent(chat)}>
              <ChatItem
                otherUser={chat.otherUser}
                lastMessage={chat.lastMessage}
                onOption={handleChatDelete}
                notifications={notifications[chat.otherUser.email]}
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
