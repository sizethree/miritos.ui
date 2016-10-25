const DATE_FORMAT = "MMM Do, YYYY";

export default function format(x) {
  return moment(x).format(DATE_FORMAT);
}
