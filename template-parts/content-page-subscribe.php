<?php
/**
 * The template used for displaying Subscription page content
 *
 */
?>
<?php
	$url = site_url();
?>

<article class="o-article o-article--subs">
	<div class="subs-image">
		<img class="subs-image__cover" src="https://stingingfly.org/wp-content/uploads/2018/11/SF-Winter-2018-Front-cover-hi-res-708x1024.jpg">
	</div>
	<div class="subs-text">
		<div class="subs-text__content">
			<h1><?php the_title() ?></h1>
			<?php the_content() ?>
		</div>
		<div class="subs-text__form">
			<div class="stripe-form-wrapper">
				<form action="" method="post" id="payment-form">
					<div class="stripe-form-group stripe-form-group--name">
						<label class="form-input--half-width">
							<span>First Name</span>
							<input id="first_name" name="first_name" class="field" />
						</label>
						<label class="form-input--half-width">
							<span>Last Name</span>
							<input id="last_name" name="last_name" class="field" />
						</label>
						<label class="form-input--full-width">
							<span>Email</span>
							<input id="email" name="email" class="field" />
						</label>
					</div>
					<div class="stripe-form-group stripe-form-group--address">
						<label class="form-input--full-width">
							<span>Address Line 1</span>
							<input id="address-line1" name="address_line1" class="field"/>
						</label>
						<label class="form-input--full-width">
							<span>Address Line 2</span>
							<input id="address-line2" name="address_line2" class="field"/>
						</label>
						<label class="form-input--third-width">
							<span>City</span>
							<input id="address-city" name="address_city" class="field" />
						</label>
						<label class="form-input--third-width">
							<span>Country</span>
							<input id="address-country" name="address_country" class="field"/>
						</label>
						<label class="form-input--third-width">
							<span>Postcode</span>
							<input id="address-postcode" name="address_postcode" class="field"/>
						</label>
					</div>
					<div class="radio-groups">
						<div class="stripe-form-group stripe-form-group--radio stripe-form-group--delivery">
							<span>Delivery Region</span>
							<div class="radio-item">
								<input type="radio" id="irl" name="delivery" value="irl" required checked>
								<label for="irl">Republic of Ireland / Northern Ireland</label>
							</div>
							<div class="radio-item">
								<input type="radio" id="row" name="delivery" value="row">
								<label for="row">Rest of the World</label>
							</div>
						</div>
						<div class="stripe-form-group stripe-form-group--radio stripe-form-group--issue">
							<span>Starting Issue</span>
							<div class="radio-item">
								<input type="radio" id="current_issue" name="issue" value="current_issue" required checked>
								<label for="current_issue">Current Issue</label>
							</div>
							<div class="radio-item">
								<input type="radio" id="next_issue" name="issue" value="next_issue">
								<label for="next_issue">Next Issue</label>
							</div>
						</div>
						<div class="stripe-form-group stripe-form-group--radio stripe-form-group--gift">
							<span>Is This A Gift?</span>
							<div class="radio-item">
								<input type="radio" id="gift_yes" name="gift" value="true" required>
								<label for="gift_yes">Yes</label>
							</div>
							<div class="radio-item">
								<input type="radio" id="gift_no" name="gift" value="false" checked>
								<label for="gift_no">No</label>
							</div>
						</div>
					</div>
					<div class="stripe-form-group stripe-form-group--gifted">
						<p class="stripe-form-group__inner-text">OK, we'll need your details too. Great gift, by the way!</p>
						<label class="form-input--half-width">
							<span>First Name</span>
							<input id="gifter_first_name" name="gifter_first_name" class="field" />
						</label>
						<label class="form-input--half-width">
							<span>Last Name</span>
							<input id="gifter_last_name" name="gifter_last_name" class="field" />
						</label>
						<label class="form-input--full-width">
							<span>Email</span>
							<input id="gifter_email" name="gifter_email" class="field" />
						</label>
						<label class="form-input--full-width">
							<span>When Should The Lucky Subscriber Receive Their Gift?</span>
							<input id="gift_start_date" name="gift_start_date" class="field" />
						</label>
					</div>
					<div class="stripe-form-group stripe-form-group--card-details">
						<!-- a Stripe Element will be inserted here. -->
						<label class="form-input--full-width">
							<span>Card</span>
							<div id="card-element"></div>
						</label>
						<button>Subscribe</button>	
					</div>
				</form>
				<div class="spinner invisible">
					<p>Hang on one second...</p>
					<div class="sk-folding-cube">
						<div class="sk-cube1 sk-cube"></div>
						<div class="sk-cube2 sk-cube"></div>
						<div class="sk-cube4 sk-cube"></div>
						<div class="sk-cube3 sk-cube"></div>
					</div>
				</div>
				<div id="success-container" class="invisible">
					<h3>You've subscribed to the Stinging Fly!</h3>
					<p>Check your email for details of your subscription, and a full guide for accessing the Stinging Fly online archive.</p>
					<p>If this is a gift subscription...</p>
					<p>If you have any trouble related to the postal delivery of your subscription, please contact <a href="mailto:info@stingingfly.org">info@stingingfly.org</a>.</p>
					<p>For all matters relating to the online archive, please contact <a href="mailto:web.stingingfly@gmail.com">web.stingingfly@gmail.com</a>.</p>
					<p>Thanks for your support!</p>
				</div>
				<div id="failure-container" class="invisible">
					<h3>We've got a problem!</h3>
					<p>It seems that we already have a subscriber with that email address. Are you trying to update your subscription? You can do that from <a href="/my-account">your account page</a>.</p>
				</div>
			</div>
			<div id="card-errors"></div>
			
		</div>
	</div>
	<!-- The needed JS files -->
	<!-- JQUERY File -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<!-- Stripe JS -->
	<script src="https://js.stripe.com/v3/"></script>

	<!-- Your JS File -->
	<script src="<?php echo $url ?>/stripe/charge.js"></script>
</article><!-- #post-## -->

