function resolve() {
  return Q.resolve({new_user: true});
}

let path = "/welcome";
let view = "views/welcome";

export default {resolve, view, path};
