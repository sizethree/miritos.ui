import i18n from "../../services/i18n";

function Google({account}) {
  return (
    <li className="collection-item clearfix">
      <div className="float-right">
        <a className="btn disabled">{i18n("unlink")}</a>
      </div>
      <div className="overflow-hidden">
        <p className="fg-white-darken-25"><i className="icon ion-social-google fs-2"></i></p>
      </div>
    </li>
  );
}

function LinkedAccounts({delegate: account_delegate}) {
  let {google} = account_delegate.linked_accounts;
  let items = [];

  for(let i = 0, c = google ? google.length : 0; i < c; i++) {
    let account = google[i];
    items.push(<Google account={account} key={account.google_id}/>);
  }

  return (
    <div className="account-settings__linked-accounts">
      <ul className="collection">{items}</ul>
    </div>
  );
}

export default LinkedAccounts;
