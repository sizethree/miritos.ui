import Schedule from "resources/display_schedule";
import defer from "services/defer";
import Notes from "services/notes";
import i18n from "services/i18n";
import {Engine} from "services/events";

let {DateUtils} = DayPicker;

function time(x) {
  return moment(x).toDate().getTime();
}

function range(schedule) {
  let {start: from, end: to} = schedule;

  if(from)
    from = moment(from).toDate();

  if(to)
    to = moment(to).toDate();

  return {from, to};
}

function daybreak(x) {
  let day = moment(x);
  return day.seconds(0).minutes(0).hours(0).toDate();
}

class DateDelegate extends Engine {

  constructor(field, schedule) {
    super()
    this.field    = field;
    this.schedule = schedule;
  }

  value() {
    return this.schedule[this.field];
  }

  months() {
    return 2;
  }

  select(new_day) {
    let {schedule, field} = this;
    let note = Notes.info(i18n("updating_please_wait"));
    let new_range = DateUtils.addDayToRange(new_day, range(schedule));
    let trigger = this.trigger.bind(this);

    let updates = {id: schedule.id};

    if(new_range.to) updates.end = new_range.to;
    if(new_range.from) updates.start = new_range.from;

    function failed(err) {
      Notes.remove(note);
      console.error(err);
      return defer.reject(new Error("FAILED_UPDATE"));
    }

    function finished([new_data]) {
      Notes.remove(note);
      Object.assign(schedule, new_data);
      trigger("updated");
      return defer.resolve(schedule);
    }

    return Schedule.update(updates)
      .then(finished)
      .catch(failed);
  }

  selected(day) {
    let {schedule} = this;
    return DateUtils.isDayInRange(day, range(schedule));
  }

  range() {
    let {schedule, field} = this;
    let min = daybreak();
    let max = null;
    return [min, max];
  }

}

export default DateDelegate;
