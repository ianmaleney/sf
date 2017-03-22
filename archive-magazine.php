<?php
/**
 * Template Name: Stinging Fly Magazine Archive
 * Description: Page for displaying the Magazine Archives.
 *
 */

get_header('primary'); ?>

<div class="u-page-wrapper u-page-wrapper--primary-header">
	<main id="main" class="site-main" role="main">
		<div class="c-magazine-archive__info">
			<div class="c-magazine-archive__info--text">
				<?php the_content(); ?>
			</div>
			<div class="c-magazine-archive__info--image">
				<img src="<?php the_post_thumbnail_url( 'large' ); ?>">
			</div>
		</div>
		<div class="c-publication-wrapper">
			<div class="c-product-category" id="magazines">
		    <h2 class="c-row-header">Magazines</h2>
					<ul class="c-products c-products--magazines">
							<?php
								$args = array(
									'post_type' => 'product',
									'meta_key'	=> 'date_published',
									'orderby'   => 'meta_value_num',
							    'order'     => 'DESC',
									'product_cat' => 'magazine',
									'posts_per_page' => -1
								);

								$products = new WP_Query( $args );

								if ( $products->have_posts() ) :
									while ( $products->have_posts() ) : $products->the_post(); ?>
									<div class="c-content-module c-content-module--basic c-publication-module">
										<a href="<?php the_permalink(); ?>">
											<div class="c-publication__image">
												<img src="<?php the_field("magazine_cover") ?>">
											</div>
										</a>
										<div class="c-content-text">
											<p class="c-mag-issue">
												<?php the_field('issue_volume'); ?>
											</p>
											<a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title();?></a>
										</div>
									</div>
								<?php	endwhile;
									else : echo __( 'No products found' );
									wp_reset_postdata();
								endif;

							?>

						</ul><!--/.c-products-magazines-->
					</div>
				</div>
	</main>
</div><!-- .content-area -->

<?php get_footer(); ?>
