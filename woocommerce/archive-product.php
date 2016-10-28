<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

	<?php
		/**
		 * woocommerce_before_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		do_action( 'woocommerce_before_main_content' );
	?>

		<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
		<div class="c-shop-header-wrapper">

			<h1 class="page-title page-title--shop">The Stinging Fly <?php woocommerce_page_title(); ?></h1>

			<div class="c-shop-header__nav">
				<h2 class="c-shop-header__nav__title">Categories:</h2>
				<div class="c-shop-header__nav__links">
					<a href="#magazines">Magazines</a>
					<a href="#books">Books</a>
					<a href="#subs">Subscriptions</a>
					<a href="#anthologies">Anthologies</a>
				</div>
			</div>

      <form role="search" method="get" class="search-form" action="http://ians-macbook-pro.local:5757/">
				<h2 class="c-shop-header__nav__title">Search:</h2>
	      <label for="#primary-search">
	        <input id="primary-search" type="search" placeholder="Search the Shop" class="search-field c-search-form__input visible" value="<?php echo get_search_query() ?>" name="s">
	        <input type="hidden" value="any" name="post_type" id="post_type">
	      </label>
	      <button type="submit" class="search-submit c-search-form__button">Go</button>
    	</form>

		</div>

		<?php endif; ?>

		<?php if ( have_posts() ) : ?>

			<?php woocommerce_product_loop_start(); ?>

				<?php woocommerce_product_subcategories(); ?>
				<div class="c-product-category" id="magazines">
	        <h2 class="c-row-header">Magazines</h2>
					<ul class="c-products c-products--magazines">
						<?php
						$args = array(
							'post_type' => 'product',
							'meta_key'	=> 'date_published',
							'orderby'   => 'meta_value_num',
					    'order'     => 'DESC',
							'posts_per_page' => 6,
							'paged' => get_query_var( 'paged' ),
							'product_cat' => 'magazine',
						);

						$products = new WP_Query( $args );

						if ( $products->have_posts() ) :
							while ( $products->have_posts() ) : $products->the_post();
								wc_get_template_part( 'content', 'product' );
							endwhile;
							else : echo __( 'No products found' );
							wp_reset_postdata();
						endif;

						?>

					</ul><!--/.c-products-magazines-->
				</div>

				<div class="c-product-category" id="books">
					<h2 class="c-row-header">Books</h2>
					<ul class="c-products c-products--books">
						<?php
							$args = array(
								'post_type' => 'product',
								'meta_key'	=> 'date_published',
								'orderby'   => 'meta_value_num',
						    'order'     => 'DESC',
								'posts_per_page' => 6,
								'paged' => get_query_var( 'paged' ),
								'tax_query' => array(
									'relation' => 'AND',
									array(
										'taxonomy' => 'product_cat',
										'field'    => 'slug',
										'terms'    => 'book',
									),
									array(
										'taxonomy' => 'product_cat',
										'field'    => 'slug',
										'terms'    => 'anthologies',
										'operator' => 'NOT IN',
									),
								),
							);
							$loop = new WP_Query( $args );
							if ( $loop->have_posts() ) {
								while ( $loop->have_posts() ) : $loop->the_post();
									wc_get_template_part( 'content', 'product' );
								endwhile;
							} else {
								echo __( 'No products found' );
							}
							wp_reset_postdata();
						?>
					</ul><!--/.c-products-books-->
				</div>

				<div class="c-product-category" id="anthologies">
					<h2 class="c-row-header">Anthologies</h2>
					<ul class="c-products c-products--anthologies">
						<?php
							$args = array(
								'post_type' => 'product',
								'meta_key'	=> 'date_published',
								'orderby'   => 'meta_value_num',
						    'order'     => 'DESC',
								'posts_per_page' => 6,
								'paged' => get_query_var( 'paged' ),
								'product_cat' => 'anthologies'
							);
							$loop = new WP_Query( $args );
							if ( $loop->have_posts() ) {
								while ( $loop->have_posts() ) : $loop->the_post();
									wc_get_template_part( 'content', 'product' );
								endwhile;
							} else {
								echo __( 'No products found' );
							}
							wp_reset_postdata();
						?>
					</ul><!--/.c-products-anthologies-->
				</div>

			<?php woocommerce_product_loop_end(); ?>

			<?php
				/**
				 * woocommerce_after_shop_loop hook.
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			?>

		<?php elseif ( ! woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) : ?>

			<?php wc_get_template( 'loop/no-products-found.php' ); ?>

		<?php endif; ?>

	<?php
		/**
		 * woocommerce_after_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		/**
		 * woocommerce_sidebar hook.
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		//do_action( 'woocommerce_sidebar' );
	?>

<?php get_footer( 'shop' ); ?>
