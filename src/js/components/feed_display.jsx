import TYPES from "var/object_types";
import Unkown from "components/feed/unknown";
import Photo from "components/feed/photo";

import {services, hoc} from "hoctable";
import * as React from "react";

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
        object = {object: photo};
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
    let {object} = props.item;

    let Left  = Unkown;
    let Right = Unkown;

    switch(object.type) {
      case TYPES.PHOTO:
        Left = Photo;
        break;
      case TYPES.INSTAGRAM:
        Left = Photo;
        let {photo} = object.meta;
        object = {object: photo};
        break;
      case TYPES.USER:
        console.log("user");
        break;
    }

    return (
      <div className="feed-display__card clearfix">
        <div className="float-left">
          <Left object={object.object} />
        </div>
        <div className="float-right">
          <Right object={object.actor} />
        </div>
      </div>
    );
  }

}

export default hoc.Wall(Preview, Card);
