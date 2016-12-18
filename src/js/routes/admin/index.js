import system from "routes/admin/system";
import schedules from "routes/admin/schedules";

import user_index from "routes/admin/users/index";
import user_details from "routes/admin/users/details";

import defer from "services/defer";
import filters from "services/routing/filters";

function resolve() {
  return defer.resolve(true);
}

let path = "/admin";
let view = "views/admin/index";
let before = filters.admin;

export default [
  {before, resolve, path, view}, 
  schedules, user_index, user_details, system
];
