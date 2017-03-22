<?php
/**
 * The template for displaying all single posts and attachments
 */

get_header( 'secondary' ); ?>
	<div class="u-page-wrapper u-page-wrapper--secondary-header">
		<?php

		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', 'review' );

		endwhile;

		get_sidebar('content-bottom');

		?>

	</div>

<?php get_footer(); ?>
