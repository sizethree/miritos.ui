import Schedule from "../../../resources/display_schedule";
import defer from "../../defer";
import Notes from "../../notes";

function time(x) {
  return moment(x).toDate().getTime();
}

function daybreak(x) {
  let day = moment(x);
  return day.seconds(0).minutes(0).hours(0).toDate();
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
    let {schedule, field} = this;
    let note = Notes.add(<p>Updating, please wait...</p>);

    let updates = {id: schedule.id};
    updates[this.field] = daybreak(new_day);

    function failed(err) {
      Notes.remove(note);
      console.error(err);
      return defer.reject(new Error("FAILED_UPDATE"));
    }

    function finished([new_data]) {
      Notes.remove(note);
      Object.assign(schedule, new_data);
      return defer.resolve(schedule);
    }

    return Schedule.update(updates)
      .then(finished)
      .catch(failed);
  }

  range() {
    let {schedule, field} = this;
    let min = daybreak();
    let max = null;

    if(field === "end" && schedule.start)
      min = time(schedule.start);

    if(field === "start" && schedule.end)
      max = time(schedule.end);

    return [min, max];
  }

}

export default DateDelegate;
