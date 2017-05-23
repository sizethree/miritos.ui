import i18n from "services/i18n";
import * as dates from "services/dates";
import {hoc} from "hoctable";

import * as ReactDOM from "react-dom";
import * as React from "react";

const DATE_FORMAT = "MMM Do, YYYY";

function format(v) {
  return dates.parse(v).format(DATE_FORMAT);
}

class Row extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {row} = this.props;

    if(row.empty)
      return (<tr><td colSpan="2"><p>{i18n("no_results")}</p></td></tr>);

    let {domain} = row;

    function remove() {
      row.remove(domain);
    }

    return (
      <tr className="admin-domain-row">
        <td className="admin-domain-row__id"><p>{domain.id}</p></td>
        <td className="admin-domain-row__domain"><p>{domain.domain}</p></td>
        <td className="admin-domain-row__created"><p>{format(domain.date_created)}</p></td>
        <td className="admin-domain-row__actions">
          <a className="btn" onClick={remove}>{i18n("remove")}</a>
        </td>
      </tr>
    );
  }

}

export default hoc.Table(Row);
