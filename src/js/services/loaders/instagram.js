import defer from "services/defer";
import utils from "services/util";

import Photo          from "resources/photo";
import InstagramPhoto from "resources/instagram_photo";
import InstagramAcct  from "resources/instagram_account";

const BATCH_SIZE = 10;

function load(id_list) {
  let batches = [];
  let results = {};

  function finish({photos, accounts}) {
    results.photos   = utils.flatten(photos);
    results.accounts = utils.flatten(accounts);
    let output = [];

    for(let i = 0, c = results.instagram.length; i < c; i++) {
      let gram      = results.instagram[i];
      let [photo]   = results.photos.filter(function({id}) { return id === gram.photo; });
      let [account] = results.accounts.filter(function({id}) { return id === gram.instagram_account; });
      let meta      = {photo, account};

      output.push({object: gram, meta});
    }

    return defer.resolve(output);
  }

  function normalize(instagram_results) {
    let flat      = utils.flatten(instagram_results);

    let photo_ids = [];
    let acct_ids  = [];

    for(let i = 0, c = flat.length; i < c; i++) {
      let {photo, instagram_account} = flat[i];
      photo_ids.push(photo);

      if(acct_ids.indexOf(instagram_account) === -1)
        acct_ids.push(instagram_account);
    }

    let photo_batches = [];
    let acct_batches  = [];

    results.instagram = flat;

    while(acct_ids.length > 0) {
      let batch = acct_ids.splice(0, BATCH_SIZE);
      acct_batches.push(InstagramAcct.get({"filter[id]": `in(${batch.join()})`}));
    }

    while(photo_ids.length > 0) {
      let batch = photo_ids.splice(0, BATCH_SIZE);
      photo_batches.push(Photo.get({"filter[id]": `in(${batch.join()})`}));
    }

    return defer.props({
      photos   : defer.merge(photo_batches),
      accounts : defer.merge(acct_batches)
    });
  }

  while(id_list.length > 0) {
    let batch = id_list.splice(0, BATCH_SIZE);
    batches.push(InstagramPhoto.get({"filter[uuid]": `in(${batch.join()})`}));
  }

  function failed(e) {
    console.error(e);
    return defer.reject(e);
  }

  return defer.merge(batches)
    .then(normalize)
    .then(finish)
    .catch(failed);
 }

export default load;

