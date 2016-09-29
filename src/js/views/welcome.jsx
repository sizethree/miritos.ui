import LoginForm from "../components/login_form"

export default function render({resolved}) {
  return (
    <div className="clearfix row collapse">
      <div className="columns large-6">
        <LoginForm />
      </div>
    </div>
  );
};
