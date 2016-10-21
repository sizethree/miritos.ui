import classes from "./classes";
import defer from "../../defer";

const FADE_DELAY = 501;

function slideOut(e) {
  let {promise, resolve} = defer.defer();
  classes.add(e, "slide-out-up", "fast", "mui-leave", "mui-leave-active", "ease-in");
  setTimeout(resolve, FADE_DELAY);
  return promise;
}

export default {slideOut};
