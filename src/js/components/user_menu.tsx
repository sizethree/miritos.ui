import Auth from "services/auth";
import i18n from "services/i18n";
import ActionMenu from "components/hoc/action_menu";
import MenuItem from "components/micro/menu_item";
import MenuContents from "components/micro/menu_contents";

function Button() {
  return (
    <div className="user-menu">
      <a className="user-menu__toggle"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

class Menu extends React.Component<any, any> {

  render() {
    function logout() {
      window.location.replace("/api/logout");
      close();
    }

    let items = [
      <MenuItem key="logout" handler={logout} text={i18n("logout")} />,
      <MenuItem key="account" href={"/account"} text={i18n("account")} />,
      <MenuItem key="dashboard" href={"/dashboard"} text={i18n("dashboard")} />
    ];

    if(true === Auth.isAdmin()) {
      let admin = <MenuItem key="a" href="/admin" text={i18n("admin")} />;
      items.push(admin);
    }

    return (<MenuContents children={items} />);
  }

}

export default ActionMenu(Menu, Button);
