import createStripeToken from "./createStripeToken";
import handlePost from "./handlePost";

const handleFormSubmit = async (
  e,
  card,
  stripe,
  sub,
  url,
  errorElement,
  dispatch
) => {
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
  if (sub === "patron") {
    try {
      let result = await handlePost(f, null, url, sub);
      if (result.success) {
        dispatch("success", { res: result });
        return;
      } else {
        dispatch("failure", {
          res: result,
          card: null,
          stripe: stripe,
          errorElement: errorElement
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let stripeToken = await createStripeToken(card, options, stripe);
      let result = await handlePost(f, stripeToken, url, sub);
      if (result.success) {
        dispatch("success", { res: result });
        return;
      } else {
        dispatch("failure", {
          res: result,
          card: card,
          stripe: stripe,
          errorElement: errorElement
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default handleFormSubmit;
