<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each one. For example, tag.php (Tag archives),
 * category.php (Category archives), author.php (Author archives), etc.
 *
 */

get_header(); ?>

<main id="main" class="site-main" role="main">
	<div id="primary" class="content-area u-page-wrapper u-page-wrapper--primary-header">


	<?php if ( have_posts() ) :
		$firstLoop = true;
		$count = $wp_query->post_count;
		// Start the loop.
		while ( have_posts() ) : the_post();

			if ($count < 2) :
				echo '<div class="c-archive-list">';
			endif;

			if ($firstLoop && $count > 1) :
				echo '<div class="c-archive-module c-archive-module--featured">';
			else :
				echo '<div class="c-archive-module">';
			endif;


			?>

				<div class="c-archive-module__image">
					<a href="<?php the_permalink(); ?>"><img src="<?php archive_image_output(); ?>"></a>
				</div>
				<div class="c-archive-module__info">
					<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					<p><?php guest_author_link(); ?><a href="<?php cat_name_URL(); ?>" class="c-archive-module__type"><?php cat_name(); ?></a></p>
					<p class="c-archive-module__issue"><?php issue_date(); ?></p>
					<p class="c-archive-module__description"><?php the_field('lede'); ?></p>
				</div>
			</div><!-- #post-## -->
			<?php
				if ($firstLoop && $count > 1) :
					echo '<div class="c-archive-list">';
				endif;

				$firstLoop = false;

			// get_template_part( 'template-parts/content', 'search' );

		// End the loop.
		endwhile;

		// Previous/next page navigation.
		the_posts_pagination( array(
			'prev_text'          => __( 'Previous page', 'twentysixteen' ),
			'next_text'          => __( 'Next page', 'twentysixteen' ),
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
		) );

	// If no content, include the "No posts found" template.
	else : ?>
		<p> Sorry, we cannot find what you're looking for. </p>

	<?php endif;?>

</div>

<?php get_template_part( 'template-parts/archive-nav', 'search' ); ?>

</div><!-- .content-area -->
</main><!-- .site-main -->
<?php get_footer(); ?>
