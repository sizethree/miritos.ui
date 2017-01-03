import * as ReactDOM from "react-dom";
import * as React from "react";

import i18n from "services/i18n";

function Card({name, icon, path}) {
  const className = `icon ${icon}`;
  return (
    <div className="card grey lighten-5">
      <div className="card-content black-text">
        <h6 className="card-title">{i18n(name)} <i className={className}></i></h6>
        <p>{i18n(`${name}_description`)}</p>
      </div>
      <div className="card-action">
        <a href={path}>{i18n("go")}</a>
      </div>
    </div>
  );
}

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="admin-index">
        <div className="row clearfix">
          <div className="columns large-6 small-12">
            <Card name="schedule_management" icon="ion-calendar" path="/admin/schedules" />
          </div>
          <div className="columns large-6 small-12">
            <Card name="user_management" icon="ion-calendar" path="/admin/users" />
          </div>
        </div>
        <div className="row clearfix">
          <div className="columns large-6 small-12">
            <Card name="system_management" icon="ion-settings" path="/admin/system" />
          </div>
        </div>
      </div>
    );
  }

}

export default Index;
