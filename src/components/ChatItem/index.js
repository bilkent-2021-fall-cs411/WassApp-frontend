import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  IoCheckmarkDoneOutline,
  IoCheckmark,
  IoChevronDownOutline,
} from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const ChatItem = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="chat-item">
      <div className="chat-header">
        <h4 style={{ fontSize: "17px" }}>{props.otherUser.displayName}</h4>
        <p className="msg-timestamp">
          {moment(props.lastMessage.sendDate).format("h:mm")}
        </p>
      </div>
      <div className="chat-header">
        <div className="msg-content">
          {props.lastMessage.status === "DELIVERED" ? (
            <IoCheckmarkDoneOutline className="msg-status" />
          ) : (
            <IoCheckmark className="msg-status" />
          )}
          <p className="msg-last">{props.lastMessage.body}</p>
          {props.notifications > 0 ? (
            <div className="notification-count">{props.notifications}</div>
          ) : null}

          <div>
            <IoChevronDownOutline
              className="chat-dropdown"
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  props.onOption(props.otherUser.email);
                  handleClose(e);
                }}
              >
                Delete Chat
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
ChatItem.propTypes = {
  lastMessage: PropTypes.any,
  otherUser: PropTypes.any,
  onOption: PropTypes.func,
  notifications: PropTypes.any,
};
export default ChatItem;
