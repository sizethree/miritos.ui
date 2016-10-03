import ActionMenu from "./hoc/action_menu";
import Modals from "../services/modals";
import NotificationManager from "../services/notes";
import Notification from "../components/hoc/notification";
import Saver from "./photo_saver";

function logout() {
  window.location = "/api/logout";
}

function Button() {
  return (
    <div className="clearfix">
      <div className="float-left margin-right-6">
        <a className="waves-effect waves-light btn" onClick={logout}>logout</a>
      </div>
      <div className="float-left">
        <a className="waves-effect waves-light btn"><i className="ion-plus-round"></i></a>
      </div>
    </div>
  );
}

function photo(event) {
  let {close} = this;

  let {files} = event.target;
  let images = [];

  for(let i = 0, c = files.length; i < c; i++) {
    let {type} = files[i];
    if("image" !== type.substr(0, 5)) continue;
    images.push(files[i]);
  }

  close(true);

  if(images.length === 0)
    return NotificationManager.flash(<Notification><p>Please select image files</p></Notification>);

  let title    = `Upload Photo${files.length > 1 ? 's' : ''}`;
  let delegate = new Saver.Delegate();
  let modal_id = null;

  function open() { 
    modal_id = Modals.open(<Saver delegate={delegate} />, {title});
  }

  function failed(e) {
    console.error(e.stack);
    return Q.reject(e);
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

function Menu({close}) {
  return (
    <div className="clearfix">
      <ul className="clearfix dropdown-content active display-block">
        <li className="position-relative file-field input-field margin-top-0">
          <a>Photo</a>
          <input type="file" className="" multiple onChange={photo.bind({close})} />
        </li>
        <li><a>Event</a></li>
      </ul>
    </div>
  )
}

export default ActionMenu(Button, Menu);
