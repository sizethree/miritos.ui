import i18n from "../../services/i18n";
import Notes from "../../services/notes";
import defer from "../../services/defer";

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
      let {value, dataset} = target;
      let {field} = dataset;
      account_delegate.dispatch({type: "USER_UPDATE", field, value});
    }

    let actions = revisions >= 1 ? <Actions delegate={account_delegate} /> : null;

    return (
      <div className="account-settings__basic-info">
        <div className="row position-relative clearfix">
          <div className="input-field columns col large-12">
            <input name="name" type="text" className="validate" value={user.name} onChange={update} data-field="name"/>
            <label htmlFor="user_name" className="active">{i18n("name")}</label>
          </div>
        </div>
        <div className="row position-relative clearfix">
          <div className="input-field columns col large-12">
            <input name="email" type="text" className="validate" value={user.email} onChange={update} data-field="email" />
            <label className="active" htmlFor="email">{i18n("email")}</label>
          </div>
        </div>
        <div className="row position-relative clearfix">
          <div className="input-field columns col large-12">
            <input name="password" type="password" className="validate" value={user.password || "empty"} onChange={update} data-field="password" />
            <label className="active" htmlFor="password">{i18n("password")}</label>
          </div>
        </div>
        <div className="row position-relative clearfix">{actions}</div>
      </div>
    );
  }

}

export default BasicInfo;
