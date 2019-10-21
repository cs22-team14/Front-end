import React from "react";

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
      password: ""
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
    this.props.sign_up(this.state.creds);
    this.props.history.push("/Login");
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
