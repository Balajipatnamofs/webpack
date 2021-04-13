import { Route, Switch } from "react-router-dom";
import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";

// import * as actions from "./store/actions/index";
import NavBarComponent from "./components/UI/nav-bar/nav-bar";
import SideMenu from "./components/UI/side-menu/side-menu";
import Alert from "./components/UI/dialog/alert-dialog";
import "./style.scss";
import { ROUTES } from "./routes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dialogData: {
        msg: "Do you want to logout?",
        title: "LOGOUT"
      },
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (param) => {
    this.setState({ open: false });
    if (param) {
      this.props.onLogout();
    }
  };
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  logout = () => {
    this.setState({ open: true });
  };
  render() {
    let isAuthenticated;
    if (this.props.isAuth) {
      isAuthenticated = (
        <div className="main-content">
          <SideMenu />
          <NavBarComponent logoutApp={this.logout.bind(this)} />
          <main ref={this.paneDidMount}>
            <Switch>
              {ROUTES.auth.map((route, i) => {
                return <Route key={"route-" + i} {...route} />;
              })}
            </Switch>
          </main>
        </div>
      );
    } else {
      isAuthenticated = (
        <Switch>
          {ROUTES.unAuth.map((route, i) => {
            return <Route key={"route-" + i} {...route} />;
          })}
        </Switch>
      );
    }

    return (
      <Fragment>
        {isAuthenticated}
        <Alert
          data={this.state.dialogData}
          open={this.state.open}
          closeDialog={(e) => this.handleClose(e)}
        ></Alert>
      </Fragment>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     isAuth: state.auth.isAuth ? state.auth.isAuth : null
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState()),
//     onLogout: () => dispatch(actions.logout(false))
//   };
// };
export default App;
