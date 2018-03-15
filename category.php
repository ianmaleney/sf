<?php
/**
 * The template for displaying search results pages
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
					<div class="author-box">
						<h2 class="page-title"><?php single_cat_title(); ?></h2>
					</div>

					<!-- Search Box -->
					<?php get_template_part( 'template-parts/archive/content', 'archive__inline_search' ); ?>

					<!-- Category List -->
					<?php get_template_part( 'template-parts/archive/filter/content', 'archive__filter_authors' ); ?>

					<?php get_template_part( 'template-parts/archive/filter/content', 'archive__filter_sort' ); ?>


				</div>

			</div>
	</div>

</div><!-- .content-area -->
</main><!-- .site-main -->

<?php get_footer(); ?>