import TYPES from "var/object_types";
import FeedPhoto from "components/feed/photo";
import FeedInsta from "components/feed/instagram";
import Viewport from "services/window";
import Grid from "services/grid";

const COLUMNS  = 12;
const MIN_SIZE = 1;
const MAX_SIZE = 3;

function renderItem({activity, actor, object}) {
  let {object_type} = activity;
  let Target = null;

  switch(object_type) {
    case TYPES.INSTAGRAM:
      Target = FeedInsta;
      break;
    case TYPES.PHOTO:
      Target = FeedPhoto;
      break;
  }

  if(Target === null)
    return null;

  return (
    <div className="feed-display__item" key={activity.id} data-activity={activity.id}>
      <Target key={activity.id} activity={activity} object={object} actor={actor} />
    </div>
  );
}

function rand(min, max) {
  let theta = Math.random() * max;
  return Math.floor(theta + min);
}

function reset(list_element) {
  if(!list_element) return;
  let {childNodes: children} = list_element;

  for(let i = 0, c = children.length; i < c; i++) {
    let child = children[i];
    Object.assign(child.style, {width: "", height: "", top: "", left: ""});
  }
}

function reposition(list_element) {
  if(!list_element) return;
  let {props} = this;
  let {width, height} = list_element.getBoundingClientRect();
  let {childNodes: children} = list_element;
  let {delegate} = props;

  // create the grid manager
  let grid = new Grid(width, height, COLUMNS);
  let max_size = MAX_SIZE;

  // loop over each child element, positioning them
  for(let i = 0, c = children.length; i < c; i++) {
    let child = children[i];
    let size  = rand(MIN_SIZE, max_size);

    if(size >= max_size && max_size > 1)
      max_size--;

    let {width, height, left, top} = grid.occupy(size, size);

    child.style.left = `${left}px`;
    child.style.height = `${height}px`;
    child.style.width = `${width}px`;
    child.style.top = `${top}px`;
  }
}

class FeedDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.listeners = {};
  }

  componentWillUnmount() {
    let {listeners} = this;
    Viewport.off(listeners.fullscreen);
  }

  render() {
    let {state, props, listeners} = this;
    let {delegate} = props;
    let {feed} = delegate;
    let is_fs  = state && state.fullscreen === true;
    let items  = [];
    
    for(let i = 0, c = feed.length; i < c; i++) {
      let item = renderItem(feed[i], delegate);
      if(item !== null) items.push(item);
    }

    function close() {
      let {viewport} = this.refs;
      let {current}  = Viewport.fullscreen;

      // if this call happened because we just opened, do nothing.
      if(current)
        return false;

      Viewport.off(listeners.fullscreen);
      listeners.fullscreen = null;
      this.setState({fullscreen: false});
    }

    function fullscreen() {
      let {viewport}    = this.refs;
      let is_fullscreen = Viewport.fullscreen(viewport);

      if(!is_fullscreen)
        return;

      listeners.fullscreen = Viewport.on("fullscreen", close.bind(this));
      this.setState({fullscreen: true});
    }

    function exit() {
      Viewport.fullscreen(null);
    }

    let screen_icon   = is_fs ? "ion-arrow-shrink" : "ion-arrow-expand";
    let screen_action = (is_fs ? exit : fullscreen).bind(this);
    let current_class = is_fs ? "fullscreen feed-display" : "feed-display";

    return (
      <div className={current_class} ref="viewport">
        <div className="feed-display__controls clearfix">
          <a className="btn float-right" onClick={screen_action}><i className={`${screen_icon} icon`}></i></a>
        </div>
        <div className="feed-display__item-list" ref={(is_fs ? reposition : reset).bind(this)}>{items}</div>
      </div>
    );
  }

}

export default FeedDisplay;
