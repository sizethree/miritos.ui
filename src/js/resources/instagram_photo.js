import Resource from "services/resource";
import transforms from "resources/util/transforms";

const {ENV} = window;
const {response} = transforms;

let create = {
  method: "POST",
  has_body: true,
  transform: {response},
  headers: function() { return {}; }
};

create.transform.request = function(data) {
  let {photo, label} = data;
  let form = new FormData();

  form.append("photo", photo);
  form.append("label", label);

  return form;
};

let InstagramPhoto = Resource(`${ENV.API_HOME}/instagram-photos/:id`, {id: "@id"}, {create});

export default InstagramPhoto;
