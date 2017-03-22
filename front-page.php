<?php
/**
 * Front-Page Template
 */

get_header(); ?>

	<div id="primary" class="content-area u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) : ?>

			<?php
			// Featured Content. 
				if ( is_active_sidebar( 'home_page' ) ) {
			    dynamic_sidebar( 'home_page' );
				} else {
					// Featured Content.
						get_template_part( 'template-parts/home-page/sf-featured-content' );
					// Magazine Module
						get_template_part( 'template-parts/home-page/sf-magazine-content' );
					// Book Module
						get_template_part( 'template-parts/home-page/sf-home-book-module' );
					// News Content
						get_template_part( 'template-parts/home-page/sf-news-content' );
					// Latest Content
						get_template_part( 'template-parts/home-page/sf-latest-content' );
					// Archive Content
						get_template_part( 'template-parts/home-page/sf-archive-content' );
					// Events Module
						//get_template_part( 'template-parts/home-page/sf-events-content' );
					// Subscribe Module
						get_template_part( 'template-parts/home-page/sf-home-subscribe-module' );
				}

		// If no content, include the "No posts found" template.
		else :
			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
