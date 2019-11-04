<script>
export let sub_id, first_name, last_name, email, address_one, address_two, city, country, postcode, stripe_customer_id, wp_user_id, sub_status, subscribe_until, date_start, next_renewal_date, renewals, gift, start_issue, delivery_region, gifter_first_name, gifter_last_name, gifter_email

let init_address = [];
let loc;

window.location.hostname === 'stingingfly.org' ? loc = 'https://stingingfly.org/stripe/api' : loc = 'https://sfwp.test/stripe/api'

let url = function(data, url = loc) {
	var href = new URL(url);
	Object.keys(data).forEach(key => href.searchParams.append(key, data[key]));
	return href.href;
}
	
function handleExpand(event) {
	let n = event.target;
	let parent = event.target.parentNode;
	if (parent.classList.contains("expanded")) {
		parent.classList.remove("expanded");
		n.textContent = "+ More";
		parent.style.width = "185px";
		parent.style.height = "185px";
	} else {
		parent.style.width = "100%";
		parent.style.height = "auto";
		parent.classList.add("expanded");
		n.textContent = "- Less";
	}
}

async function handleAddressSave(e) {
	let sub = e.target.dataset.sub;
	let subCard = document.querySelector(`#sub-${sub}`);
	let inputs = subCard.querySelectorAll('.address-inputs input');
	let formFields = ['address_one', 'address_two', 'city', 'country', 'postcode'];
	let formdata = { sub_id: sub };
	if (e.target.dataset.stripe != 'null') {
		formdata['stripe_customer_id'] = e.target.dataset.stripe;
	}
	subCard.querySelector("#address-edit").style.display = 'inline';
	subCard.querySelector("#address-cancel").style.display = 'none';
	subCard.querySelector("#address-save").style.display = 'none';
	inputs.forEach((input, i) => {
		formdata[formFields[i]] = input.value;
		let parent = input.parentNode;
		let ptag = document.createElement('p');
		ptag.style.fontSize = "12px";
		ptag.style.lineHeight = "18px";
		ptag.style.margin = 0;
		ptag.textContent = input.value;
		input.remove();
		parent.appendChild(ptag);
	});
	let response = await fetch(url(formdata), {
		method: 'PUT'
	});
	let data = await response.json()
  	console.log({data});
}
function handleAddressCancel(e) {
	let sub = e.target.dataset.sub;
	let subCard = document.querySelector(`#sub-${sub}`);
	let inputs = subCard.querySelectorAll('.address-inputs input');
	subCard.querySelector("#address-edit").style.display = 'inline';
	subCard.querySelector("#address-cancel").style.display = 'none';
	subCard.querySelector("#address-save").style.display = 'none';
	inputs.forEach((input, i) => {
		let tc = input.value;
		let parent = input.parentNode;
		let ptag = document.createElement('p');
		ptag.style.fontSize = "12px";
		ptag.style.lineHeight = "18px";
		ptag.style.margin = 0;
		ptag.textContent = init_address[i];
		input.remove();
		parent.appendChild(ptag);
	});
}
function handleAddressEdit(e) {
	let sub = e.target.dataset.sub;
	let subCard = document.querySelector(`#sub-${sub}`);
	let inputs = subCard.querySelectorAll('.address-inputs p');
	e.target.style.display = 'none';
	subCard.querySelector("#address-cancel").style.display = 'inline';
	subCard.querySelector("#address-save").style.display = 'inline';
	inputs.forEach(ptag => {
		let tc = ptag.textContent;
		let parent = ptag.parentNode;
		let input = document.createElement('input');
		input.value = tc;
		input.style.fontSize = '12px';
    	input.style.lineHeight = '14px';
    	input.style.padding = '3px';
    	input.style.display = 'block';
		input.style.margin = '2px 0';
		init_address.push(tc);
		ptag.remove();
		parent.appendChild(input);
	});
}

async function handleSubCancel(e) {
	let formdata = {
		sub_id: e.target.dataset.subid,
	}
	if (e.target.dataset.stripeid != 'null') {
		formdata['stripe_customer_id'] = e.target.dataset.stripeid;
	}
	let response = await fetch(url(formdata), {
		method: 'DELETE'
	});
	let data = await response.json();
	if (data.status_code === 'success') {
		e.target.setAttribute('disabled', true);
		e.target.textContent = 'Subscription Cancelled';
	} else {
		let p = e.target.parentNode.querySelector('p');
		p.textContent = data.message;
	}
	console.log(data);
}
</script>

<style>
	.subscriber-card {
		background-color: white;
		width: 185px;
		height: 185px;
		min-height: 185px;
		margin: 8px;
		padding: 10px;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}

	.subscriber-card h1 {
		margin: 0 0 8px;
		padding: 0;
		font-weight: bold;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		font-size: 16px;
		line-height: 22px;
	}

	.subscriber-card__info {
		display: flex;
	}

	.subscriber-card__info-section {
		border-right: 1px solid rgba(0,0,0,0.1);
		margin-right: 8px;
		padding-right: 8px;
		min-width: 185px;
	}

	.subscriber-card__info-section:last-child {
		border-right: none;
		max-width: 320px;
		line-height: 1.1;
    	color: #5f5151;
	}

	.subscriber-card__basic-info a {
		display: block;
		margin-bottom: 8px;
		max-width: calc(100% - 20px);
		word-break: break-word;
	}

	.subscriber-card__info-section a {
		font-size: 12px;
	}

	.subscriber-card p, .address-line {
		font-size: 12px;
		line-height: 18px;
		margin: 0;
	}

	.subscriber-card__more-button {
		background-color: white;
		border: none;
		padding: 0;
		color: rgb(0,100,200);
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		right: 10px;
	}

	.subscriber-card__more-button:hover {
		color: blue;
		cursor: pointer;
	}

	.subscriber-card__address {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.address-buttons {
		align-self: flex-end;
	}

	.subscriber-card__address button {
		border: none;
		background-color: rgba(255,255,255,0);
		font-size: 11px;
		color: rgba(0,100,200,1);
		/* position: absolute;
		bottom: -10px;
		right: 10px */
	}

	.subscriber-card__address button:hover {
		color: rgba(0,100,200,0.8);
		cursor: pointer;
	}
	.subscriber-card__cancel button {
		border: 1px solid currentColor;
		background-color: rgba(255,255,255,0);
		color: rgba(0, 100, 200, 1);
		margin: 8px auto;
	}
	.subscriber-card__cancel button:hover {
		cursor: pointer;
		background-color: rgba(16,135,254,0.1);
	}
	.subscriber-card__cancel button:disabled {
		cursor: pointer;
		background-color: #e9e9e9;
		color: #444;
		opacity: 0.5;
	}

	#address-save, #address-cancel {
		display: none;
	}
</style>

<li class="subscriber-card" id="sub-{sub_id}">
	<section>
		<h1>{first_name} {last_name}</h1>
	</section>
	<section class="subscriber-card__info">
		<div class="subscriber-card__info-section subscriber-card__basic-info">
			<a href="mailto:{email}">{email}</a>
			<p><strong>Subscribed:</strong> {date_start}</p>
			<p><strong>Status:</strong> {sub_status}</p>
		</div>
		<div class="subscriber-card__info-section subscriber-card__address">
			<div class="address-inputs">
				<p class="address-line">{address_one} </p>
				<p class="address-line">{address_two} </p>
				<p class="address-line">{city} </p>
				<p class="address-line">{country} </p>
				<p class="address-line">{postcode} </p>
			</div>
			<div class="address-buttons">
				<button data-sub="{sub_id}" data-stripe="{stripe_customer_id}" id="address-save" on:click={handleAddressSave}>Save</button>
				<button data-sub="{sub_id}" data-stripe="{stripe_customer_id}" id="address-cancel" on:click={handleAddressCancel}>Cancel</button>
				<button data-sub="{sub_id}" data-stripe="{stripe_customer_id}" id="address-edit" on:click={handleAddressEdit}>Edit Address</button>
			</div>
		</div>
		<div class="subscriber-card__info-section subscriber-card__secondary-info">
			<p><strong>Starting Issue:</strong> {start_issue} </p>
			<p><strong>Last Issue:</strong> {subscribe_until} </p>
			<p><strong>Access Ends:</strong> {next_renewal_date} </p>
			<p><strong>Username:</strong> <a href="https://stingingfly.org/wp-admin/user-edit.php?user_id={wp_user_id}">{first_name}{last_name}{sub_id}</a></p>
		</div>
		<div class="subscriber-card__info-section subscriber-card__cancel">
			<button disabled="{sub_status == 'pending_cancellation'}" data-subid={sub_id} data-stripeid={stripe_customer_id} on:click={handleSubCancel}>Cancel Subscription</button>
			<p>The subscriber will retain access to the online archive until their subscription expires. This is the same as removing ‘auto-renewal’.</p>
		</div>
	</section>
	<button class="subscriber-card__more-button" on:click={handleExpand}>+ More</button>
</li>