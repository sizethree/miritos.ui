import ActionMenu from "../hoc/action_menu";
import Schedule from "../../resources/display_schedule";
import Notes from "../../services/notes";

function Button() {
  return (
    <div className="display-inline-block">
      <a className="waves-effect waves-light btn"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

function option(key, a) {
  return (<li key={key} className="position-relative margin-top-0">{a}</li>);
}

function Menu({close, signals, schedule}) {
  let items   = [];
  let pending = schedule.approval === "PENDING";

  function update() {
    let updates = Object.assign({}, this, {id: schedule.id});
    let note    = Notes.add(<p className="truncate">Updating activity, please wait...</p>);

    function success() {
      // todo - fill this in with good stuff
    }

    function failed() {
      // todo - fill this in with bad stuff
    }

    function clean() {
      Notes.remove(note);
      signals.update();
    }

    Schedule.update(updates)
      .then(success)
      .catch(failed)
      .fin(clean);

    return close();
  }

  // if this schedule item is pending but has start/end either approve or deny
  if(pending || schedule.approval === "APPROVED")
    items.push(option("reject", <a className="upper" onClick={update.bind({approval: "REJECTED"})}>reject</a>));

  // if the item is pending approval but has both a start and end date, allow the user
  // to approve it.
  if((pending || schedule.approval === "REJECTED") && schedule.start && schedule.end)
    items.push(option("approve", <a className="upper" onClick={update.bind({approval: "APPROVED"})}>approve</a>));

  return (
    <div className="clearfix display-inline-block">
      <ul className="user-menu clearfix dropdown-content active display-block">{items}</ul>
    </div>
  )
}

export default ActionMenu(Button, Menu);
