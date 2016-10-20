import util from "../../util";
import defer from "../../defer";
import DisplaySchedule from "../../../resources/display_schedule";
import Activity from "../../../resources/activity";

let COLUMNS = [{
  rel: "start",
  name: "Start",
  sortable: false,
  style: {width: "30%"}
}, {
  rel: "end",
  name: "End",
  style: {width: "30%"},
  sortable: false
}, {
  rel: "approval",
  name: "Approval",
  style: {width: "10%"},
  sortable: false
}, {
  rel: "action",
  name: "Action",
  style: {width: "10%"},
  sortable: false
}, {
  rel: "object_type",
  name: "Object Type",
  style: {width: "10%"},
  sortable: false
}, {
  rel: "actor_type",
  name: "Actor Type",
  style: {width: "10%"},
  sortable: false
}, {
  rel: "menu",
  name: "",
  style: {width: "80px"},
  sortable: false
}];

export default class ScheduleDelegate {

  constructor() {
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
    let total   = null;

    function toRow(schedule) {
      let [activity] = activities.filter(function({id}) { return id === schedule.activity; });
      return {schedule, activity};
    }

    function loadedActivity(err, result) {
      if(err) return callback([{error: true}], 0);
      util.replace(activities, result);
      let rows = schedules.map(toRow);
      callback(rows, total);
    }

    function loadedSchedules(err, result) {
      if(err) return callback([{error: true}], 0);
      total = result.$meta.total;
      util.replace(schedules, result);
      let activities = result.map(function({activity}) { return activity; });
      Activity.get({"filter[id]": `in(${activities.join(",")})`}, loadedActivity);
    }

    DisplaySchedule.get({orderby}, loadedSchedules);
  }

}
