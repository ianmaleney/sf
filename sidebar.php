<?php
/**
 * The template for the sidebar containing the main widget area
 */
?>

<?php if ( is_active_sidebar( 'sidebar-1' )  ) : ?>
	<aside id="secondary" class="sidebar widget-area c-sidebar" role="complementary">
		<!-- -->
		<?php
			get_template_part( 'template-parts/sidebar/sf-sidebar-latest' );
			get_template_part( 'template-parts/sidebar/sf-sidebar-popular' );
			get_template_part( 'template-parts/sidebar/sf-sidebar-newsletter' );
		?>

	</aside><!-- .sidebar .widget-area -->
<?php endif; ?>
