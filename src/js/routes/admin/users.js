import defer from "../../services/defer";
import filters from "../../services/routing/filters";
import tableStore from "../../services/store_factories/paged_table";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;
  let table_delegate = new Delegate();
  let table_store    = tableStore("email", 10);
  return defer.resolve({table_delegate, table_store});
}

resolve.$inject = [
  "services/delegates/admin/users"
];

let path = "/admin/users";
let view = "views/admin/users";

export default {resolve, path, view};
