import Item from "components/feed/hoc/feed_item";

function Grid({activity, actor, object}) {
  let {url, width, height} = object.meta.photo;
  let full_url = `/object?url=${encodeURIComponent(url)}`;
  let bg_style = {backgroundImage: `url(${full_url})`};

  return (
    <div className="feed-display__feed-insta-grid-item">
      <div className="feed-display__feed-photo-fs-background" style={bg_style}></div>
      <div className="feed-display__feed-photo-container">
        <img src={full_url} />
      </div>
    </div>
  );
}

function Card({activity, actor, object}) {
  return (<div className="feed-display__feed-insta-card"></div>);
}

export default Item(Grid, Card);
