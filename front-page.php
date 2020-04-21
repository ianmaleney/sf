<?php
/**
 * Front-Page Template
 */

get_header(); ?>

	<div id="primary" class="content-area u-page-wrapper u-page-wrapper--primary-header u-page-wrapper--full-width">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) {

			// Featured Content. 
			if ( is_active_sidebar( 'home_page' ) ) {
				dynamic_sidebar( 'home_page' );
			}

		} else {
			get_template_part( 'template-parts/content', 'none' );
		}
		?>

		</main>
	</div>
	<script async>
		var ll_images = document.querySelectorAll("img[data-src], .ll-img");

		document.addEventListener("scroll", () => {
			let vh = window.innerHeight;
			[...ll_images].forEach(image => {
				let pos = image.getBoundingClientRect().top;
				if (pos < vh + 50 && !image.src) {
					image.src = image.dataset.src;
				}
			});
		});

		document.addEventListener("DOMContentLoaded", () => {
			let vh = window.innerHeight;
			[...ll_images].forEach(image => {
				let pos = image.getBoundingClientRect().top;
				if (pos < vh + 50 && !image.src) {
					image.src = image.dataset.src;
				}
			});
		});
	</script>
<?php get_footer(); ?>
