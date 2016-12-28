import i18n from "services/i18n";
import Schedule from "resources/display_schedule";

import MenuItem from "components/micro/menu_item";
import MenuContents from "components/micro/menu_contents";

import Notes from "services/notes";
import * as dates from "services/dates";
import {hoc} from "hoctable";

function Button() {
  return (
    <div className="display-inline-block">
      <a className="waves-effect waves-light btn"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

function Menu({close, signals, schedule}) {
  let items   = [];
  let pending = schedule.approval === "PENDING";

  function update() {
    let updates = Object.assign({}, this, {id: schedule.id});
    let note    = Notes.add(<p className="truncate">{i18n("updating_please_wait")}</p>);

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

  if(pending) {
    let text    = i18n("approve_for_thirty");
    let start   = dates.daybreak();
    let end     = dates.add(start, 30, "days").toDate();
    let handler = update.bind({approval: "APPROVED", start, end});
    items.push(<MenuItem key="approve_for_30" text={text} handler={handler} />);
  }

  // if this schedule item is pending but has start/end either approve or deny
  if(pending || schedule.approval === "APPROVED")
    items.push(<MenuItem key="reject" text={i18n("reject")} handler={update.bind({approval: "REJECTED"})} />);

  if(schedule.start && schedule.end && schedule.approval === "REJECTED")
    items.push(<MenuItem key="approve" text={i18n("approve")} handler={update.bind({approval: "APPROVED"})} />);

  return (<MenuContents>{items}</MenuContents>);
}

export default hoc.ActionMenu(Menu, Button);
