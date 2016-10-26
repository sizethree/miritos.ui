import defer from "services/defer";

function resolve() {
  return defer.resolve({new_user: true});
}

let path = "/welcome";
let view = "views/welcome";

export default {resolve, view, path, guest: true};
