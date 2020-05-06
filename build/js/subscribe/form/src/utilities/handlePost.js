import formData from "./formData";

const handlePost = async (form, token, url) => {
  console.log(form, token, url);
  let p = await fetch(url, {
    method: "POST",
    body: formData(form, token),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return p.json();
};

export default handlePost;
