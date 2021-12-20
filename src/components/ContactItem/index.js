import React from "react";
import PropTypes from "prop-types";
import {
  IoRemoveCircleOutline,
  IoSend,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const ContactItem = (props) => {
  return (
    <div className="chat-item row" style={{ margin: 0, alignItems: "center" }}>
      <div className="col">
        <div className="chat-header">
          <h4 style={{ fontSize: "17px" }}>{props.displayName}</h4>
        </div>
        <p className="msg-content">{props.email}</p>
      </div>
      <div className="col-3" style={{ padding: 0, textAlign: "center" }}>
        {props.searchItem === undefined ? (
          <IoSend
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onMessage(props.email);
            }}
          ></IoSend>
        ) : (
          <IoCheckmarkCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onAnswer(props.email, "ACCEPT");
            }}
          />
        )}
        {props.searchItem === undefined ? (
          <IoRemoveCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete(props.email);
            }}
          />
        ) : props.isRequest ? (
          <IoCloseCircleOutline
            className="contact-item-icon"
            onClick={(e) => {
              e.stopPropagation();
              props.onAnswer(props.email, "REJECT");
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
ContactItem.propTypes = {
  displayName: PropTypes.any,
  email: PropTypes.any,
  searchItem: PropTypes.any,
  isRequest: PropTypes.any,
  onAnswer: PropTypes.func,
  onMessage: PropTypes.func,
  onDelete: PropTypes.func,
};
export default ContactItem;
