import React from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const displayName = e.target.name.value;
    const password = e.target.password.value;
    history.push("/chat-list");
    // signin({ email, password, remember })
    //     .then(() => (window.location.href = "/"))
    //     .catch((response) => {
    //         sessionStorage.setItem("email", email);
    //         setError(
    //             <div className={classes.uiMessage}>
    //                 {response.data.error === "INCORRECT_PASSWORD" ? (
    //                     <>
    //                         Incorrect password. Please try again or you
    //                         can&nbsp;
    //                         <Link to="#" style={{ color: "inherit" }}>
    //                             reset your password
    //                         </Link>
    //                         .
    //                     </>
    //                 ) : (
    //                     <>
    //                         Sorry, we can&apos;t find an account with this
    //                         email address. Please try again or&nbsp;
    //                         <Link to="/" style={{ color: "inherit" }}>
    //                             create a new account
    //                         </Link>
    //                         .
    //                     </>
    //                 )}
    //             </div>
    //         );
    //     });
  };
  return (
    <div className="root-container ">
      <div className="inner-content row">
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
