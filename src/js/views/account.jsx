import AccountSettings from "../components/account_settings";

export default function Account({resolved: {account_delegate}}) {
  return (
    <div className="clearfix row">
      <h4 className="fg-white-darken-15">Your Account</h4>
      <AccountSettings delegate={account_delegate} />
    </div>
  );
}
