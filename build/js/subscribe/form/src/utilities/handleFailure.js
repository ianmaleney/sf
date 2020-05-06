import handle_sca_confirmation from "./handleScaConfirmation";

const handleFailure = e => {
  let { res, card } = e.detail;
  switch (res.message) {
    case "Existing Customer":
      return {
        message:
          "It seems we already have a customer with that email address – are you trying to renew your subscription? Subscriptions renew automatically, so there's no need to resubscribe. If you believe there's a problem, contact us at web.stingingfly@gmail.com."
      };

    case "confirmation_needed":
      handle_sca_confirmation(res.data.client_secret, card);
      return null;

    default:
      return res;
  }
};

export default handleFailure;
