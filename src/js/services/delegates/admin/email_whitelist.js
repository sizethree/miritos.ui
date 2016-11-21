import i18n from "services/i18n";
import defer from "services/defer";
import uuid from "services/uuid";
import util from "services/util";
import {Engine} from "services/events";
import Domain from "resources/email_domain_whitelist";

const COLUMNS = [{
  rel: "id",
  name: i18n("id"),
  sortable: true,
  style: {width: "10%"}
}, {
  rel: "domain",
  name: i18n("domain"),
  sortable: true,
  style: {width: "75%"}
}, {
  rel: "date_created",
  name: i18n("date_created"),
  sortable: true,
  style: {width: "15%"}
}, {
  rel: "action",
  name: "",
  sortable: false,
  style: {width: "120px"}
}];


class Delegate extends Engine {

  constructor() {
    super();
    this.domains = [];
  }

  rows(store, callback) {
    let {domains} = this;
    let remove = this.remove.bind(this);

    function loaded(results) {
      util.replace(domains, results);
      let {total} = results.$meta;

      if(!total)
        return callback([{empty: true}], 1);

      let rows = results.map(function(domain) { return {remove, domain}; });
      return callback(rows, total);
    }

    Domain.get({}).then(loaded);
  }

  columns() {
    return COLUMNS.slice(0);
  }

  remove(domain) {
    let {id} = domain;

    function success() {
      this.trigger("update");
      return defer.resolve(true);
    }

    return Domain.destroy({id}).then(success.bind(this));
  }

  add(domain) {
    function success(result) {
      this.trigger("update");
      return defer.resolve(result);
    }

    return Domain.create({domain}).then(success.bind(this));
  }

}

export default Delegate;
