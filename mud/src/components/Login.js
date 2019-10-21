import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class Login extends React.Component {
  state = {
    creds: {
      email: "",
      password: ""
    }
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    console.log("logging in");
    axiosWithAuth()
      .post("/api/login", this.state.creds)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="login-container">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={e => this.login(e)}>
                    <p className="h4 text-center py-4">Please Login</p>
                    <MDBInput
                      // icon="envelope"
                      id="email"
                      label="Your email"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      name="email"
                      value={this.state.creds.email}
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      // icon="lock"
                      id="password"
                      label="Your password"
                      group
                      type="password"
                      validate
                      name="password"
                      value={this.state.creds.password}
                      onChange={this.handleChange}
                    />
                    <div className="text-center mt-3">
                      <MDBBtn id="login-btn" color="primary" type="submit">
                        Login
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

export default Login;
