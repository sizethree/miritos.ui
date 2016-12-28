import TYPES from "var/object_types";
import {services} from "hoctable";
import Allocator from "services/grid/allocator";
import Renderer from "services/grid/renderer";
import utils from "services/util";

const COLUMNS  = 12;
const MIN_SIZE = 1;
const MAX_SIZE = 3;

class FeedDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.listeners = {};
    this.rendered  = [];
    this.state     = {fullscreen: false};
  }

  componentWillUnmount() {
    let {listeners} = this;
    services.Viewport.off(listeners.fullscreen);
  }

  transclude(list_el) {
    let {state, rendered, props} = this;
    let {delegate} = props;

    if(list_el === null)
      return false;

    function render(items) {
      let is_fs = state.fullscreen === true;
      let {width, height} = list_el.getBoundingClientRect();

      function occupy() {
        let box = width / COLUMNS;
        return {width: box, height: box};
      }

      let allocator = is_fs ? new Allocator(width, height, COLUMNS) : {occupy};

      for(let i = 0, c = items.length; i < c; i++) {
        let activity_item = items[i];
        let {top, left, width, height} = allocator.occupy(1,1);
        let style = {
          top    : top ? `${top}px` : "",
          left   : left ? `${left}px` : "", 
          width  : width ? `${width}px` : "", 
          height : height ? `${height}px` : ""
        };

        let child = utils.dom.create("div", style, ["feed-display__grid-item"]);
        let node  = <activity_item.display {...activity_item} />;

        ReactDOM.render(node, child);
        list_el.appendChild(child);
        rendered.push(child);
      }
    }

    while(rendered.length) {
      let item = rendered.shift();
      ReactDOM.unmountComponentAtNode(item);
      utils.dom.remove(item);
    }

    list_el.innerHTML = "";
    delegate.feed(render.bind(this));
  }

  render() {
    let {state, props, listeners} = this;
    let is_fs  = state && state.fullscreen === true;
   
    function close() {
      let {rendered} = this;
      let {viewport} = this.refs;
      let {current}  = services.Viewport.fullscreen;

      // if this call happened because we just opened, do nothing.
      if(current)
        return false;

      services.Viewport.off(listeners.fullscreen);
      listeners.fullscreen = null;
      this.setState({fullscreen: false});
    }

    function fullscreen() {
      let {rendered}    = this;
      let {viewport}    = this.refs;
      let is_fullscreen = services.Viewport.fullscreen.open(viewport);

      if(!is_fullscreen)
        return;

      listeners.fullscreen = services.Viewport.on("fullscreen", close.bind(this));
      this.setState({fullscreen: true});
    }

    function exit() {
      services.Viewport.fullscreen.open(null);
    }

    let screen_icon   = is_fs ? "ion-arrow-shrink" : "ion-arrow-expand";
    let screen_action = (is_fs ? exit : fullscreen).bind(this);
    let current_class = is_fs ? "fullscreen feed-display" : "feed-display";

    return (
      <div className={current_class} ref="viewport">
        <div className="feed-display__controls clearfix">
          <a className="btn float-right" onClick={screen_action}><i className={`${screen_icon} icon`}></i></a>
        </div>
        <div className="feed-display__item-list" ref={this.transclude.bind(this)}></div>
      </div>
    );
  }

}

export default FeedDisplay;
