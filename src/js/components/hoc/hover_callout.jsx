import Popups from "services/popups";
import util from "services/util";

const TARGET_TOP_BUFFER = 3;

function CalloutFactory(InnerComponent, CalloutComponent) {

  class Callout extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      function enter(event) {
        let target    = event.currentTarget;
        let bounding  = target.getBoundingClientRect();
        let top       = util.dom.px(bounding.top + bounding.height + TARGET_TOP_BUFFER);
        let placement = {top};

        if(bounding.left > window.innerWidth * 0.5) {
          placement.right = util.dom.px(window.innerWidth - (bounding.left + bounding.width));
        } else {
          placement.left = util.dom.px(bounding.left);
        }

        // open the popup component with all of the props that were given to us
        this.popup = Popups.open(<CalloutComponent {...this.props} />, placement);
      }

      function leave() {
        Popups.close(this.popup);
      }

      return (
        <div className="callout cursor-auto" onMouseOver={enter.bind(this)} onMouseOut={leave.bind(this)}>
          <InnerComponent {...this.props} />
        </div>
      );
    }

  }

  return Callout;

}

export default CalloutFactory;
