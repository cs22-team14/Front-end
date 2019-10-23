import React from "react";
import axios from "axios";
import Navigation from "./Navigation";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class SignUp extends React.Component {
  state = {
    creds: {
      username: "",
      password1: "",
      password2: ""
    }
  };

  handleChanges = e => {
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };
  userSignup = e => {
    e.preventDefault();
    axios
      .post(
        "https://adventure14.herokuapp.com/api/registration/",
        this.state.creds
      )
      .then(res => {
        console.log(res);
        localStorage.setItem("Token", res.data.key);
        this.setState({
          userName: "",
          password1: "",
          password2: ""
        });
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };
  render() {
    return (
      <div className="signup-container">
        <Navigation />
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={e => this.userSignup(e)}>
                    <p className="h4 text-center py-4">Please Login</p>
                    <MDBInput
                      // icon="envelope"
                      id="username"
                      label="Your username"
                      group
                      // type="username"
                      validate
                      error="wrong"
                      success="right"
                      name="username"
                      value={this.state.creds.email}
                      onChange={this.handleChanges}
                    />
                    <MDBInput
                      // icon="lock"
                      id="password"
                      label="Your password"
                      group
                      type="password"
                      validate
                      name="password1"
                      value={this.state.creds.password1}
                      onChange={this.handleChanges}
                    />
                    <MDBInput
                      // icon="lock"
                      id="password2"
                      label="Verify password"
                      group
                      type="password"
                      validate
                      name="password2"
                      value={this.state.creds.password2}
                      onChange={this.handleChanges}
                    />
                    <div className="text-center mt-3">
                      <MDBBtn id="login-btn" color="primary" type="submit">
                        Signup
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default SignUp;
