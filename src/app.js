import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// import * as actions from "./store/actions/index";
import * as lazy from "./components/constants/lazy-pages";
import NavBarComponent from "./components/UI/nav-bar/nav-bar";
import SideMenu from "./components/UI/side-menu/side-menu";
import Alert from "./components/UI/dialog/alert-dialog";
import "./style.scss";
import { CLIENT_ROUTES } from "../src/client-routes";
import { Helmet } from "react-helmet";

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
      // this.props.onLogout();
    }
  };
  componentDidMount() {
    // this.props.onTryAutoSignup();
  }
  logout = () => {
    this.setState({ open: true });
  };
  // scrollPage = (event) => {
  //   console.log(window)
  // }
  // paneDidMount = (node) => {
  //   if (node) {
  //     node.addEventListener('scroll', (e) =>
  //       console.log('scroll!', e.target.scrollTop));
  //   }
  // };
  render() {
    let isAuthenticated;
    // console.log(this.props)
    if (this.props.isAuth) {
      <Switch>
        {CLIENT_ROUTES.map((val, index) => {
          return !val.isRedirect && !val.unAuth ? (
            <Route {...val} key={"routes-" + index} />
          ) : (
            <Redirect to={val.path} key={"routes-" + index} />
          );
        })}
      </Switch>;

      // isAuthenticated = (
      //   <div className="main-content">
      //     <SideMenu />
      //     <NavBarComponent logoutApp={this.logout.bind(this)} />
      //     <main ref={this.paneDidMount}>
      //       <Switch>
      //         <Route path="/user-list" component={lazy.asyncUser} />
      //         <Route
      //           path="/post-list/posts/:id"
      //           component={lazy.asyncPostDetails}
      //         />
      //         <Route path="/post-list" component={lazy.asyncPost} />
      //         <Route path="/" exact component={lazy.asyncPost} />
      //         <Redirect to="/post-list" />
      //       </Switch>
      //     </main>
      //   </div>
      // );
    } else {
      isAuthenticated = (
        <Switch>
          {CLIENT_ROUTES.map((val, index) => {
            return !val.isRedirect && val.unAuth ? (
              <Route {...val} key={"routes-" + index} />
            ) : (
              <Redirect to={val.path} key={"routes-" + index} />
            );
          })}
        </Switch>
      );
    }
    return (
      <>
        <div>
          <Helmet>
            <title>Sign IN</title>
          </Helmet>
          {isAuthenticated}
          <Alert
            data={this.state.dialogData}
            open={this.state.open}
            closeDialog={(e) => this.handleClose(e)}
          ></Alert>
        </div>
      </>
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
