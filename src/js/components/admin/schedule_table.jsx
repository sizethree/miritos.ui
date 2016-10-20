import Table from "../hoc/paged_table";
import defer from "../../services/defer";
import DatePickerFactory from "../hoc/date_picker";
import ScheduleMenu from "./schedule_menu";
import TYPES from "../../var/object_types";

let DatePicker = DatePickerFactory();

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

class DateDelegate {

  constructor(field, schedule) {
    this.field    = field;
    this.schedule = schedule;
  }

  value() {
    return this.schedule[this.field];
  }

  select(new_day) {
    let {promise, resolve, reject} = defer.defer();
    this.schedule[this.field] = new_day;
    return defer.resolve(true);
  }

}

function Row({row: {schedule, activity}}) {
  let start_delegate = new DateDelegate("start", schedule);
  let end_delegate   = new DateDelegate("end", schedule);

  return (
    <tr className="admin-schedule-row">
      <td className="admin-schedule-row__start">
        <DatePicker delegate={start_delegate} />
      </td>
      <td className="admin-schedule-row__end">
        <DatePicker delegate={end_delegate} />
      </td>
      <td className="admin-schedule-row__approval">
        <p>{schedule.approval}</p>
      </td>
      <td className="admin-schedule-row__approval">
        <p>{activity.verb}</p>
      </td>
      <td className="admin-schedule-row__approval">
        <p>{translateType(activity.object_type)}</p>
      </td>
      <td className="admin-schedule-row__approval">
        <p>{translateType(activity.actor_type)}</p>
      </td>
      <td className="admin-schedule-row__menu align-center">
        <ScheduleMenu schedule={schedule} />
      </td>
    </tr>
  );
}

export default Table(Row);
