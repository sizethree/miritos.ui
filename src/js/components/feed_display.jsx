import TYPES from "../var/object_types";
import FeedPhoto from "./feed_photo";

function renderItem({activity, actor, object}) {
  let {object_type} = activity;
  let Target = null;

  switch(object_type) {
    case TYPES.PHOTO:
      Target = FeedPhoto;
      break;
  }

  if(Target === null)
    return null;

  return <Target key={activity.id} activity={activity} object={object} actor={actor} />
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

export default FeedDisplay;
