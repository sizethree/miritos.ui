import Item from "components/feed/hoc/feed_item";
import {Photo} from "components/feed/photo";

function Grid({activity, actor, object}) {
  return (
    <div className="feed-display__feed-insta-grid-item">
      <Photo activity={activity} actor={actor} object={object.meta.photo} />
    </div>
  );
}

function Card({activity, actor, object}) {
  return (<div className="feed-display__feed-insta-card"></div>);
}

export default Item(Grid, Card);
