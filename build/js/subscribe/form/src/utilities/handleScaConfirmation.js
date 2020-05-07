// Handle SCA Confirmation
const handle_sca_confirmation = async function(
  client_secret,
  card,
  stripe,
  errorElement,
  successCallback
) {
  let result = await stripe.handleCardPayment(client_secret, card);
  console.log({ result });
  result.error
    ? (errorElement.textContent = result.error.message)
    : successCallback();
  return result;
};

export default handle_sca_confirmation;
