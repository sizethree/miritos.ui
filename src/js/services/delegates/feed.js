import defer from "services/defer";
import Activity from "resources/activity";
import fetch from "services/fetch";
import loader from "services/object_loader";
import util from "services/util";

let {ENV} = window;

function objectUrl(s) {
  return `/object?url=${encodeURIComponent(s)}`;
}

function normalize([actor_response, object_response]) {
  let [actor]  = (actor_response && actor_response.results) || [];
  let [object] = (object_response && object_response.results) || [];
  let {item: activity}   = this;
  return defer.resolve({activity, actor, object});
}

export default class Delegate {

  constructor() {
    this.activities = []
    this.objects    = [];
  }

  feed(callback) {
    let {objects, activities} = this;

    function map(activity) {
      let [actor]  = objects.filter(function({url}) { return url === activity.actor_url; });
      let [object] = objects.filter(function({url}) { return url === activity.object_url; });
      let {display} = object;
      return {activity, actor, object, display};
    }

    function finished(results) {
      util.replace(objects, results);
      let feed_items = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        feed_items.push(map(activities[i]));
      }

      return callback(feed_items);
    }

    function loaded(results) {
      util.replace(activities, results);

      if(activities.length === 0)
        return callback([]);

      let unique_urls = [];
      let objects = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        let {actor_url, object_url, actor_type, object_type} = activities[i];

        if(unique_urls.indexOf(actor_url) === -1) {
          unique_urls.push(actor_url);
          objects.push({url: actor_url, type: actor_type});
        }

        if(unique_urls.indexOf(object_url) === -1) {
          unique_urls.push(object_url);
          objects.push({url: object_url, type: object_type});
        }
      }

      // at this point,we have a list of all the objects that are involved in this activity
      // feed, so we can send them to the object loader which will actually load in the
      // record as well as any other related records.
      return loader.all(objects).then(finished);
    }

    return Activity.feed({limit: 100}).then(loaded);
  }

}
