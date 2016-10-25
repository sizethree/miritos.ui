import Auth from "services/auth";
import defer from "services/defer";
import Delegate from "services/delegates/admin/schedules";
import filters from "services/routing/filters";
import tableStore from "services/store_factories/paged_table";

function resolve() {
  let table_delegate = new Delegate();
  let table_store    = tableStore("start", 10);
  return defer.resolve({table_delegate, table_store});
}

let path   = "/admin/schedules";
let view   = "views/admin/schedules";
let before = filters.admin;

export default {path, view, resolve, before};
