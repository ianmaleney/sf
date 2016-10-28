<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area error-page">
		<main id="main" class="site-main" role="main">
			<div class="u-page-wrapper u-page-wrapper--primary-header">

				<section class="error-404 not-found">
					<header class="page-header">
						<h1 class="page-title heading-2"><?php _e( 'Oops! That page can&rsquo;t be found.', 'twentysixteen' ); ?></h1>
					</header><!-- .page-header -->

					<div class="page-content">
						<p><?php _e( 'Hmm... Looks like there&rsquo;s been a mixup. Maybe try a search?', 'twentysixteen' ); ?></p>

						<?php get_search_form(); ?>

						<div class="error-image">
							<?php get_template_part('svg/inline', 'logo') ?>
						</div>
					</div><!-- .page-content -->
				</section><!-- .error-404 -->

				<?php get_sidebar( 'content-bottom' ); ?>


			</div>
		</main><!-- .site-main -->
	</div><!-- .content-area -->
<?php get_footer(); ?>
