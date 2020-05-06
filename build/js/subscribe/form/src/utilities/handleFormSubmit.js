import createStripeToken from "./createStripeToken";
import handlePost from "./handlePost";

const handleFormSubmit = async (e, card, stripe, url, dispatch) => {
  e.preventDefault();
  let f = document.getElementById("payment-form");
  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;
  let stripeName = `${first_name} ${last_name}`;
  var options = {
    // Stripe Info
    name: stripeName,
    email: document.getElementById("email").value,
    address_line1: document.getElementById("address_line1").value,
    address_line2: document.getElementById("address_line2").value,
    address_city: document.getElementById("address_city").value,
    address_country: document.getElementById("address_country").value,
    address_zip: document.getElementById("address_postcode").value
  };
  try {
    let stripeToken = await createStripeToken(card, options, stripe);
    let result = await handlePost(f, stripeToken, url);
    result.success
      ? dispatch("success", { res: result })
      : dispatch("failure", { res: result, card: card });
  } catch (error) {
    console.log(error);
  }
};

export default handleFormSubmit;
