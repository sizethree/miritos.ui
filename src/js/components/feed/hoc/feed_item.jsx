import * as ReactDOM from "react-dom";
import * as React from "react";

import util from "services/util";

function FeedItemFactory(GridTransclusion, CardTransclusion) {

  class Box extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      let {props} = this;

      return (
        <div className="feed-display__box">
          <GridTransclusion {...props} />
        </div>
      );
    }

  }

  return Box;

}

export default FeedItemFactory;
