import util from "./util"

let indx = 0;

/* uuid service
 *
 *
 * returns a unique string by incrementing the locally-scoped
 * `indx` variable and returning it's base64 encoded value.
 *
 * would eventually want to consider recycling old values to
 * keep indx small.
 */

export default function uuid() {
  let next = util.pad(++indx, 4);
  return btoa(next);
};
