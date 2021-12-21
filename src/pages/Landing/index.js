import React, { useState, useEffect } from "react";
import Chat from "~/pages/Chat";
import ChatList from "../ChatList";
import ContactList from "../ContactList";
import RequestList from "../RequestList";
import ContactSearch from "../ContactSearch";
import { useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  getMessages,
  login,
  logout,
  socket,
  getUserDetails,
  getMessageRequests,
} from "~/service";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "~/assets/logo.png";

const Landing = () => {
  const history = useHistory();

  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [receiver, setReceiver] = useState();
  const [activeTab, setActiveTab] = useState("chats");
  const [chatNotification, setChatNotification] = useState(0);
  const [contactNotification, setContactNotification] = useState(0);
  const [requestNotification, setRequestNotification] = useState(0);

  const handleChatSelect = (content, email) => {
    setReceiver(email);
    setCurrentChat(content);
  };

  const handleContactDelete = (content) => {
    console.log(content);
  };

  const handleContactMessage = (contact) => {
    setReceiver(contact);
    getChatContent(contact.email);
  };

  const decreaseRequestNotification = () => {
    setRequestNotification((oldNotification) => oldNotification - 1);
  };

  const getChatContent = (contact) => {
    getMessages(contact, (content) => {
      setCurrentChat(content.data.messages);
    });
  };

  const sendMessageRequest = (content) => {
    console.log(content);
  };

  useEffect(() => {
    if (activeTab === "contacts") {
      setContactNotification(0);
    }
  }, [activeTab, contactNotification]);

  useEffect(() => {
    if (window.sessionStorage.email === "") {
      history.push("/");
      return;
    }

    login(window.sessionStorage.email, window.sessionStorage.password);

    getUserDetails((data) => {
      if (String(data.status).startsWith("2")) {
        setCurrentUser(data.data);
      }
    });
    socket.on("disconnect", () => {
      console.log("bye");
      history.push("/");
    });

    getMessageRequests((data) => {
      setRequestNotification((oldCount) => oldCount + data.data.length);
    });

    socket.on("messageRequest", () => {
      setRequestNotification((oldCount) => oldCount + 1);
    });

    socket.on("messageRequestAnswer", (data) => {
      if (data.answer === "ACCEPT") {
        console.log("contact +1");
        setContactNotification((oldCount) => oldCount + 1);
      }
    });
  }, []);

  return (
    <div className="root-container ">
      <div className="inner-content row">
        <div className="row chatList-main-container">
          <div className="col-4 chat-list">
            <div className="header">
              <div className="chat-header">
                <img style={{ height: "25px" }} src={logo} />
                <p style={{ wordBreak: "break-all" }}>
                  {currentUser.displayName}
                </p>
                <IoLogOutOutline
                  onClick={() => logout()}
                  style={{ fontSize: "25px" }}
                />
              </div>
            </div>
            <ul
              className="nav nav-pills "
              id="listTab"
              role="tablist"
              style={{ marginBottom: " 0 !important" }}
            >
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setActiveTab("chats")}
              >
                <a
                  className="nav-link active"
                  id="chatlist-tab"
                  data-toggle="pill"
                  href="#chatlist"
                  role="tab"
                  aria-controls="chatlist"
                  aria-selected="true"
                >
                  {chatNotification > 0 ? (
                    <Badge badgeContent={chatNotification} color="primary">
                      <ChatBubbleIcon color="action" />
                    </Badge>
                  ) : (
                    <ChatBubbleIcon color="action" />
                  )}
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setActiveTab("contacts")}
              >
                <a
                  className="nav-link"
                  id="contacts-tab"
                  data-toggle="pill"
                  href="#contacts"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  {contactNotification > 0 ? (
                    <Badge badgeContent={contactNotification} color="primary">
                      <ContactsIcon color="action" />
                    </Badge>
                  ) : (
                    <ContactsIcon color="action" />
                  )}
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setActiveTab("requests")}
              >
                <a
                  className="nav-link"
                  id="req-tab"
                  data-toggle="pill"
                  href="#req"
                  role="tab"
                  aria-controls="req"
                  aria-selected="false"
                >
                  <div style={{ position: "relative" }}>
                    {requestNotification > 0 ? (
                      <Badge badgeContent={requestNotification} color="primary">
                        <PersonAddIcon color="action" />
                      </Badge>
                    ) : (
                      <PersonAddIcon color="action" />
                    )}
                  </div>
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setActiveTab("search")}
              >
                <a
                  className="nav-link"
                  id="search-tab"
                  data-toggle="pill"
                  href="#search"
                  role="tab"
                  aria-controls="search"
                  aria-selected="false"
                >
                  <PersonSearchIcon color="action" />
                </a>
              </li>
            </ul>
            <div
              className="tab-content"
              style={{ height: "100%" }}
              id="listTabContent"
            >
              <div
                className="tab-pane fade show active"
                id="chatlist"
                role="tabpanel"
                aria-labelledby="chatlist-tab"
                style={{ height: "100%" }}
              >
                <ChatList onChatChange={handleChatSelect} />
              </div>
              <div
                className="tab-pane fade"
                id="contacts"
                role="tabpanel"
                aria-labelledby="contacts-tab"
                style={{ height: "100%" }}
              >
                <ContactList
                  receiver={receiver}
                  contactNotification={contactNotification}
                  onContactDelete={handleContactDelete}
                  onContactMessage={handleContactMessage}
                />
              </div>
              <div
                className="tab-pane fade"
                id="req"
                role="tabpanel"
                aria-labelledby="req-tab"
                style={{ height: "100%" }}
              >
                <RequestList
                  decreaseRequestNotification={decreaseRequestNotification}
                />
              </div>
              <div
                className="tab-pane fade"
                id="search"
                role="tabpanel"
                aria-labelledby="search-tab"
                style={{ height: "100%" }}
              >
                <ContactSearch onContactMessage={sendMessageRequest} />
              </div>
            </div>
          </div>
          <div className="col" style={{ padding: 0, height: "100%" }}>
            <Chat receiver={receiver} content={currentChat} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
