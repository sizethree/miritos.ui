import i18n from "services/i18n";
import Basic from "components/account/basic_info";
import Links from "components/account/linked_accounts";
import * as React from "react";

class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {delegate: account_delegate} = this.props;

    return (
      <div className="account-settings">
        <div className="row margin-bottom-10 collapse">
          <div className="columns large-6">
            <h6 className="margin-bottom-10 fg-white-darken-25">{i18n("basic_info")}</h6>
            <div className="clearfix"><Basic delegate={account_delegate} /></div>
          </div>
          <div className="columns large-6">
            <h6 className="fg-white-darken-25">{i18n("clients")}</h6>
          </div>
        </div>
        <div className="row margin-bottom-10">
          <div className="columns large-6">
            <h6 className="fg-white-darken-25">{i18n("linked_accounts")}</h6>
            <div className="clearfix"><Links delegate={account_delegate} /></div>
          </div>
        </div>
      </div>
    );
  }

}

export default AccountSettings;
