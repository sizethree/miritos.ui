import defer from "./defer";

let dictionary = null;

function i18n(lookup) {
  let splits = lookup.split(".");
  let cursor = dictionary;

  while(splits.length) {
    let step = splits.shift();
    if(false === cursor.hasOwnProperty(step)) return lookup;
    cursor = cursor[step];
  }

  return cursor;
}

i18n.locale = function(lang) {
  let {promise, resolve, reject} = defer.defer();
  let path = `var/i18n/${lang}`;

  function failed(e) {
    console.error(e);
    return reject(e);
  }

  function success({default: result}) {
    dictionary = result;
    resolve(dictionary);
  }

  require([path], success, failed);
  return promise;
};

export default i18n;
