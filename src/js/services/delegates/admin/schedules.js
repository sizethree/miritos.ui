import util from "../../util";
import defer from "../../defer";
import DisplaySchedule from "../../../resources/display_schedule";
import DateDelegate from "./schedule_date";
import Activity from "../../../resources/activity";
import {Engine} from "../../events";

let COLUMNS = [{
  rel: "start",
  name: "Start",
  sortable: false,
  style: {width: "35%"}
}, {
  rel: "end",
  name: "End",
  style: {width: "35%"},
  sortable: false
}, {
  rel: "approval",
  name: "Approval",
  style: {width: "15%"},
  sortable: false
}, {
  rel: "action",
  name: "Action",
  style: {width: "15%"},
  sortable: false
}, {
  rel: "menu",
  name: "",
  style: {width: "80px"},
  sortable: false
}];

export default class ScheduleDelegate extends Engine {

  constructor() {
    super();
    this.schedules  = [];
    this.activities = [];
  }

  columns() {
    return COLUMNS;
  }

  rows(store, callback) {
    let {schedules, activities} = this;
    let {pagination, sorting}   = store.getState();
    let orderby = sorting.order ? sorting.rel : `-${sorting.rel}`;
    let {current: page, size: limit} = pagination;
    let total = null;

    let update = (function() { this.trigger("update"); }).bind(this);

    function toRow(schedule) {
      let [activity] = activities.filter(function({id}) { return id === schedule.activity; });

      let delegates  = {
        start: new DateDelegate("start", schedule),
        end: new DateDelegate("end", schedule)
      };

      return {schedule, activity, delegates, signals: {update}};
    }

    function loadedActivity(result) {
      util.replace(activities, result);
      let rows = schedules.map(toRow);
      callback(rows, total);
      return defer.resolve(rows);
    }

    function failed(err) {
      console.error(err);
      return callback([{error: true}], 0);
    }

    function loadedSchedules(result) {
      total = result.$meta.total;
      util.replace(schedules, result);
      let activities = result.map(function({activity}) { return activity; });

      if(activities.length === 0)
        return loadedActivity([]);

      return Activity.get({"filter[id]": `in(${activities.join(",")})`})
        .then(loadedActivity);
    }

    return DisplaySchedule.get({orderby, page, limit})
      .then(loadedSchedules)
      .catch(failed);
  }

}
