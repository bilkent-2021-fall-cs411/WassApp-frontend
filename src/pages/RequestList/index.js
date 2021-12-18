import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ContactItem from "~/components/ContactItem";
const RequestList = (props) => {
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
          onReject={props.onMessageReject}
          onMessage={props.onContactMessage}
          isRequest={true}
          searchItem={false}
        />
      ))}
    </div>
  );
};
RequestList.propTypes = {
  onContactMessage: PropTypes.any,
  onMessageReject: PropTypes.func,
};
export default RequestList;
