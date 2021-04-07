import React, { Component, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  wrapper: {
    margin: "10px 0px",
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});
class PageSpinner extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    const showLoader = this.props.isShowLoader ? (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            opacity: "0.6",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div
          className={`loader${classes.wrapper}`}
          style={{
            position: "absolute",
            zIndex: 10,
            background: "white",
            left: "50%",
            padding: "35px",
            borderRadius: "5px",
            margin: "auto",
            transform: "translate(-50%,300%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
          }}
        >
          <CircularProgress size={24} className={classes.buttonProgress} />
        </div>
      </div>
    ) : (
      ""
    );
    return <Fragment>{showLoader}</Fragment>;
  }
}
export default withStyles(styles)(PageSpinner);
