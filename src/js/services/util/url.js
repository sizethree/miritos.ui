const QUERY_PARAM_SEPARATOR = `&`;
const QUERY_PARAM_VALUE_SEPARATOR = `=`;
const QUERY_INDICATOR = `?`;

function parse(str) {
  if("string" !== typeof str) 
    return null;

  return {};
}

parse.query = function(query_string) {
  if("string" !== typeof query_string)
    return null;

  if(QUERY_INDICATOR === query_string.charAt(0))
    query_string = query_string.substr(1);

  let bits   = query_string.split(QUERY_PARAM_SEPARATOR);
  let result = [];

  for(let i = 0, c = bits.length; i < c; i++) {
    let [key, value] = bits[i].split(QUERY_PARAM_VALUE_SEPARATOR);
    if(!key || !value) continue;
    result.push({key, value});
  }

  result.get = function(desired_key) {
    for(let i = 0, c = result.length; i < c; i++) {
      let {key, value} = result[i];
      if(key === desired_key) return value;
    }

    return undefined;
  };

  return result;
};

export default parse;
