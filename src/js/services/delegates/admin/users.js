import i18n from "../../i18n";
import util from "../../util";
import defer from "../../defer";
import User from "../../../resources/user";

const COLUMNS = [{
  rel: "id",
  name: i18n("id")
}, {
  rel: "name",
  name: i18n("name"),
  style: {width: "30%"}
}, {
  rel: "email",
  name: i18n("email"),
  style: {width: "20%"}
}, {
  rel: "date_created",
  name: i18n("date_created"),
  style: {width: "20%"}
}, {
  rel: "date_updated",
  name: i18n("date_updated"),
  style: {width: "20%"}
}, {
  rel: "actions",
  name: "",
  style: {width: "80px"}
}];

class Delegate {

  constructor() {
    this.users = [];
    let pagination = {current: 0, size: 10};
    let sorting    = {rel: "email"};
    this.state = {sorting, pagination};
  }

  pagination() {
    let {pagination} = this.state;
    return pagination;
  }

  sorting() {
    let {sorting} = this.state;
    return sorting;
  }

  rows(callback) {
    let {users, state} = this;
    let {sorting, pagination} = state;
    let orderby = sorting.order ? sorting.rel : `-${sorting.rel}`;
    let {current: page, size: limit} = pagination;
    let total = null;

    function toRow(user) {
      return {user};
    }

    function loadedUsers(result) {
      let {total} = result.$meta;
      util.replace(users, result);
      let rows = users.map(toRow);
      callback(rows, total);
      return defer.resolve(rows);
    }

    function failed() {
      callback([{error: true}], 0);
    }

    return User.get({orderby, page, limit})
      .then(loadedUsers)
      .catch(failed);
  }

  columns() {
    return COLUMNS;
  }

}

export default Delegate;
