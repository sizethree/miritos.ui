import Table from "../hoc/paged_table";
import Notes from "../../services/notes";
import defer from "../../services/defer";
import DatePickerFactory from "../hoc/date_picker";
import ScheduleMenu from "./schedule_menu";
import TYPES from "../../var/object_types";
import Schedule from "../../resources/display_schedule";

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

function Row({row: {schedule, activity, delegates, signals}}) {
  let {start: start_delegate, end: end_delegate} = delegates;

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
        <ScheduleMenu schedule={schedule} signals={signals} />
      </td>
    </tr>
  );
}

export default Table(Row);
