<?php
/**
 * The template for displaying search results pages
 *
 */

get_header('secondary'); ?>

	<main id="main" class="site-main" role="main">
		<div id="primary" class="content-area u-page-wrapper u-page-wrapper--secondary-header u-page-wrapper--category">
		<div class="background"></div>
		<div class="c-search-query-box">
		<p>Showing Results for: </p>
		<p> <?php echo get_search_query( __( '', 'textdomain' ) ); ?> </p>
		</div>
		<?php 
			if ( have_posts() ) {
				$firstLoop = true;
				$count = $wp_query->post_count;
				// Start the loop.
				echo '<div class="c-archive-list">';
					
				while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/content', 'archive__module' );

				// End the loop.
				endwhile;
				echo '</div>';
				if (  $wp_query->max_num_pages > 1 ) :
					echo '<button class="c-button__loadmore">More?</button>';
				endif;
			}
			
		
	?>

	</div>
	<?php get_sidebar(); ?>

</div><!-- .content-area -->
</main><!-- .site-main -->
<script>
var lengthCheck = function() {
	titles = document.querySelectorAll(".c-archive-module__title");
	titles.forEach(function(el) {
		var string = el.innerHTML;
		var length = string.length;
		if (length > 40) {
		console.log(length);
		var str2 = string.slice(0, 37);
		var newTitle = str2 + "...";
		el.innerHTML = newTitle;
		}
	});
};

document.addEventListener("DOMContentLoaded", function(){
	var items = document.querySelectorAll(".c-archive-module");
	var classes = ['two-one', 'four-two', 'three-three', 'six-two', 'four-one' ];
	items.forEach(function(el, i){
		if (i === 1){
			el.classList.add("featured");
		}
		if (i === 2 || i === 10){
			el.classList.add(classes[1]);
		}

		if (i === 3 || i === 4 || i === 6 || i === 8 ){
			el.classList.add(classes[0]);
		}
		if (i === 5 || i === 7 || i === 12) {
			el.classList.add(classes[4]);
		}
		if (i === 9) {
			el.classList.add(classes[3]);
		}
		if (i === 11){
			el.classList.add(classes[2]);
		}
	});

	lengthCheck();
});
	
</script>
<?php get_footer(); ?>
