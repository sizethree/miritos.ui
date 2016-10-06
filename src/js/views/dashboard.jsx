import FeedDisplay from "../components/feed_display";

export default function Dashboard({resolved}) {
  let {feed_delegate} = resolved;
  return (
    <div className="clearfix row">
      <FeedDisplay delegate={feed_delegate} />
    </div>
  );
}
