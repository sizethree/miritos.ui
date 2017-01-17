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
    let {photo, account} = meta;
    let photo_object = {object: photo};

    return (
      <div className="feed-display__instagram position-relative">
        <div className="feed-display__instagram-source-icon z-2 position-absolute left-1 top-1">
          <i className="ion-social-instagram-outline icon fg-white fs-1-8"></i>
        </div>
        <div className="feed-display__instagram-photo-container position-relative z-1">
          <Photo object={photo_object} />
        </div>
      </div>
    );
  }

}
export default Instagram;
