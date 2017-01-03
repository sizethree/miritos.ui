import LoginForm from "../components/login_form"
import * as ReactDOM from "react-dom";
import * as React from "react";

export default function render({resolved}) {
  return (
    <div className="clearfix row collapse">
      <div className="columns large-6">
        <LoginForm />
      </div>
    </div>
  );
};
