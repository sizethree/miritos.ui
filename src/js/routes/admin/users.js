import defer from "../../services/defer";
import filters from "../../services/routing/filters";

function resolve() {
  let {promise, resolve, reject} = defer.defer();
  console.log("yay!");
  return promise;
}

let path = "/admin/users";
let view = "views/admin/users";

export default {resolve, path, view};
