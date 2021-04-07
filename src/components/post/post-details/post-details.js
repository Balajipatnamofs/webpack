import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";

// import axiosInstance from 'axios.config.js';

class PostDetail extends Component {
  constructor() {
    super();
    this.state = {
      details: null
    };
  }
  componentDidMount() {
    this.getPostDetails();
  }
  getPostDetails() {
    fetch(
      "https://jsonplaceholder.typicode.com/posts/" +
        this.props.match.params.id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            details: result
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    const title =
      this.state.details && this.state.details.title ? (
        <p>{this.state.details.title}</p>
      ) : (
        ""
      );
    const body =
      this.state.details && this.state.details.body ? (
        <p>{this.state.details.body}</p>
      ) : (
        ""
      );
    return (
      <Fragment>
        <Card style={{ margin: "20px" }}>
          <CardContent style={{ padding: "10px 20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Link to="/post-list">
                {" "}
                <span
                  style={{ fontSize: "20px", paddingRight: "10px" }}
                  className="glyphicon glyphicon-arrow-left"
                ></span>
              </Link>
              <h4>Post Details</h4>
            </div>
          </CardContent>
        </Card>
        <Card style={{ margin: "20px" }}>
          <CardContent>
            <h6>#{this.state.details && this.state.details.id}</h6>
            <h6>Title</h6>
            {title}
            <h6>Post</h6>
            {body}
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
export default PostDetail;

// export default AddPost
