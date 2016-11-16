import i18n from "services/i18n";
import Notes from "services/notes";
import defer from "services/defer";
import InputField from "components/forms/input_field";

function Actions({delegate: account_delegate}) {
  let note = null;

  function cancel() {
    account_delegate.dispatch({type: "CLEAR_REVISIONS"});
  }

  function success() {
  }

  function failed(e) {
    console.error(e);
  }

  function cleanup() {
    Notes.remove(note);
  }

  function save() {
    note = Notes.add(<p>{i18n("saving_please_wait")}</p>);
    let attempt = account_delegate.save()

    attempt.then(success)
      .catch(failed)
      .fin(cleanup);

    return attempt;
  }

  return (
    <div className="clearfix">
      <a className="btn float-right waves-effect margin-left-5 waves-light" onClick={cancel}>{i18n("cancel")}</a>
      <a className="btn float-right waves-effect waves-light" onClick={save}>{i18n("save")}</a>
    </div>
  );
}

class BasicInfo extends React.Component {

  constructor(props) {
    super(props);
    let {delegate} = this.props;

    function update() {
      this.setState({last_update: Date.now()});
    }

    delegate.subscribe(update.bind(this));
  }

  render() {
    let {delegate: account_delegate} = this.props;
    let {user, revisions} = account_delegate.latest;

    function update({target}) {
      let {value, attributes} = target;
      let field = null;

      for(let i = 0, c = attributes.length; i < c; i++) {
        let {name, value} = attributes[i];
        if(name !== "name") continue;
        field = value;
        break;
      }

      account_delegate.dispatch({type: "USER_UPDATE", field, value});
    }

    let actions = revisions >= 1 ? <Actions delegate={account_delegate} /> : null;
    let password = user.password === undefined ? "empty" : user.password;

    return (
      <div className="account-settings__basic-info">
        <div className="row position-relative clearfix">
          <InputField value={user.name} name={"name"} label={i18n("name")} type={"text"} update={update} />
        </div>
        <div className="row position-relative clearfix">
          <InputField value={user.email} name={"email"} label={i18n("email")} type={"email"} update={update} />
        </div>
        <div className="row position-relative clearfix">{actions}</div>
      </div>
    );
  }

}

export default BasicInfo;
