import i18n from "../services/i18n";

class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account-settings row">
        <div className="columns large-6">
          <h6 className="fg-white-darken-25">{i18n("basic_info")}</h6>
        </div>
        <div className="columns large-6">
          <h6 className="fg-white-darken-25">{i18n("clients")}</h6>
        </div>
      </div>
    );
  }

}

export default AccountSettings;
