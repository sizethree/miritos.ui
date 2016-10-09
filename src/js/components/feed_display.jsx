import fetch from "../services/fetch";
import Activity from "../resources/activity";
import TYPES from "../var/object_types";
import FeedPhoto from "./feed_photo";

function renderItem({activity, actor, object}) {
  let {object_type} = activity;
  let child = null;

  switch(object_type) {
    case TYPES.PHOTO:
      let {url} = object;
      let full = `/object?url=${encodeURIComponent(url)}`;
      child = <FeedPhoto activity={activity} actor={actor} object={object} />
      break;
  }

  if(child === null)
    return null;

  return <div className="feed-display__feed-item float-left" key={activity.id}>{child}</div>
}

function notNull(x) {
  return x !== null;
}

function FeedDisplay({delegate}, context, {enqueueForceUpdate}) {
  let {feed} = delegate;
  let items  = feed.map(renderItem).filter(notNull);

  return (
    <div className="clearfix feed-display position-relative">{items}</div>
  );
}

export class Delegate {

  constructor() {
    this.feed = [];
  }

  load() {
    let {feed} = this;
    let {promise, resolve, reject} = Q.defer();
    let activity = null;

    function finished(results) {
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
        feed.push(feed_item);
        Q.resolve(feed_item);
      }

      return Q.all([
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

      Q.all(activity.map(load))
        .then(finished)
        .catch(reject);
    }

    Activity.get(null, loaded);

    return promise;
  }

}

export default FeedDisplay;
