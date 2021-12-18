import io from "socket.io-client";
import axios from "axios";

const BASE_URL = "http://130.61.213.181";
const HTTP_PORT = "8080";
const SOCKETIO_PORT = "8081";

export const socket = io(`${BASE_URL}:${SOCKETIO_PORT}`, {
  autoConnect: false,
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
  socket.io.opts.query = { email, password };
  socket.connect();
}

export function logout() {
  socket.disconnect();
  // TODO: Erase local storage
}

// Functions for sending an event to the server
export function getChats(handleResponse) {
  socket.emit("getChats", "", (response) => {
    //checkChatResponse(response);
    handleResponse(response);
  });
}

export function getMessages(receiver, handleResponse) {
  const obj = {
    chat: receiver,
    beforeDate: new Date(),
    count: 100,
  };
  socket.emit("getMessages", obj, (response) => {
    //checkChatResponse(response);
    handleResponse(response);
  });
}

export function sendMessage(message, handleMessage) {
  socket.emit("message", message, (response) => {
    console.log(response);
    // checkResponse(response);
    handleMessage(response.data);
  });
}

function checkResponse(response) {
  if (response && response.status != 200) {
    if (response.message) throw new Error(response.message);
    else throw new Error("Unknown error");
  }
}

// Connection-related events
// socket.on("connect_error", (err) => {
//   console.log("Socket IO connect error.", err);
//   if (err == "Error: xhr poll error") {
//     socket.disconnect();
//     // TODO: Login failed (probably). Show wrong email or password message
//   }
// });

// socket.on("connect", () => {
//   console.log("Socket IO connect.", socket.id);
// });

// socket.on("reconnect", () => {
//   console.log("Socket IO reconnect.", socket.id);
// });

// socket.on("disconnect", () => {
//   console.log("Socket IO disconnect.");
// });

// Testing
//login("ziya@mail.com", "salam123");
