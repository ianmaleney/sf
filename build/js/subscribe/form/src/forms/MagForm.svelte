<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import FormFieldset from "../form-elements/FormFieldset.svelte";
	import StripeElement from "../form-elements/StripeElement.svelte";

	const spush = (array, item_to_add) => [...array, item_to_add];
	const spop = (array, attr, name) => array.filter(i => i[attr] !== name);

	let gift = false;
	const dispatch = createEventDispatcher();
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

	onMount(() => {
		// Gift Toggle
		let giftButtons = document.querySelectorAll("input[name='gift']");
		[...giftButtons].forEach(el => {
			el.addEventListener("change", handleGift);
		});
	});
</script>

<form action="" method="post" class="payment-form" id="payment-form">
	
	<FormFieldset f_id="sub_gift_toggle" f_legend="Is this subscription for you, or someone else?" inputs={inputs.gift_toggle_inputs} />
	
	<FormFieldset f_id="sub_contact" f_legend="Who should we send it to?" inputs={inputs.contact_inputs} comment={comments.contact_comment} />

	{#if gift == true}
		<FormFieldset f_id="sub_gifter" f_legend="Your Contact Details" inputs={inputs.gifter_inputs} comment={comments.gifter_comment} />
	{/if}
	
	<FormFieldset f_id="sub_address" f_legend="Where should we send it?" inputs={inputs.address_inputs} comment={comments.address_comment} />

	<FormFieldset f_id="sub_start" f_legend="When would you like the subscription to start?" inputs={inputs.start_inputs} comment={comments.start_comment} />
	
	<StripeElement />
</form>