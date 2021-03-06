import TYPES from "var/object_types";
import {SemiBold, Light} from "components/type/weights";
import fetch from "services/fetch";
import i18n from "services/i18n";
import defer from "services/defer";
import Photo from "resources/photo";
import {hoc} from "hoctable";

import * as ReactDOM from "react-dom";
import * as React from "react";

function Inner({object, type}) {
  let text = null;
  let link = null;

  switch(type) {
    case TYPES.PHOTO:
      link = i18n("photo");
      break;
    case TYPES.USER:
    case TYPES.CLIENT:
      text = object.object.name;
      link = i18n("client");
      break;
    case TYPES.INSTAGRAM:
      link = i18n("instagram");
      break;
    default:
      text = null;
      break;
  }

  let inner = text ? (<p><span>{text}</span> (<a>{link}</a>)</p>) : <a>{link}</a>;

  return <div className="activity-object-label">{inner}</div>
}

function Image({image}) {
  let url = `/object?url=${encodeURIComponent(image.url)}`;

  return (
    <div className="align-left">
      <h5 className="fg-black-lighten-10 fw-300">{i18n("photo")}</h5>
      <hr />
      <img src={url} width="100%" />
    </div>
  );
}

function User({user}) {
  return (
    <div className="align-left">
      <h5 className="fg-black-lighten-10 fw-300">{i18n("user")}</h5>
      <hr />
      <p className="black-text"><Light text={i18n("name")} />: <SemiBold text={user.name} /></p>
      <p className="black-text"><Light text={i18n("email")} />: <SemiBold text={user.email} /></p>
    </div>
  );
}

function Instagram({gram, account, photo}) {
  let url = `/object?url=${encodeURIComponent(photo.url)}`;
  let style = {maxWidth: "100%", maxHeight: "360px"};

  return (
    <div className="align-left">
      <h5 className="fg-black-lighten-10 fw-300">{i18n("instagram")}</h5>
      <hr />
      <div className="align-center">
        <img className="display-block center-block margin-auto" src={url} style={style} />
      </div>
      <hr />
      <table>
        <tbody>
          <tr>
            <td><p className="black-text"><SemiBold text={i18n("instagram_user")} /></p></td>
            <td><p><Light text={account.username} /></p></td>
          </tr>
          <tr>
            <td><p className="black-text"><SemiBold text={i18n("caption")} /></p></td>
            <td><p><Light text={gram.caption} /></p></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Client({client}) {
  return (
    <div className="align-left">
      <h5 className="fg-black-lighten-10 fw-300">{i18n("client")}</h5>
      <hr />
      <p className="black-text"><Light text={i18n("name")} />: <SemiBold text={client.name} /></p>
    </div>
  );
}

function Preview({type, object}) {
  let content = null;

  switch(type) {
    case TYPES.PHOTO:
      content = <Image image={object} />;
      break;
    case TYPES.USER:
      content = <User user={object} />;
      break;
    case TYPES.CLIENT:
      content = <Client client={object} />;
      break;
    case TYPES.INSTAGRAM:
      let {photo, account} = object.meta;
      content = <Instagram gram={object.object} photo={photo} account={account} />;
      break;
    default:
      break;
  }

  return <div className="activity-card">{content}</div>;
}

export default hoc.ActionMenu(Preview, Inner);
