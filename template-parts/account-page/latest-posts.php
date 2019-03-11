<section class="half-width">
<h2>Latest Posts</h2>
<div class="latest_posts__wrapper">
<?php 

$args = array(
  	'posts_per_page' => 3,
  	'orderby' => 'post_date',
	'order' => 'DESC',
	'post_type' => 'any'
);

$the_query = new WP_Query( $args );

// The Loop
if ( $the_query->have_posts() ) {
	echo '<ul>';
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
		echo '<li><a href="' . get_the_permalink() . '">' . get_the_title() . '</a></li>';
	}
	echo '</ul>';
	/* Restore original Post Data */
	wp_reset_postdata();
} else {
	// no posts found
}

?>

</div>
</section>