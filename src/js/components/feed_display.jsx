import TYPES from "var/object_types";

import Unkown           from "components/feed/unknown";
import Photo            from "components/feed/photo";
import InstagramPhoto   from "components/feed/instagram_photo";
import InstagramCaption from "components/feed/instagram_caption";

import * as React from "react";
import {services, hoc} from "hoctable";

class Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {object} = props.item;

    let InnerPreview = Unkown;

    switch(object.type) {
      case TYPES.PHOTO:
        InnerPreview = Photo;
        break;
      case TYPES.INSTAGRAM:
        InnerPreview = Photo;
        let {photo} = object.meta;
        object = {object: {object: photo}};
        break;
    }

    return (<div className="feed-display__preview"><InnerPreview object={object.object} /></div>);
  }

}

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {props} = this;
    let {actor, object} = props.item;

    let Left  = Unkown;
    let Right = Unkown;

    switch(object.type) {
      case TYPES.PHOTO:
        Left = Photo;
        break;
      case TYPES.INSTAGRAM:
        Left  = InstagramPhoto;
        Right = InstagramCaption;
        actor = object;
        break;
      case TYPES.USER:
        console.log("user");
        break;
    }

    return (
      <div className="feed-display__card clearfix">
        <div className="display-flex display-flex-row">
          <div className="display-inline-block">
            <div className="position-relative padding-tb-10 padding-left-10 padding-right-5">
              <Left object={object} />
            </div>
          </div>
          <div className="display-inline-block">
            <div className="position-relative padding-tb-10 padding-right-10 padding-left-5">
              <Right object={actor} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default hoc.Wall(Preview, Card);
