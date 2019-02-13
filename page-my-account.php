<?php
/**
 * Template Name: Stinging Fly Product Page - Book
 * Description: Page for displaying individual books.
 */

global $wpdb;
$current_user = wp_get_current_user();
$subscriber_details = $wpdb->get_row("SELECT * FROM stinging_fly_subscribers WHERE wp_user_id = $current_user->ID");

$first_name = $current_user->user_firstname;
$expiry_date = $subscriber_details->next_renewal_date;

get_header('primary'); ?>

<div class="u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
	<main id="main" class="site-main" role="main">
		<h1>Hey, <?php echo $first_name ?>!</h1>
		<p>Your subscription will automatically renew on: <?php echo date("d M, Y", strtotime($expiry_date)); ?></p>
	</main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>