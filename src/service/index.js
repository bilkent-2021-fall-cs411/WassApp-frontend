import io from "socket.io-client";
import axios from "axios";

const BASE_URL = "http://130.61.213.181";
const HTTP_PORT = "8080";
const SOCKETIO_PORT = "8081";

export const socket = io(`${BASE_URL}:${SOCKETIO_PORT}`, {
  autoConnect: false,
});

export async function register(user) {
  const response = await axios.post(
    `${BASE_URL}:${HTTP_PORT}/user/register`,
    user
  );
  if (response.status != 200) throw new Error(response.message);
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
    checkResponse(response);
    handleResponse(response.data);
  });
}

export function sendMessage(message, handleMessage) {
  socket.emit("message", message, (response) => {
    checkResponse(response);
    handleMessage(response.data);
  });
}

function checkResponse(response) {
  console.log("Response:", response);
  if (response && response.status != 200) {
    if (response.message) throw new Error(response.message);
    else throw new Error("Unknown error");
  }
}

// Connection-related events
socket.on("connect_error", (err) => {
  console.log("Socket IO connect error.", err);
  if (err == "Error: xhr poll error") {
    socket.disconnect();
    // TODO: Login failed (probably). Show wrong email or password message
  }
});

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
console.log("Logging in");
login("ziya@mail.com", "salam123");
