import * as ReactDOM from "react-dom";
import * as React from "react";

import i18n from "services/i18n";
import Table from "components/admin/schedule_table";
import Breadcrumbs from "components/breadcrumbs";

const CRUMBS = [{
  href: "/admin", 
  text: i18n("admin")
}, {
  href: "/admin/schedules", 
  text: i18n("schedule_management")
}];

class Schedules extends React.Component {

  constructor(props) {
    super(props)

    function update() {
      this.forceUpdate();
    }

    let {resolved} = props;
    let {table_delegate} = resolved;

    table_delegate.on("update", update.bind(this));
  }

  render() {
    let {resolved} = this.props;
    let {table_delegate, table_store} = resolved;

    return (
      <div className="clearfix row collapse">
        <div className="margin-bottom-10"><Breadcrumbs crumbs={CRUMBS} /></div>
        <h5>{i18n("schedule_management")}</h5>
        <div className="margin-top-5 clearfix">
          <Table delegate={table_delegate} store={table_store} />
        </div>
      </div>
    );
  }

}

export default Schedules;
