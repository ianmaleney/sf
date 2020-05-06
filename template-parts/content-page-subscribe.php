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
		echo "<div class='meta' data-current=" . $current_issue_number . " data-title='" . $current_issue_title . "'></div>";
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

<div id="svelte"></div>

<!-- The needed JS files -->
<!-- JQUERY File -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>

