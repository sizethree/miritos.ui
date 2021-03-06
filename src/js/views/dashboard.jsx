import FeedDisplay from "../components/feed_display";
import PhotoUpload from "../components/photo_upload_button";
import PhotoDelegate from "../services/delegates/photo_saver";

import * as ReactDOM from "react-dom";
import * as React from "react";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    let update = this.forceUpdate.bind(this);
    let {feed_delegate} = props.resolved;

    function refresh() {
      feed_delegate.items(update);
    }

    this.photo_delegate = new PhotoDelegate();

    // register listeners
    this.listeners = {upload: this.photo_delegate.on("saved", refresh)};
  }

  componentWillUnmount() {
    let {listeners} = this;
    this.photo_delegate.off(listeners.upload);
  }

  render() {
    let {photo_delegate} = this;
    let {resolved} = this.props;
    let {feed_delegate} = resolved;

    return (
      <div className="clearfix row">
        <div className="columns large-3">
          <h5>Options:</h5>
          <hr />
          <div className="clearfix align-center">
            <PhotoUpload delegate={photo_delegate} />
          </div>
        </div>
        <div className="columns large-9">
          <h5>Feed:</h5>
          <hr />
          <FeedDisplay delegate={feed_delegate} />
        </div>
      </div>
    );
  }

}

export default Dashboard;
