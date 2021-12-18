import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ContactItem from "~/components/ContactItem";
const ContactList = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const obj = {
      displayName: "Jaaavid",
      email: "javid@mail.com",
    };
    setContacts((pre) => [...pre, obj]);
  }, []);

  return (
    <div className="chats">
      {contacts.map((contact, index) => (
        <ContactItem
          key={index}
          displayName={contact.displayName}
          email={contact.email}
          onDelete={props.onContactDelete}
          onMessage={props.onContactMessage}
        />
      ))}
    </div>
  );
};
ContactList.propTypes = {
  onContactMessage: PropTypes.any,
  onContactDelete: PropTypes.func,
};
export default ContactList;
