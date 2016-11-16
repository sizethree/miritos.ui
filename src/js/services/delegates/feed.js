import defer from "services/defer";
import Activity from "resources/activity";
import fetch from "services/fetch";
import util from "services/util";

let {ENV} = window;

function normalize([actor_response, object_response]) {
  let [actor]  = (actor_response && actor_response.results) || [];
  let [object] = (object_response && object_response.results) || [];
  let {item: activity}   = this;
  return defer.resolve({activity, actor, object});
}

export default class Delegate {

  constructor() {
    this.feed = [];
  }

  load() {
    let {feed}   = this;
    let activity = null;

    function finished(new_feed) {
      util.replace(feed, new_feed);
      return defer.resolve(feed);
    }

    function loadItem(item) {
      let {actor_url, object_url} = item;
      return defer.all([
        `/object?url=${encodeURIComponent(actor_url)}`, 
        `/object?url=${encodeURIComponent(object_url)}`
      ].map(fetch)).then(normalize.bind({item}));
    }

    function loaded(results) {
      activity = results;

      if(activity.length === 0) {
        feed.length = 0;
        return defer.resolve(feed);
      }

      return defer.all(activity.map(loadItem))
        .then(finished);
    }

    return Activity.feed(null).then(loaded);
  }

}
