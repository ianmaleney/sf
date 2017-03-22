<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

<?php
	/**
	 * woocommerce_before_single_product hook.
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }
?>

<div itemscope itemtype="<?php echo woocommerce_get_product_schema(); ?>" id="product-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
		/**
		 * woocommerce_before_single_product_summary hook.
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		do_action( 'woocommerce_before_single_product_summary' );
	?>

	<div class="summary entry-summary">

		<?php if( get_field('author') ): ?>
    <div class="c-product-page__author">
      <?php the_field('author'); ?>
    </div>
	<?php endif; ?>
	<?php if( get_field('issue_volume') ): ?>
		<div class="c-product-page__issue-volume">
			<?php the_field('issue_volume'); ?>
    </div>
	<?php endif ?>

		<?php
			/**
			 * woocommerce_single_product_summary hook.
			 *
			 * @hooked woocommerce_template_single_title - 5
			 * @hooked woocommerce_template_single_rating - 10
			 * @hooked woocommerce_template_single_price - 10
			 * @hooked woocommerce_template_single_excerpt - 20
			 * @hooked woocommerce_template_single_add_to_cart - 30
			 * @hooked woocommerce_template_single_meta - 40
			 * @hooked woocommerce_template_single_sharing - 50
			 */
			do_action( 'woocommerce_single_product_summary' );
		?>

		<div class="c-woo-out-of-stock">
			<p class="c-product-page__patron-description">
				<?php 
					global $product;
					if ( ! $product->is_in_stock() ){ 
						if ( has_term( 'Archive', 'product_tag' ) ) {
							echo "This item is out of print. <a href='https://stingingfly.org/product/subscription/'>Become a subscriber</a> to read it on our online archive, and also receive two print issues delivered to your door each year.";
						} else {
							echo "This item is out of print. It will soon be available to read on our online archive. <a href='https://stingingfly.org/product/subscription/'>Subscribe here for access</a>, plus two print issues delivered to your door each year";
						}
					} ?>
			</p>
		</div>

		<?php if ( get_field('patron_description') ) { ?>
			<p class="c-product-page__patron-description"> <?php the_field('patron_description'); ?> </p>
		<?php } else { ?>

			<ul class="c-product-page__meta-info">
				<li>Pages: <?php the_field('pages'); ?></li>
	      <li>ISBN: <?php the_field('isbn'); ?></li>
				<li>Published: <?php
					$date = get_field('date_published', false, false);
					$date = new DateTime($date);
					echo $date->format('M Y'); ?></li>
	    </ul>

			<?php if( get_field('pullquote') ): ?>
			<div class="c-product-page__pullquote">
				<p class="c-product-page__pullquote-quote"><?php the_field('pullquote'); ?></p>
				<p class="c-product-page__pullquote-attrib">– <?php the_field('pullquote_author'); ?></p>
			</div>
		<?php endif; 

		} ?>
		
	</div><!-- .summary -->
	<?php
		/**
		 * woocommerce_after_single_product_summary hook.
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
		do_action( 'woocommerce_after_single_product_summary' );
	?>

	<meta itemprop="url" content="<?php the_permalink(); ?>" />

</div><!-- #product-<?php the_ID(); ?> -->

<?php do_action( 'woocommerce_after_single_product' ); ?>
