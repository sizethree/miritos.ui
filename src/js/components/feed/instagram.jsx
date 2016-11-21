import FeedPhoto from "components/feed/photo";

export default function FeedInsta({activity, actor, object}) {
  let photo = {object: object.meta.photo};

  return (
    <div className="feed-display__feed-insta">
      <FeedPhoto activity={activity} object={photo} actor={actor} />
    </div>
  );
}
