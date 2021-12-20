import React, { useState, useEffect } from "react";
import Chat from "~/pages/Chat";
import ChatList from "../ChatList";
import ContactList from "../ContactList";
import RequestList from "../RequestList";
import ContactSearch from "../ContactSearch";
import { useHistory } from "react-router-dom";
import { getMessages, login, logout, socket } from "~/service";
import {
  IoPersonAddOutline,
  IoChatbubblesOutline,
  IoPeopleCircleOutline,
  IoSearchOutline,
  IoLogOutOutline,
} from "react-icons/io5";

const Landing = () => {
  const history = useHistory();

  //#a60000
  const [currenctChat, setCurrentChat] = useState(null);
  const [receiver, setReceiver] = useState();
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
    getChatContent(contact);
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
    if (window.sessionStorage.email === "") {
      history.push("/");
      return;
    }

    login(window.sessionStorage.email, window.sessionStorage.password);

    socket.on("disconnect", () => {
      console.log("bye");
      history.push("/");
    });

    socket.on("messageRequest", () => {
      setRequestNotification(true);
    });
  }, []);

  return (
    <div className="root-container ">
      <div className="inner-content row">
        <div className="row chatList-main-container">
          <div className="col-4 chat-list">
            <div className="header">
              <div className="chat-header">
                <p style={{ wordBreak: "break-all" }}>
                  {window.sessionStorage.email}
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
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="chatlist-tab"
                  data-toggle="pill"
                  href="#chatlist"
                  role="tab"
                  aria-controls="chatlist"
                  aria-selected="true"
                >
                  <IoChatbubblesOutline
                    className={
                      "nav-icon" + chatNotification ? " notified" : null
                    }
                  />
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="contacts-tab"
                  data-toggle="pill"
                  href="#contacts"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  <IoPeopleCircleOutline
                    className={
                      "nav-icon" + contactNotification ? " notified" : null
                    }
                  />
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="req-tab"
                  data-toggle="pill"
                  href="#req"
                  role="tab"
                  aria-controls="req"
                  aria-selected="false"
                >
                  <IoPersonAddOutline
                    className={
                      "nav-icon" + requestNotification ? " notified" : null
                    }
                  />
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="search-tab"
                  data-toggle="pill"
                  href="#search"
                  role="tab"
                  aria-controls="search"
                  aria-selected="false"
                >
                  <IoSearchOutline />
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
                <RequestList />
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
            <Chat receiver={receiver} content={currenctChat} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
