import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { login, socket } from "~/service";

const Login = (props) => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  socket.on("connect", () => {
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("password", password);
    if (email && password) history.push("/landing");
  });
  socket.on("connect_error", (err) => {
    if (err == "Error: xhr poll error") {
      setDialogTitle("Error!");
      setDialogContent("Wrong email or password");
      setDialogOpen(true);
      socket.disconnect();
      // TODO: Login failed (probably). Show wrong email or password message
    }
  });

  const submit = (e) => {
    e.preventDefault();
    setEmail(e.target.email.value);
    setPassword(e.target.password.value);
    login(e.target.email.value, e.target.password.value);
  };
  const handleClose = () => {
    setDialogTitle("");
    setDialogContent("");
    setDialogOpen(false);
  };
  return (
    <div className="root-container ">
      <div className="inner-content row">
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div className="form-box">
          <Container maxWidth="xs" className="form-container">
            <h3 className="form-title">Welcome to WassUp</h3>
            <form onSubmit={submit}>
              <TextField
                type="email"
                name="email"
                fullWidth
                label="Email"
                required
              />
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Password"
                required
              />
              <Button
                type="submit"
                variant="outlined"
                style={{ marginTop: "24px", minHeight: "48px" }}
              >
                Sign In
              </Button>
            </form>
            <br />
            <div style={{ color: "#737373" }}>
              New to WassUp?&nbsp;
              <Link to="register" className="signup-link">
                Sign up now
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default Login;
