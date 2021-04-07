import asyncComponent from "../../hoc/asyncComponent/asyncComponent";

export const asyncUser = asyncComponent(() => {
  return import("../../containers/user-list/user-list");
});
export const asyncPost = asyncComponent(() => {
  return import("../../containers/post-list/post-list");
});
export const asyncSignin = asyncComponent(() => {
  return import("../../components/session/signin/signin");
});
export const asyncSignUp = asyncComponent(() => {
  return import("../../components/session/signup/signup");
});
export const asyncPostDetails = asyncComponent(() => {
  return import("../../components/post/post-details/post-details");
});
