<?php
/**
 * The template used for displaying Subscription page content
 *
 */
?>
<?php
	$url = site_url();

	// Get details of the latest issue, convert to number, create next_issue_number
		$args = array(
			'post_type' => 'product',
			'posts_per_page' => 1,
			'product_cat' => 'magazine',
			'orderby' =>'date',
			'order' => 'DESC' 
		);
		$loop = new WP_Query( $args );
		$current_issue;

		if ($loop->have_posts()) {
			while($loop->have_posts()) {
				$loop->the_post();
				$value = get_field('issue_volume');
				$link = get_the_permalink();
				$thumbnail = get_the_post_thumbnail_url();
				$current_issue = $value;
			}
		}

		$string_array = explode(" ", $current_issue);
		$num_array = explode("/", $string_array[1]);
		$current_issue_number = intval($num_array[0]);
		$next_issue_number = $current_issue_number + 1;

		$current_issue_title = $value . ": " . $loop->posts[0]->post_title;
		$next_issue_title = "Issue {$next_issue_number} / Volume 2";
		wp_reset_query();
?>


<div id="subs-page__landing">
	<img class="subs-page__landing__image" src="<?php echo $thumbnail ?>">
	<div class="subs-page__landing__text">
		<div class="landing__text__heading">
			<h1>Become A Subscriber</h1>
			<ul>
				<li>Two Issues Every Year</li>
				<li>Full Archive Access</li>
				<li>Starting at just €25/year</li>
			</ul>
		</div>
		<div class="landing__text__body">
			<p><strong>The Stinging Fly</strong> magazine was established in 1997 to seek out, publish and promote the very best new Irish and international writing. Thanks to the support of our subscribers, we’re still doing that over twenty years later.</p>
			<p>Subscribers receive <strong>two issues of the magazine delivered to their doors every year</strong>. Issues are 224 pages in length, and they’re published in May and November each year.</p>
			<p>Subscribers also get <strong>exclusive access to our online archive</strong>, which includes almost 2000 stories, poems, and essays taken from every issue of the magazine.</p>
			<p>Subscriptions, including postage, cost <strong>€25 per year for residents of Ireland and Northern Ireland, and €30 for anywhere else in the world.</strong> You can pay by credit or debit card using the form on this page. If you would like to pay by bank transfer, or any other method, please contact us at info@stingingfly.org.</p>
		</div>
	</div>
</div>


<div id="subs-page__form">
	<form action="" method="post" id="payment-form">
		<fieldset>
			<legend>Is this subscription for you, or someone else?</legend>
				<input type="radio" name="gift" id="gift_no" value="false" checked>
				<label for="gift_no">It's for me</label>
				<input type="radio" name="gift" id="gift_yes" value="true">
				<label for="gift_yes">It's a gift</label>
		</fieldset>

		<fieldset id="sub_contact">
			<legend>Who should we send it to?</legend>
			<div class="fieldset-inputs">
				<label for="first_name" class="half-width"><span class="label-title">First Name</span>
					<input id="first_name" type="text" required placeholder=" " pattern=".*\S.*">
					<span class="validation">This field is required.</span>
				</label>
				
				<label for="last_name" class="half-width"><span class="label-title">Last Name</span>
					<input id="last_name" type="text" required  placeholder=" " pattern=".*\S.*">
					<span class="validation">This field is required.</span>
				</label>
				
				<label for="email" class="full-width"><span class="label-title">Email</span>
					<input id="email" type="email" required placeholder=" " pattern=".*\S.*">
					<span class="validation">This field is invalid.</span>
				</label>
			</div>
			<div class="fieldset-comment">
				<p>We’ll need your name and email address.</p>
			</div>
		</fieldset>

		<fieldset>
			<legend>Where should we send it?</legend>
			<div class="fieldset-inputs">
				<label for="address_line1" class="full-width">Address Line 1
				<input id="address_line1" name="address_line1" type="text" required placeholder="&nbsp;" pattern=".*\S.*">
				<span class="validation">This field is required.</span>
				</label>
				
				<label for="address_line2" class="full-width">Address Line 2
				<input id="address_line2" name="address_line2" type="text" required placeholder="&nbsp;" pattern=".*\S.*">
				<span class="validation">This field is required.</span>
				</label>
				
				<label for="address-city" class="third-width">City
				<input id="address-city" name="address_city" type="text" >
				</label>
				
				<label for="address-country" class="third-width">Country
				<input id="address-country" name="address_country" type="text" >
				</label>
				
				<label for="address-postcode" class="third-width">Postcode
				<input id="address-postcode" name="address_postcode" type="text" >
				</label>
			</div>
			
			<h3>Select your delivery region</h3>
				<input type="radio" name="delivery" id="irl" value="irl" checked>
				<label for="irl">Ireland & Northern Ireland</label>
				<input type="radio" name="delivery" id="row" value="row">
				<label for="row">Rest of the World</label>
			<div class="fieldset-comment">
				<p>This is the address where we’ll be sending the issues.</p>
				<p>If the recipient lives in the Republic of Ireland or Northern Ireland, subscriptions cost €25/year. Subscriptions to any other part of the world cost €30/year.</p>
			</div>
		</fieldset>

		<fieldset id="sub_start">
			<legend>When would you like the subscription to start?</legend>
			
			<input type="radio" id="current_issue" name="issue" value="<?php echo $current_issue_number ?>">
			<label for="current_issue">Current Issue: <?php echo $current_issue_title ?></label>
			
			<input type="radio" id="next_issue" name="issue" value="<?php echo $next_issue_number ?>" checked>
			<label for="next_issue">Next Issue: <?php echo $next_issue_title ?></label>
			<div class="fieldset-comment">
				<p>You can choose to have your subscription start with the current issue, or the next issue.</p>
				<p>All subscriptions last for one year.</p>
			</div>
		</fieldset>

		<fieldset id="sub_payment">
			<legend>How would you like to pay for it?</legend>
			<!-- a Stripe Element will be inserted here. -->
			<label for="card-element">Your Card Details</label>
			<div id="card-element"></div>
			<p class="stripe-info">We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.</p>
			<div id="card-errors"></div>
			<button id="submit-button">Subscribe</button>
			<div class="fieldset-comment">
				<p>When you click 'subscribe', your card will be charged, and you will receive an email with the full details of your subscription, including how to access our online archive.</p>
			</div>
			
		</fieldset>
	</form>

	<div class="spinner form_modals invisible">
		<p>Hang on one second...</p>
		<div class="sk-folding-cube">
			<div class="sk-cube1 sk-cube"></div>
			<div class="sk-cube2 sk-cube"></div>
			<div class="sk-cube4 sk-cube"></div>
			<div class="sk-cube3 sk-cube"></div>
		</div>
	</div>
	
	<div id="success-container" class="form_modals invisible">
		<h3>You've subscribed to the Stinging Fly!</h3>
		<p>Check your email for details of your subscription, and a full guide for accessing the Stinging Fly online archive.</p>
		<p>If this is a gift, the person receiving the gift will get an email about their subscription on the day you have selected. We've sent you a receipt for your records.</p>
		<p>If you have any trouble related to the postal delivery of your subscription, please contact <a href="mailto:info@stingingfly.org">info@stingingfly.org</a>.</p>
		<p>For all matters relating to the website and online archive, please contact <a href="mailto:web.stingingfly@gmail.com">web.stingingfly@gmail.com</a>.</p>
		<p>Thank you for your support!</p>
	</div>
	<div id="failure-container" class="form_modals invisible">
		<h3>We've got a problem!</h3>
		<p>It seems that we already have a subscriber with that email address. Are you trying to update your subscription? You can do that from <a href="/my-account">your account page</a>.</p>
	</div>
	

</div>

<!-- The needed JS files -->
<!-- JQUERY File -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>

<!-- Your JS File -->
<script src="<?php echo $url ?>/stripe/charge.js"></script>

