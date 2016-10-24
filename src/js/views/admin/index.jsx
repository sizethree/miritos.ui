import i18n from "../../services/i18n";

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="columns large-6 small-12">
          <div className="card grey lighten-5">
            <div className="card-content black-text">
              <h6 className="card-title">{i18n("schedule_management")} <i className="ion-calendar icon"></i></h6>
              <p>{i18n("schedule_management_description")}</p>
            </div>
            <div className="card-action">
              <a href="/admin/schedules">{i18n("go")}</a>
            </div>
          </div>
        </div>
        <div className="columns large-6 small-12">
          <div className="card grey lighten-5">
            <div className="card-content black-text">
              <h6 className="card-title">{i18n("user_management")} <i className="icon ion-person-stalker"></i></h6>
              <p>{i18n("user_management_description")}</p>
            </div>
            <div className="card-action">
              <a href="/admin/users">{i18n("go")}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Index;
