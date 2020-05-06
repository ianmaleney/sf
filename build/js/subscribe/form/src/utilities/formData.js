const formData = (form, token) => {
  let v = el => (form.querySelector(el) ? form.querySelector(el).value : null);

  let obj = {
    first_name: v("#first_name"),
    last_name: v("#last_name"),
    email: v("#email"),
    address_line1: v("#address_line1"),
    address_line2: v("#address_line2"),
    address_city: v("#address_city"),
    address_country: v("#address_country"),
    address_postcode: v("#address_postcode"),
    issue: v('input[name="issue"]:checked'),
    delivery: v('input[name="delivery"]:checked'),
    stripeToken: token.id
  };
  return JSON.stringify(obj);
};

export default formData;
