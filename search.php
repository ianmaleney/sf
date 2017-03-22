<?php
/**
 * The template for displaying search results pages
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
						<img src="
						<?php 
							global $post;
							$pageID = 149;
							if( $post->post_parent==$pageID ) {
								the_field('book_cover');
							} else {
								the_post_thumbnail_url('full');
							}
						?>">
					</div>
					<div class="c-archive-module__info">
						<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						<p>
							<span class="c-archive-module__author"><?php 
								$terms = wp_get_post_terms( $post->ID, 'product_cat' );
								foreach ( $terms as $term ) $categories[] = $term->slug;
								if ( in_array( 'magazine', $categories ) ) {
									// Do Nothing 
								} elseif( 'page' === get_post_type() ) {
									// Do Nothing
								} else {
									 guest_author_link(); 
								} ?></span>
								<?php sf_single_cat() ?>
						</p>
						<p class="c-archive-module__issue">
							<?php
			        if ( in_array( 'magazine', $categories ) ) {
			          the_field("issue_volume");
			        } elseif( $post->post_parent==$pageID ) {
			          // Do Nothing
			        } else {
			          the_date();
			        }?>
						</p>
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
	<?php get_sidebar(); ?>

</div><!-- .content-area -->
</main><!-- .site-main -->
<?php get_footer(); ?>
