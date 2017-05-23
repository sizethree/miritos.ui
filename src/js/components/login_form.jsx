import i18n from "services/i18n";
import GoogleLogin from "components/social/google_login";
import * as React from "react";

export default function render(props) {
  return (
    <div className="login-form clearfix">
      <div className="float-left">
        <GoogleLogin />
      </div>
    </div>
  );
};
