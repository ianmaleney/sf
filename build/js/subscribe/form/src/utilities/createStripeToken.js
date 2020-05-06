const createStripeToken = async (card, options, stripe) => {
  try {
    const result = await stripe.createToken(card, options);
    if (result.error) {
      throw result.error.message;
    }
    return result.token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default createStripeToken;
