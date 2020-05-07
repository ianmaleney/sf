<script>
	export let formType = undefined;
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import FormFieldset from "../form-elements/FormFieldset.svelte";
	import StripeElement from "../form-elements/StripeElement.svelte";
	import Spinner from "../form-elements/Spinner.svelte";
	import handle_sca_confirmation from "../utilities/handleScaConfirmation";
	import spush from "../utilities/spush.js";
	import spop from "../utilities/spop.js";

	let gift = false;
	let closed = false;

	const meta = {
		current_number: document.querySelector(".meta").dataset.current,
		current_title: document.querySelector(".meta").dataset.title,
		next_issue_number: parseInt(document.querySelector(".meta").dataset.current) + 1,
		next_issue_title: `Issue ${parseInt(document.querySelector(".meta").dataset.current) + 1} / Volume 2`,
		current_book: "Modern Times by Cathy Sweeney (Available now)",
		next_book: "Trouble by Philip Ó Ceallaigh (Available Sept 2020)"
	}
	let inputs = {
		contact_inputs: [
			{
				name: "first_name", label: "First Name", type: "text", required: true, classes: "half-width"
			},
			{
				name: "last_name", label: "Last Name", type: "text", required: true, classes: "half-width"
			},
			{
				name: "email", label: "Email", type: "text", required: true, classes: "full-width"
			}
		],
		gifter_inputs: [
			{
				name: "gifter_first_name", label: "First Name", type: "text", required: true, classes: "half-width"
			},
			{
				name: "gifter_last_name", label: "Last Name", type: "text", required: true, classes: "half-width"
			},
			{
				name: "gifter_email", label: "Email", type: "text", required: true, classes: "full-width"
			}
		],
		address_inputs: [
			{
				name: "address_line1", label: "Address Line 1", type: "text", required: true, classes: "full-width"
			},
			{
				name: "address_line2", label: "Address Line 2", type: "text", required: true, classes: "full-width"
			},
			{
				name: "address_city", label: "City", type: "text", classes: "third-width"
			},
			{
				name: "address_postcode", label: "Postcode", type: "text", classes: "third-width"
			},
			{
				name: "address_country", label: "Country", type: "text", classes: "third-width"
			},
			{
				name: "heading", type: "heading", label: "Select your delivery region",
			},
			{
				type: "radio", name: "delivery", input_id: "irl", value: "irl",checked: true, label: "Ireland & Northern Ireland"
			},
			{
				type: "radio", name: "delivery", input_id: "row", value: "row",checked: false, label: "Rest of the World"
			},
		],
		mag_inputs: [
			{
				type:"radio", input_id:"current_issue", name:"issue", value: meta.current_number, disabled: true, checked: false, label: meta.current_title
			},
			{
				type:"radio", input_id:"next_issue", name:"issue", value: meta.next_issue_number, disabled: false, checked: true, label: meta.next_issue_title
			}
		],
		book_inputs: [
			{
				type:"radio", input_id:"current_book", name:"book", value: meta.current_book, disabled: false, checked: true, label: meta.current_book
			},
			{
				type:"radio", input_id:"next_book", name:"book", value: meta.next_book, disabled: false, checked: false, label: meta.next_book
			}
		],
		start_inputs: []
	}
	let comments = {
		contact_comment: "The name and email address of the recipient",
		gifter_comment: "We’ll need your name and email address too, just so we can send you a receipt.",
		address_comment: "This is the address where we’ll be sending the issues.",
		start_comment: "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year."
	}
	let messages = {
		customer_exists: {
			title: "Something has gone wrong...",
			message: "It seems we already have a customer with that email address – are you trying to renew your subscription? Subscriptions renew automatically, so there's no need to resubscribe. If you believe there's a problem, contact us at web.stingingfly@gmail.com.",
			link: "#",
			button_text: "Try Again?"
		},
		unknown_error: {
			title: "Something has gone wrong...",
			message: "There's a problem somewhere, contact us at web.stingingfly@gmail.com.",
			link: "#",
			button_text: "Try Again?"
		},
		payment_failed: {
			title: "There's a problem with your card",
			message: "It seems your card has been declined for some reason. Please try another.",
			link: "#",
			button_text: "Try Again?"
		},
		success: {
			title: "Success!",
			message: "You have successfully subscribed to The Stinging Fly. You will receive a receipt and an email with your login details shortly. Happy reading!",
			link: "/",
			button_text: "Return To The Stinging Fly"
		}
	}

	let modal = {
		display: false,
		data: messages.success
	}

	const handleFormSubmit = e => {
		closed = true;
	}

	const handleFormSuccess = e => {
		closed = false;
		modal.display = true;
	}
	
	const handleFormFailure = async e => {
		let { res, card, stripe, errorElement } = e.detail;
		closed = false;
		switch (res.message) {
			case "Existing Customer":
				modal.data = messages.customer_exists
				modal.display = true;
				break;

			case "payment_failed":
				modal.data = messages.payment_failed
				modal.display = true;
				break;

			case "confirmation_needed":
				handle_sca_confirmation(res.data.client_secret, card, stripe, errorElement, () => modal.display = true);
				break;

			default:
				modal.data = messages.unknown_error
				modal.display = true;
				break;
		}
	}

	beforeUpdate(() => {
		if (formType === 'patron') { gift = false };
		// Set Start Inputs
		if (formType === 'magonly') {
			inputs.start_inputs = inputs.mag_inputs;
		} else if (formType === 'bookonly') {
			inputs.start_inputs = inputs.book_inputs;
		} else {
			inputs.start_inputs = [...inputs.mag_inputs, ...inputs.book_inputs];
		}

		if (gift) {
			inputs.start_inputs = [...inputs.start_inputs, {
				type: "date", label: "On what date should the gift subscription begin?", name: "gift_start_date"
			}];
			comments.start_comment = comments.start_comment += " You can also choose a specific date for the subscription to start. This is when the person receiving the gift will be notified."
		} else {
			comments.start_comment = "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year.";
		}
	});
</script>

{#if formType}
<form action="" method="post" class="payment-form" id="payment-form" class:closed>
	
	<!-- Gift Toggle -->
	{#if formType !== 'patron'}
	<FormFieldset f_id="sub_gift_toggle" f_legend="Is this subscription for you, or someone else?">
		<input type="radio" name="gift" id="gift_no" bind:group={gift} value={false} checked>
		<label for="gift_no">It's For Me</label>
		<input type="radio" name="gift" id="gift_yes" bind:group={gift} value={true}>
		<label for="gift_yes">It's A Gift</label>
	</FormFieldset>
	{/if}

	<!-- Subscriber Contact Details -->
	<FormFieldset f_id="sub_contact" f_legend="Who should we send it to?" inputs={inputs.contact_inputs} comment={comments.contact_comment} />
	
	<!-- Gifter Contact Details -->
	{#if gift == true}
	<FormFieldset f_id="sub_gifter" f_legend="Your Contact Details" inputs={inputs.gifter_inputs} comment={comments.gifter_comment} />
	{/if}
	
	<!-- Subscriber Address Details -->
	<FormFieldset f_id="sub_address" f_legend="Where should we send it?" inputs={inputs.address_inputs} comment={comments.address_comment} />
	
	<!-- Subscription Start Details -->
	<FormFieldset f_id="sub_start" f_legend="When would you like the subscription to start?" inputs={inputs.start_inputs} comment={comments.start_comment} />

	<!-- Donation Toggle -->
	{#if formType === 'patron'}
	<FormFieldset f_id="patron_set_amount" f_legend="How much would you like to give?">
		<label for="patron_amount">
		<span class="label-title">Amount in Euro – Minimum €100</span>
		<input type="number" name="patron_amount" id="patron_amount" min="100" value="100">
		</label>
	</FormFieldset>
	{/if}
	
	<!-- Payment Details -->
	<StripeElement on:formSubmit="{handleFormSubmit}" on:success="{handleFormSuccess}" on:failure="{handleFormFailure}" subscription="{formType}"/>
</form>


{#if closed}
<Spinner />
{/if}

{#if modal.display}
<div class="modal" transition:fade>
	<div class="modal__underlay" on:click="{() => modal.display = false}"></div>
	<div class="modal__text">
		<h2>{modal.data.title}</h2>
		<p>{modal.data.message}</p>
		<a href="{modal.data.link}" on:click="{() => modal.display = false}">{modal.data.button_text}</a>
	</div>
</div>
{/if}

{/if}
<style>

	#payment-form {
		margin-top: 80px;
	}
	.closed {
		opacity: 0.5;
		pointer-events: none;
	}

	.modal {
		width: 100vw;
		height: 100vh;
		display: flex;
		position: fixed;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 997;
	}
	.modal__underlay {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.3);
		z-index: 998;
	}
	.modal__text {
		background-color: white;
		max-width: 720px;
		padding: 20px;
		margin: 20px;
		text-align: center;
		z-index: 999;
		box-shadow: 2px 4px 8px rgba(0,0,0,0.5)
	}
	.modal__text > * {
		font-family: "IBM Plex Sans Condensed";
	}
	.modal__text h2 {
		font-size: 2.8rem;
		text-decoration: underline;
	}
	.modal__text a {
		display: inline-block;
		margin: 16px 0;
		border: 2px solid black;
		padding: 12px 36px;
		font-size: 1.6rem;
		border-radius: 4px;
		font-weight: 800;
		color: black;
	}
	.modal__text a:hover {
		background-color: black;
		color: white;
		cursor: pointer;
	}
</style>