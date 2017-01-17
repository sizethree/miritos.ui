import util         from "services/util";
import loader       from "services/object_loader";
import defer        from "services/defer";
import i18n         from "services/i18n";
import DateDelegate from "services/delegates/admin/schedule_date";
import {Engine}     from "services/events";

import Activity        from "resources/activity";
import DisplaySchedule from "resources/display_schedule";

const COLUMNS = [{
  rel: "id",
  name: i18n("activity_id"),
  sortable: false,
  style: {width: "10%"}
}, {
  rel: "start",
  name: i18n("start"),
  sortable: false,
  style: {width: "21%"}
}, {
  rel: "end",
  name: i18n("end"),
  style: {width: "21%"},
  sortable: false
}, {
  rel: "actor",
  name: i18n("actor"),
  style: {width: "15%"},
  sortable: false
}, {
  rel: "object",
  name: i18n("object"),
  style: {width: "15%"},
  sortable: false
}, {
  rel: "approval",
  name: i18n("approval"),
  style: {width: "10%"},
  sortable: false
}, {
  rel: "action",
  name: i18n("action"),
  style: {width: "8%"},
  sortable: false
}, {
  rel: "schedule-menu",
  name: "",
  style: {width: "80px"},
  sortable: false
}];

function objectUrl(s) {
  return `/object?url=${encodeURIComponent(s)}`;
}

export default class ScheduleDelegate extends Engine {

  constructor() {
    super();
    this.schedules  = [];
    this.activities = [];
    this.objects    = [];
    let pagination = {current: 0, size: 10};
    let sorting    = {rel: "email"};

    this.state = {sorting, pagination};
  }

  columns() {
    return COLUMNS.slice(0);
  }

  pagination() {
    return this.state.pagination;
  }

  sortBy({rel}, callback) {
    this.sorting.rel = rel;
    callback();
  }

  sorting() {
    return this.state.sorting;
  }

  goTo(new_page, callback) {
    this.state.pagination.current = new_page;
    callback();
  }

  rows(callback) {
    let {objects, state, schedules, activities} = this;
    let {pagination, sorting}   = state;
    let orderby = sorting.order ? sorting.rel : `-${sorting.rel}`;
    let {current: page, size: limit} = pagination;
    let total = null;

    let update  = () => this.trigger("update");
    let signals = {update};

    function map(schedule) {
      let [activity] = activities.filter(function({id}) { return id === schedule.activity; });
      let [actor]    = objects.filter(function({uuid}) { return uuid === activity.actor_uuid; });
      let [object]   = objects.filter(function({uuid}) { return uuid === activity.object_uuid; });

      let delegates  = {
        start : new DateDelegate("start", schedule),
        end   : new DateDelegate("end", schedule)
      };

      return {activity, actor, object, signals, schedule, delegates};
    }

    function finished(results) {
      util.replace(objects, results);
      let feed_items = [];

      for(let i = 0, c = schedules.length; i < c; i++) {
        feed_items.push(map(schedules[i]));
      }

      callback(feed_items);
      return defer.resolve(feed_items);
    }

    function loadedActivity(activity_results) {
      util.replace(activities, activity_results);

      if(activities.length === 0) {
        callback([]);
        return defer.resolve([]);
      }

      let register = [];
      let objects  = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        // get the type and the uuid from the actors and objects
        let {actor_type, object_type, object_uuid, actor_uuid} = activities[i];

        // load in the actor if not already in our unique list
        if(register.indexOf(actor_uuid) === -1) {
          register.push(actor_uuid);
          objects.push({uuid: actor_uuid, type: actor_type});
        }

        // load in the object if not already in our unique list
        if(register.indexOf(object_uuid) === -1) {
          register.push(object_uuid);
          objects.push({uuid: object_uuid, type: object_type});
        }
      }

      return loader.all(objects)
        .then(finished);
    }

    function failed(err) {
      console.error(err);
      return callback([{error: true}], 0);
    }

    function loadedSchedules(result) {
      pagination.total = result.$meta.total;
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
