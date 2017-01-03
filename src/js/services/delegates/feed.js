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

  items(callback) {
    let {objects, activities} = this;

    function map(activity) {
      let [actor]  = objects.filter(function({uuid}) { return uuid === activity.actor_uuid; });
      let [object] = objects.filter(function({uuid}) { return uuid === activity.object_uuid; });
      return {activity, actor, object};
    }

    function finished(results) {
      util.replace(objects, results);
      let feed_items = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        feed_items.push(map(activities[i]));
      }

      callback(feed_items);
      return defer.resolve(feed_items);
    }

    function loaded(results) {
      util.replace(activities, results);

      if(activities.length === 0) {
        callback([]);
        return defer.resolve([]);
      }

      let register = [];
      let objects  = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        // get the type and the uuid from the actors and objects
        let {actor_type, object_type, object_uuid, actor_uuid} = activities[i];

        // load in the actor if not already in our unique list
        if(register.indexOf(actor_uuid) === -1) {
          register.push(actor_uuid);
          objects.push({uuid: actor_uuid, type: actor_type});
        }

        // load in the object if not already in our unique list
        if(register.indexOf(object_uuid) === -1) {
          register.push(object_uuid);
          objects.push({uuid: object_uuid, type: object_type});
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
