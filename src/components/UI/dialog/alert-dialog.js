import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Alert = (props) => {
  let { closeDialog, confirmDialog } = props;
  closeDialog = () => {
    props.closeDialog(false);
  };
  confirmDialog = () => {
    props.closeDialog(true);
  };
  return (
    <Dialog
      open={props.open}
      // onClose={this.closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="logout"
    >
      <DialogTitle className="title">{props.data.title}</DialogTitle>
      <DialogContent className="body">
        <DialogContentText id="alert-dialog-description">
          {props.data.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="action">
        <Button onClick={closeDialog} color="primary">
          No
        </Button>
        <Button onClick={confirmDialog} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Alert;
