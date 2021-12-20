import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContactItem from "~/components/ContactItem";

const ContactSearch = (props) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      const results = contacts.filter(
        (user) =>
          user.displayName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
      setSearchResult(results);
    }
  }, [searchTerm]);

  useEffect(() => {
    const obj = {
      displayName: "Jaaavid",
      email: "javid@mail.com",
    };
    setContacts((pre) => [...pre, obj]);
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
          {searchResult.map((item, index) => (
            <ContactItem
              key={index}
              searchItem={true}
              displayName={item.displayName}
              email={item.email}
              onMessage={props.onContactMessage}
            />
          ))}
        </div>
      ) : (
        <div className="chat-warning">
          {searchTerm === ""
            ? "Search user by their display name or email."
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
