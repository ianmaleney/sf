<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

		</div><!-- .site-content -->
		<?php
			$count = WC()->cart->get_cart_contents_count();
			if ( $count > 0 ) { ?>
		<div class="c-woo-cart">
			<h3><?php get_template_part( 'svg/icons/inline', 'cart' ); ?>:</h3>
			<a class="cart-contents" href="<?php echo wc_get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>"><?php echo sprintf ( _n( '%d item', '%d items', WC()->cart->get_cart_contents_count() ), WC()->cart->get_cart_contents_count() ); ?> - <?php echo WC()->cart->get_cart_total(); ?></a>
		</div>
		<?php } ?>
		<footer>
      <div id="colophon" class="site-footer u-footer-wrapper" role="contentinfo">
        <nav class="c-footer-nav main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Primary Menu', 'twentysixteen' ); ?>">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'footer-menu',
							'menu_class'     => 'c-footer-nav__menu',
						 ) );
					?>
        </nav>

        <div class="logo c-footer-logo">The Stinging Fly</div>

        <div class="c-footer-info">
          <p>The Stinging Fly magazine was established in 1997 to seek out, publish and promote the very best new Irish and international writing. We believe that there is a need for a magazine that, first and foremost, gives new and emerging writers an opportunity to get their work out into the world.</p>
        </div>

        <div class="c-footer-social">
          <div class="c-social-icons">
						<a href="https://www.facebook.com/StingingFly" target="_blank" rel="noopener">
							<?php get_template_part( 'svg/icons/inline', 'fb' ); ?>
						</a>
						<a href="http://twitter.com/stingingfly" target="_blank" rel="noopener">
							<?php get_template_part( 'svg/icons/inline', 'tw' ); ?>
						</a>
						<a href="http://www.stingingfly.org/feed" target="_blank" rel="noopener">
							<?php get_template_part( 'svg/icons/inline', 'rss' ); ?>
						</a>
					</div>
        </div>

        <div class="c-support-logos">
					<img data-src="/wp-content/themes/stingingfly/img/AC_FUND_TheArts_WHT.png" class="ac-logo">
				</div>

      </div>
    </footer>

	</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
