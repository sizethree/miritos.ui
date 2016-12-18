import defer from "services/defer";
import filters from "services/routing/filters";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;
  let table_delegate = new Delegate();
  return defer.resolve({table_delegate});
}

resolve.$inject = [
  "services/delegates/admin/users"
];

let path = "/admin/users";
let view = "views/admin/users/index";

export default {resolve, path, view};
