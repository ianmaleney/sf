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
	<script async>
		var ll_images = document.querySelectorAll("img[data-src], .ll-img");
		console.log(ll_images);
		if ('IntersectionObserver' in window) {
			// Load Images on Homepage
			var options = {
				root: null,
				rootMargin: '50px 0px',
				threshold: 0
			}
			var loadImages = function(entries, observer) {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// console.log(entry.target);
						entry.target.src = entry.target.dataset.src;
						observer.unobserve(entry.target);
					}
				});
			}
			var observer = new IntersectionObserver(loadImages, options);
			ll_images.forEach(target => {
				observer.observe(target);
			});
		} else {
			ll_images.forEach(image => {
				image.src = image.dataset.src;
			});
		}

	</script>
<?php get_footer(); ?>
