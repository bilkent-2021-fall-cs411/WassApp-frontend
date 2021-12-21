import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteContact, getContacts, socket } from "~/service";

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
  }, [searchTerm, contacts]);

  const getContactList = () => {
    getContacts((res) => {
      if (String(res.status).startsWith("2")) {
        setContacts(res.data);
      }
    });
  };

  const handleDelete = (contact) => {
    deleteContact(contact, (res) => {
      if (String(res.status).startsWith("2")) getContactList();
    });
  };

  useEffect(() => {
    if (props.activeTab === "contacts") getContactList();
  }, [props.contactNotification, props.activeTab]);

  useEffect(() => {
    socket.on("deleteContact", () => {
      getContactList();
    });
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
              contact={contact}
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
            : "Contact not found"}
        </div>
      )}
    </div>
  );
};
ContactList.propTypes = {
  onContactMessage: PropTypes.any,
  contactNotification: PropTypes.number,
  activeTab: PropTypes.string,
};
export default ContactList;
