import url from "services/util/url";
import dom from "services/util/dom";

/* util service
 *
 * Contains arbitrary helper functions
 */

function pad(x : string | number, amount : number) : string {
  let str = `${x || ""}`;

  while(str.length < amount)
    str = `0${str}`;

  return str;
}

function replace(a1 : Array<any>, a2 : Array<any>) {
  let count : number = a1.length;
  a1.splice.apply(a1, [0, count].concat(a2));
  return a1;
}

function flatten(input : Array<any>) : Array<any> {
  function reduce(a : Array<any>, b : any) : Array<any> {
    return a.concat(b);
  }

  return input.reduce(reduce, []);
}

export default {replace, flatten, pad, url, dom};
