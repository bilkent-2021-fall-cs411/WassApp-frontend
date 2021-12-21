import io from "socket.io-client";
import axios from "axios";

const BASE_URL = "http://130.61.213.181";
const HTTP_PORT = "8080";
const SOCKETIO_PORT = "8081";

console.log("SOCKET CREATED");
export const socket = io(`${BASE_URL}:${SOCKETIO_PORT}`, {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("socket connected", socket.id);
});

export async function register(user, handleResponse) {
  const response = await axios.post(`${BASE_URL}:${HTTP_PORT}/register`, user);
  if (response.status != 200) {
    throw new Error(response.message);
  } else {
    handleResponse(response);
  }
}

export function login(email, password) {
  window.sessionStorage.setItem("email", email);
  window.sessionStorage.setItem("password", password);

  socket.io.opts.query = { email, password };
  socket.connect();
}

export function logout() {
  socket.disconnect();
  window.sessionStorage.clear();
}

// Functions for sending an event to the server
export function getChats(handleResponse) {
  console.log("BACKEND getChats SENT");
  socket.emit("getChats", "", (response) => {
    console.log("F***ING BACKEND REPLIED?!?!?!?");
    handleResponse(response);
  });
}
export function getUserDetails(handleResponse) {
  socket.emit("whoAmI", "", (response) => {
    handleResponse(response);
  });
}

export function getMessages(receiver, handleResponse) {
  const obj = {
    contact: receiver,
  };
  socket.emit("getMessages", obj, (response) => {
    handleResponse(response);
  });
}
export function getMessageRequests(handleResponse) {
  socket.emit("getMessageRequests", "", (response) => {
    handleResponse(response);
  });
}
export function getContacts(handleResponse) {
  socket.emit("getContacts", "", (response) => {
    handleResponse(response);
  });
}

export function sendMessage(message, handleMessage) {
  socket.emit("message", message, (response) => {
    handleMessage(response.data);
  });
}
export function answerMessageRequest(answer, handleMessage) {
  socket.emit("answerMessageRequest", answer, (response) => {
    handleMessage(response);
  });
}
export function sendMessageRequest(contact, handleMessage) {
  socket.emit("sendMessageRequest", contact, (response) => {
    console.log(response);
    handleMessage(response);
  });
}

export function readMessage(messageId) {
  socket.emit("readMessage", messageId);
}

export function deleteMessage(id, handleMessage) {
  socket.emit("deleteMessage", id, (response) => {
    handleMessage(response);
  });
}

export function deleteContact(id, handleMessage) {
  socket.emit("deleteContact", id, (response) => {
    handleMessage(response);
  });
}
export function deleteChatHistory(contact, handleMessage) {
  socket.emit("deleteChatHistory", contact, (response) => {
    handleMessage(response);
  });
}

export function searchUsers(string, handleMessage) {
  socket.emit("searchUsers", string, (res) => {
    handleMessage(res);
  });
}

export function replaceListener(eventName, listener) {
  const oldListener = socket
    .listeners(eventName)
    .find((f) => f.name === listener.name);

  if (oldListener) {
    socket.removeListener(eventName, oldListener);
  }
  socket.on(eventName, listener);
  console.log(eventName, "listeners:", socket.listeners(eventName));
}
