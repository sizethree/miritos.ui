import Auth from "../services/auth"

function resolve() {
  let user = Auth.user();
  return Q.resolve({user});
}

resolve.$inject = [
];

let path = "/dashboard";
let view = "views/dashboard";
let before = Auth.prep;

export default {resolve, view, path, before};
