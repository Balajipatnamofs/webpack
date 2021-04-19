import UsersList from "../src/containers/user-list/user-list";
import PostList from "../src/containers/post-list/post-list";
import SignIn from "../src/components/session/signin/signin";
import Signup from "../src/components/session/signup/signup";
import PostDetails from "../src/components/post/post-details/post-details";

module.exports = [
  {
    path: "/sign-up",
    exact: true,
    component: Signup,
    unAuth: true,
    meta: getMeta("Sign Up")
  },
  {
    path: "/sign-in",
    exact: true,
    component: SignIn,
    unAuth: true,
    meta: getMeta("Sign In")
  },

  {
    path: "/",
    exact: true,
    component: SignIn,
    unAuth: true
  }
  // {
  //   path: "/sign-in",
  //   exact: true,
  //   isRedirect: true,
  //   unAuth: true
  // },
  // {
  //   path: "/user-list",
  //   exact: true,
  //   component: UsersList,
  //   unAuth: false
  // },
  // {
  //   path: "/post-list/posts/:id",
  //   exact: true,
  //   component: PostDetails,
  //   unAuth: false
  // },
  // {
  //   path: "/post-list",
  //   exact: true,
  //   component: PostList,
  //   unAuth: false
  // },
  // {
  //   path: "/",
  //   exact: true,
  //   component: PostList,
  //   unAuth: false
  // }
];

function getMeta(title) {
  return {
    title: title,
    description: "Bla Bla"
  };
}
