// Handle SCA Confirmation
const handle_sca_confirmation = function(
  client_secret,
  card,
  stripe,
  errorElement,
  successCallback
) {
  stripe.handleCardPayment(client_secret, card).then(function(result) {
    if (result.error) {
      // Display error.message in your UI.
      errorElement.textContent = result.error.message;
    } else {
      // The payment has succeeded. Display a success message.
      setTimeout(() => {
        successCallback();
      }, 150);
    }
  });
};

export default handle_sca_confirmation;
