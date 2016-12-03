import MenuItem from "components/micro/menu_item";
import {MenuItemProps} from "components/micro/menu_item";

type MenuItemElement = React.ReactElement<MenuItem>;
export type MenuItems = Array<MenuItemElement>;

export declare interface MenuProps {
  children? : MenuItems;
}

function MenuContents(props : MenuProps) : React.ReactElement<any> {
  let {children} = props;

  return (
    <section className="menu align-left">
      <ul className="menu__option-list">{children}</ul>
    </section>
  );
}

export default MenuContents;
