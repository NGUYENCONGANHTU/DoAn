import Cookies from "js-cookie";
import { Constants } from "@/constants/constants";
import { UserLoginInfo } from "@/cheetah-core/mixins/user-login-info";

export function authenticatorLogin(to, from, next) {
  // get token
  const getTokenCookie = Cookies.get(Constants.token);
  // get user info
  const me = UserLoginInfo.methods.getUserLogin(Constants.me);
  // check admin login
  if (getTokenCookie && me) {
    const isAuthenticated = getTokenCookie === me.token;
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next("/login");
  }
}