import i18n from "services/i18n";
import Table from "components/hoc/table";
import Notes from "services/notes";
import defer from "services/defer";
import DatePickerFactory from "components/hoc/date_picker";
import ScheduleMenu from "components/admin/schedule_menu";
import Callout from "components/admin/activity_item_callout";
import {Light} from "components/type/weights";

import TYPES from "var/object_types";
import Schedule from "resources/display_schedule";

let DatePicker = DatePickerFactory();

function lower(s) {
  return s && "function" === typeof s.toLowerCase ? s.toLowerCase() : s;
}

function translateType(type) {
  let result = "Unknown";

  switch(type) {
    case TYPES.USER:
      return "User";
    case TYPES.PHOTO:
      return "Photo";
  }

  return result;
}

class Row extends React.Component {

  constructor(props) {
    super(props);
    let {row} = this.props;
    let {schedule, activity, delegates, signals, actor, object} = row;

    let update = this.forceUpdate.bind(this);

    delegates.end.on("updated", update);
    delegates.start.on("updated", update);
  }

  render() {
    let {row} = this.props;
    let {schedule, activity, delegates, signals, actor, object} = row;
    let {start: start_delegate, end: end_delegate} = delegates;

    let approval_color = "grey-text darken-1";

    switch(schedule.approval) {
      case "APPROVED":
        approval_color = "green-text lighten-1";
        break;
      case "REJECTED":
        approval_color = "red-text darken-3";
        break;
    }

    return (
      <tr className="admin-schedule-row">
        <td className="admin-schedule-row__id">
          <p><Light text={i18n("activity")} /> #{activity.id}</p>
        </td>
        <td className="admin-schedule-row__start">
          <DatePicker delegate={delegates.start} />
        </td>
        <td className="admin-schedule-row__end">
          <DatePicker delegate={delegates.end} />
        </td>
        <td className="admin-schedule-row__actor">
          <Callout object={actor.object} type={activity.actor_type}/>
        </td>
        <td className="admin-schedule-row__object">
          <Callout object={object.object} type={activity.object_type} />
        </td>
        <td className="admin-schedule-row__approval">
          <p className={approval_color}>{i18n(lower(schedule.approval))}</p>
        </td>
        <td className="admin-schedule-row__callout">
          <p>{i18n(activity.verb)}</p>
        </td>
        <td className="admin-schedule-row__menu align-center">
          <ScheduleMenu schedule={schedule} signals={signals} />
        </td>
      </tr>
    );
  }
}

export default Table(Row);
