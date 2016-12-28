import util from "services/util";
import defer from "services/defer";
import fetch from "services/fetch";
import i18n from "services/i18n";
import DisplaySchedule from "resources/display_schedule";
import DateDelegate from "services/delegates/admin/schedule_date";
import Activity from "resources/activity";
import {Engine} from "services/events";

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

    let update = (function() { this.trigger("update"); }).bind(this);

    function toRow(schedule) {
      let [activity] = activities.filter(function({id}) { return id === schedule.activity; });
      let [actor] = objects.filter(function({url}) { return url === activity.actor_url; });
      let [object] = objects.filter(function({url}) { return url === activity.object_url; });

      let delegates  = {
        start: new DateDelegate("start", schedule),
        end: new DateDelegate("end", schedule)
      };

      return {schedule, activity, delegates, signals: {update}, actor, object};
    }

    function finished(results) {
      util.replace(objects, results);
      let rows = schedules.map(toRow);
      callback(rows);
      return defer.resolve(rows);
    }

    function loadItem(url) {
      function normalize({results}) {
        let [object] = results;
        return defer.resolve({object, url});
      }

     return fetch(objectUrl(url)).then(normalize);
    }

    function loadedActivity(result) {
      util.replace(activities, result);
      let unique_urls = [];

      for(let i = 0, c = activities.length; i < c; i++) {
        let {actor_url, object_url} = activities[i];
        if(unique_urls.indexOf(actor_url) === -1) unique_urls.push(actor_url);
        if(unique_urls.indexOf(object_url) === -1) unique_urls.push(object_url);
      }

      return defer.all(unique_urls.map(loadItem)).then(finished);
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
