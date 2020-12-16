const formData = (form, token, sub) => {
  let v = (el) =>
    form.querySelector(el) ? form.querySelector(el).value : null;

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
    book: v('input[name="book"]:checked'),
    delivery: v('input[name="delivery"]:checked'),
    listed: v('input[name="listed"]:checked'),
    patron_amount: v('input[name="patron_amount"]'),
    stripeToken: token ? token.id : null,
    subscription_type: sub,
    gift: v('input[name="gift"]:checked'),
    gifter_first_name: v("#gifter_first_name"),
    gifter_last_name: v("#gifter_last_name"),
    gifter_email: v("#gifter_email"),
    gift_date: v('input[name="gift_start_date"]'),
    gift_note: v("#gift_note")
  };

  console.log({obj});
  
  return JSON.stringify(obj);
};

export default formData;
