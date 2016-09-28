define([
  "services/util/url"
], function(url) {

  /* util service
   *
   * Contains arbitrary helper functions
   */

  function pad(x, amount) {
    let str = `${x || ""}`;
    while(str.length < amount)
      str = `0${str}`;
    return str;
  }

  function replace(a1, a2) {
    let count = a1.length;
    a1.splice.apply(a1, [0, count].concat(a2));
    return a1;
  }

  return {replace, pad, url};

});
