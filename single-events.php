<?php
/**
 * The template for displaying all event posts
 */

get_header( 'primary' ); ?>

</script>
	<div class="u-page-wrapper u-page-wrapper--primary-header">
		<?php

		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', 'event' );

		endwhile;

		get_sidebar('content-bottom');

		?>

	</div>

<?php get_footer(); ?>
