<?php
global $wpdb;
if ( is_user_logged_in() ) {
	
	$current_user = wp_get_current_user();
	$subscriber_details = $wpdb->get_row("SELECT * FROM stinging_fly_subscribers WHERE wp_user_id = $current_user->ID");

	$url = site_url();
	$first_name = $current_user->user_firstname;
	$expiry_date = $subscriber_details->next_renewal_date;
	$sub_status = $subscriber_details->sub_status;
	$name = $subscriber_details->first_name . ' ' . $subscriber_details->last_name;

	get_header('primary'); ?>

	<div class="u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
		<main id="main" class="site-main" role="main">
			<section>
			<h1>Hey, <?php echo $first_name ?>!</h1>
			<p>Welcome to the Stinging Fly! You have access to all the content on our website. You can see the archive <a href="https://stingingfly.org/category/archive">here</a>, or click <a href="/">here</a> to browse the homepage.</p>
			<?php if ( $sub_status == 'active') { ?>
				<p>Your subscription will automatically renew on: <br><strong><?php echo date("F d, Y", strtotime($expiry_date)); ?></strong></p>
			<?php } ?>
			<?php if ( $sub_status == 'legacy') { ?>
				<p>Your subscription will expire on: <br><strong><?php echo date("F d, Y", strtotime($expiry_date)); ?></strong>. <a href="https://stingingfly.org/subscribe">Renew your subscription here.</a></p>
			<?php } ?>
			</section>
			<?php get_template_part('template-parts/account-page/form-address'); ?>
			<?php get_template_part('template-parts/account-page/cancel-sub'); ?>
			<?php get_template_part('template-parts/account-page/contacts'); ?>
			<?php get_template_part('template-parts/account-page/latest-posts'); ?>
		</main><!-- .site-main -->

	</div><!-- .content-area -->

	<?php get_footer(); ?>
	<script>
		var cancelSubButton = document.querySelector(".cancel-sub__button");
		var cancelSubWrapper = document.querySelector(".cancel-sub__wrapper");
		var successFunctionCancel = function() {
			var p = document.createElement("p");
			p.classList.add("message");
			p.innerHTML = "Success! You've cancelled your subscription. We're sorry to see you go!";
			cancelSubWrapper.appendChild(p);
		}
		var errorFunctionCancel = function() {
			var p = document.createElement("p");
			p.classList.add("error-message");
			p.innerHTML = "Sorry, something has gone wrong. Try again, or send us an email: <a href='mailto:web.stingingfly@gmail.com'>web.stingingfly@gmail.com</a>";
			cancelSubWrapper.appendChild(p);
		}

		cancelSubButton.addEventListener("click", function(e) {
			e.preventDefault();
			$.ajax({
			url: "<?php echo $url ?>/stripe/cancel_subscription.php",
			type: "post",
			data: {
				stripe_customer_id: "<?php echo $subscriber_details->stripe_customer_id; ?>"
				},
			success: function(res) {
					console.log(res);
					switch (res) {
						case "success":
						successFunctionCancel();
						break;

						case "error":
						errorFunctionCancel();
						break;

						default:
						errorFunctionCancel();
						break;
					}
				},
				error: function(err) {
					console.log(err);
					errorFunctionCancel();
				}
				});
		});
	</script>
	<script>
		var addressForm = document.querySelector(".account-page__form");
		var hiddenIdInput = document.createElement("input");
		
		hiddenIdInput.setAttribute("type", "hidden");
		hiddenIdInput.setAttribute("name", "user_id");
		hiddenIdInput.setAttribute("value", <?php echo $current_user->id; ?>);
		addressForm.appendChild(hiddenIdInput);
		
		var hiddenNameInput = document.createElement("input");
		hiddenNameInput.setAttribute("type", "hidden");
		hiddenNameInput.setAttribute("name", "name");
		hiddenNameInput.setAttribute("value", "<?php echo $name ?>");
		addressForm.appendChild(hiddenNameInput);

		var hiddenCustomerInput = document.createElement("input");
		hiddenCustomerInput.setAttribute("type", "hidden");
		hiddenCustomerInput.setAttribute("name", "stripe_customer_id");
		hiddenCustomerInput.setAttribute("value", "<?php echo $subscriber_details->stripe_customer_id; ?>");
		addressForm.appendChild(hiddenCustomerInput);

		var successFunction = function() {
			var newInput = document.createElement("p");
			newInput.classList.add("message");
			newInput.innerHTML = "Success! You've updated your address."
			addressForm.appendChild(newInput);
		}

		var errorFunction = function() {
			var newInput = document.createElement("p");
			newInput.classList.add("error-message");
			newInput.innerHTML = "Sorry, it appears something has gone wrong. Try again."
			addressForm.appendChild(newInput);
		}

		addressForm.addEventListener("submit", function(e) {
			e.preventDefault();
			// Submit form
			$.ajax({
			url: "<?php echo $url ?>/stripe/change_address.php",
			type: "post",
			data: $("#change_address_form").serialize(),
			beforeSend: function() {
				console.log($("#change_address_form").serialize());
			},
			success: function(res) {
					console.log(res);
					switch (res) {
						case "success":
						successFunction();
						break;

						case "error":
						errorFunction();
						break;

						default:
						errorFunction();
						break;
					}
				},
				error: function(err) {
					console.log(err);
					errorFunction();
				}
				});
		});
	</script>
<?php } else {
	
	get_header('primary'); ?>

	<div class="u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
		<main id="main" class="site-main" role="main">
			<section>
				<p>You'll need to log in.</p>
				<?php wp_login_form(); ?>
			</section>
		</main>
	</div>
	
<?php } ?>