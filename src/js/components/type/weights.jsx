import * as ReactDOM from "react-dom";
import * as React from "react";

export function Light({text, children}) {
  if(text)
    return <span className="fw-300">{text}</span>

  return <span className="fw-300">{children}</span>
}

export function SemiBold({text}) {
  return <span className="fw-600">{text}</span>
}

export function Bold({text}) {
  return <span className="fw-700">{text}</span>
}
