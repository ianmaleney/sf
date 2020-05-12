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


	// Get details of the latest book
		$args = array(
			'post_type' => 'product',
			'posts_per_page' => 1,
			'product_cat' => 'book',
			'orderby' =>'date',
			'order' => 'DESC' 
		);
		$loop = new WP_Query( $args );
		$current_issue;

		if ($loop->have_posts()) {
			while($loop->have_posts()) {
				$loop->the_post();
				$book_title = get_the_title();
				$book_link = get_the_permalink();
				$book_thumbnail = get_the_post_thumbnail_url();
			}
		}

		echo "<div class='meta' data-book='" . $book_title . "'></div>";
		wp_reset_query();
?>

<div id="subs-page__landing">
	<div class="subs-page__landing__heading">
		<h1>Support The Stinging Fly</h1>
	</div>
	<div class="subs-page__landing__images">
		<img class="subs-page__landing__image" src="<?php echo $thumbnail ?>">
		<img class="subs-page__landing__image" src="<?php echo $book_thumbnail ?>">
	</div>
	<div class="subs-page__landing__text">
		<p>The Stinging Fly magazine was established in 1997 to seek out, publish and promote the very best new Irish and international writing. Thanks to the support of our subscribers, we’re still doing that over twenty years later.</p>
		<p>The Stinging Fly publishes two magazines and two books each year. Supporters can choose to receive the books, the magazines, or both together. Stinging Fly Patrons receive both the books and the magazines. All supporters receive exclusive access to our online archive, which includes almost 2000 stories, poems, and essays taken from every issue of the magazine. All prices include postage.</p>
	</div>
</div>

<div id="svelte"></div>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>

