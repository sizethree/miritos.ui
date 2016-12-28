export function daybreak(x) {
  let day = moment(x);
  return day.seconds(0).minutes(0).hours(0).toDate();
}

export function add(x, amt, type) {
  return moment(x).add(amt, type);
}
