import React, { Component } from "react";
import "../signin/signin.css";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../../axios.config";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      errors: {},
      errorMsg: ""
    };
  }
  componentDidMount() {
    document.title = "sigup";
    alert("adas");
    // console.log('Component Mount');
    // if (localStorage.getItem('auth')) {
    //   this.props.history.push('/post-list');
    // } else {
    //   this.props.history.push('/');
    // }
  }
  componentWillUnmount() {
    // console.log('Component UnMount');
  }
  handleChange(user, e) {
    let users = this.state.users;
    let errors = this.state.errors;
    users[user] = e.target.value;
    errors[user] = "";
    this.setState({ users, errors });
  }
  validateLogin() {
    let user = this.state.users;
    let errors = this.state.errors;
    let isValid = true;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!user.email) {
      errors["email"] = "Please enter email";
      isValid = false;
    } else if (!pattern.test(user.email)) {
      errors["email"] = "Please enter valid email";
      isValid = false;
    }
    if (!user.password) {
      errors["password"] = "Please enter password";
      isValid = false;
    } else if (user.password && user.password.length < 6) {
      errors["password"] = "Please enter password minimum 6 characters";
      isValid = false;
    }
    this.setState({ errors: errors });
    return isValid;
  }
  register(e) {
    e.preventDefault();
    if (this.validateLogin()) {
      let req = { ...this.state.users };
      req.returnSecureToken = true;
      axiosInstance
        .post(
          axiosInstance.defaults.authUrl +
            "signupNewUser" +
            "?key=" +
            axiosInstance.defaults.authKey,
          req
        )
        .then(() => {
          this.props.history.push("/sign-in");
        })
        .catch((error) => {
          this.setState({
            ...this.state,
            errorMsg: error.response.data.error.message
          });
        });
    }
  }
  resetForm = () => {
    this.setState({
      ...this.state,
      users: {
        email: "",
        password: ""
      }
    });
  };
  render() {
    const errorMessage = this.state.errorMsg ? (
      <div className="alert alert-danger alert-dismissible">
        <strong>Error!</strong> {this.state.errorMsg}
      </div>
    ) : null;
    return (
      <div className="login">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Register</h2>
            </div>
            <form name="loginForm">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email Address"
                  onChange={this.handleChange.bind(this, "email")}
                  value={this.state.users["email"] || ""}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["email"]}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={this.handleChange.bind(this, "password")}
                  value={this.state.users["password"] || ""}
                  min="6"
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["password"]}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.register.bind(this)}
              >
                Sign Up
              </button>
            </form>
            <h6>
              Already you have an account ? Please click here{" "}
              <NavLink to={"/sign-in"}>Login</NavLink>
            </h6>
            {errorMessage}
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
