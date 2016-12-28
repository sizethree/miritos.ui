import Item from "components/feed/hoc/feed_item";

const style = {maxWidth: "200px", maxHeight: "200px"};

export function Photo({activity, actor, object}) {
  let {url, width, height} = object;
  let full_url = `/object?url=${encodeURIComponent(url)}`;
  let bg_style = {backgroundImage: `url(${full_url})`};

  return (
    <div className="feed-display__feed-photo">
      <div className="feed-display__feed-photo-fs-background" style={bg_style}></div>
    </div>
  );
}

export default Item(Photo);
