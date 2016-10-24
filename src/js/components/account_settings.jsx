class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account-settings row">
        <div className="columns large-6">
          <h6 className="fg-white-darken-25">Basic Info</h6>
        </div>
        <div className="columns large-6">
          <h6 className="fg-white-darken-25">Clients</h6>
        </div>
      </div>
    );
  }

}

export default AccountSettings;
