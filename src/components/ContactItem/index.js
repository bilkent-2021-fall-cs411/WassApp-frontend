import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  IoRemoveCircleOutline,
  IoSend,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { sendMessageRequest } from "~/service";

const ContactItem = (props) => {
  const [btnMsg, setBtnMsg] = useState("Send Request");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (props.isMsgReqSent) setBtnMsg("Request Sent");
  }, []);

  const onRequest = (email) => {
    sendMessageRequest(email, (res) => {
      if (res) {
        setBtnMsg("Request Sent");
        setIsDisabled(true);
      }
    });
  };
  return (
    <div className="chat-item row" style={{ margin: 0, alignItems: "center" }}>
      <div className="col">
        <div className="chat-header">
          <h4 style={{ fontSize: "17px" }}>{props.contact.displayName}</h4>
        </div>
        <p className="msg-content">{props.contact.email}</p>
      </div>
      <div className="col-3" style={{ padding: 0, textAlign: "center" }}>
        {props.searchItem === undefined || props.isInContacts ? (
          <IoSend
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onMessage(props.contact);
            }}
          ></IoSend>
        ) : props.searchItem === true ? (
          <button
            className="btn btn-sm btn-outline-dark "
            onClick={() => onRequest(props.contact.email)}
            disabled={props.isMsgReqSent || isDisabled}
          >
            {btnMsg}
          </button>
        ) : (
          <IoCheckmarkCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onAnswer(props.contact.email, "ACCEPT");
            }}
          />
        )}
        {props.searchItem === undefined ? (
          <IoRemoveCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete(props.contact.email);
            }}
          />
        ) : props.isRequest ? (
          <IoCloseCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onAnswer(props.contact.email, "REJECT");
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.any,
  searchItem: PropTypes.any,
  isRequest: PropTypes.any,
  onAnswer: PropTypes.func,
  onMessage: PropTypes.func,
  isInContacts: PropTypes.any,
  isMsgReqSent: PropTypes.any,
  onDelete: PropTypes.func,
};
export default ContactItem;
