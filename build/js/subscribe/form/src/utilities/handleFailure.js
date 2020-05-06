import handle_sca_confirmation from "./handleScaConfirmation";

const handleFailure = res => {
  console.log(res);
  switch (res.message) {
    case "customer_exists":
      setTimeout(() => {
        console.log(res.message);
      }, 250);
      break;

    case "confirmation_needed":
      handle_sca_confirmation(res.data.client_secret, card);
      break;

    default:
      setTimeout(() => {
        console.log(res.message);
      }, 250);
      break;
  }
};

export default handleFailure;
