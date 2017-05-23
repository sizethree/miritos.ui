import Photo from "resources/photo";
import {Engine} from "services/events";
import defer from "services/defer";
import util from "services/util";

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

      if(!caption || true !== caption.length >= 1)
        return defer.reject(new Error("BAD_CAPTION"));

      return Photo.create({photo: file, label: caption});
    }

    function saved() {
      photos.length = 0;
      this.trigger("saved");
    }

    return defer.merge(photos.map(save))
      .fin(saved.bind(this));
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
    return defer.merge(promises).then(replace);
  }

}

export default Delegate;
