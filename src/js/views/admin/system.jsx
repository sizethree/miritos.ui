import * as ReactDOM from "react-dom";
import * as React from "react";

import i18n from "services/i18n";
import Breadcrumbs from "components/breadcrumbs";
import Settings from "components/admin/system_settings";

const CRUMBS = [{
  href: "/admin", 
  text: i18n("admin")
}, {
  href: "/admin/system", 
  text: i18n("system_management")
}];

function NotInitialized({manager}) {
  function initialize() {
    manager.save();
  }

  return (
    <div className="clearfix">
      <div className="clearfix margin-bottom-10">
        <p>{i18n("system_not_initialized")}</p>
      </div>
      <div className="clearfix">
        <a className="btn float-left" onClick={initialize}>{i18n("initialize")}</a>
      </div>
    </div>
  );
}


class System extends React.Component {

  constructor(props) {
    super(props);
    let {manager} = props.resolved;

    this.subscriptions = {manager: manager.subscribe(this.forceUpdate.bind(this))};
  }

  componentWillUnmount() {
    let {subscriptions} = this;
    subscriptions.manager();
  }

  render() {
    let {props} = this;
    let {manager} = props.resolved;
    let content = manager.latest.system.id ? <Settings manager={manager} /> : <NotInitialized manager={manager} />;

    return (
      <div className="clearfix row">
        <div className="margin-bottom-10"><Breadcrumbs crumbs={CRUMBS} /></div>
        <h5>{i18n("system_management")}</h5>
        <div className="margin-top-5 clearfix">{content}</div>
      </div>
    );
  }

}

export default System;
