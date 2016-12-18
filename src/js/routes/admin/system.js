import defer from "services/defer";
import filters from "services/routing/filters";
import Manager from "services/managers/admin/system_management";

function resolve() {
  let manager = new Manager();

  function finish(results) {
    return defer.resolve({manager});
  }

  return manager.refresh().then(finish);
}

let path = "/admin/system";
let view = "views/admin/system";
let before = filters.admin;

export default {path, view, resolve, before};
