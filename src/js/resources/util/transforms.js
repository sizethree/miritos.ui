function response(data) {
  let parsed_results = [];

  try {
    let json = JSON.parse(data);
    let {results} = json;

    for(let i = 0, c = results.length; i < c; i++) {
      parsed_results.push(results[i]);
    }

    parsed_results.$meta = json.meta;
  } catch(e) {
    parsed_results.error = e;
  }

  return parsed_results;
}

export default {response};
