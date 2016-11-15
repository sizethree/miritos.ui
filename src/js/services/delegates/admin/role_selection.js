import i18n from "services/i18n";
import Role from "resources/user_role";
import util from "services/util";
import defer from "services/defer";

const COLUMNS = [{
  rel: "name",
  name: i18n("name"),
  sortable: true,
  style: {width: "20%"}
}, {
  rel: "description",
  name: i18n("description"),
  sortable: true,
  style: {width: "80%"}
}, {
  rel: "action",
  name: "",
  sortable: false,
  style: {width: "140px"}
}];

class Delegate {

  constructor(manager) {
    this.roles = [];
    this.manager = manager;
  }

  columns() {
    return COLUMNS;
  }

  rows(store, callback) {
    let {roles, manager} = this;

    function toRow(role) {
      return {role, manager};
    }

    if(roles.warm)
      return callback(roles.map(toRow));

    function success(result) {
      util.replace(roles, result);
      roles.warm = true;
      let rows = roles.map(toRow);
      callback(rows, result.length);
      return defer.resolve(rows);
    }

    function failed(err) {
      console.error(err);
      callback([{error: true}], 0);
    }

    Role.get(null).then(success).catch(failed);
  }

}

export default Delegate;
