import TYPES from "var/object_types";
import {SemiBold, Light} from "components/type/weights";
import fetch from "services/fetch";
import i18n from "services/i18n";
import defer from "services/defer";
import Photo from "resources/photo";
import Callout from "components/hoc/action_menu";

function Inner({object, type}) {
  let text = null;
  let link = null;

  switch(type) {
    case TYPES.PHOTO:
      link = i18n("photo");
      break;
    case TYPES.USER:
    case TYPES.CLIENT:
      text = object.name;
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

function Instagram({gram}) {
  return (
    <div className="align-left">
      <h5 className="fg-black-lighten-10 fw-300">{i18n("instagram")}</h5>
      <hr />
      <p className="black-text"><Light text={i18n("caption")} />: <SemiBold text={gram.caption} /></p>
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
      content = <Instagram gram={object} />;
      break;
    default:
      break;
  }

  return <div className="activity-card">{content}</div>;
}

export default Callout(Inner, Preview);
