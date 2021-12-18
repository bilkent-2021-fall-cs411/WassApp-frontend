import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  IoRemoveCircleOutline,
  IoSend,
  IoCloseCircleOutline,
} from "react-icons/io5";

const ContactItem = (props) => {
  useEffect(() => {
    console.log(props.isRequest);
  }, []);
  return (
    <div className="chat-item row" style={{ margin: 0, alignItems: "center" }}>
      <div className="col">
        <div className="chat-header">
          <h4 style={{ fontSize: "17px" }}>{props.displayName}</h4>
        </div>
        <p className="msg-content">{props.email}</p>
      </div>
      <div className="col-3" style={{ padding: 0, textAlign: "center" }}>
        <IoSend
          className="contact-item-icon"
          onClick={(e) => {
            e.stopPropagation();
            props.onMessage(props.email);
          }}
        ></IoSend>
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
              props.onReject(props.email);
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
  onReject: PropTypes.func,
  onMessage: PropTypes.func,
  onDelete: PropTypes.func,
};
export default ContactItem;
