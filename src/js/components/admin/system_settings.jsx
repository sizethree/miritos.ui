import i18n from "services/i18n";
import Modals from "services/modals";
import DomainEditor from "components/admin/domain_editor";
import DomainDelegate from "services/delegates/admin/email_whitelist";

class SystemSettings extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    Modals.close(this.modal_id);
  }

  render() {
    let {props} = this;
    let {manager} = props;
    let {latest: {system}, revisions} = manager;
    let {restricted_email_domains: email_lock} = system;

    function toggleEmailRestriction() {
      let value = !system.restricted_email_domains;
      let field = "restricted_email_domains";
      manager.dispatch({type: "REVISION", field, value});
    }

    function save() {
      manager.save();
    }

    function cancel() {
      manager.clear();
    }

    function editEmails() {
      let delegate = new DomainDelegate();
      let title    = i18n("edit_domains");
      this.modal_id = Modals.open(<DomainEditor delegate={delegate} />, {title});
    }

    let controls = [(
      <div className="row margin-bottom-10" key="email_restriction">
        <div className="column large-4">
          <p>{i18n("system_email_restriction")}</p>
        </div>
        <div className="column large-8">
          <div className="clearfix">
            <a className="float-left" onClick={toggleEmailRestriction}>{email_lock ? i18n("on") : i18n("off")}</a>
            <div className={email_lock && revisions.length === 0 ? "margin-left-10 float-left" : "display-none"}>
              <a onClick={editEmails.bind(this)}>{i18n("edit")}</a>
            </div>
          </div>
        </div>
      </div>
    )];

    return (
      <div className="clearfix">
        <div className="clearfix">{controls}</div>
        <div className={revisions && revisions.length ? "clearfix" : "display-none"}>
          <a className="float-left margin-right-10 btn" onClick={save}>{i18n("save")}</a>
          <a className="float-left btn" onClick={cancel}>{i18n("cancel")}</a>
        </div>
      </div>
    );
  }

}

export default SystemSettings;
