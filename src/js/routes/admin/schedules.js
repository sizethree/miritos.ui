import Auth from "../../services/auth";
import defer from "../../services/defer";
import Delegate from "../../services/delegates/admin/schedules";
import filters from "../../services/routing/filters";

function resolve() {
  function sorting(current, action) {
    let result = Object.assign({}, current);
    return result;
  }

  function pagination(current, action) {
    let result = Object.assign({}, current);
    return result;
  }

  let table_delegate = new Delegate();
  let table_store    = Redux.createStore(Redux.combineReducers({sorting, pagination}), {
    sorting: {rel: "start"},
    pagination: {size: 10, current: 0}
  });
  return defer.resolve({table_delegate, table_store});
}

let path   = "/admin/schedules";
let view   = "views/admin/schedules";
let before = filters.admin;

export default {path, view, resolve, before};
