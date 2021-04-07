import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

// import axiosInstance from 'axios.config.js';
const styles = (theme) => ({
  wrapper: {
    margin: "10px 0px",
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});
class AddPost extends Component {
  constructor(props) {
    super();
    this.state = {
      addPost: {
        title: "",
        body: "",
        userId: 1
      },
      errors: {},
      loading: false,
      isSavePost: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    document.title = "add-post";
    if (prevProps.prePostData !== this.props.prePostData) {
      if (this.props.prePostData) {
        let post = { ...this.props.prePostData };
        this.setState({
          ...this.state,
          addPost: post,
          isSavePost: false
        });
      }
    }
  }
  addPost(e) {
    //     instace.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://react-fp.stackblitz.io';
    // instace.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    // instace.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
    // instace.defaults.headers.common['Access-Control-Allow-Credentials'] = false;
    e.preventDefault();
    if (this.validatePost()) {
      this.setState({ ...this.state, loading: true });
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.addPost)
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (this.state.isSavePost) {
              this.props.addPost(result);
            } else {
              let updatedPost = { ...this.props.prePostData };
              updatedPost.title = this.state.addPost.title;
              updatedPost.body = this.state.addPost.body;
              this.props.updatePost(updatedPost);
            }
            this.resetForm();
          },
          (error) => {
            // console.log(error);
          }
        );
    }
  }
  resetForm = () => {
    this.setState({
      ...this.state,
      addPost: {
        title: "",
        body: ""
      },
      loading: false,
      isSavePost: true
    });
  };
  validatePost() {
    let post = this.state.addPost;
    let errors = this.state.errors;
    let isValid = true;
    if (!post.title) {
      errors["title"] = true;
      isValid = false;
    }
    if (!post.body) {
      errors["body"] = true;
      isValid = false;
    }
    this.setState({ ...this.state, errors: errors });
    return isValid;
  }
  handleChange(post, e) {
    let addPost = this.state.addPost;
    let errors = this.state.errors;
    addPost[post] = e.target.value;
    errors[post] = "";
    this.setState({
      ...this.state,
      addPost,
      errors
    });
  }
  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const savePostText = this.state.isSavePost ? "Save Post" : "Update Post";
    return (
      <Card>
        <CardContent>
          <h4>Add Post</h4>
          <form className="" noValidate autoComplete="off">
            <TextField
              error={this.state.errors["title"] ? true : false}
              label="Title"
              onChange={this.handleChange.bind(this, "title")}
              value={this.state.addPost["title"] || ""}
              className="wper-100 text-field"
              margin="normal"
            />
            <TextField
              error={this.state.errors["body"] ? true : false}
              multiline
              rows="4"
              label="Post"
              onChange={this.handleChange.bind(this, "body")}
              value={this.state.addPost["body"] || ""}
              className="wper-100 text-field"
              margin="normal"
            />
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                disabled={this.state.loading}
                color="primary"
                className="wper-100 pt-10 submit-btn"
                onClick={this.addPost.bind(this)}
              >
                {savePostText}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(AddPost);

// export default AddPost
