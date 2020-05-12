const return_api_url = endpoint => {
  return window.location.hostname === "stingingfly.org"
    ? `https://enigmatic-basin-09064.herokuapp.com/${endpoint}`
    : `http://localhost:8001/${endpoint}`;
};
const return_stripe_key = () => {
  return window.location.hostname === "stingingfly.org"
    ? `pk_live_EPVd6u1amDegfDhpvbp57swa`
    : `pk_test_0lhyoG9gxOmK5V15FobQbpUs`;
};

const updateDOM = (element, className, message, parent) => {
  let new_el = document.createElement(element);
  new_el.classList.add(className);
  new_el.innerHTML = message;
  parent.appendChild(new_el);
};

const handleCancelSub = (sub_id, stripe_sub_id) => {
  const cancelSubButton = document.querySelector(".cancel-sub__button");
  const cancelSubWrapper = document.querySelector(".cancel-sub__wrapper");

  cancelSubButton.addEventListener("click", async function(e) {
    e.preventDefault();
    let r = await fetch(return_api_url("api/subscribers"), {
      method: "delete",
      body: JSON.stringify({
        sub_id: sub_id,
        stripe_subscription_id: stripe_sub_id || null
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let res = await r.json();
    let message = res.success
      ? "Success! You've cancelled your subscription. We're sorry to see you go!"
      : "Sorry, something has gone wrong. Try again, or send us an email: <a href='mailto:web.stingingfly@gmail.com'>web.stingingfly@gmail.com</a>";

    updateDOM("p", "message", message, cancelSubWrapper);
  });
};

const stripeTokenHandler = async (token, cus_id, errorElement) => {
  let data = {
    stripeToken: token.id,
    customer_id: cus_id
  };
  // Submit form
  let r = await fetch(return_api_url("api/cards"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let res = await r.json();
  errorElement.textContent = res.message || "Unable to fetch";
};

const handleAddressData = (sub_id, stripe_customer_id) => {
  let v = el => document.getElementById(el).value;
  return {
    address_one: v("address-one"),
    address_two: v("address-two"),
    city: v("address-city"),
    country: v("address-country"),
    postcode: v("address-postcode"),
    sub_id: sub_id,
    stripe_customer_id: stripe_customer_id || null
  };
};

const handleUpdateAddress = async (address_form, sub_id, customer_id) => {
  let data = handleAddressData(sub_id, customer_id);
  let res = await fetch(return_api_url("api/subscribers"), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let response = await res.json();
  let message = response.success
    ? "Success! You've updated your address."
    : "Sorry, something has gone wrong. Try again, or send us an email: <a href='mailto:web.stingingfly@gmail.com'>web.stingingfly@gmail.com</a>";

  updateDOM("p", "message", message, address_form);
};

document.addEventListener("DOMContentLoaded", () => {
  let isMyAccount = document.querySelector(".page-id-168");
  if (!isMyAccount) return;
  fetch(return_api_url("wakeup"));

  /* Set Variables */
  let sub_id = document.meta.sub_id;
  let cus_id = document.meta.stripe_customer_id;
  let stripe_sub_id = document.meta.stripe_subscription_id;

  /**********************************/
  /*
  /* Handle Cancelling Subscription */
  /*
  /**********************************/

  handleCancelSub(sub_id, stripe_sub_id);

  /**********************************/
  /*
  /* Handle Updating Address        */
  /*
  /**********************************/

  let address_form = document.querySelector("#change_address_form");
  address_form.addEventListener("submit", e => {
    e.preventDefault();
    handleUpdateAddress(address_form, sub_id, cus_id);
  });

  /**********************************/
  /*
  /* Handle Updating Card Details   */
  /*
  /**********************************/

  let stripe = Stripe(return_stripe_key());
  let elements = stripe.elements();
  let form = document.getElementById("update-card");
  let errorElement = document.getElementById("card-errors");
  let style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "15px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  // Create an instance of the card Element
  let card = elements.create("card", { style: style });

  // Add an instance of the card Element into the `card-element` <div>
  card.mount("#card-element");

  // Handle real-time validation errors from the card Element.
  card.addEventListener("change", function(event) {
    event.error
      ? (errorElement.textContent = event.error.message)
      : (errorElement.textContent = "");
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        errorElement.textContent = result.error.message;
      } else {
        stripeTokenHandler(result.token, cus_id, errorElement);
      }
    });
  });
});
