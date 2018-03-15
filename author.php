<?php
/**
 * The template for displaying author archive pages
 *
 */

get_header(); ?>

	<main id="main" class="site-main" role="main">
		<div id="primary" class="content-area u-page-wrapper u-page-wrapper--secondary-header u-page-wrapper--category">

			<div class="c-archive-wrapper">
				<!-- Results Box -->
				<?php get_template_part( 'template-parts/archive/content', 'archive__list' ); ?>


				<!-- Filter Box -->
				<div class="c-archive-filters">
					<?php get_template_part( 'template-parts/archive/content', 'archive__author_info' ); ?>

					<!-- Search Box -->
					<?php get_template_part( 'template-parts/archive/content', 'archive__inline_search' ); ?>

					<!-- Category List -->
					<?php get_template_part( 'template-parts/archive/filter/content', 'archive__filter_categories' ); ?>


				</div>

			</div>
	</div>

</div><!-- .content-area -->
</main><!-- .site-main -->

<?php get_footer(); ?>

