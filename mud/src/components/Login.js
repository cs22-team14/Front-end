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

class Login extends React.Component {
  state = {
    creds: {
      username: "",
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
    axios
      .post("https://adventure14.herokuapp.com/api/login/", this.state.creds)
      .then(res => {
        localStorage.setItem("Token", res.data.key);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="login-container">
        <Navigation />
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={e => this.login(e)}>
                    <p className="h4 text-center py-4">Please Login</p>
                    <MDBInput
                      // icon="envelope"
                      id="username"
                      label="Your username"
                      group
                      // type="email"
                      validate
                      name="username"
                      value={this.state.creds.username}
                      onChange={this.handleChanges}
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
                      onChange={this.handleChanges}
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
