import Signin from "./components/session/signin/signin";
import SignUp from "./components/session/signup/signup";
import User from "./containers/user-list/user-list";
import Posts from "./containers/post-list/post-list";
import PostDetails from "./components/post/post-details/post-details";

const ROUTES = {
  unAuth: [
    {
      path: "/sign-in",
      component: Signin,
      exact: true
    },
    {
      path: "/sign-up",
      component: SignUp,
      exact: true
    },
    {
      path: "/",
      component: Signin,
      exact: true
    }
  ],
  auth: [
    {
      path: "/user-list",
      component: User,
      exact: true
    },
    {
      path: "/post-list/posts/:id",
      component: PostDetails,
      exact: true
    },
    {
      path: "/post-list",
      component: Posts,
      exact: true
    },
    {
      path: "/",
      component: Posts,
      exact: true
    },
    {
      path: "/post-list",
      isRedirect: true
    }
  ]
};
export { ROUTES };
