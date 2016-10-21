import defer from "../defer";
import Activity from "../../resources/activity";
import fetch from "../fetch";
import util from "../util";

let {ENV} = window;

export default class Delegate {

  constructor() {
    this.feed = [];
  }

  load() {
    let {feed} = this;
    let {promise, resolve, reject} = defer.defer();
    let activity = null;
    let new_feed = [];

    function finished(results) {
      util.replace(feed, new_feed);
      return resolve(feed);
    }

    function load(item) {
      let {actor_url, object_url} = item;

      function loaded([actor_response, object_response]) {
        if(actor_response.status !== "SUCCESS" || object_response.status !== "SUCCESS")
          return;

        let [actor]   = actor_response.results;
        let [object]  = object_response.results;
        let feed_item = {object, actor, activity: item};
        new_feed.push(feed_item);
        return defer.resolve(feed_item);
      }

      return defer.all([
        `/object?url=${encodeURIComponent(actor_url)}`, 
        `/object?url=${encodeURIComponent(object_url)}`
      ].map(fetch)).then(loaded);
    }

    function loaded(err, results) {
      if(err) return reject(new Error(err));

      activity = results;

      if(activity.length === 0) {
        feed.length = 0;
        return resolve(feed);
      }

      defer.all(activity.map(load))
        .then(finished)
        .catch(reject);
    }

    Activity.get(null, loaded);

    return promise;
  }

}
