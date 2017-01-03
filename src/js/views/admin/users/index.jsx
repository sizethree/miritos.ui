import * as ReactDOM from "react-dom";
import * as React from "react";

import i18n from "services/i18n";
import Table from "components/admin/user_table"; 
import Breadcrumbs from "components/breadcrumbs";

const CRUMBS = [{
  href: "/admin", 
  text: i18n("admin")
}, {
  href: "/admin/users", 
  text: i18n("user_management")
}];

class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {table_delegate, table_store} = this.props.resolved;

    return (
      <div className="clearfix row">
        <div className="margin-bottom-10"><Breadcrumbs crumbs={CRUMBS} /></div>
        <h5>{i18n("user_management")}</h5>
        <div className="margin-top-5 clearfix"><Table delegate={table_delegate} store={table_store} /></div>
      </div>
    );
  }

}

export default Users;
