const style = {maxWidth: "200px", maxHeight: "200px"};

export default function FeedPhoto({activity, actor, object}) {
  let {url} = object;
  let full  = `/object?url=${encodeURIComponent(url)}`;

  return (
    <div className="feed-display__feed-photo">
      <img src={full} style={style} />
    </div>
  )
}
