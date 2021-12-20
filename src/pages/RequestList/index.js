import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  socket,
  answerMessageRequest,
  getMessageRequests,
  login,
} from "~/service";

import ContactItem from "~/components/ContactItem";
const RequestList = (props) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const results = requests.filter(
      (user) =>
        user.displayName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm]);
  const handleAnswer = (contact, answer) => {
    const obj = {
      contact: contact,
      answer: answer,
    };
    answerMessageRequest(obj, (res) => {
      if (res) getRequestList();
    });
  };

  const getRequestList = () => {
    getMessageRequests((res) => {
      setRequests(res.data);
      setSearchResult(res.data);
    });
  };

  useEffect(() => {
    login(window.sessionStorage.email, window.sessionStorage.password);
    getRequestList();
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
          {searchResult.map((contact, index) => (
            <ContactItem
              key={index}
              displayName={contact.displayName}
              email={contact.email}
              onAnswer={handleAnswer}
              isRequest={true}
              searchItem={false}
            />
          ))}
        </div>
      ) : (
        <div className="chat-warning">
          {requests.length === 0
            ? "You do not have any message requests"
            : searchTerm === ""
            ? "Loading"
            : "Request not found :("}
        </div>
      )}
    </div>
  );
};
RequestList.propTypes = {};
export default RequestList;
