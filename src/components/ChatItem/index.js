import React from "react";
import PropTypes from "prop-types";
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
        <h4 style={{ fontSize: "17px" }}>{props.to}</h4>
        <p className="msg-timestamp">{props.sendDate}</p>
      </div>
      <div className="chat-header">
        <div className="msg-content">
          {props.status === "DELIVERED" ? (
            <IoCheckmarkDoneOutline className="msg-status" />
          ) : (
            <IoCheckmark className="msg-status" />
          )}
          <p className="msg-last">{props.content}</p>
        </div>
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
                props.onOption(props.receiver);
                handleClose(e);
              }}
            >
              Delete Chat
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
ChatItem.propTypes = {
  receiver: PropTypes.any,
  sender: PropTypes.any,
  content: PropTypes.any,
  status: PropTypes.any,
  sendDate: PropTypes.any,
  id: PropTypes.any,
  to: PropTypes.any,
  onOption: PropTypes.func,
};
export default ChatItem;
