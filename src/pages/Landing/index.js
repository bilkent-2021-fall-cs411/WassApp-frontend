import React, { useState, useEffect } from "react";
import Chat from "~/pages/Chat";
import ChatList from "../ChatList";
import ContactList from "../ContactList";
import RequestList from "../RequestList";
import ContactSearch from "../ContactSearch";
import { getMessages, login } from "~/service";
import {
  IoPersonAddOutline,
  IoChatbubblesOutline,
  IoPeopleCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
const Landing = () => {
  const [currenctChat, setCurrentChat] = useState([]);
  const handleChatSelect = (content) => {
    setCurrentChat(content.messages);
  };
  const handleChatDelete = (content) => {
    console.log(content);
  };
  const handleContactDelete = (content) => {
    console.log(content);
  };
  const handleContactMessage = (contact) => {
    getChatContent(contact);
  };

  const getChatContent = (contact) => {
    getMessages(contact, (content) => {
      setCurrentChat(content.messages);
    });
  };
  const handleReject = (content) => {
    console.log(content);
  };
  const handleMessageRequest = (content) => {
    console.log(content);
  };
  const sendMessageRequest = (content) => {
    console.log(content);
  };
  useEffect(() => {
    login(window.sessionStorage.email, window.sessionStorage.password);
  }, []);

  return (
    <div className="root-container ">
      <div className="inner-content row">
        <div className="row chatList-main-container">
          <div className="col-4 chat-list">
            <div className="header">{window.sessionStorage.email}</div>
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
                  <IoChatbubblesOutline />
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
                  <IoPeopleCircleOutline />
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
                  <IoPersonAddOutline />
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
              >
                <ChatList
                  onChatDelete={(e) => handleChatDelete(e)}
                  onChatChange={handleChatSelect}
                />
              </div>
              <div
                className="tab-pane fade"
                id="contacts"
                role="tabpanel"
                aria-labelledby="contacts-tab"
              >
                <ContactList
                  onContactDelete={handleContactDelete}
                  onContactMessage={handleContactMessage}
                />
              </div>
              <div
                className="tab-pane fade"
                id="req"
                role="tabpanel"
                aria-labelledby="req-tab"
              >
                <RequestList
                  onMessageReject={handleReject}
                  onContactMessage={handleMessageRequest}
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
          <div className="col" style={{ padding: 0 }}>
            <Chat content={currenctChat} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
