import * as ReactDOM from "react-dom";
import * as React from "react";

import Item from "components/feed/hoc/feed_item";

const style = {maxWidth: "200px", maxHeight: "200px"};

class Photo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {object: photo} = props;
    let url = `/object?url=${encodeURIComponent(photo.url)}`;
    let style = {"backgroundImage": `url(${url})`};

    return (
      <div className="feed-display__photo">
        <div className="feed-display__photo-bg" style={style}></div>
      </div>
    );
  }

}
export default Photo;
