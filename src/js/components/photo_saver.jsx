import Notes from "../services/notes";
import Photo from "../resources/photo";
import {Engine} from "../services/events";

const LOADING_IMAGE = "http://placehold.it/350x150";
const IMAGE_STYLE   = {"maxWidth": "50vw", "maxHeight": "50vh"};

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
    Notes.remove(note);
    this.state.busy = false;
  }

  function failed(e) {
    console.error(e);
  }

  function save() {
    if(this.state.busy === true) return false;

    note = Notes.add(<p>saving...</p>);
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

export default Saver;
