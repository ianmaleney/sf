<?php
global $wpdb;
if ( is_user_logged_in() ) {
	
	$current_user = wp_get_current_user();
	$subscriber_details = $wpdb->get_row("SELECT * FROM stinging_fly_subscribers WHERE wp_user_id = $current_user->ID");

	$first_name = $current_user->user_firstname;
	$expiry_date = $subscriber_details->next_renewal_date;
	$sub_status = $subscriber_details->sub_status;
	$sub_id = $subscriber_details->sub_id;
	$stripe_sub_id = $subscriber_details->stripe_subscription_id;
	$stripe_customer_id = $subscriber_details->stripe_customer_id;

	get_header('primary'); ?>
	
	<script>
		document.meta = {
			stripe_customer_id: "<?php echo $stripe_customer_id; ?>",
			stripe_subscription_id: "<?php echo $stripe_sub_id; ?>",
			sub_id: "<?php echo $sub_id; ?>",
		}
	</script>
	<div class="u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
		<main id="main" class="site-main" role="main" data-cus="<?php echo $stripe_customer_id; ?>">
			<section>
			<h1>Hey, <?php echo $first_name ?>!</h1>
			<p>Welcome to the Stinging Fly! You have access to all the content on our website. You can see the archive <a href="https://stingingfly.org/category/archive">here</a>, or click <a href="/">here</a> to browse the homepage.</p>
			<?php if ( $sub_status == 'active') { ?>
				<p>Your subscription will automatically renew on: <br><strong><?php echo date("F d, Y", strtotime($expiry_date)); ?></strong><br>If you want to cancel the auto-renewal, click the 'Cancel Subscription' button further down this page. You will still receive all the issues due for your current subscription.</p>
				
			<?php } ?>
			<?php if ( $sub_status == 'legacy') { ?>
				<p>Your subscription will expire on: <br><strong><?php echo date("F d, Y", strtotime($expiry_date)); ?></strong>. <a href="https://stingingfly.org/subscribe">Renew your subscription here.</a></p>
			<?php } ?>
			</section>
			<div class="heading">
				<h2>Your account details</h2>
				<p>You can edit and update your account details here.</p>
				<div class="current-address-wrapper">
					<p><strong>Your current shipping address is:</strong></p>
					<p>
					<?php echo $subscriber_details->address_one; ?></br>
					<?php echo $subscriber_details->address_two; ?></br>
					<?php echo $subscriber_details->city; ?></br>
					<?php echo $subscriber_details->postcode; ?></br>
					<?php echo $subscriber_details->country; ?></br>
					</p>
				</div>
			</div>

			<?php get_template_part('template-parts/account-page/form-address'); ?>
			<?php if ($stripe_customer_id) { 
				get_template_part('template-parts/account-page/update-card'); 
			}?>
			<?php get_template_part('template-parts/account-page/cancel-sub'); ?>
			<?php get_template_part('template-parts/account-page/contacts'); ?>
			<?php get_template_part('template-parts/account-page/latest-posts'); ?>
		</main><!-- .site-main -->

	</div><!-- .content-area -->

	<?php get_footer(); ?>
	<!-- Stripe JS -->
	<script src="https://js.stripe.com/v3/"></script>
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