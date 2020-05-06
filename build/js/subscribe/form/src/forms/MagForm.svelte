<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import FormFieldset from "../form-elements/FormFieldset.svelte";
	import StripeElement from "../form-elements/StripeElement.svelte";
	import Spinner from "../form-elements/Spinner.svelte";
	import handleSuccess from "../utilities/handleSuccess";
	import handleFailure from "../utilities/handleFailure";
	import spush from "../utilities/spush.js";
	import spop from "../utilities/spop.js";

	let gift = false;
	let closed = false;

	const meta = {
		current_number: document.querySelector(".meta").dataset.current,
		current_title: document.querySelector(".meta").dataset.title,
		next_issue_number: parseInt(document.querySelector(".meta").dataset.current) + 1,
		next_issue_title: `Issue ${parseInt(document.querySelector(".meta").dataset.current) + 1} / Volume 2`
	}
	let inputs = {
		gift_toggle_inputs: [
			{type: "radio", label: "It's For Me", name: "gift", input_id: "gift_no", value: "false", checked: true},
			{type: "radio", label: "It's A Gift", name: "gift", input_id: "gift_yes", value: "true", checked: false}
		],
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
				type: "heading", label: "Select your delivery region",
			},
			{
				type: "radio", name: "delivery", input_id: "irl", value: "irl",checked: true, label: "Ireland & Northern Ireland"
			},
			{
				type: "radio", name: "delivery", input_id: "row", value: "row",checked: false, label: "Rest of the World"
			},
		],
		start_inputs: [
			{
				type:"radio", input_id:"current_issue", name:"issue", value: meta.current_number, disabled: true, checked: false, label: meta.current_title
			},
			{
				type:"radio", input_id:"next_issue", name:"issue", value: meta.next_issue_number, disabled: false, checked: true, label: meta.next_issue_title
			}
		]
	}
	let comments = {
		contact_comment: "The name and email address of the recipient",
		gifter_comment: "We’ll need your name and email address too, just so we can send you a receipt.",
		address_comment: "This is the address where we’ll be sending the issues.",
		start_comment: "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year."
	}

	let modal = {
		display: false,
		data: {
			title: "Success!",
			message: "You have successfully subscribed to The Stinging Fly. You will receive a receipt and an email with your login details shortly. Happy reading!",
			link: "/",
			button_text: "Return To The Stinging Fly"
		}
	}

	const handleGift = e => {
		if (e.target.checked) {
			gift = JSON.parse(e.target.value);
			if (gift) {
				inputs.start_inputs = spush(inputs.start_inputs, {
					type: "date", label: "On what date should the gift subscription begin?", name: "gift_start_date"
				});
				comments.start_comment = comments.start_comment += " You can also choose a specific date for the subscription to start. This is when the person receiving the gift will be notified."
			} else {
				inputs.start_inputs = spop(inputs.start_inputs, "name", "gift_start_date");
				comments.start_comment = "You can choose to have your subscription start with the current issue, or the next issue. All subscriptions last for one year.";
			}
		}
	}

	const handleFormSubmit = e => {
		let f = document.querySelector("#payment-form");
		f.disabled = true;
		closed = true;
	}

	const handleFormSuccess = e => {
		let f = document.querySelector("#payment-form");
		f.disabled = false;
		closed = false;
		// Create Modal With Success Notice
		modal.display = true;
		f.reset();
	}
	
	const handleFormFailure = e => {
		let f = document.querySelector("#payment-form");
		f.disabled = false;
		closed = false;
		// This should just return the appropriate message?
		let res = handleFailure(e);
		// Create Modal with Failure Notice
		if (res) {
			modal.data = {
				title: "Uh oh!",
				message: res.message,
				link: "#",
				button_text: "Try Again?"
			}
			modal.display = true;
		}
	}

	onMount(() => {
		// Gift Toggle
		let giftButtons = document.querySelectorAll("input[name='gift']");
		[...giftButtons].forEach(el => {
			el.addEventListener("change", handleGift);
		});
	});
</script>

<form action="" method="post" class="payment-form" id="payment-form" class:closed>
	
	<FormFieldset f_id="sub_gift_toggle" f_legend="Is this subscription for you, or someone else?" inputs={inputs.gift_toggle_inputs} />
	
	<FormFieldset f_id="sub_contact" f_legend="Who should we send it to?" inputs={inputs.contact_inputs} comment={comments.contact_comment} />

	{#if gift == true}
		<FormFieldset f_id="sub_gifter" f_legend="Your Contact Details" inputs={inputs.gifter_inputs} comment={comments.gifter_comment} />
	{/if}
	
	<FormFieldset f_id="sub_address" f_legend="Where should we send it?" inputs={inputs.address_inputs} comment={comments.address_comment} />

	<FormFieldset f_id="sub_start" f_legend="When would you like the subscription to start?" inputs={inputs.start_inputs} comment={comments.start_comment} />
	
	<StripeElement on:formSubmit="{handleFormSubmit}" on:success="{handleFormSuccess}" on:failure="{handleFormFailure}"/>
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