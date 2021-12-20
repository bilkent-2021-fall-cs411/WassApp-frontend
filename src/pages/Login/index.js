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

  useEffect(() => {
    socket.on("connect", () => {
      history.push("/landing");
    });

    socket.on("connect_error", (err) => {
      if (err == "Error: xhr poll error") {
        setDialogTitle("Error!");
        setDialogContent("Wrong email or password");
        setDialogOpen(true);
        socket.disconnect();
        window.sessionStorage.clear();
      }
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
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
            <h3 className="form-title">Welcome to WassApp</h3>
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
