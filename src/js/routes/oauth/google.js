import Auth from "services/auth"
import defer from "services/defer";

let path = "/oauth/google";

function resolve() {
  let {dependencies, querystring} = this;
  let [{default: util}] = dependencies;

  let token  = util.url.query(querystring).get("token");

  if(token)
    Auth.token(token);

  return defer.reject({code: 300, url: "/"});
}

resolve.$inject = [
  "services/util"
];

export default {path, resolve};
