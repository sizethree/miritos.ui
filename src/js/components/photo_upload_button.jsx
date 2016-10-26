import Notes from "services/notes";
import Modals from "services/modals";
import defer from "services/defer";
import Saver from "components/photo_saver";

function start({target}) {
  let {files}    = target;
  let {delegate} = this;
  let images     = [];

  for(let i = 0, c = files.length; i < c; i++) {
    let {type} = files[i];
    if("image" !== type.substr(0, 5)) continue;
    images.push(files[i]);
  }

  if(images.length === 0)
    return Notes.flash(<p>Please select image files</p>);

  let title    = `Upload Photo${files.length > 1 ? 's' : ''}`;
  let modal_id = null;

  function open() { 
    modal_id = Modals.open(<Saver delegate={delegate} />, {title});
  }

  function failed(e) {
    console.error(e.stack);
    return defer.reject(e);
  }

  function saved() {
    delegate.off(listener_id);
    Modals.close(modal_id);
  }

  let listener_id = delegate.on("saved", saved);

  delegate.load(images)
    .then(open)
    .catch(failed);
}

export default function UploadButton({delegate}) {
  return (
    <div className="file-field input-field clearfix">
      <div className="btn position-relative">
        <span>Upload Photo</span>
        <input type="file" onChange={start.bind({delegate})} />
      </div>
    </div>
  );
}
