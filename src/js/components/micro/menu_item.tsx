import Link from "components/micro/link";
import * as React from "react";

export declare interface MenuItemProps {
  handler? : () => void;
  href?    : string;
  text     : string;
}

class MenuItem extends React.Component<MenuItemProps, any> {

  render() {
    let {props} = this;
    let {handler, text, href} = props;
    let link = <Link href={href} handler={handler} text={text} />;
    return (<li className="menu__item">{link}</li>);
  }

}


export default MenuItem;
