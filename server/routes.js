import * as lazy from "../src/components/constants/lazy-pages";

module.exports = [
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
    component: lazy.asyncUser,
    unAuth: false
  },
  {
    path: "/post-list/posts/:id",
    exact: true,
    component: lazy.asyncPostDetails,
    unAuth: false
  },
  {
    path: "/post-list",
    exact: true,
    component: lazy.asyncPost,
    unAuth: false
  },
  {
    path: "/",
    exact: true,
    component: lazy.asyncPost,
    unAuth: false
  }
];
