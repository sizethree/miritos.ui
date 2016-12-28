import FeedPhoto from "components/feed/photo";
import defer from "services/defer";

function load(photo) {
  console.log(photo);
  return defer.resolve({display: FeedPhoto});
}

export default load;
