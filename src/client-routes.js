import * as lazy from "../src/components/constants/lazy-pages";

let CLIENT_ROUTES = [
  {
    path: "/sign-up",
    exact: true,
    component: lazy.asyncSignUp,
    unAuth: true
  },
  {
    path: "/sign-in",
    exact: true,
    component: lazy.asyncSignin,
    unAuth: true
  },

  {
    path: "/",
    exact: true,
    component: lazy.asyncSignin,
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
    component: lazy.asyncUser
  },
  {
    path: "/post-list/posts/:id",
    exact: true,
    component: lazy.asyncPostDetails
  },
  {
    path: "/post-list",
    exact: true,
    component: lazy.asyncPost
  },
  {
    path: "/",
    exact: true,
    component: lazy.asyncPost,
    unAuth: false
  }
];
export { CLIENT_ROUTES };
