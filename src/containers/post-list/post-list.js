// import { SnackbarProvider, withSnackbar } from 'notistack';
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import "./post-list.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Alert from "../../components/UI/dialog/alert-dialog";
import AddPost from "../../components/post/add-post/add-post";
import * as actions from "../../store/actions/index";
import PageSpinner from "../../components/UI/spinner/spinner";

import { Observable } from "rxjs";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      isBusy: true,
      openDialog: false,
      dialogData: {
        msg: "Do you want to delete?",
        title: "DELETE"
      },
      prePostData: null,
      isUpdatePost: true
    };
  }
  unsafe_componentwillmount() {
    this.props.getAllPosts();
    setTimeout(() => {
      this.setState({
        ...this.state,
        isBusy: false
      });
    }, 1000);
  }
  componentDidMount() {
    const observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next("Hello from a Observable!");
      }, 2000);
      setTimeout(() => {
        observer.complete("Completed the Observable!");
      }, 1000);
    });

    observable.subscribe((value) => value);
  }
  deletePost = (event, param, param1) => {
    if (event) {
      event.stopPropagation();
    }
    if (param !== "CONFIRM") this.deletedId = param;
    if (param == "CONFIRM") {
      this.setState({ openDialog: false });
      if (param1 && this.deletedId) {
        this.props.deletePost(this.deletedId);
      }
    } else {
      this.setState({
        ...this.state,
        openDialog: true
      });
    }
  };
  getSelectedPost(index, event) {
    event.stopPropagation();
    let post = [...this.props.posts];
    post = post[index];
    this.setState({
      ...this.state,
      prePostData: post
    });
  }
  selectPost(val) {
    this.props.history.push("/post-list/posts/" + val.id);
  }
  render() {
    let tableRows = this.props.posts;
    let finalTableRows = tableRows.length
      ? tableRows
          .map((val, index) => {
            return (
              <tr key={Math.random()} onClick={() => this.selectPost(val)}>
                <td key={Math.random()} width="10%" className="text-center">
                  {val.id}
                </td>
                <td key={Math.random()}>{val.title}</td>
                <td key={Math.random()}>{val.body}</td>
                <td
                  key={Math.random()}
                  onClick={this.getSelectedPost.bind(this, index)}
                >
                  <span className="glyphicon glyphicon-pencil"></span>
                </td>
                <td
                  key={Math.random()}
                  onClick={($event) => this.deletePost($event, val.id)}
                >
                  <span className="glyphicon glyphicon-trash"></span>
                </td>
              </tr>
            );
          })
          .reverse()
      : [];
    finalTableRows = finalTableRows.length ? (
      finalTableRows
    ) : (
      <tr key={Math.random()}>
        <td key={Math.random()} colSpan="5" className="text-center">
          No posts found
        </td>
      </tr>
    );
    return (
      <Fragment>
        <PageSpinner isShowLoader={this.state.isBusy}></PageSpinner>
        <section className="post-list">
          <div className="row">
            <div className="col-lg-7 col-sm-7 col-md-7 col-xs-7">
              <Card className="post-table">
                {!this.state.isBusy ? (
                  <CardContent>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-center">Id</th>
                          <th>Title</th>
                          <th>Post</th>
                          <th colSpan="2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>{finalTableRows}</tbody>
                    </table>
                  </CardContent>
                ) : (
                  ""
                )}
              </Card>
            </div>
            <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5">
              <AddPost
                addPost={this.props.addPost}
                updatePost={this.props.updatePost}
                prePostData={this.state.prePostData}
              />
            </div>
          </div>
        </section>
        <Alert
          data={this.state.dialogData}
          open={this.state.openDialog}
          closeDialog={(e) => this.deletePost(false, "CONFIRM", e)}
        ></Alert>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (event) => dispatch(actions.addPost(event)),
    updatePost: (event) => dispatch(actions.updatePost(event)),
    getAllPosts: () => dispatch(actions.getPosts()),
    deletePost: (postId) => dispatch(actions.deletePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
