import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContactItem from "~/components/ContactItem";
import { searchUsers } from "~/service";
const ContactSearch = (props) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [timeOut, setTimeOut] = useState();
  const [canSend, setCanSend] = useState();

  const onInput = (input) => {
    setSearchTerm(input);
    if (timeOut) {
      clearTimeout(timeOut);
      setCanSend(false);
    }
    setTimeOut(
      setTimeout(() => {
        setCanSend(true);
      }, 1000)
    );
  };

  const handleMessageRequest = (res) => {
    if (String(res.status).startsWith("2")) {
      getUserList();
    }
  };
  const getUserList = () => {
    searchUsers(searchTerm, (res) => {
      if (String(res.status).startsWith("2")) {
        setContacts(res.data);
        setSearchResult(res.data);
      }
    });
  };
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else if (canSend) {
      getUserList();
    }
  }, [canSend]);

  return (
    <div className="chat">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onInput(e.target.value)}
      />
      {searchResult.length > 0 ? (
        <div>
          {searchResult.map((item, index) => (
            <ContactItem
              key={index}
              searchItem={true}
              contact={item}
              onMessage={handleMessageRequest}
              isInContacts={item.isInContacts}
              isMsgReqSent={item.isMessageRequestSent}
            />
          ))}
        </div>
      ) : (
        <div className="chat-warning">
          {canSend}
          {searchTerm === ""
            ? "Search user by their display name or email."
            : !canSend
            ? "Searching"
            : "User not found :("}
        </div>
      )}
    </div>
  );
};
ContactSearch.propTypes = {
  onContactMessage: PropTypes.func,
};
export default ContactSearch;
