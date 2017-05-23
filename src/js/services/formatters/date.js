import * as dates from "services/dates";

const DATE_FORMAT = "MMM Do, YYYY";

export default function format(x) {
  return dates.parse(x).format(DATE_FORMAT);
}
