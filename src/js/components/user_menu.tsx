import Auth from "services/auth";
import i18n from "services/i18n";
import MenuItem from "components/micro/menu_item";
import MenuContents from "components/micro/menu_contents";
import {hoc} from "hoctable";

function Button() {
  return (
    <div className="user-menu">
      <a className="user-menu__toggle"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

class Menu extends React.Component<any, any> {

  render() {
    let {close} = this.props;

    function logout() {
      window.location.replace("/api/logout");
      close();
    }

    let items = [
      <MenuItem key="logout" handler={logout} text={i18n("logout")} />,
      <MenuItem key="account" handler={close} href={"/account"} text={i18n("account")} />,
      <MenuItem key="dashboard" handler={close} href={"/dashboard"} text={i18n("dashboard")} />
    ];

    if(true === Auth.isAdmin()) {
      let admin = <MenuItem key="a" href="/admin" text={i18n("admin")} handler={close} />;
      items.push(admin);
    }

    return (<MenuContents children={items} />);
  }

}

export default hoc.ActionMenu(Menu, Button);
