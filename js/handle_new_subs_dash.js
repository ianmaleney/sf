console.log("Subs script loaded");
let loc;

window.location.hostname === "stingingfly.org"
  ? (loc = "https://stingingfly.org/stripe/api")
  : (loc = "https://sfwp.test/stripe/api");

let b = document.querySelectorAll(".subs-dash__sub-process-button");

let url = function(data, url = loc) {
  var href = new URL(url);
  Object.keys(data).forEach(key => href.searchParams.append(key, data[key]));
  return href.href;
};

b.forEach(el => {
  el.addEventListener("click", e => {
    let sub_id = e.target.dataset.sub;
    let formdata = { sub_id: sub_id, admin_status: "processed" };

    fetch(url(formdata), {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status_code === "success") {
          e.target.parentNode.classList.add("processed");
        } else {
          alert("Sorry, there has been an error.");
        }
      });
  });
});
