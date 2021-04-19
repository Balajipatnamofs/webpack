import UsersList from "./containers/user-list/user-list";
import PostList from "./containers/post-list/post-list";
import SignIn from "./components/session/signin/signin";
import Signup from "./components/session/signup/signup";
import PostDetails from "./components/post/post-details/post-details";

let CLIENT_ROUTES = [
  {
    path: "/sign-up",
    exact: true,
    component: Signup,
    unAuth: true
  },
  {
    path: "/sign-in",
    exact: true,
    component: SignIn,
    unAuth: true
  },
  {
    path: "/",
    exact: true,
    component: SignIn,
    unAuth: true
  },
  {
    path: "/sign-in",
    exact: true,
    isRedirect: true,
    unAuth: true
  },
  {
    path: "/user-list",
    exact: true,
    component: UsersList,
    unAuth: false
  },
  {
    path: "/post-list/posts/:id",
    exact: true,
    component: PostDetails,
    unAuth: false
  },
  {
    path: "/post-list",
    exact: true,
    component: PostList,
    unAuth: false
  },
  {
    path: "/",
    exact: true,
    component: PostList,
    unAuth: false
  }
];
export { CLIENT_ROUTES };
