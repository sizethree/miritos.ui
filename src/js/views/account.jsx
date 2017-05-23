import * as ReactDOM from "react-dom";
import * as React from "react";

import i18n from "../services/i18n";
import AccountSettings from "../components/account_settings";

export default function Account({resolved: {account_delegate}}) {
  return (
    <div className="clearfix row">
      <h4 className="fg-white-darken-15">{i18n("your_account")}</h4>
      <AccountSettings delegate={account_delegate} />
    </div>
  );
}
