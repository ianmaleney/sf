import { writable } from "svelte/store";

function comparison(array, term) {
  return array.sort((a, b) => {
    if (!a[term]) return -1;
    return a[term].localeCompare(b[term]);
  });
}

function createSubStore() {
  const { subscribe, set, update } = writable([]);
  let url;
  if (window.location.hostname === "stingingfly.org") {
    url = "https://stingingfly.org/stripe/api";
  } else {
    url = "https://sfwp.test/stripe/api";
  }

  return {
    subscribe,
    filter: searchterm =>
      fetch(url, { cache: "force-cache" })
        .then(res => res.json())
        .then(data => {
          let filtered = data.filter(sub => {
            let searchable = [
              sub.first_name,
              sub.last_name,
              sub.email,
              sub.address_one,
              sub.address_two,
              sub.city,
              sub.country,
              sub.postcode
            ].join(" | ");
            if (searchable.toLowerCase().includes(searchterm.toLowerCase())) {
              return true;
            }
          });
          return filtered;
        })
        .then(filtered => set(filtered)),
    generalSort: t => update(current => comparison(current, t)),
    remote: data => set(data)
  };
}

export const subscribers = createSubStore();
