import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import avatar from "../../../assets/logo.svg";
import "./signin.css";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      errors: {},
      errorMsg: ""
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        ...this.state,
        errorMsg: this.props.error
      });
    }
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
    }
    this.setState({ errors: errors });
    return isValid;
  }
  login(e) {
    e.preventDefault();
    if (this.validateLogin()) {
      let req = { ...this.state.users };
      req.returnSecureToken = true;
      this.props.loginUser(req);
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
        <img src={avatar} className="img-thumbnail" height="50" width="50" />
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Login to your account</h2>
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
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["password"]}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.login.bind(this)}
              >
                Login
              </button>
            </form>
            <h6>
              You dont have an account ? Please click here{" "}
              <NavLink to={"/sign-up"}>Sign Up</NavLink>
            </h6>
            {errorMessage}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth ? state.auth.isAuth : null,
    error: state.auth.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (req) => dispatch(actions.loginUser(req))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
