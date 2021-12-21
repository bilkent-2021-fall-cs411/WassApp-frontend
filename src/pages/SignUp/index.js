import React from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { Link, withRouter, useHistory } from "react-router-dom";
import { register } from "~/service";

const SignUp = () => {
  const history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      displayName: e.target.name.value,
      password: e.target.password.value,
    };
    register(user, (res) => {
      handleRegister(res);
    });
  };
  const handleRegister = () => {
    history.push("/chat-list");
  };
  return (
    <div className="root-container ">
      <div className="inner-content row">
        <div className="form-box">
          <Container maxWidth="xs" className="form-container">
            <h3 className="form-title">Start using WassApp</h3>
            <form onSubmit={submit}>
              <TextField
                type="email"
                name="email"
                fullWidth
                label="Email"
                required
              />
              <TextField
                type="text"
                name="name"
                fullWidth
                label="Display Name"
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
                Sign Up
              </Button>
            </form>
            <br />
            <div style={{ color: "#737373" }}>
              Have an account?&nbsp;
              <Link to="/" className="signup-link">
                Sign in now
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default withRouter(SignUp);
