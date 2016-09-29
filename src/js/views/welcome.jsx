import LoginForm from "../components/login_form"

export default function render({resolved}) {
  return (
    <div className="clearfix row">
      <div className="columns large-6">
        <h5>login</h5>
        <br />
        <LoginForm />
      </div>
    </div>
  );
};
