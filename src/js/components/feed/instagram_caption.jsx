import * as ReactDOM from "react-dom";
import * as React from "react";

import Photo from "components/feed/photo";

const style = {maxWidth: "200px", maxHeight: "200px"};

class Instagram extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {meta, object: gram} = props.object;
    let {account} = meta;

    return (
      <div className="feed-display__instagram-caption position-relative">
        <div className="clearfix padding-bottom-5 margin-bottom-5">
          <h5 className="fg-white">{account.username}</h5>
        </div>
        <div className="clearfix">
          <p className="fg-white">{gram.caption}</p>
        </div>
        <div className="clearfix padding-top-5 margin-top-5">
        </div>
      </div>
    );
  }

}
export default Instagram;
