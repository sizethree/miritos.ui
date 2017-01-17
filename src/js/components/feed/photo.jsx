import * as ReactDOM from "react-dom";
import * as React from "react";

const style = {maxWidth: "200px", maxHeight: "200px"};

class Photo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {object} = props;
    let {object: photo} = object;
    let url = `/object?url=${encodeURIComponent(photo.url)}`;
    let style = {"backgroundImage": `url(${url})`};

    return (
      <div className="feed-display__photo position-relative">
        <div className="feed-display__photo-bg position-absolute left-0 top-0" style={style}></div>
      </div>
    );
  }

}
export default Photo;
