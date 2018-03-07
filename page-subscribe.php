<?php
/**
 * The template for displaying pages
 */

get_header(); ?>

<main>
	<div class="u-page-wrapper u-page-wrapper--primary-header">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'template-parts/content', 'page-subscribe' );

			// End of the loop.
		endwhile;
		?>

	</div><!-- .content-area -->
</main> <!--.site-main -->

<?php get_footer(); ?>