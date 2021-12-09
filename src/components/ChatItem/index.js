import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
const ChatItem = (props) => {
  return (
    <div className="chat-item">
      <div className="chat-header">
        <h4 style={{ fontSize: "17px" }}>{props.title}</h4>
        <p className="msg-timestamp">{props.time}</p>
      </div>
      <p className="msg-content">{props.content}</p>
    </div>
  );
};
ChatItem.propTypes = {
  title: PropTypes.any,
  time: PropTypes.any,
  content: PropTypes.any,
};
export default ChatItem;
