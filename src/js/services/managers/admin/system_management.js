import uuid from "services/uuid";
import util from "services/util";
import defer from "services/defer";
import System from "resources/system";

class Manager {

  constructor() {
    this.revisions = [];
    this.system = {};
    this.subscriptions = [];
  }

  get latest() {
    let {revisions} = this;
    let system = Object.assign({}, this.system);

    for(let i = 0, c = revisions.length; i < c; i++) {
      let {field, value} = revisions[i];
      system[field] = value;
    }

    return {system};
  }

  publish() {
    let {subscriptions} = this;

    for(let i = 0, c = subscriptions.length; i < c; i++) {
      let {fn} = subscriptions[i];
      if("function" === typeof fn) fn();
    }
  }

  clear() {
    let {revisions} = this;
    revisions.length = 0;
    this.publish();
  }

  dispatch(payload) {
    let {revisions} = this;
    let unique = [];

    for(let i = 0, c = revisions.length; i < c; i++) {
      let {field} = revisions[i];
      if(field === payload.field) continue;
      unique.push(revisions[i]);
    }

    util.replace(revisions, unique);

    revisions.push(payload);
    this.publish();
  }

  refresh() {
    let {system, revisions} = this;
    let publish = this.publish.bind(this);

    function success(results) {
      let [updated] = results;
      Object.assign(system, updated);
      revisions.length = 0;
      publish();
      return defer.resolve({system});
    }

    function failed() {
      return defer.resolve();
    }

    return System.get({}).then(success).catch(failed);
  }

  subscribe(fn) {
    let {subscriptions} = this;
    let id = uuid();
    subscriptions.push({id, fn});

    function remove() {
      for(let i = 0, c = subscriptions.length; i < c; i++) {
        let s = subscriptions[i];
        if(s.id !== id) continue;
        subscriptions.splice(i, 1);
        break;
      }
    }

    return remove;
  }

  save() {
    let {latest, revisions} = this;
    let {system} = latest || {};

    function finished() {
      revisions.length = 0;
      return this.refresh();
    }

    return System.update(system).then(finished.bind(this));
  }

}

export default Manager;
