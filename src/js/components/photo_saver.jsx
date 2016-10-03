import NotificationManager from "../services/notes";
import Notification from "../components/hoc/notification";
import Photo from "../resources/photo";
import {Engine} from "../services/events";

const LOADING_IMAGE = "http://placehold.it/350x150";
const IMAGE_STYLE   = {"maxWidth": "400px", "maxHeight": "500px"};

function read(file) {
  let {promise, reject, resolve} = Q.defer();
  let reader = new FileReader();

  reader.onload = function onload({target}) {
    let {result} = target;
    return (result && result.length >= 1) ? resolve(result) : reject(new Error("BAD_FILE"));
  };

  reader.readAsDataURL(file);

  return promise;
};

function NextButton({next}) {
  return (
    <div className="padding-left-5">
      <a className="pointer" onClick={next}><i className="icon fg-black ion-chevron-right"></i></a>
    </div>
  );
}

function PreviousButton({previous}) {
  return (
    <div className="padding-right-5">
      <a className="pointer" onClick={previous}><i className="icon fg-black ion-chevron-left"></i></a>
    </div>
  );
}

class Saver extends React.Component {

  constructor() {
    super();
    this.state = {busy: false};
  }

}

Saver.prototype.render = function() {
  let {delegate} = this.props;
  let {length, src, index} = delegate;
  let note = null;

  function success(results) {
  }

  function clean() {
    NotificationManager.remove(note);
    this.state.busy = false;
  }

  function failed(e) {
    console.error(e);
  }

  function save() {
    if(this.state.busy === true) return false;

    note = NotificationManager.add(<p>saving...</p>);
    this.setState({busy: true, note});

    return delegate.save()
      .then(success.bind(this))
      .catch(failed.bind(this))
      .fin(clean.bind(this));
  }

  function next() {
    delegate.index++;
    this.forceUpdate();
  }

  function previous() {
    delegate.index--;
    this.forceUpdate();
  }

  function update(e) {
    let {value} = e.currentTarget;
    delegate.updateCaption(value);
  }

  let previous_control = index > 0 ? <PreviousButton previous={previous.bind(this)} /> : null;
  let next_control     = index < length - 1 ? <NextButton next={next.bind(this)} /> : null;

  return (
    <div className="photo-saver padding-10 display-inline-block bg-white">
      <div className="overflow-hidden clearfix display-table display-table--fixed">
        <div className="display-table-cell v-align-middle">{previous_control}</div>
        <div className="display-table-cell v-align-middle">
          <div className="photo-saver__preview align-center" style={IMAGE_STYLE}>
            <img className="display-inline-block margin-auto padding-bottom-5 margin-bottom-5" src={src} style={IMAGE_STYLE} />
          </div>
          <div className="input-field border-top-1 border-color-white-darken-10">
            <textarea className="materialize-textarea" placeholder="caption" onInput={update}></textarea>
          </div>
        </div>
        <div className="display-table-cell v-align-middle">{next_control}</div>
      </div>
      <div className="clearfix align-center">
        <a className="btn" onClick={save.bind(this)}>Save</a>
      </div>
    </div>
  );
}

Saver.Delegate = class Delegate extends Engine {

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
      let {promise, resolve, reject} = Q.defer();

      function finished(err, result) {
        if(err) return reject(new Error("FAILED_SAVE"));
        resolve(result[0]);
      }

      if(!caption || true !== caption.length >= 1)
        return Q.reject(new Error("BAD_CAPTION"));

      Photo.create({photo: file, label: caption}, finished);
      return promise;
    }

    function saved() {
      this.trigger("saved");
    }

    let saves = Q.all(photos.map(save));
    saves.fin(saved.bind(this));
    return saves;
  }

  load(files) {
    let {photos} = this;

    function load(file) {
      let item = {file};

      function loaded(image_data) {
        item.data = image_data;
        photos.push(item);
        return Q.resolve(image_data);
      }

      return read(file).then(loaded);
    }

    let promises = files.map(load);
    return Q.all(promises);
  }

}


export default Saver;
