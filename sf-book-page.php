<?php
/**
 * Template Name: Stinging Fly Product Page - Book
 * Description: Page for displaying individual books.
 */

get_header('secondary'); ?>

<div class="u-page-wrapper u-page-wrapper--secondary-header u-page-wrapper--full-width">
	<main id="main" class="site-main" role="main">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'template-parts/content', 'book' );

			// End of the loop.
		endwhile;
		?>

	</main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>
