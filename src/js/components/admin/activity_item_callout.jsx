import TYPES from "var/object_types";
import {SemiBold, Light} from "components/type/weights";
import fetch from "services/fetch";
import i18n from "services/i18n";
import defer from "services/defer";
import Photo from "resources/photo";
import Callout from "components/hoc/action_menu";

function Inner({activity = {}}) {
  return (<a className="cursor-pointer">{i18n(activity.verb)} ({i18n("hover_to_view")})</a>);
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

  return <div className="activity-card__preview-content">{content}</div>;
}

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.canceled = true;
  }

  load() {
    let {activity} = this.props;

    function loaded([actor_response, object_response]) {
      if(this.canceled) return;
      let {results: [actor]} = actor_response;
      let {results: [object]} = object_response;
      this.setState({actor, object, loaded: true});
    }

    defer.all([
      `/object?url=${encodeURIComponent(activity.actor_url)}`, 
      `/object?url=${encodeURIComponent(activity.object_url)}`
    ].map(fetch)).then(loaded.bind(this));
  }

  render() {
    let {state, props} = this;
    let {activity} = props;

    if(!state || !state.loaded) {
      this.load();
      return (<div className="activity-card activity-card--loading"><p>{i18n("loading_please_wait")}</p></div>);
    }

    let {actor, object} = this.state;

    return (
      <div className="activity-card activity-card--loaded">
        <div className="row collapse">
          <div className="columns large-6 activity-card__preview">
            <Preview type={activity.actor_type} object={actor} />
          </div>
          <div className="columns large-6 activity-card__preview">
            <Preview type={activity.object_type} object={object} />
          </div>
        </div>
      </div>
    );
  }

}

export default Callout(Inner, Card);
