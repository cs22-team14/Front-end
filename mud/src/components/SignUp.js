import React from "react";
import axios from "axios";

// still need to convert to hooks / functional
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
      userName: "",
      password: "",
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
    const creds = {
      userName: this.state.userName,
      password1: this.state.password,
      password2: this.state.password2
    };
    axios
      .post("/api/register", creds)
      .then(res => {
        console.log(res);
        this.props.history.push("/home");
        localStorage.setItem("token", res.data.key);
        this.setState({
          userName: "",
          password: "",
          password2: ""
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };
  render() {
    return (
      <div className="signup-container">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={e => this.userSignup(e)}>
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
                    <MDBInput
                      // icon="lock"
                      id="password2"
                      label="Your password"
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
