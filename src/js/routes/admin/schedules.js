import Auth from "../../services/auth";
import defer from "../../services/defer";
import Delegate from "../../services/delegates/admin/schedules";

function resolve() {
  if(true !== Auth.isAdmin()) 
    return defer.reject({});

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
let before = Auth.prep;

export default {path, view, resolve, before};
