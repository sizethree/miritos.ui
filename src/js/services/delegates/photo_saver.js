import Photo from "../../resources/photo";
import {Engine} from "../events";
import defer from "../defer";
import util from "../util";

function read(file) {
  let {promise, reject, resolve} = defer.defer();
  let reader = new FileReader();

  reader.onload = function onload({target}) {
    let {result} = target;
    return (result && result.length >= 1) ? resolve(result) : reject(new Error("BAD_FILE"));
  };

  reader.readAsDataURL(file);

  return promise;
};

class Delegate extends Engine {

  constructor() {
    super();
    this.photos = [];
    this.index  = 0;
  }

  get length() {
    let {length} = this.photos;
    return length;
  }

  get src() {
    let {photos, index} = this;
    return photos[index].data;
  }

  updateCaption(text) {
    let {index, photos} = this;
    photos[index].caption = text;
  }

  save() {
    let {photos} = this;

    function save(item) {
      let {file, caption} = item;
      let {promise, resolve, reject} = defer.defer();

      function finished(err, result) {
        if(err) return reject(new Error("FAILED_SAVE"));
        resolve(result[0]);
      }

      if(!caption || true !== caption.length >= 1)
        return defer.reject(new Error("BAD_CAPTION"));

      Photo.create({photo: file, label: caption}, finished);
      return promise;
    }

    function saved() {
      photos.length = 0;
      this.trigger("saved");
    }

    let saves = defer.all(photos.map(save));
    saves.fin(saved.bind(this));
    return saves;
  }

  load(files) {
    let {photos} = this;
    let results  = [];

    function load(file) {
      let item = {file};

      function loaded(image_data) {
        item.data = image_data;
        results.push(item);
        return defer.resolve(image_data);
      }

      return read(file).then(loaded);
    }

    function replace() {
      util.replace(photos, results);
      return defer.resolve(photos);
    }

    let promises = files.map(load);
    return defer.all(promises).then(replace);
  }

}

export default Delegate;
