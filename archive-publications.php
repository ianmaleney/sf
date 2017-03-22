<?php
/**
 * Template Name: Stinging Fly Publication Archive
 * Description: Page for displaying Book & Magazine Archives.
 */

get_header(); ?>

<div class="u-page-wrapper u-page-wrapper--primary-header">
	<main id="main" class="site-main" role="main">
		<div class="c-magazine-archive__info">
			<div class="c-magazine-archive__info--text">
				<?php the_content(); ?>
			</div>
		</div>
		<div class="c-publication-wrapper">

		<?php
			// Include the page content template.
			$args = array(
		    'post_type'      => 'page',
		    'posts_per_page' => -1,
		    'post_parent'    => $post->ID,
				'meta_key'			=> 'date_published',
				'orderby'        => 'meta_value_num',
		    'order'          => 'DESC',
 			);

			$parent = new WP_Query( $args );

			if ( $parent->have_posts() ) : ?>

    		<?php while ( $parent->have_posts() ) : $parent->the_post(); ?>

					<div class="c-content-module c-content-module--basic c-publication-module">
						<a href="<?php the_permalink(); ?>">
							<div class="c-publication__image">
				        <img src="<?php the_field('book_cover'); ?>">
							</div>
						</a>
				    <div class="c-content-text">
				      <?php
								if (is_page('books')) {
									guest_author_link();
								}
								if(is_page('magazine')) {
									echo '<p class="c-mag-issue">';
									the_field('issue_volume');
									echo '</p>';
								}
							?>
							<a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title();?></a>
				    </div>
				  </div>

    		<?php endwhile; ?>

			<?php endif; wp_reset_query(); ?>
		</div>
		<div class="c-publication-wrapper c-publication-wrapper--anthologies">
			
						<?php
							$args = array(
								'post_type' => 'product',
								'meta_key'	=> 'date_published',
								'orderby'   => 'meta_value_num',
						    'order'     => 'DESC',
								'product_cat' => 'anthologies',
								'posts_per_page' => -1
							);
							$loop = new WP_Query( $args );
							if ( $loop->have_posts() ) {
								while ( $loop->have_posts() ) : $loop->the_post(); ?>
								<div class="c-content-module c-content-module--basic c-publication-module">
									<a href="<?php the_permalink(); ?>">
										<div class="c-publication__image">
							        <img src="<?php the_field('book_cover'); ?>">
										</div>
									</a>
									<div class="c-content-text">
										<a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title();?></a>
							    </div>
							  </div>
								<?php endwhile;
							} else {
								echo __( 'No products found' );
							}
							wp_reset_postdata();
						?>
		</div>
	</main><!-- .site-main -->

	<?php
		// Previous/next page navigation.
		the_posts_pagination( array(
			'prev_text'          => __( 'Previous page', 'twentysixteen' ),
			'next_text'          => __( 'Next page', 'twentysixteen' ),
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
		) );
	?>
</div><!-- .content-area -->

<?php get_footer(); ?>
