<?php
/**
 * The template used for displaying Subscription page content
 *
 */
?>
<?php
	$url = site_url();
?>
<style>
	.stripe-form-wrapper {
		width: 100%;
		max-width: 700px;
		position: relative;
	}

	#card-element {
		z-index: 5;
		padding: 8px 10px;
		flex: 1;
	}
	
	form {
		width: 100%;
		margin: 20px 0;
	}

	#payment-form {
		opacity: 1;
		pointer-events: auto;
		transition: all 0.35s ease-in-out;
	}

	#payment-form.invisible {
		opacity: 0;
		pointer-events: none;
	}

	#payment-form.locked {
		opacity: 0.35;
		pointer-events: none;
	}
	.group {
		background: white;
		box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		margin-bottom: 20px;
	}

	label {
		position: relative;
		color: #8898AA;
		font-weight: 300;
		height: 40px;
		line-height: 40px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
	}

	.group label:not(:last-child) {
		border-bottom: 1px solid #F0F5FA;
	}

	label > span {
		width: 120px;
		text-align: right;
		margin-right: 30px;
		font-size: 16px;
		font-family: 'Open Sans', "Helvetica Neue";
	}

	.field {
		background: transparent;
		font-weight: 300;
		border: 0;
		color: #31325F;
		outline: none;
		flex: 1;
		padding-right: 10px;
		padding-left: 10px;
		cursor: text;
		font-size: 16px;
		font-family: 'Open Sans', "Helvetica Neue";
	}

	.field::-webkit-input-placeholder {
		color: #CFD7E0;
	}

	.field::-moz-placeholder {
		color: #CFD7E0;
	}

	button {
		float: left;
		display: block;
		background: #666EE8;
		color: white;
		box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		border: 0;
		margin-top: 20px;
		font-size: 15px;
		font-weight: 400;
		width: 100%;
		height: 40px;
		line-height: 38px;
		outline: none;
	}

	button:focus {
		background: #555ABF;
	}

	button:active {
		background: #43458B;
	}

	#success-container {
		width: 100%;
		max-width: 400px;
		opacity: 1;
		pointer-events: auto;
		transform: translateX(0);
		transition: all 0.35s ease-in-out;
		background-color: white;
		box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		margin-bottom: 20px;
		padding: 8px 10px;
	}
	#success-container.invisible {
		opacity: 0;
		pointer-events: none;
		transform: translateX(400px);
	}

	#success-container h2 {
		font-family: 'Open Sans', "Helvetica Neue";
		font-size: 32px;
		margin: 12px auto;
		text-align: center;
		width: 80%;
		border-bottom: 1px solid rgba(49, 49, 93, 0.10);
		color: #8898AA;
	}

	#success-container p {
		color: #8898AA;
		font-weight: 300;
		font-size: 16px;
		font-family: 'Open Sans', "Helvetica Neue";
		margin: 32px 0;
		text-align: center;
	}

	.spinner {
		margin: 100px auto 0;
		width: 70px;
		text-align: center;
		opacity: 0;
		position: absolute;
		top: 100px;
		left: calc(50% - 35px);
		transition: opacity 0.3s ease-in-out;
	}

	.spinner.visible {
		opacity: 1;
	}

	.spinner > div {
		width: 18px;
		height: 18px;
		background-color: #8898AA;

		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}

	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-bouncedelay {
		0%, 80%, 100% { -webkit-transform: scale(0) }
		40% { -webkit-transform: scale(1.0) }
	}

	@keyframes sk-bouncedelay {
		0%, 80%, 100% { 
			-webkit-transform: scale(0);
			transform: scale(0);
		} 40% { 
			-webkit-transform: scale(1.0);
			transform: scale(1.0);
		}
	}
</style>
<article class="o-article o-article--info">
	<div class="stripe-form-wrapper">
		<form action="" method="post" id="payment-form">
			<!-- a Stripe Element will be inserted here. -->
			<div class="group">
				<label>
					<span>Card</span>
					<div id="card-element"></div>
				</label>
			</div>
			<div class="group">
				<label>
					<span>Name</span>
					<input id="name" name="name" class="field" placeholder="Jane Doe" />
				</label>
				<label>
					<span>Email</span>
					<input id="email" name="email" class="field" placeholder="you@example.com" />
				</label>
			</div>
			<div class="group">
				<label>
					<span>Address</span>
					<input id="address-line1" name="address_line1" class="field" placeholder="77 Winchester Lane" />
				</label>
				<label>
					<span>Address (cont.)</span>
					<input id="address-line2" name="address_line2" class="field" placeholder="" />
				</label>
				<label>
					<span>City</span>
					<input id="address-city" name="address_city" class="field" placeholder="Coachella" />
				</label>
				<label>
					<span>State</span>
					<input id="address-state" name="address_state" class="field" placeholder="CA" />
				</label>
				<label>
					<span>ZIP</span>
					<input id="address-zip" name="address_zip" class="field" placeholder="92236" />
				</label>
				<label>
					<span>Country</span>
					<input id="address-country" name="address_country" class="field" placeholder="United States" />
				</label>
			</div>
			<button>Submit Payment</button>
		</form>
		<div class="spinner">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	</div>
	<div id="card-errors"></div>
	<div id="success-container" class="invisible">
		<h2>Success!</h2>
		<p>Thank you for subscribing to The Stinging Fly. You will receive an email with your login details shortly – these will allow you to access our entire online archive.</p>
		<p>If you have any questions, or if your email doesn't show up, please email web.stingingfly@gmail.com with your query.</p>  
	</div>
	<!-- The needed JS files -->
	<!-- JQUERY File -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<!-- Stripe JS -->
	<script src="https://js.stripe.com/v3/"></script>

	<!-- Your JS File -->
	<script src="<?php echo $url ?>/stripe/charge.js"></script>
</article><!-- #post-## -->

