import Auth from "services/auth";
import defer from "services/defer";
import filters from "services/routing/filters";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;
  let table_delegate = new Delegate();

  return defer.resolve({table_delegate});
}

resolve.$inject = [
  "services/delegates/admin/schedules"
];

let path   = "/admin/schedules";
let view   = "views/admin/schedules";
let before = filters.admin;

export default {path, view, resolve, before};
