import formData from "./formData";

const handlePost = async (form, token, url, sub) => {
  let p = await fetch(url, {
    method: "POST",
    body: formData(form, token, sub),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  let json = await p.json();
  return json;
};

export default handlePost;
