import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteContact, getContacts, login } from "~/service";

import ContactItem from "~/components/ContactItem";
const ContactList = (props) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const results = contacts.filter(
      (user) =>
        user.displayName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm]);

  const getContactList = () => {
    getContacts((res) => {
      console.log(res);
      if (String(res.status).startsWith("2")) {
        setContacts(res.data);
        setSearchResult(res.data);
      }
    });
  };

  const handleDelete = (contact) => {
    deleteContact(contact, (res) => {
      if (String(res.status).startsWith("2")) getContactList();
    });
  };

  useEffect(() => {
    login(window.sessionStorage.email, window.sessionStorage.password);
    getContactList();
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
              onDelete={handleDelete}
              onMessage={props.onContactMessage}
            />
          ))}
        </div>
      ) : (
        <div className="chat-warning">
          {contacts.length === 0
            ? "You do not have any contacts"
            : searchTerm === ""
            ? "Loading"
            : "Contact not found :("}
        </div>
      )}
    </div>
  );
};
ContactList.propTypes = {
  onContactMessage: PropTypes.any,
  onContactDelete: PropTypes.func,
};
export default ContactList;
