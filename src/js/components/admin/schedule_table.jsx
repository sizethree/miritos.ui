import Table from "components/hoc/paged_table";
import Notes from "services/notes";
import defer from "services/defer";
import DatePickerFactory from "components/hoc/date_picker";
import ScheduleMenu from "components/admin/schedule_menu";
import Callout from "components/admin/activity_item_callout";

import TYPES from "var/object_types";
import Schedule from "resources/display_schedule";

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
      <td className="admin-schedule-row__callout">
        <Callout activity={activity} />
      </td>
      <td className="admin-schedule-row__menu align-center">
        <ScheduleMenu schedule={schedule} signals={signals} />
      </td>
    </tr>
  );
}

export default Table(Row);
