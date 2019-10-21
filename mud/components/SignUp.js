import React from "react";

// still need to convert to hooks / functional

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
            <div>
                <div>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.userSignup}>
                        <input
                            type="text"
                            name="userName"
                            value={this.state.creds.userName}
                            placeholder="UserName"
                            onChange={this.handleChanges}
                        />
                        <input
                            type="text"
                            name="password"
                            value={this.state.creds.password}
                            placeholder="Password"
                            onChange={this.handleChanges}
                        />
                        <button onClick={this.userSignup}>Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp