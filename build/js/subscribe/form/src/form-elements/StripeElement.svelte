<script>
	import { onMount } from 'svelte';
	import env from "../utilities/env.js";
	import handleFormSubmit from "../utilities/handleFormSubmit.js";

	/* Set Variables */
	const {url, pkey, endpoint} = env();
	
	/* Initiate Stripe */
	const stripe = window.Stripe(pkey);
	const elements = stripe.elements();

	// Create an instance of the card Element
	const card = elements.create("card", { style: {
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
			} });

	// Add an instance of the card Element into the `card-element` <div>
	onMount(() => {
		card.mount("#card-element");
		const errorElement = document.getElementById("card-errors");
		// Handle real-time validation errors from the card Element.
		card.addEventListener("change", function (event) {
			if (event.error) {
				errorElement.textContent = event.error.message;
			} else {
				errorElement.textContent = "";
			}
		});
	});

	const handleSubmit = e => handleFormSubmit(e, card, stripe, endpoint);

</script>

<fieldset id="sub_payment">
	<legend>How would you like to pay for it?</legend>
	<!-- a Stripe Element will be inserted here. -->
	<label for="card-element">Your Card Details</label>
	<div id="card-element"></div>
	<p class="stripe-info">We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.</p>
	<div id="card-errors"></div>
	<button id="submit-button" on:click={handleSubmit}>Subscribe</button>
	<div class="fieldset-comment">
		<p>When you click 'subscribe', your card will be charged, and you will receive an email with the full details of your subscription, including how to access our online archive.</p>
	</div>

</fieldset>

<style>
	label {
		font-size: 1.3rem;
	}
</style>