import * as React from "react";

export declare interface LinkProps {
  href?    : string;
  handler? : () => void;
  text     : string;
}

function noop() { }

function Link(props : LinkProps) : React.ReactElement<LinkProps> {
  let {text, href} = props;
  let handler = "function" === typeof props.handler ? props.handler : noop;
  return (<a onClick={handler} href={href}>{text}</a>);
}

export default Link;
