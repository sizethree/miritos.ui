import Auth from "../auth";
import defer from "../defer";

function authenticated() {
  return Auth.user() ? defer.resolve(true) : defer.reject({url: "/welcome", code: 300});
}

function admin() {
  return Auth.isAdmin() ? defer.resolve(true) : defer.reject({url: "/welcome", code: 300});
}

export default {admin, authenticated};
